"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicLandingHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export function CinematicLandingHero({
  brandName = "GreenMatch",
  tagline1 = "Match gardeners,",
  tagline2 = "not guesswork.",
  cardHeading = "Live marketplace pulse",
  cardDescription = (
    <>
      Clear offers, youth-safe scheduling, and trust-first matching in one cinematic landing experience.
    </>
  ),
  metricValue = 42,
  metricLabel = "Matches today",
  ctaHeading = "Start with a focused landing page.",
  ctaDescription = "A polished first impression with motion, contrast, and a direct path into the marketplace.",
  primaryActionLabel = "Anmelden",
  secondaryActionLabel = "Registrieren",
  onPrimaryAction,
  onSecondaryAction,
  className,
  ...props
}: CinematicLandingHeroProps) {
  const [count, setCount] = useState(metricValue);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gm-reveal",
        { y: 28, opacity: 0, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.08
        }
      );

      gsap.fromTo(
        ".gm-orb",
        { y: 0, scale: 1 },
        {
          y: -18,
          scale: 1.05,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.35
        }
      );

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 26, rotateX: 10, rotateY: -8, scale: 0.97 },
          {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.25,
            ease: "power3.out"
          }
        );
      }
    }, rootRef.current);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!countRef.current) return;

    gsap.fromTo(
      countRef.current,
      { scale: 0.96, filter: "blur(4px)" },
      {
        scale: 1,
        filter: "blur(0px)",
        duration: 0.28,
        ease: "power2.out"
      }
    );
  }, [count]);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!rootRef.current || !cardRef.current) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rootRef.current?.style.setProperty("--mouse-x", `${x}px`);
        rootRef.current?.style.setProperty("--mouse-y", `${y}px`);

        const normalizedX = event.clientX / window.innerWidth - 0.5;
        const normalizedY = event.clientY / window.innerHeight - 0.5;

        gsap.to(cardRef.current, {
          rotateY: normalizedX * 10,
          rotateX: normalizedY * -8,
          duration: 0.9,
          ease: "power3.out"
        });
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative overflow-hidden border-b border-forest-200/70 bg-[radial-gradient(circle_at_top_left,rgba(47,141,70,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(176,125,49,0.14),transparent_24%),linear-gradient(180deg,#10221a_0%,#173225_44%,#eef6f1_100%)] text-white",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="gm-orb absolute left-[-5rem] top-16 h-40 w-40 rounded-full bg-forest-400/30 blur-3xl" />
        <div className="gm-orb absolute right-[-2rem] top-0 h-64 w-64 rounded-full bg-soil-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="gm-reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.9)]" />
              {brandName}
            </div>

            <div className="space-y-3">
              <h1 className="gm-reveal max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                {tagline1} <span className="text-emerald-300">{tagline2}</span>
              </h1>
              <p className="gm-reveal max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                A sharp landing page that introduces the marketplace, surfaces trust signals, and gives the start page
                motion without overwhelming the product flow.
              </p>
            </div>

            <div className="gm-reveal rounded-full border border-white/12 bg-white/8 px-4 py-3 text-sm text-white/72 backdrop-blur">
              {ctaHeading}
              <span className="ml-2 text-white/45">•</span>
              <span className="ml-2">{ctaDescription}</span>
            </div>

            <div className="gm-reveal flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex min-h-12 items-center rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:bg-emerald-200"
              >
                {primaryActionLabel}
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex min-h-12 items-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                {secondaryActionLabel}
              </button>
            </div>
          </div>

          <div ref={cardRef} className="gm-reveal relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-400/15 via-transparent to-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/55">Cinematic widget</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{cardHeading}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/72">{cardDescription}</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-right">
                  <span className="block text-[0.68rem] uppercase tracking-[0.26em] text-white/50">{metricLabel}</span>
                  <strong
                    ref={countRef}
                    className="mt-1 block text-3xl font-semibold text-white"
                    aria-live="polite"
                  >
                    {count}
                  </strong>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Trust", value: "High" },
                  { label: "Speed", value: "Realtime" },
                  { label: "Safety", value: "Youth-aware" }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <span className="block text-[0.68rem] uppercase tracking-[0.25em] text-white/45">{item.label}</span>
                    <strong className="mt-2 block text-base font-semibold text-white">{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCount((prev) => Math.max(0, prev - 1))}
                  className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 text-lg font-semibold text-white transition hover:bg-white/16"
                  aria-label="Decrease count"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setCount((prev) => prev + 1)}
                  className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-400/20 px-4 text-lg font-semibold text-white transition hover:bg-emerald-400/28"
                  aria-label="Increase count"
                >
                  +
                </button>
                <p className="text-sm text-white/68">
                  A small interactive counter keeps the hero lively and gives users immediate tactile feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
