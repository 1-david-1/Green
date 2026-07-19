"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookingBar } from './booking-bar';

// Setup GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // High-Performance Mouse Interaction Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.5) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
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
  }, []);

  // Complex Scroll Trigger Animations
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 40, scale: 0.9, filter: "blur(10px)" });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: isMobile ? 300 : 500, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.9 });
      gsap.set(".booking-bar-wrapper", { autoAlpha: 0, y: 30 });

      // Intro animation on page load
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-track", { duration: 1.2, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power4.out" })
        .to(".text-days", { duration: 1.0, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.6")
        .to(".booking-bar-wrapper", { duration: 1.0, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.4");

      // Scroll triggered transition sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme", ".booking-bar-wrapper"], { scale: 1.1, filter: "blur(10px)", opacity: 0.05, ease: "power2.inOut", duration: 1.5 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.2 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 200, autoAlpha: 0, scale: 0.8 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.8 }, "-=0.4"
        )
        .fromTo(".phone-widget", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out", duration: 1.2 }, "-=1.0")
        .fromTo(".floating-badge", { y: 60, autoAlpha: 0, scale: 0.8 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.4)", duration: 1.2, stagger: 0.15 }, "-=1.2")
        .fromTo(".card-left-text", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 1.2 }, "-=1.0")
        .fromTo(".card-right-text", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 1.2 }, "<")
        .to({}, { duration: 1.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".booking-bar-wrapper", { autoAlpha: 0, scale: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.0 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.95, y: -20, autoAlpha: 0, ease: "power2.in", duration: 1.0, stagger: 0.05
        })
        .to(".main-card", { 
          width: isMobile ? "94vw" : "85vw", 
          height: isMobile ? "90vh" : "80vh", 
          borderRadius: "32px", 
          ease: "expo.inOut", 
          duration: 1.5 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, autoAlpha: 1, ease: "expo.inOut", duration: 1.5 }, "pullback");

    }, containerRef);

    return () => ctx.revert();
  }, []); 

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-[#050A15] text-white font-sans antialiased"
      style={{ perspective: "1500px" }}
    >
      {/* Dynamic CSS Styles injected inside application for physical material rendering */}
      <style dangerouslySetInnerHTML={{ __html: `
        .gsap-reveal { visibility: hidden; }
        .film-grain {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 50; opacity: 0.06; mix-blend-mode: overlay;
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
        }
        .bg-grid-theme {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        }
        .text-3d-matte {
          color: #FFFFFF;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4);
        }
        .text-silver-matte {
          background: linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0px 10px 20px rgba(255,255,255,0.1)) drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
        }
        .text-card-silver-matte {
          background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
        }
        .premium-depth-card {
          background: linear-gradient(145deg, #022c22 0%, #064e3b 100%);
          box-shadow: 
            0 40px 100px -20px rgba(0, 0, 0, 0.9),
            0 20px 40px -20px rgba(0, 0, 0, 0.8),
            inset 0 1px 2px rgba(255, 255, 255, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }
        .card-sheen {
          position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
          background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.12) 0%, transparent 40%);
          mix-blend-mode: screen; transition: opacity 0.3s ease;
        }
        .iphone-bezel {
          background-color: #111;
          box-shadow: 
            inset 0 0 0 2px #52525B, 
            inset 0 0 0 7px #000, 
            0 40px 80px -15px rgba(0,0,0,0.9),
            0 15px 25px -5px rgba(0,0,0,0.7);
          transform-style: preserve-3d;
        }
        .hardware-btn {
          background: linear-gradient(90deg, #404040 0%, #171717 100%);
          box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
          border-left: 1px solid rgba(255,255,255,0.05);
        }
        .screen-glare {
          background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
        }
        .widget-depth {
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.03);
        }
        .floating-ui-badge {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(24px); 
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5);
        }
        .btn-modern-light {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          background: linear-gradient(180deg, #10b981 0%, #059669 100%);
          color: #FFFFFF;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(5, 150, 105, 0.4), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.2);
        }
        .btn-modern-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(5, 150, 105, 0.3), 0 20px 32px -6px rgba(5, 150, 105, 0.5), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2);
        }
      `}} />

      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts & Booking Bar */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 transform-style-3d mt-[-10vh]">
        <h1 className="text-track gsap-reveal text-3d-matte text-4xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight mb-2">
          Gartenhilfe
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-4xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter mb-12">
          Auf Abruf.
        </h1>
        
        {/* The new Booking Bar replaces the old text inputs */}
        <div className="booking-bar-wrapper w-full flex justify-center mt-4">
          <BookingBar />
        </div>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-none">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-silver-matte">
          Dispatch first.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
          Der Kunde stellt die Anfrage, die Plattform verteilt sie an verfügbare Helfer. Genau wie ein On-demand-Dienst, nur für Gartenarbeit.
        </p>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Green Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. BRAND / IDENTITY */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                GreenMatch
              </h2>
            </div>

            {/* 2. CENTER PIECE: IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[320px] lg:h-[550px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.7] md:scale-[0.85] lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    {/* Mockup App Interface */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col justify-between">
                      <div className="phone-widget flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Mein Status</span>
                          <span className="text-sm font-bold text-emerald-400">Ich arbeite heute</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-xs border border-white/10">JM</div>
                      </div>

                      {/* Mockup Active Job Card */}
                      <div className="phone-widget widget-depth rounded-2xl p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">Dispatch Alert</span>
                          <span className="text-xs font-bold">15 €/h</span>
                        </div>
                        <span className="block text-xs font-bold">Rasenmähen in Bilk</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">I'm new</span>
                          <span className="text-[10px] text-neutral-400">3.2 km entfernt</span>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-85px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🌱</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Kurzzeit-Jobs</p>
                    <p className="text-emerald-200/50 text-[10px] lg:text-xs font-medium">Jugendliche & Schüler</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-85px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">🤝</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">On-demand</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Direktes Matching</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. EXPLAINER TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 tracking-tight">
                Wer wir sind & was wir tun
              </h3>
              <p className="text-emerald-100/70 text-xs sm:text-sm md:text-base font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                GreenMatch ist das erste nachbarschaftliche Netzwerk für Gartenarbeit in Deutschland. Wir bringen Gartenbesitzer mit flexiblen Helfern zusammen. Ein Request führt zur Vermittlung. Keine Liste, sondern ein direkter Dispatch-Flow.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
