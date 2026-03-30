'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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
}

interface VideoItem {
  id: number;
  src: string;
  poster: string;
  title: string;
  location: string;
  duration: string;
}

// ─────────────────────────────────────────────
// Gallery Data
// ─────────────────────────────────────────────
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=900&q=85',
    alt: 'Sigiriya Rock Fortress at sunrise',
    location: 'Sigiriya',
    category: 'Culture',
    caption: 'The Lion Rock at 5:30am — 40 minutes before the world arrives.',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    alt: 'Tea plantation terraces in Nuwara Eliya',
    location: 'Nuwara Eliya',
    category: 'Tea Country',
    caption: 'Emerald terraces roll endlessly into the mist of the hill country.',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85',
    alt: 'Sri Lankan elephant at Minneriya',
    location: 'Minneriya',
    category: 'Wildlife',
    caption: 'The Gathering — over 300 elephants converge at Minneriya each August.',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
    alt: 'Misty mountains of central Sri Lanka',
    location: 'Ella',
    category: 'Nature',
    caption: 'Dawn mist settles between the peaks above Ella Gap.',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=900&q=85',
    alt: 'Traditional fishing boats on turquoise waters',
    location: 'Mirissa',
    category: 'Coastline',
    caption: 'Oruwa fishing boats drift on waters the colour of aquamarine glass.',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1590123591500-81e7ed70f86e?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1590123591500-81e7ed70f86e?w=900&q=85',
    alt: 'Temple of the Tooth Kandy lit at night',
    location: 'Kandy',
    category: 'Culture',
    caption: 'The Sacred Temple illuminated for the Esala Perahera festival.',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1586101263897-8849e1de3c79?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1586101263897-8849e1de3c79?w=900&q=85',
    alt: 'Train crossing Nine Arch Bridge through jungle',
    location: 'Demodara',
    category: 'Adventure',
    caption: 'The iconic Nine Arch Bridge — colonial engineering swallowed by tropical green.',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    alt: 'Pristine white sand beach at sunrise',
    location: 'Tangalle',
    category: 'Coastline',
    caption: "Tangalle's empty arc of white sand at the first light of morning.",
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=900&q=85',
    alt: 'Vibrant street market in Colombo',
    location: 'Colombo',
    category: 'Culture',
    caption: 'Pettah market — every colour, spice and fabric of the island in one block.',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85',
    alt: 'Dramatic highland landscape with mist',
    location: 'Horton Plains',
    category: 'Nature',
    caption: "World's End — a sheer 880-metre drop into the southern plains.",
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=900&q=85',
    alt: 'Blue whale surfacing off Sri Lanka coast',
    location: 'Mirissa',
    category: 'Wildlife',
    caption: 'A blue whale surfaces 12 kilometres off the coast — the largest animal on earth.',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85',
    alt: 'Scenic mountain trail through lush forest',
    location: 'Knuckles Range',
    category: 'Adventure',
    caption: "The Knuckles mountain range — one of Sri Lanka's great hidden trekking corridors.",
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=85',
    alt: 'Green valley with traditional Sri Lankan village',
    location: 'Dambulla',
    category: 'Nature',
    caption: 'The Cultural Triangle — ancient tanks and paddy fields unchanged for millennia.',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=85',
    alt: 'Tropical sunset over Indian Ocean',
    location: 'Unawatuna',
    category: 'Coastline',
    caption: 'The Indian Ocean turns amber at dusk over Unawatuna Bay.',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1600689695780-4a3ceedb9e01?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1600689695780-4a3ceedb9e01?w=900&q=85',
    alt: 'Ancient Buddhist stupa at Anuradhapura',
    location: 'Anuradhapura',
    category: 'Culture',
    caption: 'Ruwanwelisaya — a stupa built in 140 BC, still drawing pilgrims daily.',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1600&q=90',
    thumb: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=85',
    alt: 'Leopard resting in Yala National Park',
    location: 'Yala',
    category: 'Wildlife',
    caption: 'Sri Lanka has the highest density of leopards of any country on earth.',
  },
];

