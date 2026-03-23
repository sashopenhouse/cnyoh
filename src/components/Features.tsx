"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Tv, Globe, Mic, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Established Local TV Audience",
    description:
      "Reach thousands of Central New York viewers through our trusted broadcast partnerships. Your expertise, on screens that matter.",
    stat: "Local TV",
    statLabel: "Broadcast Reach",
  },
  {
    icon: Globe,
    title: "Content as Expertise",
    description:
      "We transform your knowledge into compelling stories. When viewers see you on screen, they see the authority — not an ad.",
    stat: "Story-First",
    statLabel: "Content Strategy",
  },
  {
    icon: Mic,
    title: "Multi-Platform Distribution",
    description:
      "TV, video, podcasts, and apps. Your message reaches your audience wherever they consume content — consistently.",
    stat: "4 Channels",
    statLabel: "Distribution",
  },
  {
    icon: TrendingUp,
    title: "17+ Years of Local Trust",
    description:
      "Since 2007, CNY's Open House has been the region's go-to source for home improvement expertise. That trust transfers to you.",
    stat: "Since 2007",
    statLabel: "Established",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade-rise
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative py-section bg-ink overflow-hidden"
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,111,165,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,111,165,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Cool accent top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="opacity-0 max-w-2xl mb-20">
          <span className="label-tag text-accent/80">The Value Proposition</span>
          <div className="divider mt-4 mb-6" />
          <h2 className="font-sans font-bold text-display-lg text-canvas tracking-tight mb-6">
            Why CNY&apos;s Open House <span className="text-accent">Works for You</span>
          </h2>
          <p className="font-serif text-canvas/60 text-lg leading-relaxed">
            We&apos;re not an ad agency. We&apos;re a media platform built on
            local trust — and we put that trust behind your business.
          </p>
        </div>

        {/* Feature cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-canvas/5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card opacity-0 group bg-ink p-8 lg:p-10 hover:bg-ink-light transition-colors duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 border border-accent/30 flex items-center justify-center mb-8 group-hover:border-accent/70 transition-colors duration-300">
                  <Icon size={20} className="text-accent" />
                </div>

                {/* Stat */}
                <div className="mb-6">
                  <p className="font-sans font-bold text-3xl text-canvas">
                    {feature.stat}
                  </p>
                  <p className="font-sans text-xs text-steel/70 tracking-widest uppercase mt-1">
                    {feature.statLabel}
                  </p>
                </div>

                {/* Content */}
                <h3 className="font-sans font-semibold text-xl text-canvas mb-3 leading-[1.3]">
                  {feature.title}
                </h3>
                <p className="font-serif text-canvas/50 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-8 w-8 h-px bg-accent/30 group-hover:w-16 group-hover:bg-accent/70 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
