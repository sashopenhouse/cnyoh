"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(metaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(headlineRef.current, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.3")
        .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      // Subtle parallax on bg decorations
      gsap.to(bgRef.current, {
        yPercent: 20,
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-canvas"
    >
      {/* Background decorations */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,111,165,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,111,165,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Radial glow top-right */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
        {/* Accent vertical rule */}
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
      </div>

      {/* Main content — centered, full-width, generous breathing room */}
      <div className="relative z-10 section-padding max-w-screen-lg mx-auto w-full pt-40 pb-28">
        <div className="space-y-10">

          {/* Meta label */}
          <div ref={metaRef} className="opacity-0 flex items-center gap-4">
            <span className="label-tag">CNY&apos;s Open House</span>
            <div className="divider" />
            <span className="label-tag">Since 2007</span>
          </div>

          {/* Headline — large, full-width, no column constraint */}
          <h1
            ref={headlineRef}
              className="opacity-0 font-sans font-bold text-display-xl text-ink tracking-tight max-w-4xl"
          >
            Local Experts.
            <br />
            <span className="text-accent">Modern Media.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="opacity-0 font-serif text-xl md:text-2xl text-ink/60 leading-relaxed max-w-2xl"
          >
            Positioning your business as the authority in Central New York
            since 2007. We turn your expertise into compelling content that
            reaches thousands across TV, video, podcasts, and apps.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#contact" className="btn-primary group">
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

          {/* Stats row */}
          <div ref={statsRef} className="opacity-0 pt-8 border-t border-ink/8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink/8 overflow-hidden">
              {[
                { value: "17+", label: "Years Local" },
                { value: "4", label: "Platforms" },
                { value: "100s", label: "Businesses Served" },
                { value: "CNY", label: "Region Focus" },
              ].map((stat) => (
                <div key={stat.label} className="bg-canvas flex flex-col items-center justify-center text-center py-6 px-4">
                  <p className="font-sans font-bold text-4xl text-ink leading-none tracking-tight">{stat.value}</p>
                  <p className="font-sans text-[10px] text-ink/40 tracking-[0.18em] uppercase mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink">Scroll</span>
        <div className="w-px h-12 bg-ink/40 animate-pulse" />
      </div>
    </section>
  );
}
