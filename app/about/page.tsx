'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─────────────────────────────────────────────
// Intersection Observer Hook
// ─────────────────────────────────────────────
const useInView = (threshold = 0.08) => {
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
// Animated Counter
// ─────────────────────────────────────────────
const Counter: React.FC<{ target: number; suffix?: string; inView: boolean }> = ({
  target, suffix = '', inView,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (1800 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count.toLocaleString()}{suffix}</>;
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const stats = [
  { value: 5, suffix: '+', label: 'Years of Excellence', desc: 'Crafting journeys since 2020' },
  { value: 500, suffix: '+', label: 'Happy Travelers', desc: 'From every corner of the globe' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', desc: 'Consistently rated 5 stars' },
  { value: 20, suffix: '+', label: 'Curated Routes', desc: 'Across every Sri Lankan terrain' },
];

const team = [
  {
    name: 'Rohan Perera',
    role: 'Lead Cultural Guide',
    since: '2020',
    location: 'Dambulla',
    bio: 'Born in the shadow of Sigiriya, Rohan has guided over 200 guests through Sri Lanka\'s cultural heartland. He knows the mirror wall like a poet knows his verses.',
    expertise: ['Cultural Heritage', 'Ancient History', 'Photography'],
    avatar: 'RP',
  },
  {
    name: 'Amara Silva',
    role: 'Adventure Specialist',
    since: '2021',
    location: 'Ella',
    bio: 'Raised in the hill country, Amara has trekked every trail in the Knuckles range. Her routes take guests to places no guidebook has ever mapped.',
    expertise: ['Trekking', 'Wildlife', 'Highland Culture'],
    avatar: 'AS',
  },
  {
    name: 'Nilan Fernando',
    role: 'Coastal & Food Expert',
    since: '2021',
    location: 'Galle',
    bio: 'A third-generation fisherman\'s son who turned his intimate knowledge of Sri Lanka\'s southern coast into extraordinary guest experiences.',
    expertise: ['Coastal Routes', 'Street Food', 'Marine Life'],
    avatar: 'NF',
  },
  {
    name: 'Sithara Jayawardena',
    role: 'Astrology & Ceremony',
    since: '2022',
    location: 'Kandy',
    bio: 'Sithara bridges the ancient and the contemporary — organising private astrologer consultations, temple ceremonies and cultural rituals unavailable anywhere else.',
    expertise: ['Astrology', 'Temple Ceremonies', 'Cultural Rituals'],
    avatar: 'SJ',
  },
];

const values = [
  {
    index: '01',
    title: 'Uncompromising Authenticity',
    body: 'We never curate a version of Sri Lanka designed to impress. We show you the one that actually exists — raw, layered, and completely unrepeatable.',
  },
  {
    index: '02',
    title: 'Human Connection First',
    body: 'Every guide, every driver, every recommendation comes from a person who genuinely cares — not an algorithm, not a call centre, not a template.',
  },
  {
    index: '03',
    title: 'Radical Flexibility',
    body: 'Your itinerary is a starting point, never a contract. If you want to stay longer at the ruins, we stay. If you want to skip the waterfall, we skip it. No questions asked.',
  },
  {
    index: '04',
    title: 'The Secret Layer',
    body: 'We have spent 5 years collecting the addresses, the contacts and the timings that sit beneath the surface of every destination. These belong to our guests.',
  },
];

// ─────────────────────────────────────────────
// Timeline — 2020 to 2026
// ─────────────────────────────────────────────
const timeline = [
  {
    year: '2020',
    badge: 'Origin',
    title: 'Founded in Colombo',
    body: 'Two passionate local guides, one vehicle, and an unshakeable conviction — Sri Lanka deserves a travel experience far beyond the generic. Sri Lankan TripTip was born.',
  },
  {
    year: '2021',
    badge: 'Growth',
    title: 'First International Guests',
    body: 'Despite global travel uncertainty, our first international travellers arrived from Europe and Australia — and left with stories they still share today. Trust was earned, not assumed.',
  },
  {
    year: '2022',
    badge: 'Expansion',
    title: 'Bespoke Planning Launched',
    body: 'Launched our fully custom itinerary division — responding to guests who needed more depth, more access, and more personalisation than any fixed package could ever deliver.',
  },
  {
    year: '2023',
    badge: 'Milestone',
    title: 'Fleet & Team Expansion',
    body: 'Added premium air-conditioned vehicles, specialist guides for wildlife, culture and coastal routes, and a dedicated 24/7 emergency guest support line across the island.',
  },
  {
    year: '2024',
    badge: 'Milestone',
    title: 'First 500 Guests',
    body: 'Five hundred journeys. Five hundred sets of memories shaped. The moment we understood that every booking is a life chapter someone is trusting us to write.',
  },
  {
    year: '2025–26',
    badge: 'Now',
    title: 'Taxi Division & Beyond',
    body: 'Formalised our island-wide taxi and transfer service — airport arrivals, intercity routes, multi-day chauffeur hire — because seamless arrival is as important as the journey itself.',
  },
];

// ─────────────────────────────────────────────
// Team Card — equal fixed height via flex-col
// ─────────────────────────────────────────────
const TeamCard: React.FC<{ member: typeof team[0]; index: number; inView: boolean }> = ({
  member, index, inView
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    /*
     * ROOT: h-full + flex flex-col
     * ─────────────────────────────
     * The CSS grid sets every cell to the same row height.
     * h-full makes this div fill that cell, and flex-col lets
     * us distribute the three interior blocks intentionally:
     *   1. Avatar / name / role  →  fixed, never grows
     *   2. Bio paragraph         →  flex-1, absorbs leftover space
     *   3. Divider + tags        →  fixed, always pinned to the bottom
     * This guarantees every card is the same height and all
     * "expertise tags" rows are perfectly bottom-aligned.
     */
    <div
      className="group relative bg-[#ffffff] h-full flex flex-col transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line — slides in on hover */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out"
        style={{
          background: 'linear-gradient(to right, #5e17eb, #1800ad)',
          width: hovered ? '100%' : '0%',
        }}
      />

      {/* ── Block 1: Avatar + name + role (fixed height) ── */}
      <div className="p-8 lg:p-10 pb-6">
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 flex items-center justify-center text-white text-base font-black flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'Syne', sans-serif" }}
          >
            {member.avatar}
          </div>
          <div>
            <h3
              className="text-lg font-black text-gray-900 tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#5e17eb]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {member.name}
            </h3>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#5e17eb] mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {member.role}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {member.location} · Since {member.since}
            </p>
          </div>
        </div>
      </div>

      {/* ── Block 2: Bio (flex-1 — grows to fill all remaining space) ── */}
      <div className="flex-1 px-8 lg:px-10">
        <p className="text-sm text-gray-500 leading-relaxed font-light">
          {member.bio}
        </p>
      </div>

      {/* ── Block 3: Divider + tags (fixed, pinned to bottom) ── */}
      <div className="px-8 lg:px-10 pb-8 lg:pb-10 pt-6">
        <div
          className="h-px mb-5 transition-all duration-500"
          style={{
            background: 'linear-gradient(to right, #5e17eb, #1800ad)',
            width: hovered ? '48px' : '24px',
          }}
        />
        <div className="flex flex-wrap gap-1.5">
          {member.expertise.map((e, i) => (
            <span
              key={i}
              className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 bg-[#f4f4f4] text-gray-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main About Page
// ─────────────────────────────────────────────
const AboutPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroRef      = useInView(0.1);
  const statsRef     = useInView(0.1);
  const storyRef     = useInView(0.08);
  const valuesRef    = useInView(0.08);
  const teamRef      = useInView(0.08);
  const timelineRef  = useInView(0.06);
  const srilankaRef  = useInView(0.08);
  const ctaRef       = useInView(0.1);

  return (
    <>
      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <main className="bg-[#f4f4f4] overflow-hidden" style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>

        {/* ── HERO BAND ─────────────────────────────────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-20 pt-32 pb-0 overflow-hidden"
        >
          {/* Watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-0 font-black leading-none tracking-tighter text-[#f4f4f4]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(90px,14vw,200px)' }}
          >
            ABOUT
          </span>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            {/* Label */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span
                className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Sri Lankan TripTip
              </span>
              <div className="h-px w-12 bg-[#5e17eb]" />
              <span className="text-xs tracking-widest text-gray-400 uppercase">Est. 2020</span>
            </div>

            {/* Headline */}
            <h1
              className={`font-black tracking-tighter text-gray-900 leading-[0.91] mb-0 transition-all duration-700 delay-100 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(44px,7.5vw,112px)' }}
            >
              We Don&apos;t Just
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Plan Trips.
              </span>
              <br />
              We Craft Memories.
            </h1>

            {/* Sub copy */}
            <div
              className={`mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 pb-20 transition-all duration-700 delay-200 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-base sm:text-xl text-gray-500 leading-relaxed font-light max-w-xl">
                Born from a love for this island&apos;s soul — Sri Lankan TripTip is your most trusted
                companion across every road, mountain pass and shoreline Sri Lanka has to offer.
              </p>
              <div className="flex flex-col justify-end gap-0 lg:pl-8 border-l-0 lg:border-l border-[#e8e4df]">
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  We are not a call-centre agency. We are a collective of local guides, historians,
                  drivers and hospitality professionals — deeply rooted in Sri Lankan culture,
                  geography and tradition.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#e8e4df]" />
        </div>

        {/* ── CINEMATIC IMAGE BAND ──────────────────────────────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 52vw, 640px)' }}>
              <img
                src="/TT1.jpg"
                alt="Sigiriya Rock Fortress — the heart of Sri Lanka"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)' }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              />

              {/* Floating stat */}
              <div
                className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              >
                <div className="px-6 py-5">
                  <div className="text-3xl font-black text-white leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>#1</div>
                  <div className="text-[10px] tracking-[0.2em] text-white/75 uppercase mt-1">
                    Rated Tour<br />Operator
                  </div>
                </div>
              </div>

              {/* Rotating seal */}
              <div className="absolute bottom-6 left-8 lg:bottom-10 lg:left-12 w-24 h-24 bg-white flex items-center justify-center">
                <div className="w-full h-full relative" style={{ animation: 'spin 15s linear infinite' }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="cp" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                    </defs>
                    <text style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', fontFamily: "'DM Sans',sans-serif" }}>
                      <textPath href="#cp" startOffset="0%">• TRUSTED JOURNEYS • PREMIUM TOURS</textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute w-2 h-2" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
              </div>

              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

              {/* Bottom caption */}
              {/* <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 lg:pb-12 lg:px-16 max-w-lg">
                <div className="h-px w-10 mb-4" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                <p className="text-white/45 text-[10px] tracking-[0.3em] uppercase mb-1">Sigiriya, Sri Lanka</p>
                <p className="text-white/75 text-sm font-light">5:30am — before the world arrives.</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* ── STATS BAND ────────────────────────────────────────────── */}
        <div
          ref={statsRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-16"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#e8e4df]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${
                  statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: statsRef.inView ? `${i * 90}ms` : '0ms' }}
              >
                <div
                  className="font-black leading-none tracking-tighter mb-2"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(36px,5vw,64px)',
                    background: 'linear-gradient(135deg, #5e17eb 30%, #1800ad 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <Counter target={s.value} suffix={s.suffix} inView={statsRef.inView} />
                </div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">{s.label}</div>
                <div className="text-[11px] text-gray-400 leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── OUR STORY BAND ────────────────────────────────────────── */}
        <div
          ref={storyRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#e8e4df] px-6 sm:px-10 lg:px-20 py-24 lg:py-32"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-28 items-center">

            {/* Left — text */}
            <div
              className={`transition-all duration-700 ease-out ${
                storyRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <span
                className="block text-[clamp(72px,11vw,130px)] font-black leading-none tracking-tighter text-[#d4cfc9] select-none mb-[-8px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
                aria-hidden="true"
              >
                WHO
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                A Team That Lives
                <br />and Breathes Sri Lanka
              </h2>

              <div className="space-y-5 text-gray-600 text-base lg:text-[17px] leading-relaxed font-light">
                <p>
                  We are not a call-centre travel agency. We are a passionate collective of local
                  guides, drivers, historians and hospitality professionals — deeply rooted in
                  Sri Lankan culture and geography.
                </p>
                <p>
                  Every recommendation comes from personal experience. Every route has been walked,
                  driven and felt — so that your journey carries the authenticity no algorithm can replicate.
                </p>
                <p>
                  Our promise is simple:{' '}
                  <strong className="font-semibold text-gray-900">unforgettable, trusted, human.</strong>
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/tours"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:gap-5"
                  style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
                >
                  Explore Our Tours
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right — visual collage */}
            <div
              className={`relative h-[480px] sm:h-[560px] lg:h-[600px] transition-all duration-700 ease-out delay-200 ${
                storyRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              {/* Main large image */}
              <div className="absolute top-0 left-0 right-[16%] bottom-[22%] overflow-hidden">
                <img
                  src="/TT8.jpg"
                  alt="Tea plantations in the Sri Lanka highlands"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                />
              </div>

              {/* Secondary image */}
              <div className="absolute bottom-0 right-0 w-[46%] h-[42%] overflow-hidden">
                <img
                  src="/TT9.jpg"
                  alt="Ancient Sri Lanka temple ceremony"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              {/* Dot grid accent */}
              <div
                aria-hidden="true"
                className="absolute -top-5 -right-5 w-20 h-20 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
                  backgroundSize: '9px 9px',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── OUR VALUES ────────────────────────────────────────────── */}
        <div
          ref={valuesRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-24 lg:py-32"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Label */}
            <div
              className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
                valuesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <p
                  className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Our Values
                </p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">What we stand for</p>
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e8e4df]">
              {values.map((v, i) => (
                <div
                  key={v.index}
                  className={`group relative p-8 lg:p-12 border-r border-b border-[#e8e4df] [&:nth-child(2n)]:border-r-0 [&:nth-child(n+3)]:border-b-0 hover:bg-[#fafafa] transition-all duration-300 ${
                    valuesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: valuesRef.inView ? `${i * 90}ms` : '0ms' }}
                >
                  {/* Top accent on hover */}
                  <div
                    className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                  />

                  {/* Ghost index */}
                  <span
                    className="block text-[60px] font-black leading-none tracking-tighter text-[#f0eeec] select-none mb-4 transition-colors duration-300 group-hover:text-[#ede9ff]"
                    aria-hidden="true"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {v.index}
                  </span>

                  <h3
                    className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight mb-4 transition-colors duration-300 group-hover:text-[#5e17eb]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-500 leading-relaxed font-light">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SRI LANKA EXPERTISE BAND ──────────────────────────────── */}
        <div
          ref={srilankaRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#0d0d0d] px-6 sm:px-10 lg:px-20 py-24 lg:py-32 overflow-hidden relative"
        >
          {/* Dot grid bg */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
              backgroundSize: '12px 12px',
            }}
          />

          <div className="max-w-[1400px] mx-auto">
            {/* Label */}
            <div
              className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
                srilankaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <p
                  className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Our Mastery
                </p>
                <p className="text-xs text-white/30 tracking-widest uppercase mt-0.5">
                  What we know better than anyone
                </p>
              </div>
            </div>

            {/* Headline */}
            <h2
              className={`text-[clamp(36px,6vw,88px)] font-black text-white tracking-tighter leading-[0.91] mb-16 transition-all duration-700 delay-100 ${
                srilankaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Mastered in Every Corner
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                of the Island.
              </span>
            </h2>

            {/* Expertise columns */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/[0.07] transition-all duration-700 delay-200 ${
                srilankaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {[
                {
                  category: 'Culture & Heritage',
                  items: [
                    'Sigiriya pre-dawn access',
                    'Polonnaruwa archaeological routes',
                    'Dambulla cave murals at golden hour',
                    'Temple of the Tooth ceremony access',
                    'Anuradhapura ancient city deep dives',
                    'Village astrologer consultations',
                  ],
                },
                {
                  category: 'Nature & Wildlife',
                  items: [
                    'Yala leopard tracking — every season',
                    'Minneriya elephant gathering timings',
                    'Mirissa blue whale departure schedules',
                    'Knuckles range unmapped trails',
                    "Horton Plains' World's End at dawn",
                    'Bundala flamingo migration windows',
                  ],
                },
                {
                  category: 'Food, People & Ritual',
                  items: [
                    'Colombo street food — every cart',
                    'Nuwara Eliya plantation family stays',
                    'Jaffna Tamil cultural immersion',
                    'Galle Fort colonial living history',
                    'Ayurvedic village healing ceremonies',
                    'Coastal stilt fishing communities',
                  ],
                },
              ].map((col) => (
                <div key={col.category} className="px-0 md:px-10 first:pl-0 last:pr-0 py-8 md:py-0">
                  <p
                    className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb] mb-5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {col.category}
                  </p>
                  <ul className="space-y-3">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div
                          className="w-px h-3 flex-shrink-0 mt-2"
                          style={{ background: 'linear-gradient(to bottom, #5e17eb, #1800ad)' }}
                        />
                        <span className="text-sm text-white/55 font-light leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TEAM BAND ─────────────────────────────────────────────── */}
        <div
          ref={teamRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-20 py-24 lg:py-32"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Label */}
            <div
              className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
                teamRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <p
                  className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  The People
                </p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">Who make it possible</p>
              </div>
            </div>

            {/* Section heading */}
            <div
              className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 transition-all duration-700 delay-100 ${
                teamRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h2
                className="text-[clamp(32px,5vw,68px)] font-black text-gray-900 tracking-tighter leading-[0.93]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Real People,
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Real Expertise.
                </span>
              </h2>
              <p className="max-w-sm text-base text-gray-500 font-light leading-relaxed lg:pb-2">
                Every guide on our team was born in or deeply connected to the region they lead.
                No hired hands. Only people who have lived the stories they tell.
              </p>
            </div>

            {/*
             * TEAM GRID
             * ──────────────────────────────────────────────────────
             * gap-px + bg-[#e8e4df] creates the 1px separator lines
             * between cards without borders.
             *
             * TeamCard is rendered as a DIRECT grid child (no wrapper
             * div). The card itself carries h-full + flex flex-col so
             * the CSS grid stretches every card to the tallest row
             * height automatically — giving all four cards identical
             * dimensions regardless of content length.
             */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e4df]">
              {team.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} inView={teamRef.inView} />
              ))}
            </div>
          </div>
        </div>

        {/* ── TIMELINE BAND ─────────────────────────────────────────── */}
        <div
          ref={timelineRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-24 lg:py-32"
        >
          <div className="max-w-[1400px] mx-auto">

            {/* Label + heading row */}
            <div
              className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 transition-all duration-700 ${
                timelineRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-10 bg-[#5e17eb]" />
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Our Journey
                    </p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">
                      Five years of building trust
                    </p>
                  </div>
                </div>
                <h2
                  className="text-[clamp(32px,5vw,72px)] font-black text-gray-900 tracking-tighter leading-[0.93]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  How We Got Here,
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Step by Step.
                  </span>
                </h2>
              </div>
              <p className="max-w-xs text-sm text-gray-400 font-light leading-relaxed lg:pb-2">
                From a single vehicle in Colombo to an island-wide operation trusted
                by guests on every continent — 2020 to today.
              </p>
            </div>

            {/*
             * TIMELINE GRID
             * ──────────────────────────────────────────────────────
             * 3-column grid. gap-px + bg-[#e8e4df] gives 1px dividers.
             * Each cell is self-contained: year → badge label →
             * accent line → title → body. "Now" badge is pinned
             * top-right on the last card only.
             */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#e8e4df]">
              {timeline.map((item, i) => {
                const isLast = i === timeline.length - 1;
                return (
                  <div
                    key={item.year}
                    className={`group relative bg-[#ffffff] p-8 lg:p-10 transition-all duration-500 hover:bg-[#fdfcff] ${
                      timelineRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: timelineRef.inView ? `${i * 80}ms` : '0ms' }}
                  >
                    {/* Top accent — slides in on hover */}
                    <div
                      className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                    />

                    {/* "Now" badge pinned top-right for latest entry */}
                    {isLast && (
                      <div
                        className="absolute top-4 right-4 px-2.5 py-1 text-[9px] font-bold tracking-[0.2em] uppercase text-white"
                        style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                      >
                        {item.badge}
                      </div>
                    )}

                    {/* Year */}
                    <div
                      className="text-[clamp(40px,4vw,56px)] font-black leading-none tracking-tighter mb-1"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        background: 'linear-gradient(135deg, #5e17eb 30%, #1800ad 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {item.year}
                    </div>

                    {/* Badge label (below year, except last which is top-right) */}
                    {!isLast ? (
                      <p
                        className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-300 mb-5"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.badge}
                      </p>
                    ) : (
                      <div className="mb-5" />
                    )}

                    {/* Accent line — static base + hover expand layered */}
                    <div className="relative mb-5 h-px">
                      <div
                        className="absolute inset-0 w-5"
                        style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                      />
                      <div
                        className="absolute inset-0 w-0 group-hover:w-12 transition-all duration-500 ease-out"
                        style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                      />
                    </div>

                    <h4
                      className="text-lg font-black text-gray-900 tracking-tight mb-3 group-hover:text-[#5e17eb] transition-colors duration-300"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom connector bar */}
            <div
              className={`mt-px flex items-center justify-between bg-[#f4f4f4] px-10 py-5 transition-all duration-700 delay-500 ${
                timelineRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                <span className="text-xs text-gray-400 tracking-widest uppercase font-light">
                  Est. 2020 — Colombo, Sri Lanka
                </span>
              </div>
              <span
                className="text-xs font-bold tracking-[0.25em] uppercase text-[#5e17eb]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                The story continues.
              </span>
            </div>

          </div>
        </div>

        {/* ── CTA CLOSING BAND ──────────────────────────────────────── */}
        <div
          ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#e8e4df] px-6 sm:px-10 lg:px-20 py-24 lg:py-32 overflow-hidden relative"
        >
          {/* Ghost text */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none text-[#d4cfc9] tracking-tighter"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,160px)' }}
          >
            BEGIN
          </span>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center relative z-10">

            {/* Left */}
            <div>
              <div
                className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="h-px w-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">
                  Ready to Experience Sri Lanka?
                </span>
              </div>

              <h2
                className={`font-black text-gray-900 tracking-tighter leading-[0.95] mb-8 transition-all duration-700 delay-100 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 4.5vw, 60px)' }}
              >
                Every great story
                <br />starts with a simple
                <br />
                <span className="italic font-light text-gray-500">hello.</span>
              </h2>

              <p
                className={`text-gray-500 font-light leading-relaxed text-base lg:text-lg mb-10 max-w-md transition-all duration-700 delay-200 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                We don&apos;t just map out routes — we curate the moments that turn into lifelong memories.
                Your quiet sunrise over the Indian Ocean is waiting.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
                  style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
                >
                  Get In Touch
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
                >
                  Explore Tours
                </Link>
              </div>
            </div>

            {/* Right — museum-style image crop */}
            <div
              className={`relative transition-all duration-700 ease-out delay-200 ${
                ctaRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              {/* Offset frame */}
              <div className="absolute -inset-4 border border-[#e8e4df] hidden sm:block" />

              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/TT3.jpg"
                  alt="Serene Sri Lankan coastline at dusk"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#5e17eb]/5 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Brand signature */}
              <div
                className={`absolute -bottom-6 -left-6 z-10 flex items-center gap-3 bg-white px-5 py-4 border border-[#e8e4df] transition-all duration-700 delay-400 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div
                  className="w-10 h-10 flex items-center rounded-full justify-center flex-shrink-0"
                  style={{ background: '#f4f4f4' }}
                >
                  <img src="/SLtriptipLogo.svg" alt="Sri Lankan TripTip logo" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">Sri Lankan TripTip</p>
                  <p className="text-[10px] text-gray-400 font-light">The Island&apos;s Finest Curators</p>
                </div>
              </div>

              {/* Dot accent */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 w-16 h-16 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
                  backgroundSize: '9px 9px',
                }}
              />
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default AboutPage;