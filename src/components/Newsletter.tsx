"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { gsap } from "@/lib/gsap";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { ArrowRight, CheckCircle, AlertCircle, Mail } from "lucide-react";

const initialState: NewsletterState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />
          Subscribing...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          Stay Informed
          <ArrowRight size={16} />
        </span>
      )}
    </button>
  );
}

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [state, formAction] = useFormState(subscribeToNewsletter, initialState);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative py-section bg-warm-100 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tan/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tan/30 to-transparent" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-tan/8 blur-3xl" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sage/8 blur-3xl" />
      </div>

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-14 h-14 border border-tan/40 flex items-center justify-center mx-auto mb-8">
            <Mail size={22} className="text-tan" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="opacity-0">
            <span className="label-tag">Stay Informed</span>
            <div className="divider mt-4 mb-6 mx-auto" />
            <h2 className="font-serif text-display-md text-charcoal mb-4">
              Get the CNY Open House
              <br />
              <em className="not-italic text-tan">Insider Newsletter</em>
            </h2>
            <p className="text-charcoal/60 text-lg font-light leading-relaxed mb-10">
              Home improvement trends, local market insights, and exclusive
              opportunities to feature your business — delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className="opacity-0">
            {state.success ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-sage" />
                </div>
                <p className="font-serif text-xl text-charcoal">{state.message}</p>
                <p className="text-charcoal/50 text-sm">
                  Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-0 shadow-card">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-4 bg-cream border border-charcoal/15 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-tan transition-colors duration-200 text-sm"
                    aria-label="Email address"
                  />
                  <SubmitButton />
                </div>

                {/* Error message */}
                {!state.success && state.message && (
                  <div className="flex items-center gap-2 text-sm text-red-600 justify-center">
                    <AlertCircle size={14} />
                    <span>{state.message}</span>
                  </div>
                )}

                <p className="text-xs text-charcoal/35 tracking-wide">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
