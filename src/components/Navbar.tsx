"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Why Us", href: "#why" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Watch", href: "#watch" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.3 }
    );

    // Scroll detection
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-soft border-b border-charcoal/8"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="CNY's Open House"
              width={140}
              height={40}
              className="h-6 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-medium tracking-[0.15em] uppercase text-charcoal/60 hover:text-charcoal transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-tan group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#contact" className="btn-primary text-xs py-3 px-6">
              Become the Expert
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-cream border-t border-charcoal/8`}
      >
        <div className="section-padding py-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium tracking-[0.15em] uppercase text-charcoal/60 hover:text-charcoal transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#newsletter"
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full justify-center mt-4"
          >
            Become the Expert
          </a>
        </div>
      </div>
    </nav>
  );
}
