"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Why CNY Open House", href: "#why" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Become the Expert", href: "#newsletter" },
];

// SVG brand icons (lucide-react removed brand icons in v0.263+)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#1A1A1A" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { Icon: XIcon, href: "https://twitter.com", label: "Twitter / X" },
];

const platforms = ["Local TV", "Video", "Podcasts", "Mobile Apps", "Digital"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = footerRef.current?.querySelectorAll(".footer-col");
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-charcoal-dark text-cream/70">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-tan/40 to-transparent" />

      {/* Main footer grid */}
      <div className="section-padding max-w-screen-xl mx-auto py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="footer-col opacity-0 lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-serif text-2xl text-cream font-bold tracking-tight">
                CNY Open House
              </h3>
              <div className="w-8 h-px bg-tan mt-3 mb-4" />
              <p className="text-xs text-tan/80 tracking-[0.2em] uppercase">
                Since 2007
              </p>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed font-light mb-6">
              Central New York&apos;s trusted media platform for home
              improvement expertise. Positioning local businesses as the
              authority for over 17 years.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-cream/15 flex items-center justify-center text-cream/40 hover:text-tan hover:border-tan/40 transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col opacity-0">
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-tan/80 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-cream transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-tan/30 group-hover:w-6 group-hover:bg-tan transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Platforms */}
          <div className="footer-col opacity-0">
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-tan/80 mb-6">
              Our Platforms
            </h4>
            <ul className="space-y-3">
              {platforms.map((platform) => (
                <li key={platform} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-tan/40" />
                  <span className="text-sm text-cream/50">{platform}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-cream/10">
              <p className="text-xs text-cream/30 tracking-wider uppercase mb-3">
                Serving
              </p>
              <p className="text-sm text-cream/50 font-light">
                Central New York Region
              </p>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col opacity-0">
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-tan/80 mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:HELLO@CNYOPENHOUSE.COM"
                  className="flex items-start gap-3 group"
                >
                  <Mail
                    size={15}
                    className="text-tan/60 mt-0.5 flex-shrink-0 group-hover:text-tan transition-colors"
                  />
                  <span className="text-sm text-cream/50 group-hover:text-cream/80 transition-colors break-all">
                    HELLO@CNYOPENHOUSE.COM
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+1" className="flex items-start gap-3 group">
                  <Phone
                    size={15}
                    className="text-tan/60 mt-0.5 flex-shrink-0 group-hover:text-tan transition-colors"
                  />
                  <span className="text-sm text-cream/50 group-hover:text-cream/80 transition-colors">
                    Contact us for details
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={15}
                  className="text-tan/60 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-cream/50">
                  Central New York, NY
                </span>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="#newsletter"
              className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-tan border border-tan/30 px-5 py-3 hover:bg-tan hover:text-charcoal transition-all duration-300"
            >
              Become the Expert
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/8">
        <div className="section-padding max-w-screen-xl mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/25 tracking-wide">
            © {new Date().getFullYear()} CNY Open House. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-cream/25 hover:text-cream/50 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-cream/25 hover:text-cream/50 transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-xs text-cream/20 tracking-widest uppercase">
            Established 2007
          </p>
        </div>
      </div>
    </footer>
  );
}
