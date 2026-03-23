"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          videoRef.current,
          { opacity: 0, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.3"
        );

      // Parallax on background
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream grain-overlay"
    >
      {/* Decorative background elements */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Warm gradient wash */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-warm-100 to-transparent opacity-60" />
        {/* Tan accent line */}
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-tan/30 to-transparent" />
        {/* Large decorative circle */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-tan/15" />
        <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full border border-tan/10" />
      </div>

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Meta label */}
            <div ref={metaRef} className="opacity-0 flex items-center gap-4">
              <span className="label-tag">CNY Open House</span>
              <div className="divider" />
              <span className="label-tag">Since 2007</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="opacity-0 font-serif text-display-xl text-charcoal leading-[1.04]"
            >
              Local Experts.
              <br />
              <em className="not-italic text-tan">Modern Media.</em>
            </h1>

            {/* Subheadline */}
            <p
              ref={subRef}
              className="opacity-0 text-lg md:text-xl text-charcoal/70 font-light leading-relaxed max-w-md"
            >
              Positioning your business as the authority in Central New York
              since 2007. We turn your expertise into compelling content that
              reaches thousands.
            </p>

            {/* CTA group */}
            <div
              ref={ctaRef}
              className="opacity-0 flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a href="#newsletter" className="btn-primary group">
                Become the Expert
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a href="#how-it-works" className="btn-outline">
                See How It Works
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 pt-4 border-t border-charcoal/10">
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-charcoal">17+</p>
                <p className="text-xs text-charcoal/50 tracking-wider uppercase">Years Local</p>
              </div>
              <div className="w-px h-10 bg-charcoal/10" />
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-charcoal">4</p>
                <p className="text-xs text-charcoal/50 tracking-wider uppercase">Platforms</p>
              </div>
              <div className="w-px h-10 bg-charcoal/10" />
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-charcoal">100s</p>
                <p className="text-xs text-charcoal/50 tracking-wider uppercase">Businesses Served</p>
              </div>
            </div>
          </div>

          {/* Right: Video placeholder */}
          <div ref={videoRef} className="opacity-0 relative">
            {/* Video container */}
            <div className="relative aspect-[4/3] bg-warm-200 overflow-hidden shadow-elevated group cursor-pointer">
              {/* Placeholder gradient — swap for actual video */}
              <div className="absolute inset-0 bg-gradient-to-br from-warm-300 via-tan/40 to-warm-200" />

              {/* Texture overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(210,180,140,0.3) 2px, rgba(210,180,140,0.3) 4px)",
                }}
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center shadow-card transition-transform duration-300 group-hover:scale-110">
                  <Play
                    size={28}
                    className="text-charcoal ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/60 to-transparent">
                <p className="text-cream/90 text-sm font-medium tracking-wide">
                  Watch: How CNY Open House Works
                </p>
                <p className="text-cream/60 text-xs mt-1">
                  {/* Replace with actual video URL */}
                  Video coming soon — placeholder for future underlay
                </p>
              </div>
            </div>

            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-tan/40 -z-10" />
            <div className="absolute -bottom-8 -right-8 w-full h-full border border-tan/20 -z-20" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-[0.2em] uppercase text-charcoal">Scroll</span>
        <div className="w-px h-12 bg-charcoal/40 animate-pulse" />
      </div>
    </section>
  );
}