const videoItems: VideoItem[] = [
  {
    id: 1,
    src: 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=900&q=80',
    title: 'Sigiriya at Dawn',
    location: 'Sigiriya, Central Province',
    duration: '0:42',
  },
  {
    id: 2,
    src: 'https://assets.mixkit.co/videos/43162/43162-720.mp4',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    title: 'Misty Highlands',
    location: 'Ella, Uva Province',
    duration: '1:04',
  },
  {
    id: 3,
    src: 'https://assets.mixkit.co/videos/43165/43165-720.mp4',
    poster: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=80',
    title: 'Tea Country',
    location: 'Nuwara Eliya',
    duration: '0:58',
  },
  {
    id: 4,
    src: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=80',
    title: 'Indian Ocean',
    location: 'Mirissa, Southern Province',
    duration: '1:12',
  },
];

const categories = ['All', 'Culture', 'Nature', 'Wildlife', 'Adventure', 'Coastline', 'Tea Country'];

// ─────────────────────────────────────────────
// Grid layout config — 4 unique patterns
// Each pattern = array of {col, row} spans
// for a 12-column grid
// ─────────────────────────────────────────────
// Pattern for groups of 5 images:
// [0]: hero   12 cols, row-span 2   (full width, tall)
// [1]: left   5 cols,  row-span 2   (tall left)
// [2]: right  7 cols,  row-span 1   (wide right top)
// [3]: right  4 cols,  row-span 1   (right mid)
// [4]: right  3 cols,  row-span 1   (right mid small)
// then repeat ...
// We'll use a named area system with inline CSS grid

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
      style={{ background: 'rgba(5,5,7,0.98)' }}
      onClick={onClose}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
            background: 'linear-gradient(to right, #5e17eb, #1800ad)',
          }}
        />
      </div>

      {/* Counter */}
      <div className="absolute top-7 left-8 z-10">
        <span className="text-xs text-white/35 tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Close */}
      <button type="button" onClick={onClose}
        className="absolute top-6 right-8 z-10 w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
        aria-label="Close lightbox">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative flex flex-col items-center max-w-[88vw] max-h-[88vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[72vh] object-contain"
          style={{ boxShadow: '0 60px 120px rgba(0,0,0,0.7)' }}
        />

        {/* Caption */}
        <div className="w-full mt-6 flex items-start justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {current.category}
              </span>
            </div>
            <p className="text-white/75 text-sm font-light leading-relaxed max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {current.caption}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase">{current.location}</p>
          </div>
        </div>
      </div>

      {/* Prev */}
      {currentIndex > 0 && (
        <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
          aria-label="Previous image">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
          aria-label="Next image">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Thumbnails strip */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 py-4 px-8 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
            className="flex-shrink-0 transition-all duration-300"
            style={{
              width: i === currentIndex ? '48px' : '32px',
              height: '32px',
              opacity: i === currentIndex ? 1 : 0.35,
              outline: i === currentIndex ? '1px solid #5e17eb' : 'none',
              outlineOffset: '2px',
            }}
            aria-label={`Go to image ${i + 1}`}
          >
            <img src={img.thumb} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Gallery Card (shared)
// ─────────────────────────────────────────────
interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  inView: boolean;
  onClick: () => void;
  delayMs?: number;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image, index, inView, onClick, delayMs = 0 }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer w-full h-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.99)',
        transition: `opacity 0.75s ease ${delayMs}ms, transform 0.75s ease ${delayMs}ms`,
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
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2200ms] ease-out"
        style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
        loading="lazy"
      />

      {/* Base dark wash */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.08)' }} />

      {/* Hover gradient */}
      <div className="absolute inset-0 transition-opacity duration-600"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 45%, transparent 100%)', opacity: hovered ? 1 : 0 }} />

      {/* Purple accent tint */}
      <div className="absolute inset-0 transition-opacity duration-700"
        style={{ background: 'linear-gradient(135deg, rgba(94,23,235,0.15), rgba(24,0,173,0.1))', opacity: hovered ? 1 : 0 }} />

      {/* Category badge */}
      <div className="absolute top-4 left-4 transition-all duration-300" style={{ transform: hovered ? 'translateY(-2px)' : 'translateY(0)' }}>
        <span className="text-[9px] font-bold tracking-[0.28em] uppercase px-2.5 py-1.5 text-white/75 border border-white/18 backdrop-blur-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {image.category}
        </span>
      </div>

      {/* Expand icon */}
      <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/25 text-white transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(-10deg)' }}>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>

      {/* Caption — slides up */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ease-out"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(10px)' }}>
        <div className="h-px mb-3 transition-all duration-600" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)', width: hovered ? '36px' : '0px' }} />
        <p className="text-xs font-black text-white tracking-tight mb-0.5 line-clamp-1" style={{ fontFamily: "'Syne', sans-serif" }}>
          {image.location}
        </p>
        <p className="text-[11px] text-white/60 font-light leading-relaxed line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {image.caption}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// PREMIUM EDITORIAL GRID
