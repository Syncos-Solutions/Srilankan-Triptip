// app/taxi/page.tsx
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

// ============================================================================
// DATA
// ============================================================================
const fleetCategories = [
  {
    id: 'standard',
    tier: 'Standard',
    name: 'City Comfort',
    tagline: 'Effortless urban movement',
    desc: 'Immaculately maintained sedans for airport transfers, city commutes, and short-haul island routes. Air-conditioned, punctual, and piloted by courteous professionals.',
    features: ['Up to 3 passengers', 'Airport pick-up board', '2 luggage pieces', 'Wi-Fi on request'],
    priceFrom: 'From USD 35',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=90',
    accent: '#5e17eb',
  },
  {
    id: 'premium',
    tier: 'Premium',
    name: 'Executive Ride',
    tagline: 'Elevated at every mile',
    desc: 'Premium SUVs and luxury sedans for discerning travelers who expect more than just a ride. Chilled water, curated playlists, and a chauffeur who anticipates your needs.',
    features: ['Up to 4 passengers', 'Meet & greet service', '4 luggage pieces', 'Chilled water & snacks'],
    priceFrom: 'From USD 65',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=1200&q=90',
    accent: '#1800ad',
    featured: true,
  },
  {
    id: 'luxury',
    tier: 'Luxury',
    name: 'Prestige Class',
    tagline: 'Where journey becomes occasion',
    desc: 'Our finest fleet — premium MPVs and luxury seven-seaters for groups, honeymoon transfers, and travelers for whom the ride itself is part of the experience.',
    features: ['Up to 7 passengers', 'Private chauffeur', '6 luggage pieces', 'Red carpet service'],
    priceFrom: 'From USD 110',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=90',
    accent: '#5e17eb',
  },
];

const routes = [
  { from: 'Colombo Airport', to: 'City Centre', duration: '45 min', distance: '35 km' },
  { from: 'Colombo', to: 'Kandy', duration: '2.5 hrs', distance: '115 km' },
  { from: 'Colombo', to: 'Galle', duration: '2 hrs', distance: '119 km' },
  { from: 'Colombo', to: 'Ella', duration: '6 hrs', distance: '230 km' },
  { from: 'Kandy', to: 'Sigiriya', duration: '1.5 hrs', distance: '68 km' },
  { from: 'Negombo', to: 'Colombo Airport', duration: '30 min', distance: '8 km' },
];

