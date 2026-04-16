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
// Reading Progress Bar
// ─────────────────────────────────────────────
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full transition-all duration-100 ease-linear"
        style={{ width: `${progress}%`, background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// Form Field
// ─────────────────────────────────────────────
const FormField: React.FC<{ label: string; required?: boolean; children: React.ReactNode; className?: string }> = ({
  label, required, children, className = ''
}) => (
  <div className={`relative group ${className}`}>
    <label className="block text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-2 transition-colors duration-300 group-focus-within:text-[#5e17eb]">
      {label}{required && <span className="text-[#5e17eb] ml-0.5">*</span>}
    </label>
    {children}
    <div className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 ease-out group-focus-within:w-full"
      style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
  </div>
);

const InputBase  = "w-full bg-transparent border-b border-gray-200 py-2.5 text-gray-900 text-sm font-light placeholder-gray-300 focus:outline-none focus:border-transparent transition-all";
const SelectBase = "w-full bg-transparent border-b border-gray-200 py-2.5 text-gray-900 text-sm font-light focus:outline-none focus:border-transparent transition-all appearance-none cursor-pointer";

// ─────────────────────────────────────────────
// Tour Data
// ─────────────────────────────────────────────
const tourData = {
  id:             'rt1',
  slug:           'cultural-triangle-explorer',
  category:       'Round Tour',
  title:          'Cultural Triangle Explorer',
  tagline:        'Ancient kingdoms, sacred temples & timeless landscapes in one seamless arc.',
  badge:          'Most Popular',
  heroImage:      '../blogimg/sigiriya.avif',
  duration:       '7 Days / 6 Nights',
  groupSize:      '2–12 People',
  difficulty:     'Easy',
  departurePoint: 'Colombo or Negombo',
  price:          'From $1,240',
  priceNote:      'per person, twin share basis',
  overview: `The Cultural Triangle is Sri Lanka's crown jewel — a triangle of ancient cities that ruled the island for over two millennia. This seven-day journey traces that story from the ground up. You will stand inside a 5th-century fortress at dawn, walk the ruins of a city that once housed a million people and watch a full moon rise over a stupa built before the birth of Christ.

Every day is designed with intention. We move at your pace. Mornings belong to the ruins, middays to the villages and afternoons to the stories that connect them. Evenings are yours — whether that means sitting on a verandah with a cold lion lager, or meeting the astrologer our guests have been visiting for eleven years.`,
  highlights: [
    'Pre-dawn private access to Sigiriya Rock Fortress',
    'Polonnaruwa ancient city with archaeological guide',
    'Dambulla Cave Temple at the golden hour',
    'Private village astrologer consultation',
    'Minneriya elephant gathering (seasonal)',
    'Traditional ayurvedic village lunch',
    'Sunset boat ride on Kandalama Lake',
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & Colombo to Dambulla',
      description: 'Transfer from Colombo or Negombo to the Cultural Triangle. En route, stop at the spice gardens of Mawanella. Arrive at your jungle-edge boutique hotel. Evening: orientation walk with your guide.',
      overnight: 'Dambulla or Sigiriya',
    },
    {
      day: 2,
      title: 'Sigiriya — The Secret Hour',
      description: 'Pre-dawn private entry to Sigiriya Rock Fortress. Climb in silence while the sun rises over the eastern plains. Afternoon: Pidurangala Rock alternative view. Evening: meet the village astrologer.',
      overnight: 'Sigiriya',
    },
    {
      day: 3,
      title: 'Polonnaruwa Ancient City',
      description: 'Full day with a specialist archaeologist in Polonnaruwa — the Gal Vihara Buddha, the Royal Palace complex and the sacred quadrangle. Cycle through the ruins on hired bikes.',
      overnight: 'Polonnaruwa or Habarana',
    },
    {
      day: 4,
      title: 'Dambulla Cave Temple & Minneriya',
      description: 'Morning visit to the Cave Temple complex — five caves of murals dating to the 1st century BC. Afternoon: Minneriya national park game drive to witness the elephant gathering (August–October).',
      overnight: 'Habarana',
    },
    {
      day: 5,
      title: 'Anuradhapura — The First Kingdom',
      description: 'The oldest continuously inhabited city in the world. Walk around the sacred Bodhi Tree, the Ruwanwelisaya stupa and the ancient pleasure gardens. Afternoon: traditional village lunch experience.',
      overnight: 'Anuradhapura or Dambulla',
    },
    {
      day: 6,
      title: 'Kandy — The Last Kingdom',
      description: 'Transfer to Kandy through the spice-covered hills. Visit the Temple of the Tooth, the botanical gardens and the evening Kandyan dance performance. Sunset boat on Kandalama Lake.',
      overnight: 'Kandy',
    },
    {
      day: 7,
      title: 'Kandy to Colombo — Farewell',
      description: 'Morning at leisure in Kandy. Transfer back to Colombo or Bandaranaike Airport. Final debrief with your guide — and the addresses of everywhere worth returning to.',
      overnight: 'Departure',
    },
  ],
  includes: [
    'All accommodation (boutique & heritage properties)',
    'Private air-conditioned vehicle throughout',
    'Expert cultural guide for all days',
    'All entrance fees and park charges',
    'Daily breakfast + 3 special lunches',
    'Pre-dawn Sigiriya special access fee',
    'Village astrologer consultation',
    'All transfers and airport pickups',
  ],
  excludes: [
    'International flights',
    'Travel insurance (required)',
    'Personal expenses & tips',
    'Dinners (unless specified)',
    'Optional activity upgrades',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85',
    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85',
    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
  ],
  relatedTours: [
    {
      slug:     'hill-country-immersion',
      title:    'Hill Country Immersion',
      image:    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
      duration: '8 Days',
      price:    'From $1,560',
      category: 'Round Tour',
    },
    {
      slug:     'southern-coast-grand-tour',
      title:    'Southern Coast Grand Tour',
      image:    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&q=80',
      duration: '10 Days',
      price:    'From $1,890',
      category: 'Round Tour',
    },
    {
      slug:     'sigiriya-dawn-ritual',
      title:    'Sigiriya Dawn Ritual',
      image:    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85',
      duration: '1 Day',
      price:    'From $180',
      category: 'Experience Tour',
    },
  ],
};

// ─────────────────────────────────────────────
// Main Tour View Page
// ─────────────────────────────────────────────
const TourViewPage: React.FC = () => {
  const [isMenuOpen,       setIsMenuOpen]       = useState(false);
  const [activeGalleryImg, setActiveGalleryImg] = useState(0);
  const [formStatus,       setFormStatus]       = useState<'idle' | 'submitting' | 'success'>('idle');
  const [adults,           setAdults]           = useState(1);
  const [children,         setChildren]         = useState(0);
  const [activeTab,        setActiveTab]        = useState<'overview' | 'itinerary' | 'includes'>('overview');

  // ── NEW state for live API integration ──────────────────────
  const [bookingRef,  setBookingRef]  = useState<string>('');
  const [formError,   setFormError]   = useState<string>('');

  const heroRef    = useInView(0.1);
  const contentRef = useInView(0.05);
  const formRef    = useInView(0.08);
  const relatedRef = useInView(0.1);

  // ── LIVE handleSubmit — replaces the old setTimeout mock ────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const form     = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      salutation:         formData.get('salutation')        as string,
      fullName:           formData.get('fullName')           as string,
      email:              formData.get('email')              as string,
      phone:              formData.get('phone')              as string,
      preferredContact:   formData.get('preferredContact')   as string,
      tourName:           formData.get('tourName')           as string,
      // Metadata sent alongside selected tour name
      tourSlug:           tourData.slug,
      tourCategory:       tourData.category,
      tourDuration:       tourData.duration,
      tourPriceDisplay:   tourData.price,
      pickupLocation:     formData.get('pickupLocation')     as string,
      preferredStartDate: formData.get('preferredStartDate') as string,
      adults,
      children,
      luggageType:        formData.get('luggageType')        as string,
      additionalNotes:    formData.get('additionalNotes')    as string,
    };

    try {
      const res  = await fetch('/api/tour-booking', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || 'Something went wrong. Please try again.');
        setFormStatus('idle');
        return;
      }

      setBookingRef(data.bookingReference);
      setFormStatus('success');

    } catch {
      setFormError('Network error. Please check your connection and try again.');
      setFormStatus('idle');
    }
  };

  return (
    <>
      <ReadingProgressBar />

      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <article className="bg-[#ffffff] overflow-hidden" style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>

        {/* ── HERO ─────────────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative overflow-hidden"
          style={{ height: 'clamp(480px, 65vh, 780px)' }}
        >
          <img
            src={tourData.heroImage}
            alt={tourData.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2500ms] ease-out ${heroRef.inView ? 'scale-100' : 'scale-105'}`}
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.12) 100%)' }} />
          <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />

          {/* Breadcrumb */}
          <div className="absolute top-24 left-8 right-8 flex items-center gap-2 z-10">
            <Link href="/tours" className="text-white/50 text-xs tracking-widest uppercase hover:text-white transition-colors">Tours</Link>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white/50 text-xs tracking-widest uppercase">{tourData.category}</span>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 xl:px-28 pb-12 lg:pb-16">
            {/* Meta row */}
            <div className={`flex items-center gap-4 mb-6 flex-wrap transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {tourData.badge && (
                <span
                  className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 text-white"
                  style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tourData.badge}
                </span>
              )}
              <span className="text-white/60 text-xs border border-white/20 px-3 py-1">{tourData.category}</span>
              <span className="text-white/50 text-xs">·</span>
              <span className="text-white/60 text-xs">{tourData.duration}</span>
              <span className="text-white/50 text-xs">·</span>
              <span className="text-white/60 text-xs">{tourData.groupSize}</span>
            </div>

            {/* Title */}
            <h1
              className={`font-black text-white leading-[0.95] tracking-tight mb-5 max-w-4xl transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 5.5vw, 80px)' }}
            >
              {tourData.title}
            </h1>

            {/* Tagline */}
            <p
              className={`text-white/72 font-light leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ fontSize: 'clamp(14px, 1.4vw, 18px)' }}
            >
              {tourData.tagline}
            </p>

            {/* Price */}
            <div className={`mt-6 flex items-center gap-6 transition-all duration-700 delay-300 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div>
                <p className="text-white text-2xl font-black" style={{ fontFamily: "'Syne', sans-serif" }}>{tourData.price}</p>
                <p className="text-white/45 text-xs">{tourData.priceNote}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById('booking-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-bold tracking-widest uppercase text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              >
                Book This Tour
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── QUICK SPECS BAR ──────────────── */}
        <div className="bg-[#0d0d0d] px-6 sm:px-12 lg:px-20 py-5">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.07]">
            {[
              { label: 'Duration',    value: tourData.duration },
              { label: 'Group Size',  value: tourData.groupSize },
              { label: 'Difficulty',  value: tourData.difficulty },
              { label: 'Starts From', value: tourData.departurePoint },
            ].map((s, i) => (
              <div key={i} className="px-5 lg:px-8 first:pl-0 last:pr-0">
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-1">{s.label}</p>
                <p className="text-sm font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT SPLIT ───────────── */}
        <div className="bg-[#f4f4f4] px-6 sm:px-12 lg:px-20 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20">

            {/* ── LEFT COLUMN ── */}
            <div
              ref={contentRef.ref as React.RefObject<HTMLDivElement>}
              className={`transition-all duration-700 ${contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Tab nav */}
              <div className="flex items-center gap-0 border-b border-[#e8e4df] mb-10">
                {([
                  { key: 'overview',  label: 'Overview'  },
                  { key: 'itinerary', label: 'Itinerary' },
                  { key: 'includes',  label: 'Includes'  },
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className="relative px-5 py-3 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300"
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

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  <div className="space-y-5">
                    {tourData.overview.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-600 text-base leading-[1.85] font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div>
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-1 h-8 bg-[#5e17eb]" />
                      <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Tour Highlights
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tourData.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-[#ffffff] border border-[#e8e4df] hover:border-[#5e17eb]/20 transition-all duration-300 group">
                          <div
                            className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-white mt-0.5 transition-transform duration-300 group-hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 font-light leading-snug">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-1 h-8 bg-[#5e17eb]" />
                      <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Tour Gallery
                      </h3>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {tourData.gallery.map((img, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden cursor-pointer aspect-square"
                          onClick={() => setActiveGalleryImg(i)}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                          {i === activeGalleryImg && (
                            <div className="absolute inset-0" style={{ background: 'rgba(94,23,235,0.3)' }} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 overflow-hidden aspect-video">
                      <img
                        src={tourData.gallery[activeGalleryImg]}
                        alt="Selected"
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <div className="space-y-0">
                  {tourData.itinerary.map((day, i) => (
                    <div key={day.day} className="group relative flex gap-6 pb-10">
                      {i < tourData.itinerary.length - 1 && (
                        <div className="absolute left-[19px] top-12 bottom-0 w-px bg-[#e8e4df]" />
                      )}
                      <div
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-white text-xs font-black mt-1 transition-transform duration-300 group-hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', fontFamily: "'Syne', sans-serif" }}
                      >
                        {String(day.day).padStart(2, '0')}
                      </div>
                      <div className="flex-1 pt-1 pb-6 border-b border-[#e8e4df] last:border-0">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5e17eb] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Day {day.day}
                        </p>
                        <h4
                          className="text-lg font-black text-gray-900 tracking-tight mb-3 group-hover:text-[#5e17eb] transition-colors duration-300"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {day.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-light mb-3">{day.description}</p>
                        {day.overnight && (
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="square" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-xs text-gray-400 font-light">Overnight: {day.overnight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Includes Tab */}
              {activeTab === 'includes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-1 h-8 bg-[#5e17eb]" />
                      <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        What&apos;s Included
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {tourData.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-white mt-0.5"
                            style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                          >
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600 font-light leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-1 h-8 bg-gray-300" />
                      <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Not Included
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {tourData.excludes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center border border-gray-200 mt-0.5">
                            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-400 font-light leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN — BOOKING FORM ── */}
            <div
              id="booking-form"
              ref={formRef.ref as React.RefObject<HTMLDivElement>}
              className={`transition-all duration-700 delay-200 ${formRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="bg-[#ffffff] sticky top-20">
                {/* Top accent */}
                <div className="h-[3px]" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />

                <div className="p-8">
                  {/* Price header */}
                  <div className="mb-8 pb-8 border-b border-[#e8e4df]">
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Starting From
                    </p>
                    <p className="text-3xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {tourData.price}
                    </p>
                    <p className="text-xs text-gray-400 font-light mt-1">{tourData.priceNote}</p>
                  </div>

                  {/* ── SUCCESS STATE ─────────────────── */}
                  {formStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div
                        className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
                        style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                      >
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="w-8 h-px mx-auto mb-5" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                      <h3 className="text-xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Booking Received.
                      </h3>
                      {/* Booking reference display */}
                      {bookingRef && (
                        <div
                          className="mb-6 px-5 py-4 border-l-4 text-left"
                          style={{ background: '#f8f6ff', borderColor: '#5e17eb' }}
                        >
                          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-1">
                            Your Booking Reference
                          </p>
                          <p
                            className="text-lg font-black tracking-widest"
                            style={{ fontFamily: "'Syne', sans-serif", color: '#5e17eb' }}
                          >
                            {bookingRef}
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                        A confirmation email has been sent to your inbox. Our travel architect
                        will contact you within 24 hours to confirm your journey.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setFormStatus('idle'); setBookingRef(''); setFormError(''); }}
                        className="text-xs font-bold tracking-widest uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors"
                      >
                        Book Another Tour
                      </button>
                    </div>

                  ) : (
                    /* ── FORM ─────────────────────────────── */
                    <form onSubmit={handleSubmit} className="space-y-6">

                      {/* Salutation + Name */}
                      <div className="grid grid-cols-[80px_1fr] gap-4">
                        <FormField label="Title" required>
                          <div className="relative">
                            <select name="salutation" className={SelectBase} required defaultValue="">
                              <option value="" disabled>—</option>
                              <option>Mr.</option>
                              <option>Ms.</option>
                              <option>Mrs.</option>
                              <option>Dr.</option>
                            </select>
                            <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                        </FormField>
                        <FormField label="Full Name" required>
                          <input name="fullName" type="text" className={InputBase} placeholder="John Doe" required />
                        </FormField>
                      </div>

                      {/* Email */}
                      <FormField label="Email Address" required>
                        <input name="email" type="email" className={InputBase} placeholder="your@email.com" required />
                      </FormField>

                      {/* Phone */}
                      <FormField label="Phone / WhatsApp" required>
                        <input name="phone" type="tel" className={InputBase} placeholder="+1 234 567 890" required />
                      </FormField>

                      {/* Contact method */}
                      <FormField label="Preferred Contact" required>
                        <div className="relative">
                          <select name="preferredContact" className={SelectBase} required defaultValue="">
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

                      {/* Select Tour */}
                      <FormField label="Select Tour" required>
                        <div className="relative">
                          <select name="tourName" className={SelectBase} required defaultValue={tourData.title}>
                            <option>{tourData.title}</option>
                            <option>Southern Coast Grand Tour</option>
                            <option>Hill Country Immersion</option>
                            <option>Complete Island Odyssey</option>
                          </select>
                          <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </FormField>

                      {/* Pickup */}
                      <FormField label="Pickup Location" required>
                        <input name="pickupLocation" type="text" className={InputBase} placeholder="e.g. Colombo Airport, Hotel…" required />
                      </FormField>

                      {/* Preferred Start Date */}
                      <FormField label="Preferred Start Date">
                        <input name="preferredStartDate" type="date" className={InputBase} />
                      </FormField>

                      {/* Group size */}
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-3">Group Size</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[9px] text-gray-400 mb-2">Adults</p>
                            <div className="flex items-center gap-0 border-b border-gray-200 pb-1.5">
                              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-8 h-8 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M20 12H4" /></svg>
                              </button>
                              <span className="w-10 text-center text-base font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{adults}</span>
                              <button type="button" onClick={() => setAdults(adults + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M12 4v16m8-8H4" /></svg>
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 mb-2">Children</p>
                            <div className="flex items-center gap-0 border-b border-gray-200 pb-1.5">
                              <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M20 12H4" /></svg>
                              </button>
                              <span className="w-10 text-center text-base font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{children}</span>
                              <button type="button" onClick={() => setChildren(children + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-all">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="square" d="M12 4v16m8-8H4" /></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Luggage */}
                      <FormField label="Luggage">
                        <div className="relative">
                          <select name="luggageType" className={SelectBase} defaultValue="">
                            <option value="" disabled>Select type</option>
                            <option>Light — backpacks only</option>
                            <option>Standard — checked luggage</option>
                            <option>Heavy — multiple large bags</option>
                          </select>
                          <div className="absolute right-0 bottom-2.5 pointer-events-none text-gray-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </FormField>

                      {/* Additional notes */}
                      <FormField label="Additional Notes">
                        <textarea
                          name="additionalNotes"
                          className={`${InputBase} resize-none`}
                          rows={3}
                          placeholder="Dietary requirements, special occasions, specific interests…"
                        />
                      </FormField>

                      {/* Error message */}
                      {formError && (
                        <div
                          className="px-5 py-4 border-l-4 text-sm font-light text-red-700"
                          style={{ background: '#fff5f5', borderColor: '#e53e3e' }}
                        >
                          {formError}
                        </div>
                      )}

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 overflow-hidden disabled:opacity-70"
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
                                Book This Tour
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                        <p className="text-[9px] text-gray-400 font-light text-center mt-3 leading-relaxed">
                          No payment required now. We&apos;ll contact you to confirm availability.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED TOURS ────────────────── */}
        <div
          ref={relatedRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-12 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className={`flex items-center gap-4 mb-14 transition-all duration-700 ${relatedRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-1 h-8 bg-[#5e17eb]" />
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                You May Also Like
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {tourData.relatedTours.map((related, i) => (
                <Link
                  key={related.slug}
                  href={`/tours/${related.slug}`}
                  className="group block"
                  style={{
                    opacity:    relatedRef.inView ? 1 : 0,
                    transform:  relatedRef.inView ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                  }}
                >
                  <div className="overflow-hidden mb-4" style={{ aspectRatio: '3/2' }}>
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-2">
                    {related.category} · {related.duration}
                  </span>
                  <h4
                    className="text-lg font-black tracking-tight mb-1 transition-colors duration-300 group-hover:text-[#5e17eb]"
                    style={{ fontFamily: "'Syne', sans-serif", color: '#111' }}
                  >
                    {related.title}
                  </h4>
                  <p className="text-xs text-gray-500">{related.price}</p>
                </Link>
              ))}
            </div>

            <div className="mt-14">
              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-gray-400 transition-all duration-300 hover:text-[#5e17eb] hover:gap-5"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to All Tours
              </Link>
            </div>
          </div>
        </div>

      </article>

      <Footer />
    </>
  );
};

export default TourViewPage;