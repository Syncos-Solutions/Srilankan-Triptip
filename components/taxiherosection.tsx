'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ─────────────────────────────────────────────
// Intersection Observer Hook
// ─────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const [fired, setFired] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !fired) { setInView(true); setFired(true); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [fired, threshold]);
  return { ref, inView };
};

// ─────────────────────────────────────────────
// Promises data
// ─────────────────────────────────────────────
const promises = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
    label: '24/7 Available',
    sub: 'Any hour, any day',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Verified Drivers',
    sub: 'Licensed & background checked',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'No Hidden Fees',
    sub: 'Price agreed upfront',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    label: 'Host on Wheels',
    sub: 'More than just a driver',
  },
];

const vehicles = [
  { name: 'Sedan', cap: '1–3', model: 'Toyota Camry', price: 'From $45' },
  { name: 'SUV', cap: '1–6', model: 'Toyota Fortuner', price: 'From $65' },
  { name: 'Van', cap: '6–12', model: 'Toyota HiAce', price: 'From $90' },
];

// ─────────────────────────────────────────────
// Taxi Home Section
// ─────────────────────────────────────────────
const TaxiHomeSection: React.FC = () => {
  const sectionRef = useInView(0.08);
  const leftRef = useInView(0.1);
  const rightRef = useInView(0.1);
  const promisesRef = useInView(0.1);
  const [activeVehicle, setActiveVehicle] = useState(0);

  return (
    <section
      id="taxi"
      aria-labelledby="taxi-heading"
      className="bg-[#0d0d0d] overflow-hidden relative"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      {/* ── Dot grid accent ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #5e17eb 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Purple ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(94,23,235,0.14) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 py-20 lg:py-28 relative z-10">

        {/* ── TOP LABEL ROW ── */}
        <div
          ref={sectionRef.ref as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-4 mb-14 transition-all duration-700 ${sectionRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="w-1 h-10 bg-[#5e17eb]" />
          <div>
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Premium Taxi & Transfers
            </p>
            <p className="text-xs text-white/25 tracking-widest uppercase mt-0.5">
              Airport · City · Scenic · Special Occasions
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-center">

          {/* LEFT — HEADLINE + VEHICLES ── */}
          <div
            ref={leftRef.ref as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-800 ease-out ${leftRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Headline */}
            <h2
              id="taxi-heading"
              className="font-black tracking-tighter text-white leading-[0.91] mb-6"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px,5.5vw,80px)' }}
            >
              Arrive in
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Comfort.
              </span>
              <br />
              Always.
            </h2>

            <p className="text-white/45 text-base lg:text-lg font-light leading-relaxed mb-10 max-w-md">
              Every transfer begins the moment we answer. Not just a driver — a local host
              who treats your journey with the same care as the destination itself.
            </p>

            {/* Vehicle tabs */}
            <div className="flex items-center gap-0 border-b border-white/[0.07] mb-6">
              {vehicles.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setActiveVehicle(i)}
                  className="relative px-5 py-2.5 text-xs font-bold tracking-[0.22em] uppercase transition-all duration-300"
                  style={{ color: activeVehicle === i ? '#5e17eb' : 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {v.name}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                    style={{
                      width: activeVehicle === i ? '100%' : '0%',
                      background: 'linear-gradient(to right, #5e17eb, #1800ad)',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Active vehicle card */}
            <div
              key={activeVehicle}
              className="border border-white/[0.07] p-6 transition-all duration-400"
              style={{ animation: 'fadeSlideIn 0.35s ease-out' }}
            >
              <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#5e17eb] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {vehicles[activeVehicle].model}
                  </p>
                  <h3
                    className="text-2xl font-black text-white tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {vehicles[activeVehicle].name}
                  </h3>
                </div>
                <div className="text-right">
                  <p
                    className="text-xl font-black"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {vehicles[activeVehicle].price}
                  </p>
                  <p className="text-[10px] text-white/30 tracking-widest uppercase">per transfer</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5" style={{ background: '#5e17eb' }} />
                  <span className="text-xs text-white/40 font-light">
                    {vehicles[activeVehicle].cap} passengers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5" style={{ background: '#5e17eb' }} />
                  <span className="text-xs text-white/40 font-light">24/7 available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5" style={{ background: '#5e17eb' }} />
                  <span className="text-xs text-white/40 font-light">Flight tracking</span>
                </div>
              </div>
              <Link
                href="/taxi"
                className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase text-[#5e17eb] transition-all duration-300 hover:gap-4"
              >
                View Details
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/taxi#booking-form"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white overflow-hidden transition-all duration-300 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
              >
                Book a Transfer
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/taxi"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white/50 border border-white/10 transition-all duration-300 hover:border-white/25 hover:text-white"
              >
                Explore Taxi
              </Link>
            </div>
          </div>

          {/* RIGHT — IMAGE + PROMISES ── */}
          <div
            ref={rightRef.ref as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-800 ease-out delay-150 ${rightRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            {/* Cinematic image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=90"
                alt="Premium taxi transfer — Sri Lankan TripTip"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 40%', filter: 'brightness(0.78)' }}
              />
              {/* Gradient overlays */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.12) 55%, rgba(5,5,7,0.05) 100%)' }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              />

              {/* Floating quote card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="border border-white/10 bg-black/40 p-5" style={{ backdropFilter: 'blur(12px)' }}>
                  <div className="h-px w-8 mb-3" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                  <p
                    className="text-white/80 text-sm font-light leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    "Not just a driver. A host on wheels."
                  </p>
                  <p className="text-white/25 text-[9px] tracking-[0.25em] uppercase mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Sri Lankan TripTip
                  </p>
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute top-5 right-5">
                <div
                  className="px-4 py-2.5"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                >
                  <p className="text-white font-black text-base leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>4.9★</p>
                  <p className="text-white/60 text-[8px] tracking-[0.18em] uppercase mt-0.5">2,400+ rides</p>
                </div>
              </div>
            </div>

            {/* Promises strip */}
            <div
              ref={promisesRef.ref as React.RefObject<HTMLDivElement>}
              className="grid grid-cols-2 gap-px bg-white/[0.05] mt-px"
            >
              {promises.map((p, i) => (
                <div
                  key={p.label}
                  className={`group bg-[#0d0d0d] px-5 py-4 flex items-start gap-4 hover:bg-[#111] transition-colors duration-300 ${promisesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transition: `opacity 0.6s ease ${150 + i * 90}ms, transform 0.6s ease ${150 + i * 90}ms, background 0.3s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-[#5e17eb] transition-all duration-300 group-hover:text-white"
                    style={{ transition: 'background .3s, color .3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#5e17eb,#1800ad)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#5e17eb'; }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/80 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {p.label}
                    </p>
                    <p className="text-[10px] text-white/30 font-light">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TaxiHomeSection;