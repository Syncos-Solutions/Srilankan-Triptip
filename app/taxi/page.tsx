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
// Form Field
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
// Data
// ─────────────────────────────────────────────
const vehicleFleet = [
  {
    id: 'v1',
    name: 'Executive Sedan',
    model: 'Toyota Camry / Honda Accord',
    capacity: '1–3 Passengers',
    luggage: 'Up to 2 Large Bags',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=85',
    features: ['Leather seating', 'Climate control', 'USB charging', 'Bottled water'],
    badge: 'Most Booked',
    priceFrom: 'From $45',
  },
  {
    id: 'v2',
    name: 'Premium SUV',
    model: 'Toyota Fortuner / Mitsubishi Montero',
    capacity: '1–6 Passengers',
    luggage: 'Up to 4 Large Bags',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85',
    features: ['High ground clearance', 'Extra luggage space', 'Wi-Fi on request', 'Child seats'],
    badge: 'Family Choice',
    priceFrom: 'From $65',
  },
  {
    id: 'v3',
    name: 'Luxury Van',
    model: 'Toyota HiAce / KIA Carnival',
    capacity: '6–12 Passengers',
    luggage: 'Up to 8 Large Bags',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=85',
    features: ['Reclining seats', 'Panoramic windows', 'Entertainment system', 'Refrigerator on board'],
    badge: 'Group Special',
    priceFrom: 'From $90',
  },
];

const vehicleConditions = [
  {
    id: 'c1',
    category: 'Tyre Quality',
    headline: 'Road-Ready. Always.',
    body: 'Every vehicle in our fleet undergoes tyre inspection before each journey. We use premium-grade all-season tyres — checked for tread depth, inflation pressure and sidewall integrity. No exceptions.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path strokeLinecap="square" d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
        <path strokeLinecap="square" d="M12 6v2M12 16v2M6 12H4M20 12h-2" />
      </svg>
    ),
    stats: [
      { label: 'Tread Depth Check', value: 'Every Trip' },
      { label: 'Tyre Brand', value: 'Michelin / Bridgestone' },
      { label: 'Pressure Test', value: 'Pre-Departure' },
    ],
  },
  {
    id: 'c2',
    category: 'Service Record',
    headline: 'Maintained Like New.',
    body: 'We follow a strict 5,000 km service schedule for all vehicles — engine oil, filters, brake pads, coolant and full diagnostic checks. Every service is logged and available on request. You ride in a vehicle that is maintained, not just cleaned.',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900&q=85',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="square" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    stats: [
      { label: 'Service Interval', value: 'Every 5,000 km' },
      { label: 'Brake Check', value: 'Bi-Monthly' },
      { label: 'Full Diagnostic', value: 'Quarterly' },
    ],
  },
  {
    id: 'c3',
    category: 'Interior Quality',
    headline: 'Clean. Calm. Comfortable.',
    body: 'Every vehicle is deep-cleaned and sanitised before each booking. Leather or premium fabric seats, odour-free interiors, charged USB ports, chilled bottled water and a curated playlist — because the journey should feel as good as the destination.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    stats: [
      { label: 'Deep Clean', value: 'Before Each Trip' },
      { label: 'Air Quality', value: 'HEPA Filtered' },
      { label: 'Sanitised', value: 'Hospital Grade' },
    ],
  },
];

const serviceTypes = [
  {
    icon: '✈',
    title: 'Airport Transfers',
    body: 'Punctual, professional pickup and drop-off. Flight tracking included — we wait if your plane is delayed.',
    badge: '24/7 Service',
  },
  {
    icon: '🏙',
    title: 'City Transfers',
    body: 'Colombo, Kandy, Galle, Negombo — any city, any time. Our drivers know every route and every shortcut.',
    badge: null,
  },
  {
    icon: '🗺',
    title: 'Scenic Drives',
    body: 'Let your driver become your local guide. Request stops, detours and hidden viewpoints along the way.',
    badge: 'Popular',
  },
  {
    icon: '🌙',
    title: 'Night Transfers',
    body: 'Safe, reliable travel after dark. Fully lit, fully tracked, fully trustworthy — no matter what time you land.',
    badge: null,
  },
  {
    icon: '📅',
    title: 'Full-Day Hire',
    body: 'Book your driver for the entire day. Explore at your own pace — they wait, they advise, they take you further.',
    badge: null,
  },
  {
    icon: '👰',
    title: 'Special Occasions',
    body: 'Weddings, anniversaries, VIP events. Decorated vehicles, suited drivers and white-glove service throughout.',
    badge: 'Premium',
  },
];

