"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookingBar } from '@/components/booking-bar';
import { cn } from "@/lib/utils";
import { ShieldCheck, CheckCircle2, TrendingUp, Leaf, Clock, Star, AlertTriangle, ShieldAlert } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isMounted) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Intro animations - avoiding visibility: hidden in CSS
      gsap.fromTo(".hero-title", 
        { autoAlpha: 0, y: 40, scale: 0.9, filter: "blur(10px)" }, 
        { duration: 1.2, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(".hero-subtitle", 
        { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, 
        { duration: 1.0, autoAlpha: 1, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut", delay: 0.6 }
      );
      gsap.fromTo(".booking-bar-wrapper", 
        { autoAlpha: 0, y: 30 }, 
        { duration: 1.0, autoAlpha: 1, y: 0, ease: "power3.out", delay: 0.8 }
      );
      gsap.fromTo(".hero-mockup-wrapper", 
        { autoAlpha: 0, x: 50, scale: 0.9 }, 
        { duration: 1.2, autoAlpha: 1, x: 0, scale: 1, ease: "power3.out", delay: 0.6 }
      );

      // Scroll Trigger Parallax for Hero Background
      gsap.to(".hero-parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Reveal elements on scroll
      gsap.utils.toArray('.reveal-up').forEach((elem: any) => {
        gsap.fromTo(elem, 
          { autoAlpha: 0, y: 50 }, 
          { 
            duration: 1, 
            autoAlpha: 1, 
            y: 0, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Mouse Parallax for iPhone
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight) return;
      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mockupRef.current) {
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          
          gsap.to(mockupRef.current, {
            rotationY: xVal * 15,
            rotationX: -yVal * 15,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isMounted]);

  // Render a safe placeholder during SSR to prevent layout shifting/collapsing
  if (!isMounted) {
    return <div className="min-h-screen bg-[#050A15]" />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-forest-200 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section relative w-full h-[90vh] min-h-[700px] flex items-center justify-center bg-[#050A15] text-white overflow-hidden" style={{ perspective: "1500px" }}>
        {/* Background Grid & Grain */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 hero-parallax-bg">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12">
          
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="hero-title text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 leading-none">
              Gartenhilfe
            </h1>
            <h1 className="hero-subtitle text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-forest-400 leading-none">
              Auf Abruf.
            </h1>
            <p className="hero-title text-neutral-400 text-lg md:text-xl mb-12 max-w-xl font-light">
              Finde unkompliziert Helfer in deiner Nachbarschaft. Ein Request führt direkt zur Vermittlung. Keine endlosen Listen, sondern ein direkter Dispatch-Flow.
            </p>
            
            <div className="booking-bar-wrapper w-full max-w-3xl">
              <BookingBar />
            </div>
          </div>

          {/* Interactive iPhone Mockup (Clean HTML/CSS/Tailwind) */}
          <div className="hero-mockup-wrapper flex-1 w-full max-w-md hidden lg:flex justify-center items-center" style={{ perspective: "1000px" }}>
            <div 
              ref={mockupRef}
              className="relative w-[280px] h-[580px] rounded-[3rem] bg-[#111] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9),inset_0_0_0_2px_#52525B,inset_0_0_0_7px_#000] flex flex-col transform-style-3d will-change-transform"
            >
              {/* Hardware Buttons */}
              <div className="absolute top-[120px] -left-[2px] w-[3px] h-[25px] bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-l-md z-0" />
              <div className="absolute top-[160px] -left-[2px] w-[3px] h-[45px] bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-l-md z-0" />
              <div className="absolute top-[220px] -left-[2px] w-[3px] h-[45px] bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-l-md z-0" />
              <div className="absolute top-[170px] -right-[2px] w-[3px] h-[70px] bg-gradient-to-l from-neutral-800 to-neutral-900 rounded-r-md z-0" />

              {/* Inner Screen */}
              <div className="absolute inset-[7px] bg-neutral-950 rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10 flex flex-col border border-white/5 relative">
                
                {/* Glare effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-40 w-full h-[50%]" />

                {/* Notch */}
                <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-forest-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                </div>
                
                {/* UI Inside Mockup */}
                <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col gap-4">
                  <div className="flex justify-between items-center z-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Mein Status</span>
                      <span className="text-sm font-bold text-forest-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" /> I work today
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 shadow-xl backdrop-blur-md mt-4 z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-forest-400 uppercase tracking-wider">Dispatch Alert</span>
                      <span className="text-xs font-bold text-white bg-forest-500/30 px-2 py-1 rounded">15 €/h</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white mb-1">Rasenmähen & Trimmen</span>
                      <span className="block text-[11px] text-neutral-400">Heute, 14:00 Uhr • Düsseldorf</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-medium">I'm new</span>
                      <span className="text-[10px] text-neutral-400">3.2 km entfernt</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-auto z-10">
                     <button className="w-full bg-forest-600 hover:bg-forest-500 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                       Auftrag annehmen
                     </button>
                  </div>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-50 to-transparent z-20 pointer-events-none" />
      </section>

      {/* 2. ECHTE AUFKLÄRUNG ÜBER DIE APP */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-30 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-up">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4 tracking-tight">So funktioniert GreenMatch</h2>
          <p className="text-lg text-forest-700 leading-relaxed">
            Wir bringen Gartenbesitzer mit den richtigen Helfern zusammen. Einfach, nachbarschaftlich und absolut bedarfsgerecht.
          </p>
        </div>

        {/* Audience & Helper Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 reveal-up">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-forest-900 mb-3">Flexible Jugendliche</h3>
            <p className="text-forest-700">
              Perfekt für leichte Aufgaben wie Unkraut jäten, Gießen oder Rasenmähen. Jugendliche aus der Nachbarschaft können sich unkompliziert und flexibel ihr Taschengeld aufbessern.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-forest-100 text-forest-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-forest-900 mb-3">Professionelle Meisterbetriebe</h3>
            <p className="text-forest-700">
              Für schwere und gefährliche Arbeiten (z.B. schwieriger Baumschnitt, Pflasterarbeiten). Zertifizierte Profis mit dem nötigen Werkzeug und voller Versicherung.
            </p>
          </div>
        </div>

        {/* Core Features */}
        <h3 className="text-2xl font-bold text-forest-900 mb-8 text-center reveal-up">Intelligente Dispatch-Features</h3>
        <div className="grid md:grid-cols-3 gap-6 reveal-up">
          
          <div className="bg-white p-6 rounded-3xl border border-forest-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-forest-900">Live-Verfügbarkeit</h4>
            </div>
            <p className="text-sm text-forest-700 mb-4">
              Helfer können per Knopfdruck ihren Status ändern.
            </p>
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 flex items-center gap-2">
              <div className={cn("w-full bg-forest-600 text-white text-xs font-bold py-2 rounded-lg text-center shadow-inner")}>
                I work today
              </div>
              <div className="w-full bg-neutral-200 text-neutral-500 text-xs font-bold py-2 rounded-lg text-center">
                Off duty
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-forest-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-forest-900">Chancengleichheit</h4>
            </div>
            <p className="text-sm text-forest-700 mb-4">
              Neue Helfer ohne Bewertungen werden fair behandelt und durch ein Badge hervorgehoben.
            </p>
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex items-center justify-center">
               <span className="bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> I'm new
               </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-forest-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-forest-900">Faire Verhandlung</h4>
            </div>
            <p className="text-sm text-forest-700 mb-4">
              Kein Preisdiktat. Nutze unser eBay-ähnliches Bietverfahren, um den besten Deal für beide Seiten zu finden.
            </p>
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 flex flex-col gap-2">
               <div className="flex justify-between items-center text-xs font-bold px-1">
                 <span className="text-forest-800">Dein Gebot</span>
                 <span className="text-forest-600">18 €/h</span>
               </div>
               <div className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg text-center cursor-pointer hover:bg-blue-700 transition shadow-inner">
                 Gegenangebot senden
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. RECHTLICHE TRANSPARENZ & COMPLIANCE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 reveal-up">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" /> Transparenz & Unterstützung
              </h2>
              <p className="text-forest-200 text-lg leading-relaxed">
                Wir helfen dir aktiv dabei, gesetzliche Rahmenbedingungen im Blick zu behalten, damit du dich voll auf die Gartenarbeit konzentrieren kannst.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 reveal-up">
            
            <div className="bg-forest-800/50 border border-forest-700/50 p-6 rounded-3xl backdrop-blur-sm">
              <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> JArbSchG
              </h4>
              <p className="text-sm text-forest-200 leading-relaxed">
                Unser intelligenter Kalender unterstützt Jugendliche automatisch bei der Einhaltung des Jugendarbeitsschutzgesetzes, indem er erlaubte Zeitfenster und Stundenlimits berücksichtigt.
              </p>
            </div>

            <div className="bg-forest-800/50 border border-forest-700/50 p-6 rounded-3xl backdrop-blur-sm">
              <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> PStTG Meldungen
              </h4>
              <p className="text-sm text-forest-200 leading-relaxed">
                Wir sorgen für Steuertransparenz. Sobald Meldeschwellen des Plattformen-Steuertransparenzgesetzes erreicht werden, informieren wir dich frühzeitig und fordern transparent die Steuer-ID an.
              </p>
            </div>

            <div className="bg-forest-800/50 border border-forest-700/50 p-6 rounded-3xl backdrop-blur-sm">
              <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> § 35a EStG
              </h4>
              <p className="text-sm text-forest-200 leading-relaxed">
                Für Kunden generieren wir saubere Rechnungen und Nachweise, die als haushaltsnahe Dienstleistungen steuerlich geltend gemacht werden können.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
