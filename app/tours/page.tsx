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
// Types
// ─────────────────────────────────────────────
interface Tour {
  id: string;
  slug: string;
  category: 'round-tours' | 'activities' | 'experience-tours';
  title: string;
  tagline: string;
  image: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  price: string;
  priceNote: string;
  highlights: string[];
  badge?: string;
}

// ─────────────────────────────────────────────
// Tour Data
// ─────────────────────────────────────────────
const tours: Tour[] = [
  // ── Round Tours ──
  {
    id: 'rt1',
    slug: 'cultural-triangle-explorer',
    category: 'round-tours',
    title: 'Cultural Triangle Explorer',
    tagline: 'Ancient kingdoms, sacred temples & timeless landscapes in one seamless arc.',
    image: 'https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=900&q=85',
    duration: '7 Days',
    groupSize: '2–12',
    difficulty: 'Easy',
    price: 'From $1,240',
    priceNote: 'per person twin share',
    highlights: ['Sigiriya pre-dawn access', 'Polonnaruwa ruins', 'Dambulla Cave Temple', 'Village astrologer visit'],
    badge: 'Most Popular',
  },
  {
    id: 'rt2',
    slug: 'southern-coast-grand-tour',
    category: 'round-tours',
    title: 'Southern Coast Grand Tour',
    tagline: 'Pristine beaches, whale watching, colonial forts and stilt fishermen.',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=85',
    duration: '10 Days',
    groupSize: '2–10',
    difficulty: 'Easy',
    price: 'From $1,890',
    priceNote: 'per person twin share',
    highlights: ['Mirissa blue whales', 'Galle Fort', 'Tangalle beach stays', 'Bundala bird sanctuary'],
  },
  {
    id: 'rt3',
    slug: 'hill-country-immersion',
    category: 'round-tours',
    title: 'Hill Country Immersion',
    tagline: 'Mist-wrapped tea estates, colonial trains and World\'s End at the edge of everything.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    duration: '8 Days',
    groupSize: '2–8',
    difficulty: 'Moderate',
    price: 'From $1,560',
    priceNote: 'per person twin share',
    highlights: ['Ella Nine Arch Bridge', 'Tea plucking experience', 'Horton Plains trek', 'Kandy perahera'],
    badge: 'Editor\'s Pick',
  },
  {
    id: 'rt4',
    slug: 'complete-island-odyssey',
    category: 'round-tours',
    title: 'Complete Island Odyssey',
    tagline: 'The entire island from Jaffna to the deep south — the full story of Sri Lanka.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    duration: '14 Days',
    groupSize: '2–8',
    difficulty: 'Moderate',
    price: 'From $2,650',
    priceNote: 'per person twin share',
    highlights: ['Jaffna peninsula', 'Anuradhapura ancient city', 'Yala leopard safari', 'Nuwara Eliya highlands'],
  },

  // ── Activities ──
  {
    id: 'ac1',
    slug: 'yala-leopard-safari',
    category: 'activities',
    title: 'Yala Leopard Safari',
    tagline: 'The highest density of leopards on earth — tracked by guides who know each one by name.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=85',
    duration: '2 Days',
    groupSize: '2–6',
    difficulty: 'Easy',
    price: 'From $380',
    priceNote: 'per person',
    highlights: ['Dawn & dusk game drives', 'Expert tracker guide', 'Luxury tented camp', 'Elephant herd sightings'],
    badge: 'Premium',
  },
  {
    id: 'ac2',
    slug: 'mirissa-whale-watching',
    category: 'activities',
    title: 'Mirissa Whale Watching',
    tagline: 'Blue whales, sperm whales and spinner dolphins in the warm Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=900&q=85',
    duration: '1 Day',
    groupSize: '2–20',
    difficulty: 'Easy',
    price: 'From $120',
    priceNote: 'per person',
    highlights: ['Marine biologist guide', 'Guaranteed departure', 'Breakfast on board', 'Snorkelling stop'],
  },
  {
    id: 'ac3',
    slug: 'knuckles-trek',
    category: 'activities',
    title: 'Knuckles Range Trek',
    tagline: 'UNESCO cloud forest trails through villages no map has ever printed.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85',
    duration: '3 Days',
    groupSize: '2–8',
    difficulty: 'Challenging',
    price: 'From $440',
    priceNote: 'per person',
    highlights: ['Cloud forest traverse', 'Village homestay', 'Waterfall swimming', 'Endemic bird spotting'],
  },
  {
    id: 'ac4',
    slug: 'minneriya-elephant-gathering',
    category: 'activities',
    title: 'Minneriya Elephant Gathering',
    tagline: 'The world\'s largest wild elephant congregation — up to 300 in a single view.',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85',
    duration: '1 Day',
    groupSize: '2–8',
    difficulty: 'Easy',
    price: 'From $95',
    priceNote: 'per person',
    highlights: ['August–October season', 'Expert wildlife guide', 'Open-roof jeep safari', 'Sunset golden hour'],
    badge: 'Seasonal',
  },

  // ── Experience Tours ──
  {
    id: 'ex1',
    slug: 'tea-estate-immersion',
    category: 'experience-tours',
    title: 'Tea Estate Immersion',
    tagline: 'A third-generation tea family opens their home, fields and secrets to you.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    duration: '3 Days',
    groupSize: '2–6',
    difficulty: 'Easy',
    price: 'From $520',
    priceNote: 'per person',
    highlights: ['Plucking at first light', 'Factory floor access', 'Ceremonial tea tasting', 'Plantation sunset dinner'],
    badge: 'Exclusive',
  },
  {
    id: 'ex2',
    slug: 'sigiriya-dawn-ritual',
    category: 'experience-tours',
    title: 'Sigiriya Dawn Ritual',
    tagline: 'Pre-dawn access to the Lion Rock — alone on a 5th-century summit at sunrise.',
    image: 'https://images.unsplash.com/photo-1590123591500-81e7ed70f86e?w=900&q=85',
    duration: '1 Day',
    groupSize: '2–4',
    difficulty: 'Moderate',
    price: 'From $180',
    priceNote: 'per person',
    highlights: ['5:15am private entry', 'Cultural archaeologist', 'Mirror wall gallery', 'Village breakfast after'],
    badge: 'Signature',
  },
  {
    id: 'ex3',
    slug: 'colombo-night-food-trail',
    category: 'experience-tours',
    title: 'Colombo Night Food Trail',
    tagline: 'Street carts, Pettah alley kitchens and rooftop bars — Colombo after dark.',
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=900&q=85',
    duration: '1 Day',
    groupSize: '2–10',
    difficulty: 'Easy',
    price: 'From $75',
    priceNote: 'per person',
    highlights: ['10 street food stops', 'Local chef host', 'Craft cocktail close', 'Hidden rooftop bar'],
  },
  {
    id: 'ex4',
    slug: 'village-astrologer-and-ceremony',
    category: 'experience-tours',
    title: 'Village Astrologer & Ceremony',
    tagline: 'A private sitting with Kandy\'s most respected astrologer — and the ritual that follows.',
    image: 'https://images.unsplash.com/photo-1600689695780-4a3ceedb9e01?w=900&q=85',
    duration: '1 Day',
    groupSize: '2–4',
    difficulty: 'Easy',
    price: 'From $160',
    priceNote: 'per person',
    highlights: ['Private astrologer session', 'Temple ceremony access', 'Traditional lunch', 'Village walk at dusk'],
    badge: 'Unique',
  },
];

