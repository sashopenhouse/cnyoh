import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Fade-and-rise entrance animation for text blocks.
 * @param targets - CSS selector or element(s)
 * @param trigger - The scroll trigger element
 * @param stagger - Stagger delay between items (default 0.12s)
 */
export function fadeRiseIn(
  targets: string | Element | Element[],
  trigger: string | Element,
  stagger = 0.12
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger,
      scrollTrigger: {
        trigger,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Parallax effect for section backgrounds.
 * @param target - The element to parallax
 * @param speed - Parallax speed multiplier (default 0.3)
 */
export function parallaxBg(target: string | Element, speed = 0.3) {
  return gsap.to(target, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Staggered reveal for list items.
 * @param targets - CSS selector or elements
 * @param trigger - Scroll trigger element
 */
export function staggerReveal(
  targets: string | Element | Element[],
  trigger: string | Element
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger,
        start: "top 78%",
        toggleActions: "play none none none",
      },
    }
  );
}