// Layout: repeating 5-image patterns with
// varied sizes — no uniform columns
// ─────────────────────────────────────────────
interface EditorialGridProps {
  images: GalleryImage[];
  inView: boolean;
  onOpen: (i: number) => void;
}

const EditorialGrid: React.FC<EditorialGridProps> = ({ images, inView, onOpen }) => {
  // Split into groups of 5 for pattern A, then groups of 6 for pattern B
  const groups: Array<{ pattern: 'A' | 'B' | 'C'; items: GalleryImage[]; startIdx: number }> = [];

  let idx = 0;
  let patternTurn = 0;
  while (idx < images.length) {
    const patterns = ['A', 'B', 'C'] as const;
    const pattern = patterns[patternTurn % 3];
    const size = pattern === 'A' ? 5 : pattern === 'B' ? 6 : 4;
    const slice = images.slice(idx, idx + size);
    if (slice.length === 0) break;
    groups.push({ pattern, items: slice, startIdx: idx });
    idx += size;
    patternTurn++;
  }

  return (
    <div className="space-y-2">
      {groups.map((group, gi) => {
        if (group.pattern === 'A' && group.items.length >= 3) {
          // Pattern A: 1 hero (full width) + row of up to 4 equal
          const [hero, ...rest] = group.items;
          return (
            <div key={gi} className="space-y-2">
              {/* Hero — full width, taller */}
              <div className="relative w-full" style={{ height: 'clamp(280px, 38vw, 560px)' }}>
                <GalleryCard image={hero} index={group.startIdx} inView={inView} onClick={() => onOpen(group.startIdx)} delayMs={0} />
              </div>
              {/* Sub-row: equal columns */}
              {rest.length > 0 && (
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${rest.length}, 1fr)` }}>
                  {rest.map((img, ri) => (
                    <div key={img.id} className="relative" style={{ height: 'clamp(180px, 22vw, 320px)' }}>
                      <GalleryCard image={img} index={group.startIdx + ri + 1} inView={inView} onClick={() => onOpen(group.startIdx + ri + 1)} delayMs={(ri + 1) * 80} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        if (group.pattern === 'B' && group.items.length >= 2) {
          // Pattern B: 2-column split — left tall (2 rows), right: 3 stacked
          const [tallLeft, ...rightItems] = group.items;
          const rightCol = rightItems.slice(0, 2);
          const bottomRow = rightItems.slice(2);
          return (
            <div key={gi} className="space-y-2">
              <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* Left: tall */}
                <div className="relative" style={{ height: 'clamp(340px, 45vw, 660px)' }}>
                  <GalleryCard image={tallLeft} index={group.startIdx} inView={inView} onClick={() => onOpen(group.startIdx)} delayMs={0} />
                </div>
                {/* Right: stacked 2 */}
                <div className="flex flex-col gap-2">
                  {rightCol.map((img, ri) => (
                    <div key={img.id} className="relative flex-1" style={{ minHeight: 'clamp(160px, 21vw, 320px)' }}>
                      <GalleryCard image={img} index={group.startIdx + ri + 1} inView={inView} onClick={() => onOpen(group.startIdx + ri + 1)} delayMs={(ri + 1) * 90} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom row: 3 equal */}
              {bottomRow.length > 0 && (
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${bottomRow.length}, 1fr)` }}>
                  {bottomRow.map((img, ri) => (
                    <div key={img.id} className="relative" style={{ height: 'clamp(160px, 20vw, 300px)' }}>
                      <GalleryCard image={img} index={group.startIdx + rightCol.length + ri + 1} inView={inView} onClick={() => onOpen(group.startIdx + rightCol.length + ri + 1)} delayMs={(rightCol.length + ri + 1) * 80} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        if (group.pattern === 'C' && group.items.length >= 2) {
          // Pattern C: 3-column grid, first item 2-wide
          const [wide, ...rest] = group.items;
          return (
            <div key={gi} className="space-y-2">
              <div className="grid gap-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
                {/* Wide left */}
                <div className="relative" style={{ height: 'clamp(220px, 28vw, 420px)' }}>
                  <GalleryCard image={wide} index={group.startIdx} inView={inView} onClick={() => onOpen(group.startIdx)} delayMs={0} />
                </div>
                {/* Right tall */}
                {rest[0] && (
                  <div className="relative" style={{ height: 'clamp(220px, 28vw, 420px)' }}>
                    <GalleryCard image={rest[0]} index={group.startIdx + 1} inView={inView} onClick={() => onOpen(group.startIdx + 1)} delayMs={80} />
                  </div>
                )}
              </div>
              {/* Bottom: 2 equal */}
              {rest.slice(1).length > 0 && (
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${rest.slice(1).length}, 1fr)` }}>
                  {rest.slice(1).map((img, ri) => (
                    <div key={img.id} className="relative" style={{ height: 'clamp(160px, 19vw, 290px)' }}>
                      <GalleryCard image={img} index={group.startIdx + ri + 2} inView={inView} onClick={() => onOpen(group.startIdx + ri + 2)} delayMs={(ri + 2) * 80} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Fallback: uniform row
        return (
          <div key={gi} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(group.items.length, 3)}, 1fr)` }}>
            {group.items.map((img, ri) => (
              <div key={img.id} className="relative" style={{ height: 'clamp(200px, 24vw, 360px)' }}>
                <GalleryCard image={img} index={group.startIdx + ri} inView={inView} onClick={() => onOpen(group.startIdx + ri)} delayMs={ri * 80} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────
// Mobile Grid (simple 2-col masonry-like)
// ─────────────────────────────────────────────
interface MobileGridProps {
  images: GalleryImage[];
  inView: boolean;
  onOpen: (i: number) => void;
}

const MobileGrid: React.FC<MobileGridProps> = ({ images, inView, onOpen }) => {
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 === 1);

  const heights = ['200px', '260px', '220px', '240px', '200px', '280px', '220px', '240px'];

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Column 1 */}
      <div className="flex flex-col gap-2">
        {col1.map((img, ci) => {
          const globalIdx = ci * 2;
          const h = heights[ci % heights.length];
          return (
            <div key={img.id} className="relative" style={{ height: h }}>
              <GalleryCard image={img} index={globalIdx} inView={inView} onClick={() => onOpen(globalIdx)} delayMs={ci * 60} />
            </div>
          );
        })}
      </div>
      {/* Column 2 — offset heights */}
      <div className="flex flex-col gap-2 pt-8">
        {col2.map((img, ci) => {
          const globalIdx = ci * 2 + 1;
          const h = heights[(ci + 3) % heights.length];
          return (
            <div key={img.id} className="relative" style={{ height: h }}>
              <GalleryCard image={img} index={globalIdx} inView={inView} onClick={() => onOpen(globalIdx)} delayMs={ci * 60 + 40} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Video Card
// ─────────────────────────────────────────────
const VideoCard: React.FC<{ video: VideoItem; index: number; inView: boolean }> = ({ video, index, inView }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className="relative overflow-hidden group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s ease ${index * 140}ms, transform 0.8s ease ${index * 140}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video wrapper */}
      <div className="relative overflow-hidden" style={{ aspectRatio: index === 0 ? '16/9' : '4/5' }}>
        {/* Poster fallback */}
        <img
          src={video.poster}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />

        {/* Video element */}
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: loaded && playing ? 1 : 0 }}
          onLoadedData={() => setLoaded(true)}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)', opacity: hovered || playing ? 1 : 0.5 }} />

        {/* Purple tint */}
        <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />

        {/* Duration badge */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-bold tracking-widest text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1">
            {video.duration}
          </span>
        </div>

        {/* Play / Pause button */}
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          <div
            className="w-14 h-14 flex items-center justify-center border border-white/40 text-white transition-all duration-300"
            style={{
              background: playing ? 'rgba(94,23,235,0.7)' : 'rgba(0,0,0,0.4)',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {playing ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </div>
        </button>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          <div className="h-px mb-3 transition-all duration-600" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)', width: hovered ? '36px' : '20px' }} />
          <p className="text-sm font-black text-white tracking-tight leading-none mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {video.title}
          </p>
          <p className="text-[11px] text-white/55 font-light">{video.location}</p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Gallery Page
// ─────────────────────────────────────────────
const GalleryPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(16);

  const heroRef    = useInView(0.08);
  const statsRef   = useInView(0.1);
  const gridRef    = useInView(0.04);
  const videoRef   = useInView(0.08);
  const ctaRef     = useInView(0.1);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

  const openLightbox  = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navigateLightbox = useCallback((index: number) => setLightboxIndex(index), []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(16);
  };

  return (
    <>
      <main className="bg-[#f4f4f4] overflow-hidden" style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>
        <Navbar
          isIntro={false}
          isMenuOpen={isMenuOpen}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />

        {/* ── PAGE HEADER ─────────────────────────── */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-12 pt-36 lg:pt-44 pb-12 overflow-hidden"
        >
          <span aria-hidden="true"
            className="pointer-events-none select-none absolute -right-2 top-0 font-black leading-none tracking-tighter text-[#f4f4f4]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(110px,18vw,240px)' }}>
            VISUAL
          </span>

          <div className="relative z-10 max-w-[1800px] mx-auto">
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sri Lankan TripTip
              </span>
              <div className="h-px w-12 bg-[#5e17eb]" />
              <span className="text-xs tracking-widest text-gray-400 uppercase">Visual Archive</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
              <h1
                className={`font-black tracking-tighter text-gray-900 leading-[0.91] transition-all duration-700 delay-100 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(48px,8vw,120px)' }}>
                The Island,
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Unfiltered.
                </span>
              </h1>

              <div className={`lg:pb-3 max-w-xs transition-all duration-700 delay-200 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="w-8 h-px bg-[#5e17eb] mb-4" />
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Every frame captured by our guides on the ground. No stock images —
                  only the Sri Lanka our guests actually experience.
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mt-4">
                  {galleryImages.length} Frames · 160+ Locations
                </p>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="mt-12 w-full h-px bg-[#e8e4df]" />
        </div>

        {/* ── CINEMATIC HERO STRIP ─────────────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 pb-0">
          <div className="max-w-[1800px] mx-auto">
            <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 48vw, 640px)' }}>
              <img
                src="https://images.unsplash.com/photo-1580181516989-5e42a4c33b36?w=2000&q=90"
                alt="Sigiriya — the heart of Sri Lanka"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 28%' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.04) 100%)' }} />
              <div className="absolute inset-0 opacity-18" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />

              {/* Location label top right */}
              <div className="absolute top-6 right-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Sigiriya · Sri Lanka
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-12 pb-10 lg:pb-14">
                <div className="h-px w-10 mb-5" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-white/45 text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Featured Frame
                    </p>
                    <p className="text-white text-base sm:text-xl font-light leading-snug max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      The Lion Rock at 5:30am — 40 minutes before the world arrives.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pb-1">
                    <span className="text-[10px] tracking-widest text-white/40 uppercase">Culture</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] tracking-widest text-white/40 uppercase">Central Province</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ─────────────────────────── */}
        <div
          ref={statsRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-10 border-b border-[#e8e4df]"
        >
          <div className="max-w-[1800px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e8e4df]">
            {[
              { num: '160+', label: 'Locations Covered', sub: 'Across the entire island' },
              { num: '7', label: 'Categories', sub: 'Culture · Nature · Wildlife & more' },
              { num: '100%', label: 'Original Frames', sub: 'Shot by our own guides' },
              { num: '12+', label: 'Years Documenting', sub: "Sri Lanka's true beauty" },
            ].map((s, i) => (
              <div key={s.label}
                className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black leading-none tracking-tighter mb-1.5"
                  style={{ fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.num}
                </div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-0.5">{s.label}</div>
                <div className="text-[11px] text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORY FILTER ─────────────────────── */}
        <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-0 sticky top-0 z-30 border-b border-[#e8e4df]"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.96)' }}>
          <div className="max-w-[1800px] mx-auto flex items-center overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => handleCategoryChange(cat)}
                className="relative flex-shrink-0 px-5 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300"
                style={{ color: activeCategory === cat ? '#5e17eb' : '#aaa', fontFamily: "'DM Sans', sans-serif" }}
                aria-pressed={activeCategory === cat}>
                {cat}
                <span className="absolute bottom-0 left-0 h-[2px] transition-all duration-400"
                  style={{ width: activeCategory === cat ? '100%' : '0%', background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
              </button>
            ))}
            <span className="ml-auto flex-shrink-0 text-[10px] text-gray-400 tracking-widest uppercase pr-1">
              {filtered.length} images
            </span>
          </div>
        </div>

        {/* ── EDITORIAL GRID ───────────────────────── */}
        <div
          ref={gridRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-8 lg:py-10"
        >
          <div className="max-w-[1800px] mx-auto">

            {/* Desktop & Tablet: Editorial grid */}
            <div className="hidden sm:block">
              <EditorialGrid images={visible} inView={gridRef.inView} onOpen={openLightbox} />
            </div>

            {/* Mobile: Staggered 2-col */}
            <div className="sm:hidden">
              <MobileGrid images={visible} inView={gridRef.inView} onOpen={openLightbox} />
            </div>

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div className={`mt-12 flex items-center gap-6 transition-all duration-700 ${gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex-1 h-px bg-[#e8e4df]" />
                <button type="button"
                  onClick={() => setVisibleCount(v => v + 12)}
                  className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase border border-gray-300 text-gray-700 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]">
                  Load More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="flex-1 h-px bg-[#e8e4df]" />
              </div>
            )}
          </div>
        </div>

        {/* ── VIDEO SECTION ───────────────────────── */}
        <div
          ref={videoRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#050507] px-6 sm:px-10 lg:px-12 py-24 lg:py-32 relative overflow-hidden"
        >
          {/* Dot texture */}
          <div aria-hidden="true" className="absolute top-0 right-0 w-[40%] h-full opacity-[0.035] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Ambient glow */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] blur-[200px] opacity-12 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #5e17eb, transparent 70%)' }} />

          <div className="max-w-[1800px] mx-auto relative z-10">

            {/* Header */}
            <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-700 ${videoRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[#5e17eb]" />
                  <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Moving Frames
                  </span>
                </div>
                <h2 className="text-[clamp(32px,5vw,72px)] font-black text-white tracking-tight leading-[0.95]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Sri Lanka in
                  <br />
                  <span style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Motion.
                  </span>
                </h2>
              </div>
              <p className="max-w-xs text-white/45 font-light leading-relaxed text-sm lg:pb-2">
                Short films from the ground. Play any clip to feel the island before you arrive.
              </p>
            </div>

            {/* Video grid — 1 large + 3 portrait */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-3">
              {/* Main feature video */}
              {videoItems[0] && (
                <VideoCard video={videoItems[0]} index={0} inView={videoRef.inView} />
              )}
              {/* 3 portrait videos */}
              <div className="grid grid-cols-1 gap-3 lg:contents">
                {videoItems.slice(1).map((video, i) => (
                  <VideoCard key={video.id} video={video} index={i + 1} inView={videoRef.inView} />
                ))}
              </div>
            </div>

            {/* Mobile layout override */}
            <style jsx>{`
              @media (max-width: 1024px) {
                .video-grid {
                  grid-template-columns: 1fr 1fr;
                }
              }
              @media (max-width: 640px) {
                .video-grid {
                  grid-template-columns: 1fr;
                }
              }
            `}</style>

            {/* Bottom CTA */}
            <div className={`mt-14 flex items-center gap-6 transition-all duration-700 delay-500 ${videoRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex-1 h-px bg-white/10" />
              <a href="https://www.youtube.com/@srilankantriptip" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase border border-white/15 text-white/50 transition-all duration-300 hover:border-[#5e17eb] hover:text-white">
                Watch More on YouTube
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </div>
        </div>

        {/* ── CLOSING CTA ─────────────────────────── */}
        <div
          ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-20 lg:py-28 overflow-hidden relative"
        >
          <span aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none text-[#d4cfc9] tracking-tighter"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px,13vw,160px)' }}>
            EXPLORE
          </span>

          <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="h-px w-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">Experience It Live</span>
              </div>
              <h3
                className={`font-black text-gray-900 tracking-tight leading-[0.95] transition-all duration-700 delay-100 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4.5vw, 58px)' }}>
                These Aren&apos;t Just Photos.
                <br />
                <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  They&apos;re Your Future Memories.
                </span>
              </h3>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link href="/tours"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}>
                Plan Your Trip
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      {/* ── LIGHTBOX ────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
};

export default GalleryPage;