const categoryMeta = {
  'round-tours': {
    label: 'Round Tours',
    tagline: 'Multi-day island circuits crafted for complete immersion',
    count: tours.filter(t => t.category === 'round-tours').length,
    color: '#5e17eb',
  },
  'activities': {
    label: 'Activities',
    tagline: 'Single and multi-day adventures led by expert local guides',
    count: tours.filter(t => t.category === 'activities').length,
    color: '#1800ad',
  },
  'experience-tours': {
    label: 'Experience Tours',
    tagline: 'Intimate, private encounters with the real Sri Lanka',
    count: tours.filter(t => t.category === 'experience-tours').length,
    color: '#5e17eb',
  },
};

// ─────────────────────────────────────────────
// Tour Card
// ─────────────────────────────────────────────
const TourCard: React.FC<{
  tour: Tour;
  index: number;
  inView: boolean;
}> = ({ tour, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${(index % 4) * 90}ms, transform 0.7s ease ${(index % 4) * 90}ms`,
      }}
    >
      {/* Image zone */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)', opacity: hovered ? 1 : 0.6 }} />
        {/* Purple tint on hover */}
        <div className="absolute inset-0 transition-opacity duration-600"
          style={{ background: 'linear-gradient(135deg, rgba(94,23,235,0.18), rgba(24,0,173,0.12))', opacity: hovered ? 1 : 0 }} />

        {/* Badge */}
        {tour.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 text-white"
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'DM Sans', sans-serif" }}
            >
              {tour.badge}
            </span>
          </div>
        )}

        {/* Duration tag */}
        <div className="absolute top-4 right-4">
          <span className="text-[9px] font-bold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1.5">
            {tour.duration}
          </span>
        </div>

        {/* Bottom hover reveal */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <div className="h-px mb-3 transition-all duration-600"
            style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)', width: hovered ? '40px' : '0px' }} />
          <p className="text-xs text-white/75 font-light leading-relaxed line-clamp-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {tour.tagline}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="pt-5 pb-6 border-b border-[#e8e4df]">
        {/* Accent line */}
        <div className="h-px mb-4 transition-all duration-500"
          style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)', width: hovered ? '48px' : '24px' }} />

        <h3
          className="text-lg sm:text-xl font-black tracking-tight leading-snug mb-2 transition-colors duration-300"
          style={{ fontFamily: "'Syne', sans-serif", color: hovered ? '#5e17eb' : '#111' }}
        >
          {tour.title}
        </h3>

        <p className="text-xs text-gray-500 font-light mb-5 line-clamp-2 leading-relaxed">
          {tour.tagline}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-5">
          {[
            { icon: '👥', text: tour.groupSize },
            { icon: '⚡', text: tour.difficulty },
          ].map((m, i) => (
            <span key={i} className="text-[10px] text-gray-500 flex items-center gap-1.5 font-light">
              <span>{m.icon}</span>
              {m.text}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <span
              key={i}
              className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 border border-[#e8e4df] text-gray-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-base font-black text-gray-900 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {tour.price}
            </p>
            <p className="text-[10px] text-gray-400 font-light">{tour.priceNote}</p>
          </div>
          <div
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
            style={{ color: hovered ? '#5e17eb' : '#bbb' }}
          >
            View Tour
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────
// Category Section
// ─────────────────────────────────────────────
const CategorySection: React.FC<{
  categoryKey: 'round-tours' | 'activities' | 'experience-tours';
  tours: Tour[];
}> = ({ categoryKey, tours: categoryTours }) => {
  const sectionRef = useInView(0.05);
  const gridRef = useInView(0.05);
  const meta = categoryMeta[categoryKey];

  return (
    <div id={categoryKey} className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-20 lg:py-28 border-b border-[#e8e4df]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div
          ref={sectionRef.ref as React.RefObject<HTMLDivElement>}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-700 ${sectionRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-1 h-10 bg-[#5e17eb]" />
              <div>
                <span
                  className="block text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb] mb-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {meta.label}
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase">
                  {meta.count} Curated Experiences
                </span>
              </div>
            </div>
            <h2
              className="text-[clamp(32px,5vw,64px)] font-black tracking-tighter text-gray-900 leading-[0.93]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {meta.label.split(' ')[0]}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {meta.label.split(' ').slice(1).join(' ')}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-gray-500 font-light leading-relaxed lg:pb-2">
            {meta.tagline}
          </p>
        </div>

        {/* Tours grid */}
        <div
          ref={gridRef.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {categoryTours.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} inView={gridRef.inView} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Tours Page
// ─────────────────────────────────────────────
const ToursPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useInView(0.1);
  const statsRef = useInView(0.1);
  const ctaRef = useInView(0.1);
  const [activeTab, setActiveTab] = useState<string>('all');

  const roundTours = tours.filter(t => t.category === 'round-tours');
  const activities = tours.filter(t => t.category === 'activities');
  const experienceTours = tours.filter(t => t.category === 'experience-tours');

  return (
    <>
      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <main className="bg-[#f4f4f4] overflow-hidden" style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>

        {/* ── PAGE HEADER ──────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-20 pt-32 pb-0 overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-0 font-black leading-none tracking-tighter text-[#f4f4f4]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(90px,14vw,190px)' }}
          >
            TOURS
          </span>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sri Lankan TripTip
              </span>
              <div className="h-px w-12 bg-[#5e17eb]" />
              <span className="text-xs tracking-widest text-gray-400 uppercase">Curated Experiences</span>
            </div>

            <h1
              className={`font-black tracking-tighter text-gray-900 leading-[0.91] mb-6 transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(44px,7.5vw,112px)' }}
            >
              Every Journey
              <br />
              <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Starts Here.
              </span>
            </h1>

            <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-16 transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="max-w-lg text-base sm:text-lg text-gray-500 leading-relaxed font-light">
                12 curated tours across three categories — each one led by guides who have
                walked every path, tasted every dish and know every hidden corner.
              </p>
              <span className="text-xs tracking-[0.25em] text-gray-400 uppercase flex-shrink-0">
                {tours.length} Experiences
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-[#e8e4df]" />
        </div>

        {/* ── STATS BAR ────────────────────── */}
        <div
          ref={statsRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-10 border-b border-[#e8e4df]"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e8e4df]">
            {[
              { num: '12', label: 'Curated Tours', sub: 'Hand-built, never templated' },
              { num: '3', label: 'Categories', sub: 'Round tours · Activities · Experiences' },
              { num: '4,800+', label: 'Past Guests', sub: 'All verified, all satisfied' },
              { num: '12+', label: 'Years Expertise', sub: 'Sri Lanka is our life\'s work' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: statsRef.inView ? `${i * 80}ms` : '0ms' }}
              >
                <div
                  className="text-2xl sm:text-3xl font-black leading-none tracking-tighter mb-1.5"
                  style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {s.num}
                </div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-0.5">{s.label}</div>
                <div className="text-[11px] text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK-JUMP NAV ───────────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-6 border-b border-[#e8e4df] sticky top-0 z-30 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto flex items-center overflow-x-auto gap-0">
            {[
              { key: 'all', label: 'All Tours' },
              { key: 'round-tours', label: 'Round Tours' },
              { key: 'activities', label: 'Activities' },
              { key: 'experience-tours', label: 'Experience Tours' },
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                  if (tab.key !== 'all') {
                    const el = document.getElementById(tab.key);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="relative flex-shrink-0 px-5 py-2.5 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300"
                style={{ color: activeTab === tab.key ? '#5e17eb' : '#999', fontFamily: "'DM Sans', sans-serif" }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                  style={{ width: activeTab === tab.key ? '100%' : '0%', background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── ROUND TOURS ──────────────────── */}
        <CategorySection categoryKey="round-tours" tours={roundTours} />

        {/* ── ACTIVITIES ───────────────────── */}
        <div className="bg-[#f4f4f4]">
          <CategorySection categoryKey="activities" tours={activities} />
        </div>

        {/* ── EXPERIENCE TOURS ─────────────── */}
        <CategorySection categoryKey="experience-tours" tours={experienceTours} />

        {/* ── CLOSING CTA ──────────────────── */}
        <div
          ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#e8e4df] px-6 sm:px-10 lg:px-20 py-20 lg:py-28 overflow-hidden relative"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none text-[#d4cfc9] tracking-tighter"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,160px)' }}
          >
            BOOK
          </span>
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="h-px w-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">Can't find what you need?</span>
              </div>
              <h3
                className={`font-black text-gray-900 tracking-tight leading-[0.95] transition-all duration-700 delay-100 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4.5vw, 58px)' }}
              >
                We Build Anything.
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  You Describe It.
                </span>
              </h3>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                href="/custom-planning"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
              >
                Custom Planning
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default ToursPage;