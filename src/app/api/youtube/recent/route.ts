import { NextResponse } from "next/server";

const CHANNEL_HANDLE = "@CNYOpenHouse";
const MAX_RESULTS = 12;

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RecentVideo = {
  id: string;
  title: string;
  publishedAt: string;
};

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function findChannelId(channelHtml: string) {
  const canonicalMatch = channelHtml.match(
    /rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/
  );
  if (canonicalMatch?.[1]) {
    return canonicalMatch[1];
  }

  const rssUrlMatch = channelHtml.match(
    /"rssUrl":"https:\/\/www\.youtube\.com\/feeds\/videos\.xml\?channel_id=(UC[\w-]{22})"/
  );
  if (rssUrlMatch?.[1]) {
    return rssUrlMatch[1];
  }

  const fallbackMatch = channelHtml.match(/"channelId":"(UC[\w-]{22})"/);
  return fallbackMatch?.[1] ?? null;
}

function parseVideosFromFeed(xml: string): RecentVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries
    .map((entry) => {
      const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
      const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);

      if (!idMatch?.[1] || !titleMatch?.[1]) {
        return null;
      }

      return {
        id: idMatch[1].trim(),
        title: decodeXmlEntities(titleMatch[1].trim()),
        publishedAt: publishedMatch?.[1]?.trim() ?? "",
      };
    })
    .filter((video): video is RecentVideo => Boolean(video))
    .slice(0, MAX_RESULTS);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const exclude = searchParams.get("exclude")?.trim();
    const requestedLimit = Number(searchParams.get("limit") ?? "4");
    const limit = Number.isFinite(requestedLimit)
      ? Math.max(1, Math.min(requestedLimit, MAX_RESULTS))
      : 4;

    const channelPageResponse = await fetch(`https://www.youtube.com/${CHANNEL_HANDLE}`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!channelPageResponse.ok) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const channelPageHtml = await channelPageResponse.text();
    const channelId = findChannelId(channelPageHtml);

    if (!channelId) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const feedResponse = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      cache: "no-store",
    });

    if (!feedResponse.ok) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const feedXml = await feedResponse.text();
    const videos = parseVideosFromFeed(feedXml)
      .filter((video) => !exclude || video.id !== exclude)
      .sort((a, b) => {
        const aTime = Date.parse(a.publishedAt);
        const bTime = Date.parse(b.publishedAt);
        return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
      })
      .slice(0, limit);

    return NextResponse.json({ videos }, { status: 200 });
  } catch {
    return NextResponse.json({ videos: [] }, { status: 200 });
  }
}