const trustPillars = [
  { value: '24/7', label: 'Always Available', sub: 'Round the clock, every day of the year' },
  { value: '100%', label: 'Verified Drivers', sub: 'Licensed, background-checked, trained' },
  { value: '4.9★', label: 'Average Rating', sub: 'Across 2,400+ completed rides' },
  { value: '0', label: 'Hidden Charges', sub: 'Price agreed upfront, always honoured' },
];

// ─────────────────────────────────────────────
// Main Taxi Page
// ─────────────────────────────────────────────
const TaxiPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [activeVehicle, setActiveVehicle] = useState(0);

  const heroRef = useInView(0.1);
  const trustRef = useInView(0.1);
  const serviceRef = useInView(0.08);
  const fleetRef = useInView(0.08);
  const conditionsRef = useInView(0.08);
  const formRef = useInView(0.06);
  const ctaRef = useInView(0.1);

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

      <main className="bg-[#f4f4f4] overflow-hidden" style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>

        {/* ── HERO BAND ─────────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-20 pt-32 pb-0 overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-0 font-black leading-none tracking-tighter text-[#f4f4f4]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,180px)' }}
          >
            TRANSFER
          </span>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sri Lankan TripTip
              </span>
              <div className="h-px w-12 bg-[#5e17eb]" />
              <span className="text-xs tracking-widest text-gray-400 uppercase">Premium Taxi & Transfers</span>
            </div>

            <h1
              className={`font-black tracking-tighter text-gray-900 leading-[0.91] mb-6 transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(44px,7.5vw,112px)' }}
            >
              Arrive in
              <br />
              <span style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Comfort. Always.
              </span>
            </h1>

            <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 pb-20 transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light max-w-lg">
                From Bandaranaike to your beach villa. From Kandy to the hill-country tea estate.
                Every transfer in a clean, maintained vehicle with a driver who knows this island
                — and treats you like the guest of honour.
              </p>
              <div className="flex flex-col gap-5">
                {trustPillars.slice(0, 3).map((p, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div
                      className="text-xl font-black w-14 flex-shrink-0"
                      style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {p.value}
                    </div>
                    <div className="h-px flex-1 bg-[#e8e4df]" />
                    <p className="text-xs text-gray-500 font-light text-right w-40 flex-shrink-0">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-[#e8e4df]" />
        </div>

        {/* ── HERO CINEMATIC IMAGE ──────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 42vw, 560px)' }}>
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1800&q=90"
                alt="Premium taxi transfer Sri Lanka"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 40%' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)' }} />
              <div className="absolute inset-0 opacity-15" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
              <div className="absolute left-8 sm:left-14 top-1/2 -translate-y-1/2 max-w-sm">
                <div className="h-px w-10 mb-6" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                <p className="font-black text-white leading-[1.05] tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(18px, 2.5vw, 30px)' }}>
                  "Not just a driver.
                  <br />A host on wheels."
                </p>
                <p className="text-white/45 text-xs mt-4 tracking-widest uppercase">— Sri Lankan TripTip</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST METRICS STRIP ──────────── */}
        <div
          ref={trustRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-10 border-y border-[#e8e4df]"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e8e4df]">
            {trustPillars.map((p, i) => (
              <div
                key={p.label}
                className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${trustRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: trustRef.inView ? `${i * 80}ms` : '0ms' }}
              >
                <div
                  className="font-black leading-none tracking-tighter mb-2"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px,3.5vw,48px)', background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {p.value}
                </div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">{p.label}</div>
                <div className="text-[11px] text-gray-400">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>

         {/* ── BOOKING FORM ──────────────────── */}
        <div
          ref={formRef.ref as React.RefObject<HTMLDivElement>}
          id="booking-form"
          className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className={`mb-16 transition-all duration-700 ${formRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-10 bg-[#5e17eb]" />
                <div>
                  <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Book Your Transfer
                  </p>
                  <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">Instant confirmation</p>
                </div>
              </div>
              <h2
                className="text-[clamp(32px,5vw,68px)] font-black tracking-tighter text-gray-900 leading-[0.93]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Reserve Your
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Ride Today.
                </span>
              </h2>
            </div>

            {/* Split layout: form + contact info */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24">

              {/* Form */}
              <div
                className={`bg-[#ffffff] relative transition-all duration-700 delay-100 ${formRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />

                <div className="p-8 sm:p-12 lg:p-14">
                  {formStatus === 'success' ? (
                    <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: '500px' }}>
                      <div
                        className="w-20 h-20 flex items-center justify-center mb-8"
                        style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="w-12 h-px mb-8" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Booking Confirmed.
                      </h3>
                      <p className="text-gray-500 font-light max-w-sm leading-relaxed mb-8">
                        Your transfer request has been received. We will confirm your booking and share driver details within 1 hour.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="text-xs font-bold tracking-widest uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors"
                      >
                        Book Another Transfer
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Name row */}
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-2">
                          <FormField label="Title" required>
                            <div className="relative">
                              <select className={SelectBase} required defaultValue="">
                                <option value="" disabled>—</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                                <option>Dr.</option>
                                <option>Prof.</option>
                              </select>
                              <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                              </div>
                            </div>
                          </FormField>
                        </div>
                        <div className="col-span-10">
                          <FormField label="Full Name" required>
                            <input type="text" className={InputBase} placeholder="Your full name" required />
                          </FormField>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField label="Email Address" required>
                          <input type="email" className={InputBase} placeholder="your@email.com" required />
                        </FormField>
                        <FormField label="Phone / WhatsApp" required>
                          <input type="tel" className={InputBase} placeholder="+94 77 123 4567" required />
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField label="Preferred Contact" required>
                          <div className="relative">
                            <select className={SelectBase} required defaultValue="">
                              <option value="" disabled>Select method</option>
                              <option>Email</option>
                              <option>WhatsApp</option>
                              <option>Other</option>
                            </select>
                            <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                        </FormField>
                        <FormField label="Vehicle Preference">
                          <div className="relative">
                            <select className={SelectBase} defaultValue="">
                              <option value="" disabled>Select vehicle</option>
                              <option>Executive Sedan</option>
                              <option>Premium SUV</option>
                              <option>Luxury Van</option>
                              <option>Any Available</option>
                            </select>
                            <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField label="Pickup Location" required>
                          <input type="text" className={InputBase} placeholder="e.g. Colombo Airport, Terminal 1…" required />
                        </FormField>
                        <FormField label="Pickup Date & Time" required>
                          <input type="datetime-local" className={InputBase} required />
                        </FormField>
                      </div>

                      <FormField label="Arrival / Destination" required>
                        <input type="text" className={InputBase} placeholder="e.g. Sigiriya Rock View Hotel, Kandy…" required />
                      </FormField>

                      {/* Group size */}
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-4">
                          Number of Passengers
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="text-[9px] text-gray-400 mb-3">Adults</p>
                            <div className="flex items-center gap-0 border-b border-gray-200 pb-2">
                              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M20 12H4" /></svg>
                              </button>
                              <span className="w-12 text-center text-lg font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{adults}</span>
                              <button type="button" onClick={() => setAdults(adults + 1)}
                                className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M12 4v16m8-8H4" /></svg>
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 mb-3">Children</p>
                            <div className="flex items-center gap-0 border-b border-gray-200 pb-2">
                              <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M20 12H4" /></svg>
                              </button>
                              <span className="w-12 text-center text-lg font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{children}</span>
                              <button type="button" onClick={() => setChildren(children + 1)}
                                className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M12 4v16m8-8H4" /></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <FormField label="Luggage">
                        <div className="relative">
                          <select className={SelectBase} defaultValue="">
                            <option value="" disabled>Select luggage type</option>
                            <option>Light — carry-on bags only</option>
                            <option>Standard — 1–2 checked bags</option>
                            <option>Heavy — 3+ large bags</option>
                            <option>Special — surfboards, bikes etc.</option>
                          </select>
                          <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </FormField>

                      <FormField label="Additional Notes">
                        <textarea
                          className={`${InputBase} resize-none`}
                          rows={4}
                          placeholder="Flight number, special requirements, preferred route, child seat needed, meet & greet sign, language preference…"
                        />
                      </FormField>

                      <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#e8e4df]">
                        <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                          No upfront payment. We confirm within 1 hour with driver details and final price.
                        </p>
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 overflow-hidden disabled:opacity-70 flex-shrink-0"
                        >
                          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }} />
                          <span className="relative z-10 flex items-center gap-3">
                            {formStatus === 'submitting' ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Sending…
                              </>
                            ) : (
                              <>
                                Book My Transfer
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact info sidebar */}
              <div
                className={`space-y-10 transition-all duration-700 delay-200 ${formRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Reach Our Drivers
                    <br />
                    <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Directly.
                    </span>
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed text-sm">
                    For urgent bookings, immediate airport pickups or last-minute transfers,
                    contact us directly on WhatsApp or phone. We respond within minutes.
                  </p>
                </div>

                {[
                  {
                    label: 'Taxi Hotline',
                    value: '+94 77 123 4567',
                    sub: 'Available 24/7 — immediate response',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="square" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.95-5.066-4.12-7.016-7.016l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'WhatsApp',
                    value: '+94 77 123 4567',
                    sub: 'Share your flight details instantly',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="square" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Email',
                    value: 'taxi@triptip.lk',
                    sub: 'For advance bookings & corporate accounts',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="square" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                  },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="p-4 bg-[#ffffff] text-[#1800ad] transition-all duration-300 group-hover:text-white flex-shrink-0"
                      style={{ transition: 'background .3s, color .3s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#5e17eb,#1800ad)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#ffffff'; (e.currentTarget as HTMLElement).style.color = '#1800ad'; }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.label}</p>
                      <p className="text-xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>{c.value}</p>
                      <p className="text-xs text-gray-500 font-light">{c.sub}</p>
                    </div>
                  </div>
                ))}

                {/* Promise card */}
                <div
                  className="p-8"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                >
                  <div className="w-8 h-px bg-white/30 mb-5" />
                  <h4
                    className="text-xl font-black text-white tracking-tight leading-tight mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Our Driver Promise.
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      'Punctual — always on time, every time',
                      'Polite — professional and respectful',
                      'Knowledgeable — local insights on request',
                      'Flexible — wait times never charged',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-4 h-4 bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-white/80 font-light leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICE TYPES ────────────────── */}
        <div
          ref={serviceRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${serviceRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Services</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">What we offer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e8e4df]">
              {serviceTypes.map((svc, i) => (
                <div
                  key={svc.title}
                  className={`group relative p-8 lg:p-10 border-r border-b border-[#e8e4df] [&:nth-child(3n)]:border-r-0 [&:nth-child(n+4)]:border-b-0 hover:bg-[#ffffff] transition-all duration-300 bg-[#fafafa] ${serviceRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: serviceRef.inView ? `${i * 70}ms` : '0ms' }}
                >
                  <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />

                  <div className="flex items-start justify-between mb-5">
                    <div className="text-3xl">{svc.icon}</div>
                    {svc.badge && (
                      <span
                        className="text-[8px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 text-[#5e17eb] border border-[#5e17eb]/20 bg-[#f8f6ff]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg font-black text-gray-900 tracking-tight mb-3 group-hover:text-[#5e17eb] transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{svc.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── OUR FLEET ────────────────────── */}
        <div
          ref={fleetRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${fleetRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Fleet</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">Choose your vehicle</p>
              </div>
            </div>

            {/* Fleet selector tabs */}
            <div className="flex items-center gap-0 border-b border-[#e8e4df] mb-10">
              {vehicleFleet.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVehicle(i)}
                  className="relative px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                  style={{ color: activeVehicle === i ? '#5e17eb' : '#aaa', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {v.name}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                    style={{ width: activeVehicle === i ? '100%' : '0%', background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                  />
                </button>
              ))}
            </div>

            {/* Active vehicle panel */}
            {vehicleFleet.map((v, i) => (
              <div
                key={v.id}
                className={`grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center transition-all duration-500 ${activeVehicle === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
                  {v.badge && (
                    <div className="absolute top-5 left-5">
                      <span
                        className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 text-white"
                        style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {v.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {v.model}
                  </span>
                  <h2
                    className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-6"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {v.name}
                  </h2>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-0 mb-8 border border-[#e8e4df]">
                    <div className="p-4 border-r border-b border-[#e8e4df]">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">Capacity</p>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{v.capacity}</p>
                    </div>
                    <div className="p-4 border-b border-[#e8e4df]">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">Luggage</p>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{v.luggage}</p>
                    </div>
                    <div className="p-4 border-r border-[#e8e4df]">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">Starting Price</p>
                      <p className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {v.priceFrom}
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">Availability</p>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>24/7</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {v.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 font-light">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const formEl = document.getElementById('booking-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:gap-5"
                    style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                  >
                    Book This Vehicle
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── VEHICLE CONDITIONS ────────────── */}
        <div
          ref={conditionsRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#e8e4df] px-6 sm:px-10 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Section header */}
            <div className={`mb-16 transition-all duration-700 ${conditionsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-10 bg-[#5e17eb]" />
                <div>
                  <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Vehicle Standards
                  </p>
                  <p className="text-xs text-gray-500 tracking-widest uppercase mt-0.5">Our commitment to quality</p>
                </div>
              </div>
              <h2
                className="text-[clamp(32px,5vw,70px)] font-black tracking-tighter text-gray-900 leading-[0.93] max-w-2xl"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                You Deserve a Vehicle
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  That Matches the Journey.
                </span>
              </h2>
            </div>

            {/* Conditions — alternating layout */}
            <div className="space-y-12 lg:space-y-0 lg:divide-y lg:divide-[#d4cfc9]">
              {vehicleConditions.map((cond, i) => (
                <div
                  key={cond.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-0 lg:py-16 transition-all duration-800 ease-out ${conditionsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: conditionsRef.inView ? `${i * 150}ms` : '0ms' }}
                >
                  {/* Image — alternates left/right */}
                  <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div style={{ aspectRatio: '16/10' }}>
                      <img
                        src={cond.image}
                        alt={cond.category}
                        className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-104"
                      />
                      <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
                    </div>
                    {/* Category badge on image */}
                    <div className="absolute bottom-5 left-5">
                      <span
                        className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 text-white backdrop-blur-sm"
                        style={{ background: 'rgba(94,23,235,0.85)', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cond.category}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    {/* Icon */}
                    <div
                      className="w-12 h-12 flex items-center justify-center text-white mb-6"
                      style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                    >
                      {cond.icon}
                    </div>

                    <span
                      className="block text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] mb-3"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {cond.category}
                    </span>

                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-5"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {cond.headline}
                    </h3>

                    <p className="text-base text-gray-600 font-light leading-relaxed mb-8">
                      {cond.body}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-0 border border-[#d4cfc9]">
                      {cond.stats.map((s, si) => (
                        <div
                          key={si}
                          className="px-4 py-4 border-r border-[#d4cfc9] last:border-r-0"
                        >
                          <p
                            className="text-sm font-black text-gray-900 mb-1 leading-tight"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {s.value}
                          </p>
                          <p className="text-[9px] text-gray-500 font-light uppercase tracking-widest leading-tight">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       

        {/* ── CTA STRIP ─────────────────────── */}
        <div
          ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#0d0d0d] px-6 sm:px-10 lg:px-20 py-16 lg:py-20 overflow-hidden relative"
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-64 h-64 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}
          />
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="h-px w-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">Planning a multi-day trip?</span>
              </div>
              <h3
                className={`font-black text-white tracking-tight leading-[0.95] transition-all duration-700 delay-100 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 4vw, 52px)' }}
              >
                Need More Than a Ride?
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  We Do Full Tours Too.
                </span>
              </h3>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
              >
                Browse Tours
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/custom-planning"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white/60 border border-white/15 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                Custom Planning
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default TaxiPage;