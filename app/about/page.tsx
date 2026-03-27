// app/about/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ============================================================================
// INTERSECTION OBSERVER HOOK
// ============================================================================
const useInView = (threshold = 0.1) => {
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

// ============================================================================
// ANIMATED COUNTER
// ============================================================================
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

// ============================================================================
// DATA
// ============================================================================
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
    body: 'Seamless airport transfers, city rides and scenic drives — every route executed with punctuality, discretion and luxury-class comfort.',
    href: '/taxi',
  },
  {
    index: '02',
    title: 'Signature Tours',
    body: 'Carefully crafted itineraries spanning ancient temples, emerald highlands, sun-kissed coastlines and wildlife sanctuaries — the real Sri Lanka revealed.',
    href: '/tours',
  },
  {
    index: '03',
    title: 'Bespoke Journeys',
    body: 'You dream it, we architect it. Fully tailored travel experiences built around your pace, passions and curiosity — no two trips ever the same.',
    href: '/custom-planning',
  },
];

const teamValues = [
  {
    num: '01',
    title: 'Deeply Local',
    body: 'Every guide, driver and planner is Sri Lankan by birth and by heart. We do not hire people who know the island — we work with people who love it.',
  },
  {
    num: '02',
    title: 'Radically Transparent',
    body: 'Fixed pricing. No hidden costs. No commission-based recommendations. We tell you exactly what you\'re getting and what you\'re paying before you commit.',
  },
  {
    num: '03',
    title: 'Obsessively Attentive',
    body: 'We track flights, monitor weather, and anticipate problems before they arise. You will never be left wondering — we contact you before you need to ask.',
  },
  {
    num: '04',
    title: 'Human First',
    body: 'Every interaction is personal. A real person answers our line at 3am. Your journey matters to us individually — not just as a booking reference.',
  },
];

const milestones = [
  { year: '2012', event: 'Founded in Colombo with 3 vehicles and a single promise: no compromise on quality.' },
  { year: '2015', event: 'Expanded to full island coverage. Launched the first bespoke private tour program.' },
  { year: '2018', event: 'Reached 1,000 five-star reviews across Google and TripAdvisor simultaneously.' },
  { year: '2021', event: 'Rebuilt and relaunched through the pandemic with an upgraded fleet and enhanced hygiene standards.' },
  { year: '2023', event: 'Named among Sri Lanka\'s top boutique travel operators by international travel press.' },
  { year: '2024', event: '4,800+ verified journeys completed. Still personally overseen by our founding team.' },
];

// ============================================================================
// BOOKING FORM
// ============================================================================
const BookingForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1600);
  };

  if (status === 'success') {
    return (
      <div className="min-h-[380px] flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}>
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          Request Received
        </h4>
        <p className="text-gray-500 font-light text-sm max-w-xs leading-relaxed">
          One of our travel architects will be in touch within 2 hours.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-8 text-xs font-bold tracking-widest uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors">
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Salutation + Name */}
      <div className="grid grid-cols-[120px_1fr] gap-6">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Salutation</label>
          <select required defaultValue="" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm">
            <option value="" disabled>—</option>
            <option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Dr.</option><option>Prof.</option>
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Full Name</label>
          <input type="text" required placeholder="Your full name" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Email Address</label>
          <input type="email" required placeholder="your@email.com" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Phone / WhatsApp</label>
          <input type="tel" required placeholder="+1 000 000 0000" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Contact Method */}
      <div className="relative group">
        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">Preferred Contact Method</label>
        <div className="flex gap-0 border border-gray-200">
          {['Email', 'WhatsApp', 'Other'].map((method) => (
            <label key={method} className="flex-1 relative cursor-pointer">
              <input type="radio" name="contactMethod" value={method.toLowerCase()} className="peer sr-only" defaultChecked={method === 'Email'} />
              <span className="block text-center py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 border-r border-gray-200 last:border-r-0 transition-all duration-300 peer-checked:text-white peer-checked:bg-gradient-to-r peer-checked:from-[#5e17eb] peer-checked:to-[#1800ad]">
                {method}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Pickup + Destination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Pickup Location</label>
          <input type="text" required placeholder="Address or landmark" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Destination / Arrive</label>
          <input type="text" required placeholder="Address or landmark" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Travel Date</label>
          <input type="date" required className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Pickup Time</label>
          <input type="time" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light text-sm" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Adults + Children + Luggage */}
      <div className="grid grid-cols-3 gap-6">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Adults</label>
          <select required defaultValue="1" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm">
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Children</label>
          <select defaultValue="0" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm">
            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Luggage</label>
          <select defaultValue="1" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm">
            <option value="0">None</option>
            <option value="1">1 bag</option>
            <option value="2">2 bags</option>
            <option value="3">3 bags</option>
            <option value="4+">4+ bags</option>
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="relative group">
        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">Additional Notes</label>
        <textarea rows={3} placeholder="Special requirements, preferences, or anything you'd like us to know..." className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light resize-none text-sm" />
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button type="submit" disabled={status === 'submitting'} className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 overflow-hidden disabled:opacity-70">
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }} />
          <span className="relative z-10 flex items-center gap-3">
            {status === 'submitting' ? 'Sending...' : 'Plan My Journey'}
            {status !== 'submitting' && (
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </span>
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-4 tracking-wide">Response within 2 hours · No payment required</p>
      </div>
    </form>
  );
};

// ============================================================================
// MAIN ABOUT PAGE
// ============================================================================
const AboutPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroRef      = useInView(0.08);
  const statsRef     = useInView(0.1);
  const storyRef     = useInView(0.08);
  const valuesRef    = useInView(0.08);
  const timelineRef  = useInView(0.08);
  const pillarsRef   = useInView(0.08);
  const teamRef      = useInView(0.08);
  const bookingRef   = useInView(0.05);
  const closingRef   = useInView(0.1);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <main className="bg-[#f4f4f4] overflow-hidden" style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>
      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* ================================================================ */}
      {/* HERO — Cinematic, editorial, immersive                           */}
      {/* ================================================================ */}
      <div
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className="relative bg-[#050507] overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="../blogimg/sigiriya.avif"
            alt="Sigiriya Rock Fortress at sunrise — Sri Lanka"
            className={`w-full h-full object-cover transition-transform duration-[3500ms] ease-out ${heroRef.inView ? 'scale-100' : 'scale-108'}`}
            style={{ objectPosition: 'center 35%' }}
          />
          {/* Multi-layer atmosphere */}
          
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.2) 60%, transparent 100%)' }} />
          
        </div>

        {/* Dot texture */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[45%] h-full opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '26px 26px' }} />

        {/* Content */}
        <div className="relative z-10 max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-end min-h-screen pt-44 pb-20 lg:pt-52 lg:pb-28">

          {/* Label row */}
          <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="w-2 h-2 rounded-full bg-[#5e17eb] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our Story
            </span>
            <div className="h-px w-10 bg-white/20" />
            <span className="text-xs tracking-widest text-white/40 uppercase">Est. 2012 · Colombo</span>
          </div>

          {/* Headline */}
          <div className="max-w-5xl">
            <h1
              className={`font-black leading-[0.91] tracking-tighter text-white mb-8 transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(52px, 8vw, 124px)' }}
            >
              We Don&apos;t Just
              <br />
              <span style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Plan Trips.
              </span>
              <br />
              We Craft Memories.
            </h1>

            <div className={`flex flex-col lg:flex-row lg:items-end gap-8 transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="text-white/60 font-light leading-relaxed max-w-xl" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                Born from a love for this island's soul — Sri Lankan TripTip is your most trusted
                companion across every road, mountain pass and shoreline Sri Lanka has to offer.
                Since 2012, relentlessly human.
              </p>
              <div className="flex gap-4 lg:ml-auto flex-shrink-0">
                <Link href="/tours" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:gap-5"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}>
                  Explore Tours
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom stats strip */}
          <div className={`mt-20 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 transition-all duration-700 delay-300 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {[
              { val: '2012', label: 'Founded' },
              { val: '4,800+', label: 'Travelers' },
              { val: '98%', label: 'Satisfaction' },
              { val: '#1', label: 'Rated' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-black text-white leading-none mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{s.val}</div>
                <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* STATS BAND                                                        */}
      {/* ================================================================ */}
      <div ref={statsRef.ref as React.RefObject<HTMLDivElement>} className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-16">
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#e8e4df]">
          {stats.map((s, i) => (
            <div key={s.label}
              className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-[clamp(40px,5vw,72px)] font-black leading-none tracking-tighter mb-2"
                style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #5e17eb 30%, #1800ad 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                <Counter target={s.value} suffix={s.suffix} inView={statsRef.inView} />
              </div>
              <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">{s.label}</div>
              <div className="text-[11px] text-gray-400 leading-snug">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* OUR STORY — editorial two-column split                           */}
      {/* ================================================================ */}
      <div ref={storyRef.ref as React.RefObject<HTMLDivElement>} className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-24 lg:py-36 relative overflow-hidden">
        {/* Watermark */}
        <span aria-hidden="true" className="pointer-events-none select-none absolute left-[-2%] top-[5%] font-black leading-none text-[#d4cfc9] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(100px,16vw,220px)' }}>
          WHO
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-center">

          {/* Left — story text */}
          <div className={`transition-all duration-800 ease-out ${storyRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sri Lankan TripTip
              </span>
              <div className="h-px w-10 bg-[#5e17eb]/40" />
              <span className="text-xs text-gray-400 tracking-widest uppercase">Est. 2012</span>
            </div>

            <h2 className="text-[clamp(36px,5vw,72px)] font-black text-gray-900 tracking-tight leading-[1.0] mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              A Team That Lives
              <br />& Breathes Sri Lanka
            </h2>

            <div className="space-y-5 text-gray-600 text-base lg:text-[17px] leading-relaxed font-light mb-10">
              <p>
                We are not a call-centre travel agency. We are a passionate collective of
                local guides, drivers, historians and hospitality professionals — deeply
                rooted in Sri Lankan culture and geography.
              </p>
              <p>
                Every recommendation comes from personal experience. Every route has been
                walked, driven and felt — so that your journey carries the authenticity
                no algorithm can replicate.
              </p>
              <p>
                Our promise is simple:{' '}
                <strong className="font-semibold text-gray-900">unforgettable, trusted, human.</strong>
              </p>
            </div>

            <Link href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}>
              Discover Our Story
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right — visual collage */}
          <div className={`relative h-[500px] sm:h-[580px] lg:h-[640px] transition-all duration-800 ease-out delay-200 ${storyRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main image */}
            <div className="absolute top-0 left-0 right-[14%] bottom-[18%] overflow-hidden">
              <img src="../blogimg/sigiriya.avif"
                alt="Sigiriya Rock Fortress at sunrise"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 right-0 w-[46%] h-[42%] overflow-hidden">
              <img src="../blogimg/sigiriya.avif"
                alt="Tea country highlands Sri Lanka"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            {/* Badge */}
            <div className="absolute bottom-[44%] right-[43%] px-5 py-4 z-20 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}>
              <div className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>#1</div>
              <div className="text-[10px] tracking-[0.2em] text-white/80 uppercase mt-0.5">Rated Tour<br />Operator</div>
            </div>
            {/* Dot grid */}
            <div aria-hidden="true" className="absolute top-[-20px] right-[-20px] w-24 h-24 opacity-25"
              style={{ backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }} />
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* CORE VALUES — 4 pillars on dark                                  */}
      {/* ================================================================ */}
      <div ref={valuesRef.ref as React.RefObject<HTMLDivElement>} className="bg-[#050507] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] blur-[200px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #5e17eb, transparent 70%)' }} />
        {/* Dot texture */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[40%] h-full opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Header */}
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 transition-all duration-700 ${valuesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  What We Stand For
                </span>
              </div>
              <h2 className="text-[clamp(36px,5vw,72px)] font-black text-white tracking-tight leading-[0.95]"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                The Values Behind
                <br />
                <span style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Every Journey.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-white/50 font-light leading-relaxed text-sm lg:text-base lg:pb-2">
              These are not mission-statement words. They are the principles
              we hold ourselves to every single day.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
            {teamValues.map((v, i) => (
              <div key={v.num}
                className={`group relative p-8 lg:p-10 border-r border-b border-white/10 last:border-r-0 md:even:border-r-0 lg:border-b-0 lg:even:border-r lg:[&:nth-child(4)]:border-r-0 transition-all duration-700 hover:bg-white/[0.03] ${valuesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                {/* Number */}
                <span className="block text-[clamp(44px,5vw,72px)] font-black leading-none tracking-tighter text-white/[0.07] select-none mb-5 transition-colors duration-300 group-hover:text-white/[0.12]"
                  style={{ fontFamily: "'Syne', sans-serif" }} aria-hidden="true">
                  {v.num}
                </span>
                <h3 className="text-lg lg:text-xl font-black text-white tracking-tight mb-4 transition-colors duration-300 group-hover:text-[#7c3aed]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TIMELINE — history of the company                                */}
      {/* ================================================================ */}
      <div ref={timelineRef.ref as React.RefObject<HTMLDivElement>} className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        <span aria-hidden="true" className="pointer-events-none select-none absolute right-[-1%] top-8 font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(90px,14vw,180px)' }}>
          JOURNEY
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${timelineRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-1 h-10 bg-[#5e17eb]" />
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our History
            </span>
          </div>

          <h2 className={`text-[clamp(32px,4.5vw,60px)] font-black text-gray-900 tracking-tight leading-tight mb-16 transition-all duration-700 delay-100 ${timelineRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Twelve Years of
            <br />
            <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Earning Trust.
            </span>
          </h2>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] lg:left-[88px] top-0 bottom-0 w-px bg-[#e8e4df]" />

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year}
                  className={`relative flex items-start gap-8 lg:gap-12 group py-8 border-b border-[#e8e4df] last:border-0 transition-all duration-700 ease-out ${timelineRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  {/* Year */}
                  <div className="flex-shrink-0 w-[72px] lg:w-[88px]">
                    <span className="text-sm font-black tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: i === milestones.length - 1 ? '#5e17eb' : '#999' }}>
                      {m.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-[68px] lg:left-[84px] top-[38px] w-2 h-2 transition-all duration-300 group-hover:scale-150"
                    style={{ background: i === milestones.length - 1 ? '#5e17eb' : '#d4cfc9' }} />
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p className="text-base text-gray-600 font-light leading-relaxed transition-colors duration-300 group-hover:text-gray-900">
                      {m.event}
                    </p>
                  </div>
                  {/* Hover line accent */}
                  <div className="absolute left-[72px] lg:left-[88px] top-0 h-0 w-[2px] transition-all duration-500 group-hover:h-full"
                    style={{ background: 'linear-gradient(to bottom, #5e17eb, #1800ad)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SERVICES PILLARS                                                 */}
      {/* ================================================================ */}
      <div ref={pillarsRef.ref as React.RefObject<HTMLDivElement>} className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        <span aria-hidden="true" className="pointer-events-none select-none absolute left-[-2%] top-[5%] font-black leading-none text-[#e8e4df] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(100px,16vw,210px)' }}>
          SERVICES
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-1 h-10 bg-[#5e17eb]" />
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              What We Provide
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8e4df]">
            {pillars.map((p, i) => (
              <div key={p.index}
                className={`group relative px-0 md:px-10 first:pl-0 last:pr-0 py-10 md:py-0 transition-all duration-700 ease-out ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 130}ms` }}>
                <span className="block text-[clamp(48px,6vw,80px)] font-black leading-none tracking-tighter text-[#e8e4df] select-none mb-4 transition-colors duration-300 group-hover:text-[#ede9ff]"
                  style={{ fontFamily: "'Syne', sans-serif" }} aria-hidden="true">
                  {p.index}
                </span>
                <h3 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight mb-4 transition-colors duration-300 group-hover:text-[#5e17eb]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {p.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-500 leading-relaxed font-light mb-8">{p.body}</p>
                <Link href={p.href} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#5e17eb] transition-all duration-300 group-hover:gap-3">
                  <span>Explore</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full md:bottom-auto md:top-0"
                  style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TEAM PHOTO BAND — atmosphere + promise                           */}
      {/* ================================================================ */}
      <div ref={teamRef.ref as React.RefObject<HTMLDivElement>} className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">

          {/* Left — image with overlapping elements */}
          <div className={`relative order-2 lg:order-1 transition-all duration-800 ease-out ${teamRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85"
                alt="Misty mountains of Sri Lanka"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105" />
              <div className="absolute inset-0 opacity-15" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
            </div>

            {/* Floating review card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-8 bg-white p-6 shadow-2xl max-w-[220px] z-10">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-3 h-3 text-[#5e17eb]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-light italic">
                &ldquo;Nothing compared to what TripTip orchestrated for us.&rdquo;
              </p>
              <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-widest uppercase">James W. · UK</p>
            </div>

            {/* Dot grid */}
            <div aria-hidden="true" className="absolute top-[-16px] left-[-16px] w-20 h-20 opacity-25"
              style={{ backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }} />
          </div>

          {/* Right — manifesto text */}
          <div className={`order-1 lg:order-2 transition-all duration-800 ease-out delay-200 ${teamRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-8 bg-[#5e17eb]" />
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Our Promise
              </span>
            </div>

            <h2 className="text-[clamp(32px,4.5vw,60px)] font-black text-gray-900 tracking-tight leading-tight mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              The Island,
              <br />
              <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Authentically Yours.
              </span>
            </h2>

            <div className="space-y-5 text-gray-600 text-base leading-relaxed font-light mb-10">
              <p>
                We built Sri Lankan TripTip because we believed travelers deserved better than
                generic tours and unreliable transfers. We believed the real Sri Lanka — its
                people, its landscapes, its quiet corners — could be shared with integrity.
              </p>
              <p>
                Twelve years later, that belief has taken 4,800 people to places they could
                not have reached alone. We have not stopped being surprised by how much this
                island has left to reveal.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#ccc9c4]">
              {[
                { label: 'Google Rating', val: '4.9 ★' },
                { label: 'TripAdvisor', val: 'Certificate of Excellence' },
                { label: 'Response Time', val: '< 2 Hours' },
              ].map((t) => (
                <div key={t.label}>
                  <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">{t.label}</div>
                  <div className="text-sm font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{t.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* BOOKING SECTION                                                  */}
      {/* ================================================================ */}
      <div id="booking" ref={bookingRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        <span aria-hidden="true" className="pointer-events-none select-none absolute right-0 top-10 font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,160px)' }}>
          PLAN
        </span>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">

            {/* Left */}
            <div className={`transition-all duration-700 ${bookingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Start Your Journey
                </span>
              </div>

              <h2 className="text-[clamp(32px,4.5vw,58px)] font-black text-gray-900 tracking-tight leading-tight mb-8"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Ready to Experience
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Sri Lanka Our Way?
                </span>
              </h2>

              <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-sm text-sm lg:text-base">
                Whether it's a simple taxi transfer or a 21-day bespoke journey — fill in
                your details and our team responds within 2 hours with a tailored plan.
              </p>

              {/* Contact methods */}
              <div className="space-y-8">
                {[
                  { label: 'Call / WhatsApp', val: '+94 77 123 4567', sub: 'Available 24/7' },
                  { label: 'Email', val: 'journeys@triptip.lk', sub: 'For bespoke inquiries' },
                  { label: 'Location', val: 'Colombo 03, Sri Lanka', sub: '145 Galle Road' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#f4f4f4] text-[#1800ad] transition-all duration-300 group-hover:bg-[#5e17eb] group-hover:text-white text-xs font-bold flex-shrink-0">
                      {idx === 0 ? '📞' : idx === 1 ? '✉️' : '📍'}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 block mb-1">{item.label}</span>
                      <p className="text-base font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{item.val}</p>
                      <p className="text-xs text-gray-400 font-light">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-[#e8e4df] grid grid-cols-3 gap-4">
                {['No Upfront Payment', 'Fixed Pricing', 'Instant Confirm'].map((b) => (
                  <div key={b} className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}>✓</div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className={`bg-[#f9f9f9] p-8 sm:p-12 relative transition-all duration-700 delay-300 ${bookingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
              <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Plan Your Journey
              </h3>
              <p className="text-sm text-gray-400 mb-10 font-light">We reply within 2 hours.</p>
              <BookingForm />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* CLOSING CTA                                                      */}
      {/* ================================================================ */}
      <div ref={closingRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-20 lg:py-24 overflow-hidden relative">
        <span aria-hidden="true" className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none text-[#d4cfc9] tracking-tighter"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,12vw,160px)', letterSpacing: '-6px' }}>
          TRUST
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div>
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="h-px w-8 bg-[#5e17eb]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">
                Ready to Join 4,800+ Travelers?
              </span>
            </div>
            <h3 className={`font-black text-gray-900 tracking-tighter leading-[0.95] transition-all duration-700 delay-100 ${closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px,4.5vw,58px)' }}>
              Your Sri Lankan Story
              <br />
              <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Is Waiting to Be Written.
              </span>
            </h3>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a href="#booking"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
              style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}>
              Start Planning
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default AboutPage;