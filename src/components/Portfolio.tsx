"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Apex Roofing & Exteriors",
    description:
      "Monthly TV segments and a podcast series positioning Apex as CNY's go-to roofing authority. 3x increase in inbound leads within 6 months.",
    tags: ["TV Segments", "Podcast", "Digital"],
    href: "https://example.com",
    // Replace with real image path: e.g. "/portfolio/apex-roofing.jpg"
    image: null,
    accent: "from-accent/20 to-mist",
  },
  {
    title: "Lakeside Kitchen & Bath",
    description:
      "Full content campaign across video, social, and app distribution. Showcased their design process and drove showroom foot traffic.",
    tags: ["Video", "Social", "Apps"],
    href: "https://example.com",
    image: null,
    accent: "from-steel/20 to-mist",
  },
  {
    title: "CNY Windows & Doors",
    description:
      "Seasonal TV spots and a digital series on energy efficiency. Established the brand as the trusted local expert before peak season.",
    tags: ["TV", "Video Series", "SEO Content"],
    href: "https://example.com",
    image: null,
    accent: "from-neutral-300/40 to-mist",
  },
  {
    title: "Greenfield Landscaping",
    description:
      "Year-round content strategy spanning podcast interviews, video walkthroughs, and app features — keeping Greenfield top-of-mind all season.",
    tags: ["Podcast", "Video", "Apps"],
    href: "https://example.com",
    image: null,
    accent: "from-accent/10 to-canvas",
  },
  {
    title: "Premier HVAC Solutions",
    description:
      "Emergency-season TV campaign paired with evergreen digital content. Positioned Premier as the reliable choice when CNY homeowners need help fast.",
    tags: ["TV", "Digital", "Podcast"],
    href: "https://example.com",
    image: null,
    accent: "from-steel/15 to-canvas",
  },
  {
    title: "Your Business Here",
    description:
      "Ready to become the recognized expert in your category? We have one spot available per industry — and it could be yours.",
    tags: ["TV", "Video", "Podcast", "Apps"],
    href: "#contact",
    image: null,
    accent: "from-accent/30 to-accent/5",
    cta: true,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = gridRef.current?.querySelectorAll(".portfolio-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="portfolio"
      className="relative py-section bg-canvas overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="label-tag">Our Work</span>
            <div className="divider mt-4 mb-6" />
            <h2 className="font-sans font-bold text-display-lg text-ink tracking-tight">
              Businesses We&apos;ve
              <br />
              <span className="text-accent">Made Famous</span>
            </h2>
          </div>
          <p className="font-serif text-ink/55 text-lg leading-relaxed max-w-sm md:text-right">
            Real CNY businesses. Real content. Real results — across every platform we own.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/8"
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`portfolio-card opacity-0 group relative bg-canvas flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${project.cta ? "ring-1 ring-accent/30" : ""}`}
            >
              {/* Image area */}
              <div className={`relative h-52 bg-gradient-to-br ${project.accent} overflow-hidden flex-shrink-0`}>
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Placeholder pattern */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(74,111,165,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(74,111,165,0.15) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    {project.cta ? (
                      <span className="font-sans font-bold text-accent text-sm tracking-widest uppercase">
                        Your Logo Here
                      </span>
                    ) : (
                      <span className="font-sans text-ink/20 text-xs tracking-widest uppercase">
                        Add image
                      </span>
                    )}
                  </div>
                )}

                {/* Arrow on hover */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-canvas flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-soft">
                  <ArrowUpRight size={16} className="text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] font-medium tracking-widest uppercase text-accent/70 border border-accent/20 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className={`font-sans font-semibold text-xl text-ink mb-3 leading-[1.3] tracking-tight ${project.cta ? "text-accent" : ""}`}>
                  {project.title}
                </h3>

                <p className="font-serif text-ink/55 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Link label */}
                <div className="mt-6 flex items-center gap-2 text-xs font-sans font-medium tracking-widest uppercase text-accent group-hover:gap-3 transition-all duration-200">
                  <span>{project.cta ? "Get Started" : "View Project"}</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
