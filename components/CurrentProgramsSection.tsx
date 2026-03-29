'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────
// Intersection Observer Hook
// ─────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  const [fired, setFired] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setInView(true);
          setFired(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [fired, threshold]);

  return { ref, inView };
};

// ─────────────────────────────────────────────
// Planning Steps Data
// ─────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Share Your Vision',
    desc: 'Tell us your dates, pace, and passions. Whether it’s hidden waterfalls, wildlife safaris, or ancient temples — you dream it, we listen.',
  },
  {
    num: '02',
    title: 'We Architect the Route',
    desc: 'Our local experts weave your desires into a seamless, logic-tested itinerary, complete with premium transit and exclusive boutique stays.',
  },
  {
    num: '03',
    title: 'Refine & Perfect',
    desc: 'You review the blueprint. We tweak the details, adjust the pacing, and refine the journey until it resonates perfectly with your expectations.',
  },
  {
    num: '04',
    title: 'Experience the Magic',
    desc: 'Arrive in Sri Lanka to a private premium chauffeur, 24/7 concierge support, and a journey that feels entirely yours.',
  },
];

// ─────────────────────────────────────────────
// Custom Planning Section
// ─────────────────────────────────────────────
const CustomPlanningSection: React.FC = () => {
  const headerRef = useInView(0.1);
  const visualRef = useInView(0.2);
  const listRef = useInView(0.2);

  return (
    <section
      id="custom-planning"
      className="bg-[#ffffff] relative overflow-hidden py-24 lg:py-32"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      {/* ── GIANT WATERMARK ───────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-[-2%] top-[5%] text-[clamp(100px,18vw,240px)] font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
        style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
      >
        BESPOKE
      </span>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* ── HEADER ────────────────────────────── */}
        <div 
          ref={headerRef.ref as React.RefObject<HTMLDivElement>}
          className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out ${
                headerRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-1 h-8 bg-[#5e17eb]" />
              <span
                className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Customized Tours
              </span>
            </div>

            <h2
              className={`text-[clamp(40px,5vw,72px)] font-black leading-[1.05] tracking-tight text-gray-900 transition-all duration-700 ease-out delay-100 ${
                headerRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
            >
              Unbound by Itineraries. <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Architect Your Journey.
              </span>
            </h2>
          </div>

          <div 
            className={`max-w-md transition-all duration-700 ease-out delay-200 ${
              headerRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base">
              Why settle for off-the-shelf? We blend your personal travel style with our deep local expertise to create an island expedition that is completely unique to you.
            </p>
          </div>
        </div>

        {/* ── SPLIT CONTENT (MOOD BOARD + STEPS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Premium Mood Board / Itinerary Cards */}
          <div 
            ref={visualRef.ref as React.RefObject<HTMLDivElement>}
            className="relative h-[500px] sm:h-[600px] w-full flex items-center justify-center"
          >
            {/* Background Decorative Circle */}
            <div 
              className={`absolute w-[80%] h-[80%] rounded-full bg-[#f4f4f4] transition-all duration-1000 ease-out ${
                visualRef.inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`} 
            />

            {/* Card 1: Kandy / Culture */}
            <div 
              className={`absolute z-10 w-[60%] sm:w-[50%] aspect-[4/5] bg-white p-3 pb-12 shadow-xl border border-gray-100 transform transition-all duration-1000 ease-out delay-300 hover:z-40 hover:scale-105 hover:-rotate-2 ${
                visualRef.inView ? '-translate-x-[35%] -translate-y-[10%] -rotate-6 opacity-100' : 'translate-x-0 translate-y-0 rotate-0 opacity-0'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1588614959060-4d144f28b207?w=600&q=80" alt="Temple of the Tooth" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>01. Culture</span>
                <span className="text-[10px] text-gray-400">Kandy</span>
              </div>
            </div>

            {/* Card 2: Tea Country (Top Right Overlap) */}
            <div 
              className={`absolute z-20 w-[65%] sm:w-[55%] aspect-[4/5] bg-white p-3 pb-12 shadow-2xl border border-gray-100 transform transition-all duration-1000 ease-out delay-500 hover:z-40 hover:scale-105 hover:rotate-2 ${
                visualRef.inView ? 'translate-x-[25%] -translate-y-[20%] rotate-3 opacity-100' : 'translate-x-0 translate-y-0 rotate-0 opacity-0'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=600&q=80" alt="Ella Train" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>02. Highlands</span>
                <span className="text-[10px] text-gray-400">Ella</span>
              </div>
            </div>

            {/* Card 3: Beach / Relaxation (Bottom Center) */}
            <div 
              className={`absolute z-30 w-[70%] sm:w-[60%] aspect-[16/10] bg-white p-3 pb-12 shadow-2xl border border-gray-100 transform transition-all duration-1000 ease-out delay-700 hover:z-40 hover:scale-105 hover:rotate-0 ${
                visualRef.inView ? 'translate-y-[35%] -rotate-2 opacity-100' : 'translate-y-0 rotate-0 opacity-0'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80" alt="Mirissa Beach" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>03. Serenity</span>
                <span className="text-[10px] text-gray-400">South Coast</span>
              </div>
              {/* Premium Gradient Tape / Accent */}
              <div className="absolute -top-3 left-[10%] w-16 h-6 bg-gradient-to-r from-[#5e17eb] to-[#1800ad] opacity-90 transform -rotate-3" />
            </div>
            <div 
              className={`absolute z-30 w-[70%] sm:w-[60%] aspect-[16/10] bg-white p-3 pb-12 shadow-2xl border border-gray-100 transform transition-all duration-1000 ease-out delay-700 hover:z-40 hover:scale-105 hover:rotate-0 ${
                visualRef.inView ? 'translate-y-[35%] -rotate-2 opacity-100' : 'translate-y-0 rotate-0 opacity-0'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80" alt="Mirissa Beach" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>03. Serenity</span>
                <span className="text-[10px] text-gray-400">South Coast</span>
              </div>
              {/* Premium Gradient Tape / Accent */}
              <div className="absolute -top-3 left-[10%] w-16 h-6 bg-gradient-to-r from-[#5e17eb] to-[#1800ad] opacity-90 transform -rotate-3" />
            </div>

          </div>

          {/* RIGHT: Step-by-Step Blueprint List */}
          <div 
            ref={listRef.ref as React.RefObject<HTMLDivElement>}
            className="relative pl-4 sm:pl-8"
          >
            {/* Vertical Line */}
            <div 
              className="absolute left-0 top-2 bottom-2 w-px bg-[#e8e4df]" 
            />

            <div className="space-y-12">
              {steps.map((step, idx) => (
                <div 
                  key={step.num} 
                  className={`relative group transition-all duration-700 ease-out ${
                    listRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[17px] sm:-left-[33px] top-1 w-2 h-2 rounded-full bg-[#d4cfc9] transition-all duration-300 group-hover:scale-150 group-hover:bg-[#5e17eb]" />

                  {/* Step Number Content */}
                  <div className="flex flex-col mb-2">
                    <span 
                      className="text-[clamp(32px,4vw,48px)] font-black text-[#f4f4f4] leading-none mb-1 transition-colors duration-300 group-hover:text-[#ede9ff] select-none"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {step.num}
                    </span>
                    <h3 
                      className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-[#5e17eb]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base pr-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div 
              className={`mt-14 transition-all duration-700 ease-out delay-700 ${
                listRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                type="button"
                className="group inline-flex items-center gap-4 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 shadow-xl shadow-[#5e17eb]/20 hover:shadow-[#5e17eb]/40"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
              >
                Plan Your Own Tour
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPlanningSection;