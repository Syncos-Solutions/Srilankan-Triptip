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
      ([entry]) => {
        if (entry.isIntersecting && !fired) { setInView(true); setFired(true); }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [fired, threshold]);
  return { ref, inView };
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface DayPlan {
  day: number;
  destination: string;
  activities: string;
  accommodation: string;
  notes: string;
}

interface FormData {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  pickup: string;
  startDate: string;
  adults: number;
  children: number;
  luggage: string;
  days: DayPlan[];
  additionalNotes: string;
}

// ─────────────────────────────────────────────
// Pillars data
// ─────────────────────────────────────────────
const pillars = [
  {
    index: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Day-by-Day Architecture',
    body: 'We build your itinerary one day at a time — with purpose. Each day is calibrated to your rhythm, not a tour operator\'s schedule.',
  },
  {
    index: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secret Sri Lanka Access',
    body: 'Pre-dawn Sigiriya. The astrologer\'s village in Kandy. The jungle pool that isn\'t on any map. We know them all — and we share them.',
  },
  {
    index: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Human at Every Step',
    body: 'Not software. Not chatbots. A real person — fluent in Sri Lanka — reviews your plan, improves it and stands behind it.',
  },
  {
    index: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="square" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Full Transparency',
    body: 'Every cost, every route, every reason — explained. No hidden charges, no vague itineraries. You see exactly what you\'re paying for.',
  },
  {
    index: '05',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Culture & Astrology',
    body: 'Rituals, temple ceremonies, auspicious timings, village astrologers — we weave the spiritual heartbeat of Sri Lanka into your journey.',
  },
  {
    index: '06',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexibility Always',
    body: 'Plans change. People do too. We accommodate on the road — same warmth, same service, zero stress about what wasn\'t in the brief.',
  },
];

// ─────────────────────────────────────────────
// Form Field Components
// ─────────────────────────────────────────────
const FormField: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, required, children, className = '' }) => (
  <div className={`relative group ${className}`}>
    <label className="block text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-2 transition-colors duration-300 group-focus-within:text-[#5e17eb]">
      {label}{required && <span className="text-[#5e17eb] ml-0.5">*</span>}
    </label>
    {children}
    <div className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 ease-out group-focus-within:w-full"
      style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
  </div>
);

const InputBase = "w-full bg-transparent border-b border-gray-200 py-2.5 text-gray-900 text-sm font-light placeholder-gray-300 focus:outline-none focus:border-transparent transition-all";
const SelectBase = "w-full bg-transparent border-b border-gray-200 py-2.5 text-gray-900 text-sm font-light focus:outline-none focus:border-transparent transition-all appearance-none cursor-pointer";

// ─────────────────────────────────────────────
// Day Planner Card
// ─────────────────────────────────────────────
const DayCard: React.FC<{
  day: DayPlan;
  index: number;
  onUpdate: (index: number, field: keyof DayPlan, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}> = ({ day, index, onUpdate, onRemove, canRemove }) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className="border border-[#e8e4df] bg-[#fafafa] transition-all duration-300"
      style={{ borderLeft: expanded ? '3px solid #5e17eb' : '3px solid transparent' }}
    >
      {/* Day header */}
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-5">
          <div
            className="w-10 h-10 flex items-center justify-center text-sm font-black text-white flex-shrink-0 transition-all duration-300"
            style={{ background: expanded ? 'linear-gradient(135deg, #5e17eb, #1800ad)' : '#e8e4df' }}
          >
            <span style={{ color: expanded ? '#fff' : '#888', fontFamily: "'Syne', sans-serif" }}>
              {String(day.day).padStart(2, '0')}
            </span>
          </div>
          <div>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300"
              style={{
                color: expanded ? '#5e17eb' : '#aaa',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Day {day.day}
            </p>
            <p
              className="text-sm font-bold text-gray-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {day.destination || 'Destination not set'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {canRemove && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(index); }}
              className="text-gray-300 hover:text-red-400 transition-colors duration-200 p-1"
              aria-label={`Remove day ${day.day}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          <svg
            className="w-4 h-4 text-gray-400 transition-transform duration-300"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Day fields */}
      {expanded && (
        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#e8e4df]" style={{ paddingTop: '20px' }}>
          <FormField label="Destination / Location" required>
            <input
              type="text"
              className={InputBase}
              placeholder="e.g. Sigiriya, Kandy, Ella…"
              value={day.destination}
              onChange={(e) => onUpdate(index, 'destination', e.target.value)}
            />
          </FormField>
          <FormField label="Accommodation Preference">
            <input
              type="text"
              className={InputBase}
              placeholder="e.g. Boutique hotel, Homestay, Luxury resort…"
              value={day.accommodation}
              onChange={(e) => onUpdate(index, 'accommodation', e.target.value)}
            />
          </FormField>
          <FormField label="Activities & Experiences" className="sm:col-span-2">
            <input
              type="text"
              className={InputBase}
              placeholder="e.g. Sunrise hike, Temple visit, Cooking class, Whale watching…"
              value={day.activities}
              onChange={(e) => onUpdate(index, 'activities', e.target.value)}
            />
          </FormField>
          <FormField label="Day Notes" className="sm:col-span-2">
            <textarea
              className={`${InputBase} resize-none`}
              rows={2}
              placeholder="Special requests, pace preferences, dietary needs for this day…"
              value={day.notes}
              onChange={(e) => onUpdate(index, 'notes', e.target.value)}
            />
          </FormField>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const CustomPlanningPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const heroRef = useInView(0.1);
  const pillarsRef = useInView(0.08);
  const processRef = useInView(0.08);
  const formRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  const [formData, setFormData] = useState<FormData>({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: '',
    pickup: '',
    startDate: '',
    adults: 1,
    children: 0,
    luggage: '',
    days: [{ day: 1, destination: '', activities: '', accommodation: '', notes: '' }],
    additionalNotes: '',
  });

  const addDay = () => {
    if (formData.days.length >= 30) return;
    setFormData(prev => ({
      ...prev,
      days: [...prev.days, {
        day: prev.days.length + 1,
        destination: '',
        activities: '',
        accommodation: '',
        notes: '',
      }],
    }));
  };

  const removeDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, day: i + 1 })),
    }));
  };

  const updateDay = (index: number, field: keyof DayPlan, value: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map((d, i) => i === index ? { ...d, [field]: value } : d),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 2000);
  };

  return (
    <>
      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <main
        className="bg-[#f4f4f4] overflow-hidden"
        style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
      >
        {/* ── HERO BAND ─────────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-20 pt-32 pb-0 overflow-hidden"
        >
          {/* Giant watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-2 font-black leading-none tracking-tighter text-[#f4f4f4]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,14vw,190px)' }}
          >
            BESPOKE
          </span>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            {/* Label */}
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sri Lankan TripTip
              </span>
              <div className="h-px w-12 bg-[#5e17eb]" />
              <span className="text-xs tracking-widest text-gray-400 uppercase">Custom Planning</span>
            </div>

            {/* Main headline */}
            <h1
              className={`font-black tracking-tighter text-gray-900 leading-[0.91] mb-0 transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(44px,7.5vw,112px)' }}
            >
              Your Sri Lanka.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Architected.
              </span>
            </h1>

            {/* Sub grid */}
            <div className={`mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 pb-20 transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
                You tell us your passions — ruins, reefs, rice fields, rituals, or all of the above.
                We build the exact journey around them. Day by day. Detail by detail.
                No templates. No compromises.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { stat: '100%', text: 'Custom — built around you, not a template' },
                  { stat: '30+', text: 'Day itineraries crafted for demanding travellers' },
                  { stat: '12+', text: 'Years mapping every secret corner of Sri Lanka' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div
                      className="text-xl font-black flex-shrink-0 w-14"
                      style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {item.stat}
                    </div>
                    <div className="h-px flex-1 bg-[#e8e4df]" />
                    <p className="text-xs text-gray-500 font-light max-w-[200px] text-right">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#e8e4df]" />
        </div>

        {/* ── HERO IMAGE STRIP ──────────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative overflow-hidden" style={{ height: 'clamp(260px, 38vw, 480px)' }}>
              <img
                src="../blogimg/sigiriya.avif"
                alt="Sri Lanka bespoke journey"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 35%' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
              <div className="absolute inset-0 opacity-15" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
              {/* Left side quote */}
              <div className="absolute left-8 sm:left-12 lg:left-16 top-1/2 -translate-y-1/2 max-w-xs">
                <div className="h-px w-10 mb-5" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                <p className="text-white font-black leading-tight tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(18px, 2.5vw, 30px)' }}>
                  "We don't do tours.<br />We do stories."
                </p>
                <p className="text-white/50 text-xs mt-3 tracking-widest uppercase">— Sri Lankan TripTip</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── WHY BESPOKE — PILLARS ─────────── */}
        <div
          ref={pillarsRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Label */}
            <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why Bespoke</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">What makes us different</p>
              </div>
            </div>

            {/* 3×2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e8e4df]">
              {pillars.map((p, i) => (
                <div
                  key={p.index}
                  className={`group relative p-8 lg:p-10 border-r border-b border-[#e8e4df] last:border-r-0 [&:nth-child(3)]:border-r-0 [&:nth-child(4)]:border-b-0 [&:nth-child(5)]:border-b-0 [&:nth-child(6)]:border-b-0 hover:bg-[#fafafa] transition-all duration-400 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: pillarsRef.inView ? `${i * 80}ms` : '0ms' }}
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6 text-[#5e17eb] transition-all duration-300 group-hover:text-white"
                    style={{ background: 'transparent', border: '1px solid #e8e4df', transition: 'background .3s, border-color .3s, color .3s' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #5e17eb, #1800ad)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.borderColor = '#e8e4df';
                    }}
                  >
                    {p.icon}
                  </div>

                  {/* Index */}
                  <span
                    className="block text-[52px] font-black leading-none tracking-tighter text-[#f0eeec] mb-3 select-none group-hover:text-[#ede9ff] transition-colors duration-300"
                    aria-hidden="true"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {p.index}
                  </span>

                  <h3
                    className="text-lg font-black text-gray-900 tracking-tight mb-3 transition-colors duration-300 group-hover:text-[#5e17eb]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ──────────────────── */}
        <div
          ref={processRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Label */}
            <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${processRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Process
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {[
                { step: '01', title: 'Submit Your Vision', body: 'Fill in the planning form below. Be as detailed or as brief as you like — we work with both.' },
                { step: '02', title: 'We Review & Refine', body: 'Within 24 hours, a real travel architect reviews your submission and reaches out with questions and ideas.' },
                { step: '03', title: 'We Build Your Journey', body: 'We craft a full day-by-day itinerary — with hidden gems, cultural depth and zero filler days.' },
                { step: '04', title: 'You Arrive & Explore', body: 'We\'re on the ground with you throughout. Any change, any question, any moment — we\'re there.' },
              ].map((s, i) => (
                <div
                  key={s.step}
                  className={`relative p-8 lg:p-10 border-r border-[#e8e4df] last:border-r-0 transition-all duration-700 ${processRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: processRef.inView ? `${i * 100}ms` : '0ms' }}
                >
                  {/* Step number */}
                  <div
                    className="text-[64px] font-black leading-none tracking-tighter text-[#f4f4f4] mb-4 select-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {s.step}
                  </div>
                  {/* Connector line */}
                  {i < 3 && (
                    <div
                      className="hidden md:block absolute right-0 top-12 w-px h-6"
                      style={{ background: 'linear-gradient(to bottom, #5e17eb, #1800ad)' }}
                    />
                  )}
                  <h3 className="text-lg font-black text-gray-900 tracking-tight mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PLANNING FORM ─────────────────── */}
        <div
          ref={formRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className={`mb-16 transition-all duration-700 ${formRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-10 bg-[#5e17eb]" />
                <div>
                  <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Begin Your Journey
                  </p>
                  <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">Planning Request</p>
                </div>
              </div>
              <h2
                className="text-[clamp(32px,5vw,68px)] font-black tracking-tighter text-gray-900 leading-[0.93]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Architect Your
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Perfect Journey.
                </span>
              </h2>
            </div>

            {/* Form card */}
            {formStatus === 'success' ? (
              <div
                className="bg-[#ffffff] p-12 lg:p-16 flex flex-col items-center justify-center text-center"
                style={{ minHeight: '400px' }}
              >
                <div
                  className="w-20 h-20 flex items-center justify-center mb-8"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="h-px w-12 mb-8" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                <h3
                  className="text-3xl font-black text-gray-900 tracking-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Your Journey Begins.
                </h3>
                <p className="text-gray-500 font-light text-base max-w-md leading-relaxed mb-10">
                  We've received your planning request. One of our travel architects will reach out within 24 hours to begin crafting your experience.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="text-xs font-bold tracking-[0.25em] uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bg-[#ffffff] relative" style={{ borderTop: '3px solid transparent', backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #5e17eb, #1800ad)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
                  {/* Top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />

                  <div className="p-8 sm:p-12 lg:p-16 space-y-14">

                    {/* ── SECTION 1: Personal Details ── */}
                    <div>
                      <div className="flex items-center gap-4 mb-10">
                        <div
                          className="w-8 h-8 flex items-center justify-center text-white text-xs font-black"
                          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'Syne', sans-serif" }}
                        >
                          1
                        </div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                          Your Details
                        </h3>
                        <div className="flex-1 h-px bg-[#e8e4df]" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
                        {/* Salutation */}
                        <div className="sm:col-span-2">
                          <FormField label="Salutation" required>
                            <div className="relative">
                              <select
                                className={SelectBase}
                                value={formData.salutation}
                                onChange={(e) => setFormData(p => ({ ...p, salutation: e.target.value }))}
                                required
                              >
                                <option value="" disabled>—</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                                <option>Dr.</option>
                                <option>Prof.</option>
                              </select>
                              <div className="absolute right-0 top-2.5 pointer-events-none text-gray-400">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                              </div>
                            </div>
                          </FormField>
                        </div>
                        {/* First name */}
                        <div className="sm:col-span-5">
                          <FormField label="First Name" required>
                            <input type="text" className={InputBase} placeholder="Your first name" required
                              value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))} />
                          </FormField>
                        </div>
                        {/* Last name */}
                        <div className="sm:col-span-5">
                          <FormField label="Last Name" required>
                            <input type="text" className={InputBase} placeholder="Your last name" required
                              value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))} />
                          </FormField>
                        </div>
                        {/* Email */}
                        <div className="sm:col-span-6">
                          <FormField label="Email Address" required>
                            <input type="email" className={InputBase} placeholder="your@email.com" required
                              value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} />
                          </FormField>
                        </div>
                        {/* Phone */}
                        <div className="sm:col-span-6">
                          <FormField label="Phone / WhatsApp" required>
                            <input type="tel" className={InputBase} placeholder="+1 234 567 890" required
                              value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} />
                          </FormField>
                        </div>
                        {/* Contact method */}
                        <div className="sm:col-span-4">
                          <FormField label="Preferred Contact Method" required>
                            <div className="relative">
                              <select
                                className={SelectBase}
                                value={formData.contactMethod}
                                onChange={(e) => setFormData(p => ({ ...p, contactMethod: e.target.value }))}
                                required
                              >
                                <option value="" disabled>Select method</option>
                                <option value="email">Email</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="other">Other</option>
                              </select>
                              <div className="absolute right-0 top-2.5 pointer-events-none text-gray-400">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                              </div>
                            </div>
                          </FormField>
                        </div>
                        {/* Pickup */}
                        <div className="sm:col-span-4">
                          <FormField label="Pickup Location" required>
                            <input type="text" className={InputBase} placeholder="e.g. Colombo Airport, Negombo Hotel…" required
                              value={formData.pickup} onChange={(e) => setFormData(p => ({ ...p, pickup: e.target.value }))} />
                          </FormField>
                        </div>
                        {/* Start date */}
                        <div className="sm:col-span-4">
                          <FormField label="Preferred Start Date">
                            <input type="date" className={InputBase}
                              value={formData.startDate} onChange={(e) => setFormData(p => ({ ...p, startDate: e.target.value }))} />
                          </FormField>
                        </div>
                      </div>
                    </div>

                    {/* ── SECTION 2: Group & Luggage ── */}
                    <div>
                      <div className="flex items-center gap-4 mb-10">
                        <div
                          className="w-8 h-8 flex items-center justify-center text-white text-xs font-black"
                          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'Syne', sans-serif" }}
                        >
                          2
                        </div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                          Group & Luggage
                        </h3>
                        <div className="flex-1 h-px bg-[#e8e4df]" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {/* Adults */}
                        <div>
                          <label className="block text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-4">
                            Adults<span className="text-[#5e17eb] ml-0.5">*</span>
                          </label>
                          <div className="flex items-center gap-0 border-b border-gray-200 pb-2">
                            <button
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                              className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all duration-200"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M20 12H4" /></svg>
                            </button>
                            <span className="w-14 text-center text-lg font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                              {formData.adults}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, adults: p.adults + 1 }))}
                              className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all duration-200"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M12 4v16m8-8H4" /></svg>
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-2">Minimum 1 adult</p>
                        </div>

                        {/* Children */}
                        <div>
                          <label className="block text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-4">
                            Children
                          </label>
                          <div className="flex items-center gap-0 border-b border-gray-200 pb-2">
                            <button
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                              className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all duration-200"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M20 12H4" /></svg>
                            </button>
                            <span className="w-14 text-center text-lg font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                              {formData.children}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, children: p.children + 1 }))}
                              className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all duration-200"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M12 4v16m8-8H4" /></svg>
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-2">Under 12 years</p>
                        </div>

                        {/* Luggage */}
                        <div className="relative group">
                          <FormField label="Luggage Type">
                            <div className="relative">
                              <select
                                className={SelectBase}
                                value={formData.luggage}
                                onChange={(e) => setFormData(p => ({ ...p, luggage: e.target.value }))}
                              >
                                <option value="" disabled>Select type</option>
                                <option value="light">Light — backpacks only</option>
                                <option value="standard">Standard — checked luggage</option>
                                <option value="heavy">Heavy — multiple large bags</option>
                                <option value="special">Special equipment (diving, etc.)</option>
                              </select>
                              <div className="absolute right-0 top-2.5 pointer-events-none text-gray-400">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                              </div>
                            </div>
                          </FormField>
                        </div>
                      </div>
                    </div>

                    {/* ── SECTION 3: Day-by-Day Itinerary ── */}
                    <div>
                      <div className="flex items-center gap-4 mb-10">
                        <div
                          className="w-8 h-8 flex items-center justify-center text-white text-xs font-black"
                          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'Syne', sans-serif" }}
                        >
                          3
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Day-by-Day Itinerary
                          </h3>
                          <p className="text-xs text-gray-400 font-light mt-0.5">
                            Build your journey one day at a time — up to 30 days
                          </p>
                        </div>
                        <div className="flex-1 h-px bg-[#e8e4df]" />
                        <span
                          className="text-xs font-bold tracking-widest uppercase flex-shrink-0"
                          style={{
                            color: formData.days.length >= 30 ? '#e8e4df' : '#5e17eb',
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {formData.days.length} / 30 days
                        </span>
                      </div>

                      {/* Tip banner */}
                      <div className="flex items-start gap-4 p-5 bg-[#f8f6ff] border border-[#e8e4df] mb-8">
                        <div className="w-5 h-5 flex-shrink-0 text-[#5e17eb] mt-0.5">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                          Fill as many or as few days as you know. Our travel architects will fill the gaps
                          with secret places and authentic experiences you wouldn't find yourself — including
                          hidden villages, astrologer visits, private temple ceremonies and more.
                        </p>
                      </div>

                      {/* Day cards */}
                      <div className="space-y-3">
                        {formData.days.map((day, index) => (
                          <DayCard
                            key={day.day}
                            day={day}
                            index={index}
                            onUpdate={updateDay}
                            onRemove={removeDay}
                            canRemove={formData.days.length > 1}
                          />
                        ))}
                      </div>

                      {/* Add day button */}
                      {formData.days.length < 30 && (
                        <button
                          type="button"
                          onClick={addDay}
                          className="mt-4 w-full flex items-center justify-center gap-3 py-4 border border-dashed border-gray-300 text-gray-500 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:bg-[#f8f6ff]"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="square" d="M12 4v16m8-8H4" />
                          </svg>
                          Add Day {formData.days.length + 1}
                        </button>
                      )}
                    </div>

                    {/* ── SECTION 4: Additional Notes ── */}
                    <div>
                      <div className="flex items-center gap-4 mb-10">
                        <div
                          className="w-8 h-8 flex items-center justify-center text-white text-xs font-black"
                          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'Syne', sans-serif" }}
                        >
                          4
                        </div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                          Final Notes
                        </h3>
                        <div className="flex-1 h-px bg-[#e8e4df]" />
                      </div>

                      <FormField label="Additional Notes & Special Requests">
                        <textarea
                          className={`${InputBase} resize-none`}
                          rows={5}
                          placeholder="Dietary requirements, physical limitations, specific interests (ancient history, wildlife photography, ayurveda, surfing), budget range, special occasions, anything else that would help us build your perfect journey…"
                          value={formData.additionalNotes}
                          onChange={(e) => setFormData(p => ({ ...p, additionalNotes: e.target.value }))}
                        />
                      </FormField>
                    </div>

                    {/* ── SUBMIT ── */}
                    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#e8e4df]">
                      <div className="max-w-md">
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          By submitting this form you agree to be contacted by Sri Lankan TripTip.
                          Your information is kept strictly private and never shared with third parties.
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 overflow-hidden disabled:opacity-70 flex-shrink-0"
                      >
                        <div
                          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
                        />
                        <span className="relative z-10 flex items-center gap-3">
                          {formStatus === 'submitting' ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Submitting…
                            </>
                          ) : (
                            <>
                              Submit Planning Request
                              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── TRUST CLOSING STRIP ───────────── */}
        

      </main>

      <Footer />
    </>
  );
};

export default CustomPlanningPage;