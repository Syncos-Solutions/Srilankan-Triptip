'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

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
        if (entry.isIntersecting && !fired) {
          setInView(true);
          setFired(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [fired, threshold]);

  return { ref, inView };
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface GalleryImage {
  id: number;
  src: string;
  thumb: string;
  alt: string;
  location: string;
  category: string;
  caption: string;
  span?: 'wide' | 'tall' | 'normal'; // grid layout hint
}

// ─────────────────────────────────────────────
// Gallery Data — curated Sri Lanka imagery
// ─────────────────────────────────────────────
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=800&q=85',
    alt: 'Sigiriya Rock Fortress at sunrise',
    location: 'Sigiriya',
    category: 'Culture',
    caption: 'The Lion Rock at 5:30am — 40 minutes before the world arrives.',
    span: 'wide',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=85',
    alt: 'Tea plantation terraces in Nuwara Eliya',
    location: 'Nuwara Eliya',
    category: 'Tea Country',
    caption: 'Emerald terraces roll endlessly into the mist of the hill country.',
    span: 'tall',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=85',
    alt: 'Sri Lankan elephant at Minneriya',
    location: 'Minneriya',
    category: 'Wildlife',
    caption: 'The Gathering — over 300 elephants converge at Minneriya each August.',
    span: 'normal',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
    alt: 'Misty mountains of central Sri Lanka',
    location: 'Ella',
    category: 'Nature',
    caption: 'Dawn mist settles between the peaks above Ella Gap.',
    span: 'normal',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=85',
    alt: 'Traditional fishing boats on turquoise waters',
    location: 'Mirissa',
    category: 'Coastline',
    caption: 'Oruwa fishing boats drift on waters the colour of aquamarine glass.',
    span: 'wide',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1590123591500-81e7ed70f86e?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1590123591500-81e7ed70f86e?w=800&q=85',
    alt: 'Temple of the Tooth Kandy lit at night',
    location: 'Kandy',
    category: 'Culture',
    caption: 'The Sacred Temple illuminated for the Esala Perahera festival.',
    span: 'normal',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1586101263897-8849e1de3c79?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1586101263897-8849e1de3c79?w=800&q=85',
    alt: 'Train crossing Nine Arch Bridge through jungle',
    location: 'Demodara',
    category: 'Adventure',
    caption: 'The iconic Nine Arch Bridge — colonial engineering swallowed by tropical green.',
    span: 'tall',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
    alt: 'Pristine white sand beach at sunrise',
    location: 'Tangalle',
    category: 'Coastline',
    caption: 'Tangalle\'s empty arc of white sand at the first light of morning.',
    span: 'normal',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=85',
    alt: 'Vibrant street market in Colombo',
    location: 'Colombo',
    category: 'Culture',
    caption: 'Pettah market — every colour, spice and fabric of the island in one block.',
    span: 'normal',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85',
    alt: 'Dramatic highland landscape with mist',
    location: 'Horton Plains',
    category: 'Nature',
    caption: 'World\'s End — a sheer 880-metre drop into the southern plains.',
    span: 'wide',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=85',
    alt: 'Blue whale surfacing off Sri Lanka coast',
    location: 'Mirissa',
    category: 'Wildlife',
    caption: 'A blue whale surfaces 12 kilometres off the coast — the largest animal on earth.',
    span: 'normal',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=85',
    alt: 'Scenic mountain trail through lush forest',
    location: 'Knuckles Range',
    category: 'Adventure',
    caption: 'The Knuckles mountain range — one of Sri Lanka\'s great hidden trekking corridors.',
    span: 'normal',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85',
    alt: 'Green valley with traditional Sri Lankan village',
    location: 'Dambulla',
    category: 'Nature',
    caption: 'The Cultural Triangle — ancient tanks and paddy fields unchanged for millennia.',
    span: 'tall',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=85',
    alt: 'Tropical sunset over Indian Ocean',
    location: 'Unawatuna',
    category: 'Coastline',
    caption: 'The Indian Ocean turns amber at dusk over Unawatuna Bay.',
    span: 'wide',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1600689695780-4a3ceedb9e01?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1600689695780-4a3ceedb9e01?w=800&q=85',
    alt: 'Ancient Buddhist stupa at Anuradhapura',
    location: 'Anuradhapura',
    category: 'Culture',
    caption: 'Ruwanwelisaya — a stupa built in 140 BC, still drawing pilgrims daily.',
    span: 'normal',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=85',
    alt: 'Leopard resting in Yala National Park',
    location: 'Yala',
    category: 'Wildlife',
    caption: 'Sri Lanka has the highest density of leopards of any country on earth.',
    span: 'normal',
  },
];

