"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { gsap } from "@/lib/gsap";
import { submitContactForm, type ContactState } from "@/app/actions/newsletter";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

const initialState: ContactState = { success: false, message: "" };

const services = [
  "TV Segments",
  "Video Production",
  "Podcast Series",
  "App Distribution",
  "Full Platform Package",
  "Not sure yet",
];

const inputClass =
  "w-full px-4 py-3 bg-canvas border border-ink/12 text-ink text-sm font-sans placeholder:text-ink/30 focus:outline-none focus:border-accent transition-colors duration-200";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-canvas/40 border-t-canvas rounded-full animate-spin" />
          Sending...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          Send My Inquiry
          <ArrowRight size={16} />
        </span>
      )}
    </button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [state, formAction] = useFormState(submitContactForm, initialState);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-section bg-mist overflow-hidden"
    >
      {/* Accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 section-padding max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <div ref={leftRef} className="opacity-0 lg:sticky lg:top-32">
            <span className="label-tag">Work With Us</span>
            <div className="divider mt-4 mb-6" />
            <h2 className="font-sans font-bold text-display-lg text-ink tracking-tight mb-6">
              Let&apos;s Make You
              <br />
              <span className="text-accent">the Authority</span>
            </h2>
            <p className="font-serif text-ink/60 text-lg leading-relaxed mb-10">
              Tell us about your business and goals. We&apos;ll reach out within
              one business day to talk through how CNY&apos;s Open House can
              position you as the go-to expert in your category.
            </p>

            {/* What to expect */}
            <div className="space-y-4">
              {[
                { step: "01", text: "We review your inquiry and research your category" },
                { step: "02", text: "A quick discovery call to align on goals" },
                { step: "03", text: "A custom content plan built around your business" },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="font-sans font-bold text-sm text-accent/40 tabular-nums mt-0.5 flex-shrink-0">{step}</span>
                  <p className="font-serif text-ink/60 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="opacity-0">
            {state.success ? (
              <div className="flex flex-col items-center gap-5 py-16 text-center">
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-accent" />
                </div>
                <p className="font-sans font-semibold text-xl text-ink">{state.message}</p>
                <p className="font-serif text-ink/50 text-sm max-w-xs">
                  In the meantime, feel free to follow us on social media.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4 bg-canvas p-8 shadow-card">
                {/* Name + Business */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs font-medium tracking-widest uppercase text-ink/50 block mb-2">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs font-medium tracking-widest uppercase text-ink/50 block mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="business"
                      placeholder="Acme Roofing Co."
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="font-sans text-xs font-medium tracking-widest uppercase text-ink/50 block mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@yourbusiness.com"
                    className={inputClass}
                  />
                </div>

                {/* Service interest */}
                <div>
                  <label className="font-sans text-xs font-medium tracking-widest uppercase text-ink/50 block mb-2">
                    I&apos;m Interested In
                  </label>
                  <select name="service" className={inputClass}>
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-sans text-xs font-medium tracking-widest uppercase text-ink/50 block mb-2">
                    Tell Us About Your Goals <span className="text-accent">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What does your business do, who are your ideal customers, and what would success look like?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Error */}
                {!state.success && state.message && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} />
                    <span>{state.message}</span>
                  </div>
                )}

                <SubmitButton />

                <p className="font-sans text-xs text-ink/30 tracking-wide text-center pt-1">
                  We respond within 1 business day. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
