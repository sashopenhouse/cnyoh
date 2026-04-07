import { NextResponse } from "next/server";

const CHANNEL_HANDLE = "@CNYOpenHouse";
const MAX_RESULTS = 4;

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
  const match = channelHtml.match(/"channelId":"(UC[\w-]{22})"/);
  return match?.[1] ?? null;
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

export async function GET() {
  try {
    const channelPageResponse = await fetch(`https://www.youtube.com/${CHANNEL_HANDLE}`, {
      next: { revalidate: 900 },
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

    const feedResponse = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 900 } }
    );

    if (!feedResponse.ok) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const feedXml = await feedResponse.text();
    const videos = parseVideosFromFeed(feedXml);

    return NextResponse.json({ videos }, { status: 200 });
  } catch {
    return NextResponse.json({ videos: [] }, { status: 200 });
  }
}