const categories = ['All', 'Culture', 'Nature', 'Wildlife', 'Adventure', 'Coastline', 'Tea Country'];

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(images.length - 1, currentIndex + 1));
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(5,5,7,0.97)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-8 z-10 text-white/60 hover:text-white transition-colors duration-200"
        aria-label="Close lightbox"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-8 z-10">
        <span
          className="text-xs text-white/40 tracking-[0.25em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Progress strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
            background: 'linear-gradient(to right, #5e17eb, #1800ad)',
          }}
        />
      </div>

      {/* Image container */}
      <div
        className="relative flex flex-col items-center max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[75vh] object-contain"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
        />

        {/* Caption band */}
        <div className="w-full mt-5 flex items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-px w-8"
                style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
              />
              <span
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {current.category}
              </span>
            </div>
            <p
              className="text-white/80 text-sm font-light leading-relaxed max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {current.caption}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p
              className="text-white/30 text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {current.location}
            </p>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Gallery Card
// ─────────────────────────────────────────────
interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  inView: boolean;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image, index, inView, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
        transition: `opacity 0.7s ease ${(index % 6) * 80}ms, transform 0.7s ease ${(index % 6) * 80}ms`,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View: ${image.alt}`}
    >
      {/* Image */}
      <img
        src={image.thumb}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        loading="lazy"
      />

      {/* Default subtle overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: 'rgba(0,0,0,0.12)', opacity: 1 }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Purple tint on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(94,23,235,0.18), rgba(24,0,173,0.12))',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Category tag — always visible */}
      <div
        className="absolute top-4 left-4 transition-all duration-300"
        style={{ transform: hovered ? 'translateY(-2px)' : 'translateY(0)' }}
      >
        <span
          className="text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1.5 text-white/80 border border-white/20 backdrop-blur-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {image.category}
        </span>
      </div>

      {/* Expand icon on hover */}
      <div
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/30 text-white transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>

      {/* Caption band — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ease-out"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        {/* Accent line */}
        <div
          className="h-px mb-3 transition-all duration-700"
          style={{
            background: 'linear-gradient(to right, #5e17eb, #1800ad)',
            width: hovered ? '40px' : '0px',
          }}
        />
        <p
          className="text-xs font-bold text-white tracking-tight mb-1 line-clamp-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {image.location}
        </p>
        <p
          className="text-[11px] text-white/65 font-light leading-relaxed line-clamp-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {image.caption}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Gallery Page
// ─────────────────────────────────────────────
const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroRef = useInView(0.1);
  const statsRef = useInView(0.1);
  const gridRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <>
      <main
        className="bg-[#f4f4f4] overflow-hidden"
        style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
      >
        {/* ── PAGE HEADER ──────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-20 pt-24 pb-14 overflow-hidden"
        >
          {/* Watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-0 font-black leading-none tracking-tighter text-[#f4f4f4]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(100px,17vw,220px)' }}
          >
            VISUAL
          </span>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            {/* Label row */}
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
              <span className="text-xs tracking-widest text-gray-400 uppercase">Visual Archive</span>
            </div>

            {/* Headline */}
            <h1
              className={`font-black tracking-tighter text-gray-900 leading-[0.91] mb-6 transition-all duration-700 delay-100 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(44px,7.5vw,112px)' }}
            >
              The Island,
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Unfiltered.
              </span>
            </h1>

            <div
              className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-700 delay-200 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="max-w-md text-base sm:text-lg text-gray-500 leading-relaxed font-light">
                Every frame captured by our guides on the ground. No stock images —
                only the Sri Lanka our guests actually experience.
              </p>
              <div className="flex-shrink-0">
                <span className="text-xs tracking-[0.25em] text-gray-400 uppercase">
                  {galleryImages.length} Frames
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── HERO CINEMATIC STRIP ─────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 pb-0">
          <div className="max-w-[1400px] mx-auto">
            <div
              className="relative overflow-hidden"
              style={{ height: 'clamp(320px, 50vw, 620px)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=1800&q=90"
                alt="Sigiriya — the heart of Sri Lanka"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              />
              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 lg:pb-10">
                <div
                  className="h-px w-10 mb-4"
                  style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
                />
                <p
                  className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Sigiriya, Sri Lanka
                </p>
                <p
                  className="text-white/80 text-sm font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  The Lion Rock at 5:30am — 40 minutes before the world arrives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ──────────────────── */}
        <div
          ref={statsRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-10 border-b border-[#e8e4df]"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e8e4df]">
            {[
              { num: '160+', label: 'Locations Covered', sub: 'Across the entire island' },
              { num: '6', label: 'Categories', sub: 'Culture · Nature · Wildlife & more' },
              { num: '100%', label: 'Original Frames', sub: 'Shot by our own guides' },
              { num: '12+', label: 'Years Documenting', sub: 'Sri Lanka\'s true beauty' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${
                  statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: statsRef.inView ? `${i * 80}ms` : '0ms' }}
              >
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-black leading-none tracking-tighter mb-1.5"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.num}
                </div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-0.5">{s.label}</div>
                <div className="text-[11px] text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORY FILTER ──────────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-8 sticky top-0 z-30 border-b border-[#e8e4df] backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto flex items-center overflow-x-auto gap-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="relative flex-shrink-0 px-5 py-2 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  color: activeCategory === cat ? '#5e17eb' : '#999',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                aria-pressed={activeCategory === cat}
              >
                {cat}
                <span
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                  style={{
                    width: activeCategory === cat ? '100%' : '0%',
                    background: 'linear-gradient(to right, #5e17eb, #1800ad)',
                  }}
                />
              </button>
            ))}
            {/* Count */}
            <span className="ml-auto flex-shrink-0 text-[10px] text-gray-400 tracking-widest uppercase">
              {filtered.length} Images
            </span>
          </div>
        </div>

        {/* ── EDITORIAL GRID ───────────────── */}
        <div
          ref={gridRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-12 lg:py-16"
        >
          <div className="max-w-[1400px] mx-auto">
            {/*
              Premium editorial grid using CSS grid areas:
              - Row 1: 1 wide (2/3 width) + 1 tall (1/3 width, spans 2 rows)
              - Row 2: 2 normal squares (fills left side of row 1's remaining space)
              - Row 3: 3 equal columns
              - Row 4: 1 tall + 1 wide
              etc. Pattern repeats.
            */}
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: 'auto',
              }}
            >
              {filtered.map((image, index) => {
                // Determine grid pattern based on position within group of 6
                const posInGroup = index % 6;
                let gridStyle: React.CSSProperties = {};
                let heightStyle = 'clamp(200px, 22vw, 340px)';

                if (posInGroup === 0) {
                  // Wide image — spans 2 cols
                  gridStyle = { gridColumn: 'span 2' };
                  heightStyle = 'clamp(260px, 28vw, 420px)';
                } else if (posInGroup === 1) {
                  // Tall image — spans 2 rows visually by having extra height
                  gridStyle = { gridColumn: 'span 1' };
                  heightStyle = 'clamp(280px, 30vw, 460px)';
                } else if (posInGroup === 2 || posInGroup === 3) {
                  // Normal squares
                  gridStyle = { gridColumn: 'span 1' };
                  heightStyle = 'clamp(180px, 19vw, 290px)';
                } else if (posInGroup === 4) {
                  // Normal
                  gridStyle = { gridColumn: 'span 1' };
                  heightStyle = 'clamp(200px, 22vw, 340px)';
                } else {
                  // Wide again
                  gridStyle = { gridColumn: 'span 2' };
                  heightStyle = 'clamp(240px, 25vw, 380px)';
                }

                return (
                  <div
                    key={image.id}
                    style={{ ...gridStyle, height: heightStyle }}
                  >
                    <GalleryCard
                      image={image}
                      index={index}
                      inView={gridRef.inView}
                      onClick={() => openLightbox(index)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Load more */}
            <div
              className={`mt-14 flex items-center gap-6 transition-all duration-700 delay-400 ${
                gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex-1 h-px bg-[#e8e4df]" />
              <button
                type="button"
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase border border-gray-300 text-gray-700 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
              >
                Load More Images
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="flex-1 h-px bg-[#e8e4df]" />
            </div>
          </div>
        </div>

        {/* ── CLOSING CTA ──────────────────── */}
        <div
          ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#e8e4df] px-6 sm:px-10 lg:px-20 py-20 lg:py-28 overflow-hidden relative"
        >
          {/* Ghost text */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none text-[#d4cfc9] tracking-tighter"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,160px)' }}
          >
            EXPLORE
          </span>

          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="h-px w-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">
                  Experience It Live
                </span>
              </div>
              <h3
                className={`font-black text-gray-900 tracking-tight leading-[0.95] transition-all duration-700 delay-100 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(28px, 4.5vw, 58px)',
                }}
              >
                These Aren&apos;t Just Photos.
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  They&apos;re Your Future Memories.
                </span>
              </h3>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${
                ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
              >
                Plan Your Trip
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
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

      {/* ── LIGHTBOX ─────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
};

export default GalleryPage;