"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Play, ArrowUpRight } from "lucide-react";

// ─────────────────────────────────────────────
// Replace these YouTube video IDs with real ones
// Get the ID from: youtube.com/watch?v=VIDEO_ID
// ─────────────────────────────────────────────
const FEATURED_VIDEO_ID = "aNd9SLdxe14";

const fallbackRecentVideos = [
  {
    id: "XCRJ26zEWAQ",
    title: "Why Home Shows Still Matter for Homeowners in CNY | Weekend Projects Ep. 1",
    duration: "",
  },
  {
    id: "3N1W636snB4",
    title: "Open Doors to Utica Creative Reuse",
    duration: "",
  },
  {
    id: "ZnammALnSvw",
    title: "Cyber Security Essentials: How to Protect Your Personal Information | First Source",
    duration: "",
  },
];

const CHANNEL_URL = "https://www.youtube.com/@CNYOpenHouse";

function VideoThumbnail({ videoId }: { videoId: string }) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function Watch() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [recentVideos, setRecentVideos] = useState(fallbackRecentVideos);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.1,
          scrollTrigger: { trigger: featuredRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
      const cards = listRef.current?.querySelectorAll(".video-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.12,
            scrollTrigger: { trigger: listRef.current, start: "top 82%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadRecentVideos = async () => {
      try {
        const response = await fetch("/api/youtube/recent", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          videos?: Array<{ id: string; title: string; publishedAt?: string }>;
        };

        const latest = (data.videos ?? [])
          .filter((video) => video.id && video.id !== FEATURED_VIDEO_ID)
          .map((video) => ({
            id: video.id,
            title: video.title,
            duration: "",
          }));

        const merged = [...latest, ...fallbackRecentVideos]
          .filter((video) => video.id !== FEATURED_VIDEO_ID)
          .filter((video, index, list) => list.findIndex((item) => item.id === video.id) === index)
          .slice(0, 3);

        if (isActive && merged.length > 0) {
          setRecentVideos(merged);
        }
      } catch {
      }
    };

    loadRecentVideos();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="watch"
      className="relative py-section bg-ink overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,111,165,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,111,165,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto">

        {/* Header */}
        <div ref={headingRef} className="opacity-0 mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="label-tag text-accent/80">The TV Show</span>
              <div className="divider mt-4 mb-6" />
              <h2 className="font-sans font-bold text-display-lg text-canvas tracking-tight">
                CNY&apos;s Original
                <br />
                <span className="text-accent">Home Improvement Show</span>
              </h2>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-xs font-medium tracking-[0.18em] uppercase text-canvas/40 hover:text-accent transition-colors duration-200 group self-start md:self-auto"
            >
              View Full Channel
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Show credentials bar */}
          <div className="flex flex-wrap items-center gap-px bg-canvas/5">
            {[
              { value: "Since 2007", label: "On Air" },
              { value: "CNY", label: "Local TV" },
              { value: "Ongoing", label: "New Episodes" },
              { value: "+ Digital", label: "YouTube · Podcast · Apps" },
            ].map((item) => (
              <div key={item.label} className="bg-ink flex-1 min-w-[120px] px-6 py-4 border-r border-canvas/5 last:border-0">
                <p className="font-sans font-bold text-canvas text-lg leading-none tracking-tight">{item.value}</p>
                <p className="font-sans text-[10px] text-canvas/35 tracking-[0.18em] uppercase mt-1.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">

          {/* Featured embed */}
          <div ref={featuredRef} className="opacity-0">
            {playing ? (
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="CNY's Open House Featured Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="relative w-full aspect-video bg-ink-light overflow-hidden group block"
                aria-label="Play featured video"
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={VideoThumbnail({ videoId: FEATURED_VIDEO_ID })}
                  alt="Featured video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors duration-300" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-canvas/10 border border-canvas/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:scale-110">
                    <Play size={28} className="text-canvas ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/80 to-transparent">
                  <p className="font-sans text-xs text-canvas/50 tracking-widest uppercase mb-1">Latest Episode</p>
                  <p className="font-sans font-semibold text-canvas text-lg leading-snug tracking-tight">
                    CNY&apos;s Open House — Watch the Latest Episode
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Recent videos list */}
          <div ref={listRef} className="flex flex-col gap-px bg-canvas/5">
            {recentVideos.map((video, i) => (
              <a
                key={i}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card opacity-0 group flex gap-4 bg-ink p-4 hover:bg-ink-light transition-colors duration-200"
              >
                {/* Thumbnail */}
                <div className="relative w-28 flex-shrink-0 aspect-video bg-ink-light overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={VideoThumbnail({ videoId: video.id })}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-canvas/10 border border-canvas/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-200">
                      <Play size={10} className="text-canvas ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  {video.duration && (
                    <span className="absolute bottom-1 right-1 font-sans text-[10px] text-canvas bg-ink/80 px-1.5 py-0.5 leading-none">
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center min-w-0">
                  <p className="font-sans font-medium text-sm text-canvas/80 leading-snug tracking-tight group-hover:text-canvas transition-colors duration-200 line-clamp-2">
                    {video.title}
                  </p>
                  <span className="font-sans text-[10px] text-accent/60 tracking-widest uppercase mt-2">
                    Watch on YouTube
                  </span>
                </div>
              </a>
            ))}

            {/* Channel CTA */}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-accent/10 border border-accent/20 p-4 hover:bg-accent/20 transition-colors duration-200"
            >
              <span className="font-sans text-xs font-medium tracking-[0.18em] uppercase text-accent">
                See All Videos
              </span>
              <ArrowUpRight size={14} className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