const pillars = [
  {
    num: '01',
    title: 'Guaranteed Punctuality',
    body: 'We track flights in real time and adjust pickup times automatically. Your driver is there before you are — every time, without exception.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Vetted Chauffeurs',
    body: 'Every driver is personally vetted, licensed and trained in hospitality. They speak English, know the island deeply, and treat your journey as their responsibility.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Fixed Transparent Fares',
    body: 'No meters. No surprises. No surge pricing at 2am. You know the cost before you confirm — and it never changes.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: '24/7 Concierge Line',
    body: 'A real person answers at 3am. Not a chatbot, not a queue. Our operations team is always live and always able to solve any situation instantly.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

// ============================================================================
// BOOKING FORM COMPONENT
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
      <div className="min-h-[420px] flex flex-col items-center justify-center text-center py-16">
        <div
          className="w-16 h-16 flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4
          className="text-2xl font-black text-gray-900 tracking-tight mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Booking Request Received
        </h4>
        <p className="text-gray-500 font-light text-sm max-w-xs leading-relaxed">
          Our team will confirm your ride within 2 hours with driver details and final pricing.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-xs font-bold tracking-widest uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors"
        >
          Book Another Ride
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Row 1: Salutation + Name */}
      <div className="grid grid-cols-[120px_1fr] gap-6">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Salutation
          </label>
          <select
            required
            defaultValue=""
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm"
          >
            <option value="" disabled>—</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Dr.</option>
            <option>Prof.</option>
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Your full name"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Row 2: Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            required
            placeholder="+1 000 000 0000"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Row 3: Preferred Contact Method */}
      <div className="relative group">
        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 transition-colors group-focus-within:text-[#5e17eb]">
          Preferred Contact Method
        </label>
        <div className="flex gap-0 border border-gray-200">
          {['Email', 'WhatsApp', 'Other'].map((method) => {
            const id = `contact-${method.toLowerCase()}`;
            return (
              <label
                key={method}
                htmlFor={id}
                className="flex-1 relative cursor-pointer"
              >
                <input
                  type="radio"
                  id={id}
                  name="contactMethod"
                  value={method.toLowerCase()}
                  className="peer sr-only"
                  defaultChecked={method === 'Email'}
                />
                <span className="block text-center py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 border-r border-gray-200 last:border-r-0 transition-all duration-300 peer-checked:text-white peer-checked:bg-gradient-to-r peer-checked:from-[#5e17eb] peer-checked:to-[#1800ad]">
                  {method}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Row 4: Pickup + Destination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Pickup Location
          </label>
          <input
            type="text"
            required
            placeholder="Address or landmark"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Drop-off / Destination
          </label>
          <input
            type="text"
            required
            placeholder="Address or landmark"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Row 5: Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Pickup Date
          </label>
          <input
            type="date"
            required
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Pickup Time
          </label>
          <input
            type="time"
            required
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light text-sm"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Row 6: Adults + Children + Luggage */}
      <div className="grid grid-cols-3 gap-6">
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Adults
          </label>
          <select
            required
            defaultValue="1"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm"
          >
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Children
          </label>
          <select
            defaultValue="0"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm"
          >
            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
            Luggage
          </label>
          <select
            defaultValue="1"
            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all font-light appearance-none cursor-pointer text-sm"
          >
            <option value="0">None</option>
            <option value="1">1 bag</option>
            <option value="2">2 bags</option>
            <option value="3">3 bags</option>
            <option value="4+">4+ bags</option>
          </select>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
        </div>
      </div>

      {/* Row 7: Additional Notes */}
      <div className="relative group">
        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
          Additional Notes
        </label>
        <textarea
          rows={3}
          placeholder="Flight number, special requirements, preferred vehicle class, or anything else..."
          className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none transition-all placeholder-gray-300 font-light resize-none text-sm"
        />
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 overflow-hidden disabled:opacity-70"
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }} />
          <span className="relative z-10 flex items-center gap-3">
            {status === 'submitting' ? 'Processing...' : 'Reserve My Ride'}
            {status !== 'submitting' && (
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </span>
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-4 tracking-wide">
          Confirmation within 2 hours · No payment required to reserve
        </p>
      </div>
    </form>
  );
};

// ============================================================================
// FLEET CARD COMPONENT
// ============================================================================
const FleetCard: React.FC<{ car: typeof fleetCategories[0]; index: number; inView: boolean }> = ({ car, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${index * 150}ms, transform 0.8s ease ${index * 150}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {car.featured && (
        <div
          className="absolute top-5 right-5 z-20 px-3 py-1"
          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
        >
          <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white">Most Popular</span>
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)',
            opacity: hovered ? 1 : 0.6,
          }}
        />
        {/* Tier badge on image */}
        <div className="absolute bottom-5 left-6">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">
            {car.tier}
          </span>
          <p
            className="text-2xl font-black text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {car.name}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="p-8 border-b border-l border-r border-[#e8e4df] transition-all duration-300"
        style={{ borderColor: hovered ? `${car.accent}33` : '#e8e4df' }}
      >
        {/* Animated top line */}
        <div
          className="h-[2px] mb-6 -mt-[1px] transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${car.accent}, #1800ad)`,
            width: hovered ? '100%' : '40px',
          }}
        />

        <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">{car.desc}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {car.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2">
              <div
                className="w-1 h-1 flex-shrink-0"
                style={{ background: car.accent }}
              />
              <span className="text-xs text-gray-600 font-light">{feat}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Price</span>
            <p
              className="text-lg font-black text-gray-900 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: car.accent }}
            >
              {car.priceFrom}
            </p>
          </div>
          <a
            href="#booking"
            className="group/btn inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:gap-3"
            style={{ color: car.accent }}
          >
            Book Now
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN TAXI PAGE
// ============================================================================
const TaxiPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroRef = useInView(0.1);
  const statsRef = useInView(0.1);
  const pillarsRef = useInView(0.08);
  const fleetRef = useInView(0.08);
  const routesRef = useInView(0.1);
  const bookingRef = useInView(0.05);
  const closingRef = useInView(0.1);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <main
      className="bg-[#f4f4f4] overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* ================================================================ */}
      {/* HERO — Full-bleed, cinematic, editorial                           */}
      {/* ================================================================ */}
      <div
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className="relative bg-[#e8e4df] overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          
          {/* Multi-layer gradient */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.6) 55%, rgba(5,5,7,0.2) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(5,5,7,0.8) 0%, transparent 50%)',
            }}
          />
         
          <div
            className="absolute inset-0 opacity-15"
            style={{ background: 'linear-gradient(135deg, #5e17eb, transparent 60%)' }}
          /> */}
        </div>

        {/* Dot grid texture overlay */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[50%] h-full opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #5e17eb 2px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1800px]  px-6 sm:px-10 lg:px-12 pt-44 pb-20 lg:pt-52 lg:pb-28 flex flex-col justify-end min-h-screen">

          {/* Top tag */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#5e17eb] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-white/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Premium Taxi & Transfers
            </span>
            <div className="h-px w-10 bg-white/20" />
            <span className="text-xs tracking-widest text-white/40 uppercase">Sri Lankan TripTip</span>
          </div>

          {/* Main headline */}
          <div className="max-w-4xl">
            <h1
              className={`font-black leading-[0.92] tracking-tighter text-white mb-8 transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(52px, 8vw, 120px)',
              }}
            >
              Every Mile,
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Mastered.
              </span>
            </h1>

            <p
              className={`text-white/65 font-light leading-relaxed max-w-xl mb-12 transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ fontSize: 'clamp(15px, 1.5vw, 19px)' }}
            >
              Airport transfers, intercity journeys, and island-wide chauffeur services.
              Fixed pricing, vetted drivers, and a standard of comfort you will want to book every time.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <a
                href="#booking"
                className="group inline-flex items-center gap-3 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              >
                Book Your Ride
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="tel:+94771234567"
                className="inline-flex items-center gap-3 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white border border-white/20 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 24/7
              </a>
            </div>
          </div>

          {/* Bottom strip — quick stats */}
          <div
            className={`mt-20 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 transition-all duration-700 delay-400 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {[
              { val: '24/7', label: 'Available' },
              { val: '50+', label: 'Vehicles' },
              { val: '12+', label: 'Years' },
              { val: '100%', label: 'Tracked' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl sm:text-3xl font-black text-white leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.val}
                </div>
                <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TRUST METRICS STRIP                                              */}
      {/* ================================================================ */}
      <div
        ref={statsRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-14"
      >
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e8e4df]">
          {[
            { target: 14800, suffix: '+', label: 'Rides Completed', sub: 'Since 2012' },
            { target: 98, suffix: '%', label: 'On-Time Rate', sub: 'Measured every trip' },
            { target: 50, suffix: '+', label: 'Premium Vehicles', sub: 'All under 3 years old' },
            { target: 47, suffix: '', label: 'Countries Served', sub: 'Guests from worldwide' },
          ].map((m, i) => (
            <div
              key={m.label}
              className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="text-[clamp(36px,4.5vw,64px)] font-black leading-none tracking-tighter mb-2"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: 'linear-gradient(135deg, #5e17eb 30%, #1800ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <Counter target={m.target} suffix={m.suffix} inView={statsRef.inView} />
              </div>
              <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">{m.label}</div>
              <div className="text-[11px] text-gray-400 leading-snug">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      
      {/* ================================================================ */}
      {/* BOOKING SECTION                                                  */}
      {/* ================================================================ */}
      <div
        id="booking"
        ref={bookingRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 top-10 font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,160px)' }}
        >
          RESERVE
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">

            {/* Left: Info */}
            <div className={`transition-all duration-700 ${bookingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Book a Ride
                </span>
              </div>

              <h2
                className="text-[clamp(36px,4.5vw,64px)] font-black text-gray-900 tracking-tight leading-tight mb-8"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Reserve Your
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Premium Transfer.
                </span>
              </h2>

              <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-sm text-sm lg:text-base">
                Complete the form and our team will respond within 2 hours with driver details,
                confirmation, and your fixed price. No hidden fees — ever.
              </p>

              {/* Contact methods */}
              <div className="space-y-8">
                {[
                  { label: '24/7 Concierge', val: '+94 77 123 4567', sub: 'Call or WhatsApp any time', icon: '📞' },
                  { label: 'Email', val: 'taxi@triptip.lk', sub: 'For advance bookings', icon: '✉️' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-5 group">
                    <div className="p-3 bg-[#f4f4f4] text-[#1800ad] transition-colors duration-300 group-hover:bg-[#5e17eb] group-hover:text-white text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 block mb-1">{item.label}</span>
                      <p className="text-base font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{item.val}</p>
                      <p className="text-xs text-gray-400 font-light">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-10 border-t border-[#e8e4df] grid grid-cols-3 gap-4">
                {['Fixed Price', 'No Card Needed', 'Instant Confirm'].map((badge) => (
                  <div key={badge} className="text-center">
                    <div
                      className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                    >
                      ✓
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div
              className={`bg-[#f9f9f9] p-8 sm:p-12 relative transition-all duration-700 delay-300 ${bookingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />

              <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Ride Reservation
              </h3>
              <p className="text-sm text-gray-400 mb-10 font-light">We confirm within 2 hours.</p>

              <BookingForm />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* WHY CHOOSE US — 4 PILLARS                                        */}
      {/* ================================================================ */}
      <div
        ref={pillarsRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 top-4 font-black leading-none text-[#d4cfc9] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(90px,14vw,180px)' }}
        >
          TRUST
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Header */}
          <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-1 h-10 bg-[#5e17eb]" />
            <div>
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Why Sri Lankan TripTip
              </span>
              <h2
                className="text-[clamp(32px,4.5vw,60px)] font-black text-gray-900 tracking-tight leading-tight mt-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                The Standard We Hold
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Every Single Ride.
                </span>
              </h2>
            </div>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#ccc9c4]">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={`group relative px-0 md:px-10 first:pl-0 last:pr-0 py-10 md:py-0 transition-all duration-700 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Number watermark */}
                <span
                  className="block text-[clamp(52px,6vw,84px)] font-black leading-none tracking-tighter text-[#ccc9c4] select-none mb-4 transition-colors duration-300 group-hover:text-[#d4cbf5]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  aria-hidden="true"
                >
                  {p.num}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 text-white transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                >
                  {p.icon}
                </div>

                <h3
                  className="text-lg font-black text-gray-900 tracking-tight mb-3 transition-colors duration-300 group-hover:text-[#5e17eb]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{p.body}</p>

                {/* Bottom accent on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full md:bottom-auto md:top-0"
                  style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* FLEET SECTION                                                     */}
      {/* ================================================================ */}
      <div
        ref={fleetRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-[-2%] top-[5%] font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(100px,16vw,200px)' }}
        >
          FLEET
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Header */}
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-700 ${fleetRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Our Fleet
                </span>
              </div>
              <h2
                className="text-[clamp(36px,5vw,72px)] font-black text-gray-900 tracking-tight leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Choose Your
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Level of Comfort.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-gray-500 font-light leading-relaxed text-sm lg:text-base lg:pb-3">
              Three tiers of service, each maintained to exacting standards. Every vehicle
              is GPS-tracked and air-conditioned.
            </p>
          </div>

          {/* Fleet grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {fleetCategories.map((car, i) => (
              <FleetCard key={car.id} car={car} index={i} inView={fleetRef.inView} />
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* POPULAR ROUTES STRIP                                             */}
      {/* ================================================================ */}
      <div
        ref={routesRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-12 py-20 lg:py-24"
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 transition-all duration-700 ${routesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[#5e17eb]" />
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Popular Routes
              </span>
            </div>
            <p className="text-xs text-gray-400 tracking-widest uppercase">Fixed fares · No surprises</p>
          </div>

          {/* Routes table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e8e4df]">
            {routes.map((route, i) => (
              <div
                key={i}
                className={`group relative p-8 border-b border-r border-[#e8e4df] last:border-r-0 transition-all duration-700 hover:bg-white cursor-pointer ${routesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">From</span>
                    </div>
                    <p className="text-base font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {route.from}
                    </p>
                  </div>
                  <div className="px-3 pt-1">
                    <svg className="w-5 h-5 text-[#5e17eb] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14" />
                    </svg>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">To</span>
                    <p className="text-base font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {route.to}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#e8e4df]">
                  <div>
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase block mb-0.5">Duration</span>
                    <span className="text-sm font-bold text-gray-700">{route.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase block mb-0.5">Distance</span>
                    <span className="text-sm font-bold text-gray-700">{route.distance}</span>
                  </div>
                  <div className="ml-auto">
                    <span
                      className="text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#5e17eb] text-gray-400"
                    >
                      Book →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 tracking-wide mt-6">
            Not your route? We cover the entire island.{' '}
            <a href="#booking" className="text-[#5e17eb] hover:text-[#1800ad] transition-colors font-bold">
              Request a custom quote →
            </a>
          </p>
        </div>
      </div>

      {/* ================================================================ */}
      {/* EDITORIAL SPLIT — ATMOSPHERE BAND                                */}
      {/* ================================================================ */}
      <div className="bg-[#050507] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[40%] h-full opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Purple glow */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] blur-[180px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #5e17eb, transparent 70%)' }}
        />

        <div className="max-w-[1800px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <div className="w-10 h-px mb-10" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
            <h2
              className="text-[clamp(36px,5.5vw,80px)] font-black text-white leading-[0.95] tracking-tighter mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Not a Car Service.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                A Standard.
              </span>
            </h2>
            <p className="text-white/55 font-light leading-relaxed text-base sm:text-lg max-w-lg mb-10">
              When you travel with Sri Lankan TripTip, you are not hailing a cab. You are engaging
              a service that thinks about your journey from the moment you land until the moment
              you walk through your door.
            </p>
            <p className="text-white/55 font-light leading-relaxed text-base sm:text-lg max-w-lg">
              That means flight monitoring. Proactive communication. A driver who knows the
              quieter road that saves 20 minutes. Chilled water waiting. And the confidence to
              know that, whatever happens, someone is already handling it.
            </p>
          </div>

          {/* Right — Image with floating card */}
          <div className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90"
                alt="Professional chauffeur service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, #5e17eb, transparent 60%)' }} />
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-6 -left-6 p-6 z-10 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', minWidth: '180px' }}
            >
              <div className="text-4xl font-black text-white leading-none mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                98%
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/70">On-time arrival<br />rate, verified</div>
            </div>

            {/* Dot grid accent */}
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 w-24 h-24 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
                backgroundSize: '10px 10px',
              }}
            />
          </div>
        </div>
      </div>


      {/* ================================================================ */}
      {/* CLOSING CTA BAND                                                 */}
      {/* ================================================================ */}
      <div
        ref={closingRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-20 lg:py-24 overflow-hidden relative"
      >
        {/* Ghost text */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none text-[#d4cfc9] tracking-tighter"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,12vw,160px)' }}
        >
          RIDE
        </span>

        <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div>
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="h-px w-8 bg-[#5e17eb]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">Always On Time</span>
            </div>
            <h3
              className={`font-black text-gray-900 tracking-tighter leading-[0.95] transition-all duration-700 delay-100 ${closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px,4.5vw,58px)' }}
            >
              Next time you need a taxi
              <br />
              in Sri Lanka,{' '}
              <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                you already know us.
              </span>
            </h3>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
              style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
            >
              Book Now
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TaxiPage;