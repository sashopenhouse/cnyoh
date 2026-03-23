"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Search, Clapperboard, Radio } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "We Learn Your Business & Goals",
    description:
      "Every partnership starts with a deep discovery session. We learn what makes your business exceptional, who your ideal client is, and what story will resonate most with the CNY audience.",
    detail: "Strategy · Discovery · Brand Alignment",
  },
  {
    number: "02",
    icon: Clapperboard,
    title: "We Create Content Highlighting Your Expertise",
    description:
      "Our production team crafts professional video segments, podcast episodes, and digital content that positions you as the go-to authority — not just another advertiser.",
    detail: "Video · Podcast · Digital Content",
  },
  {
    number: "03",
    icon: Radio,
    title: "We Distribute Across Trusted Local Channels",
    description:
      "Your content reaches the CNY audience through our established TV partnerships, streaming platforms, podcast networks, and mobile apps — all channels your customers already trust.",
    detail: "TV · Video · Podcasts · Apps",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Heading
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

      // Steps stagger
      const stepEls = stepsRef.current?.querySelectorAll(".step-item");
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.22,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Connector lines animate in
      const lines = stepsRef.current?.querySelectorAll(".connector-line");
      if (lines) {
        gsap.fromTo(
          lines,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.inOut",
            stagger: 0.22,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 75%",
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
      id="how-it-works"
      className="relative py-section bg-cream overflow-hidden"
    >
      {/* Parallax background accent */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-warm-100/80 to-transparent" />
        <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-tan/5 blur-3xl" />
      </div>

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Heading */}
          <div ref={headingRef} className="opacity-0 lg:sticky lg:top-32">
            <span className="label-tag">The Process</span>
            <div className="divider mt-4 mb-6" />
            <h2 className="font-sans font-bold text-display-lg text-ink tracking-tight mb-6">
              How It
              <br />
              <span className="text-accent">Works</span>
            </h2>
            <p className="text-charcoal/60 text-lg font-light leading-relaxed mb-8">
              Three clear steps from discovery to distribution. We handle the
              heavy lifting so you can focus on what you do best.
            </p>

            {/* Decorative element */}
            <div className="hidden lg:block">
              <div className="w-full h-px bg-gradient-to-r from-tan/40 to-transparent mb-8" />
              <blockquote className="border-l-2 border-tan pl-6">
                <p className="font-serif text-xl text-ink/70 italic leading-relaxed">
                  &ldquo;When viewers see you on our platform, they don&apos;t
                  see an ad. They see an expert.&rdquo;
                </p>
                <footer className="mt-4 text-xs text-charcoal/40 tracking-widest uppercase">
                  — CNY&apos;s Open House Philosophy
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Right: Steps */}
          <div ref={stepsRef} className="space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              return (
                <div key={step.number} className="step-item opacity-0 relative">
                  <div className="flex gap-8">
                    {/* Number + connector */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 border border-tan/40 bg-cream flex items-center justify-center flex-shrink-0 relative z-10">
                        <Icon size={20} className="text-tan" />
                      </div>
                      {!isLast && (
                        <div className="connector-line w-px flex-1 bg-gradient-to-b from-tan/40 to-tan/10 my-2 min-h-[60px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-12 ${isLast ? "" : ""}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-sans font-bold text-4xl text-accent/20 leading-none tabular-nums">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-sans font-semibold text-2xl text-ink mb-3 leading-[1.3] tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-charcoal/60 leading-relaxed mb-4 font-light">
                        {step.description}
                      </p>
                      <span className="text-xs text-tan tracking-[0.18em] uppercase font-medium">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
