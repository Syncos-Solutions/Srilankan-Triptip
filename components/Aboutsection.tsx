'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────
// Intersection Observer Hook
// ─────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
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
// Animated Counter
// ─────────────────────────────────────────────
const Counter: React.FC<{ target: number; suffix?: string; duration?: number; inView: boolean }> = ({
  target, suffix = '', duration = 1800, inView,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const stats = [
  { value: 12, suffix: '+', label: 'Years of Excellence', desc: 'Trusted by travelers since 2012' },
  { value: 4800, suffix: '+', label: 'Happy Travelers', desc: 'From every corner of the globe' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', desc: 'Rated 5 stars consistently' },
  { value: 60, suffix: '+', label: 'Curated Routes', desc: 'Across every Sri Lankan terrain' },
];

const pillars = [
  {
    index: '01',
    title: 'Premium Taxi',
    body:
      'Seamless airport transfers, city rides and scenic drives — every route executed with punctuality, discretion and luxury-class comfort.',
    accent: '#5e17eb',
  },
  {
    index: '02',
    title: 'Signature Tours',
    body:
      'Carefully crafted itineraries spanning ancient temples, emerald highlands, sun-kissed coastlines and wildlife sanctuaries — the real Sri Lanka revealed.',
    accent: '#1800ad',
  },
  {
    index: '03',
    title: 'Bespoke Journeys',
    body:
      'You dream it, we architect it. Fully tailored travel experiences built around your pace, passions and curiosity — no two trips ever the same.',
    accent: '#5e17eb',
  },
];

// ─────────────────────────────────────────────
// About Section
// ─────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const heroRef = useInView(0.1);
  const statsRef = useInView(0.1);
  const pillarsRef = useInView(0.1);
  const missionRef = useInView(0.1);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#f4f4f4] overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
       {/* ── STATS BAND ──────────────────────────── */}
      <div
        ref={statsRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-16"
      >
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#e8e4df]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${
                statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: statsRef.inView ? `${i * 100}ms` : '0ms' }}
            >
              <div
                className="text-[clamp(40px,5vw,72px)] font-black leading-none tracking-tighter mb-2"
                style={{
                  fontFamily: "'Syne', 'DM Sans', sans-serif",
                  background: 'linear-gradient(135deg, #5e17eb 30%, #1800ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <Counter target={s.value} suffix={s.suffix} inView={statsRef.inView} />
              </div>
              <div className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">
                {s.label}
              </div>
              <div className="text-xs text-gray-400 leading-snug">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* ── HERO BAND ───────────────────────────── */}
      <div
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className="relative bg-[#e8e4df] px-6 sm:px-10 lg:px-12 pt-24 pb-0"
      >
        {/* Background giant text watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 top-4 text-[clamp(120px,18vw,220px)] font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
        >
          ABOUT
        </span>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Label */}
          <div
            className={`flex items-center gap-3 mb-10 transition-all duration-700 ease-out ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span
              className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Sri Lankan TripTip
            </span>
            <div className="h-px w-14 bg-[#5e17eb]" />
            <span className="text-xs tracking-widest text-gray-400 uppercase">Est. 2012</span>
          </div>

          {/* Main headline */}
          <h2
            id="about-heading"
            className={`text-[clamp(44px,7.5vw,112px)] font-black leading-[0.93] tracking-tighter text-gray-900 mb-0 transition-all duration-700 ease-out delay-100 ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
          >
            We Don&apos;t Just
            <br />
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Plan Trips.
            </span>
            <br />
            <span className="text-gray-900">We Craft Memories.</span>
          </h2>

          {/* Divider with scroll cue */}
          <div
            className={`mt-14 flex items-end justify-between pb-0 transition-all duration-700 ease-out delay-200 ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="max-w-lg text-base sm:text-lg text-gray-500 leading-relaxed font-light">
              Born from a love for this island&apos;s soul — SRI LANKAN TRIPTIP is your
              most trusted companion across every road, mountain pass and shoreline
              Sri Lanka has to offer.
            </p>
            {/* Vertical accent bar */}
            <div
              className="hidden lg:block w-1 self-stretch ml-8"
              style={{ background: 'linear-gradient(to bottom, #5e17eb, #1800ad)' }}
            />
          </div>
        </div>

        {/* Bottom edge connector */}
        <div className="mt-16 w-full h-px bg-[#e8e4df]" />
      </div>

     

      {/* ── STORY + IMAGE BAND ──────────────────── */}
      <div
        ref={missionRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-24 lg:py-32"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
          {/* Left — story text */}
          <div
            className={`transition-all duration-800 ease-out ${
              missionRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <span
              className="block text-[clamp(80px,12vw,160px)] font-black leading-none tracking-tighter text-[#d4cfc9] select-none pointer-events-none mb-[-10px]"
              style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
              aria-hidden="true"
            >
              WHO
            </span>

            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8"
              style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
            >
              A Team That Lives
              <br />
              and Breathes Sri Lanka
            </h3>

            <div className="space-y-5 text-gray-600 text-base lg:text-[17px] leading-relaxed font-light">
              <p>
                We are not a call-center travel agency. We are a passionate collective of
                local guides, drivers, historians and hospitality professionals — deeply
                rooted in Sri Lankan culture and geography.
              </p>
              <p>
                Every recommendation comes from personal experience. Every route has been
                walked, driven and felt — so that your journey carries the authenticity
                no algorithm can replicate.
              </p>
              <p>
                Our promise is simple: <strong className="font-semibold text-gray-900">unforgettable, trusted, human.</strong>
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                type="button"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:gap-5"
                style={{
                  background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                }}
                aria-label="Discover our full story"
              >
                Discover Our Story
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right — visual collage */}
          <div
            className={`relative h-[480px] sm:h-[560px] lg:h-[620px] transition-all duration-800 ease-out delay-200 ${
              missionRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Main large image */}
            <div className="absolute top-0 left-0 right-[15%] bottom-[20%] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80"
                alt="Sigiriya Rock Fortress, Sri Lanka — iconic ancient landmark"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              {/* Purple overlay accent */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              />
            </div>

            {/* Secondary small image */}
            <div className="absolute bottom-0 right-0 w-[48%] h-[44%] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80"
                alt="Traditional Sri Lankan stilt fishermen at sunset"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute bottom-[46%] right-[45%] px-5 py-4 z-20 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
            >
              <div
                className="text-2xl font-black text-white leading-none"
                style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
              >
                #1
              </div>
              <div className="text-[10px] tracking-[0.2em] text-white/80 uppercase mt-0.5">
                Rated Tour<br />Operator
              </div>
            </div>

            {/* Decorative dot grid */}
            <div
              aria-hidden="true"
              className="absolute top-[-20px] right-[-20px] w-24 h-24 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
                backgroundSize: '10px 10px',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── PILLARS / SERVICES BAND ─────────────── */}
      <div
        ref={pillarsRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-24 lg:py-32"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section label */}
          <div
            className={`flex items-center gap-4 mb-16 transition-all duration-700 ease-out ${
              pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="w-1 h-10 bg-[#5e17eb]" />
            <span
              className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              What We Provide
            </span>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8e4df]">
            {pillars.map((p, i) => (
              <div
                key={p.index}
                className={`group relative px-0 md:px-10 first:pl-0 last:pr-0 py-10 md:py-0 transition-all duration-700 ease-out ${
                  pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: pillarsRef.inView ? `${i * 130}ms` : '0ms' }}
              >
                {/* Index */}
                <span
                  className="block text-[clamp(48px,6vw,80px)] font-black leading-none tracking-tighter text-[#f4f4f4] select-none mb-4 transition-colors duration-300 group-hover:text-[#ede9ff]"
                  style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
                  aria-hidden="true"
                >
                  {p.index}
                </span>

                {/* Title */}
                <h3
                  className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight mb-4 transition-colors duration-300 group-hover:text-[#5e17eb]"
                  style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
                >
                  {p.title}
                </h3>

                {/* Body */}
                <p className="text-sm lg:text-base text-gray-500 leading-relaxed font-light mb-8">
                  {p.body}
                </p>

                {/* Arrow link */}
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#5e17eb] transition-all duration-300 group-hover:gap-3">
                  <span>Explore</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:bottom-auto md:top-0"
                  style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST STRIP ─────────────────────────── */}
      <div className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
            >
              Ready to Experience Sri Lanka
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                The Right Way?
              </span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
              style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
              aria-label="Start planning your Sri Lanka tour"
            >
              Start Planning
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
              aria-label="Contact Sri Lankan TripTip"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;