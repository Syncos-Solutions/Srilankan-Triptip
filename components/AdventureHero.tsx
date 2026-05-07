'use client';
// AdventureHero.tsx
// Changes from original:
//  1. Internal Navbar + MenuOverlay REMOVED — imported from @/components/Navbar
//  2. h1 "S r i L a n k a" font changed to Syne 800 + purple-brand gradient
//  3. Unused HamburgerIcon, CloseIcon, ChevronRightIcon removed (were only in old nav)
//  4. EVERYTHING ELSE — video data, VideoTile, ContactCard, grid layouts — unchanged

import React, { useState, useEffect, useRef } from 'react';
import Link                                    from 'next/link';
import Navbar                                  from '@/components/Navbar';   // ← new import

// ============================================================================
// VIDEO DATA — unchanged
// ============================================================================
const videos = [
  { id: 1, src: 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4', alt: 'Tropical paradise' },
  { id: 2, src: 'https://assets.mixkit.co/videos/43162/43162-720.mp4',                          alt: 'Mountain vista'   },
  { id: 3, src: 'https://assets.mixkit.co/videos/43165/43165-720.mp4',                          alt: 'Flower close-up'  },
  { id: 4, src: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4',    alt: 'Ocean waves'      },
  { id: 5, src: 'https://assets.mixkit.co/videos/43150/43150-720.mp4',                          alt: 'Ocean variant'    },
];

// ============================================================================
// ICON COMPONENTS — only the ones still used (Arrow, Instagram, Facebook, YouTube)
// HamburgerIcon / CloseIcon / ChevronRightIcon removed (were only in old nav)
// ============================================================================
const InstagramIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const ArrowIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface SocialIconButtonProps {
  children: React.ReactNode;
  href: string;
  label: string;
  isIntro: boolean;
}

interface VideoTileProps {
  src: string;
  alt: string;
  isIntro: boolean;
  className?: string;
}

interface ContactCardProps {
  isIntro: boolean;
  className?: string;
}

// ============================================================================
// SOCIAL ICON BUTTON — unchanged
// ============================================================================
const SocialIconButton: React.FC<SocialIconButtonProps> = ({ children, href, label, isIntro }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`
      w-10 h-10 sm:w-11 sm:h-11 border
      flex items-center justify-center
      transition-all duration-500 ease-in-out hover:scale-110 transform
      ${isIntro
        ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
        : 'border-gray-300 text-gray-600 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:bg-[#5e17eb]/5'
      }
    `}
  >
    {children}
  </a>
);

// ============================================================================
// VIDEO TILE — unchanged
// ============================================================================
const VideoTile: React.FC<VideoTileProps> = ({ src, alt, isIntro, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setIsLoaded(true);
      } catch {
        setTimeout(async () => {
          try { await video.play(); setIsLoaded(true); } catch {}
        }, 100);
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo);
      return () => video.removeEventListener('loadeddata', playVideo);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-label={alt}
        onError={() => setHasError(true)}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
          Video unavailable
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#5e17eb]/20 to-transparent pointer-events-none z-10 transition-opacity duration-700 ease-in-out ${isIntro ? 'opacity-30' : 'opacity-0'}`}
        aria-hidden="true"
      />
    </div>
  );
};

// ============================================================================
// CONTACT CARD — unchanged
// ============================================================================
const ContactCard: React.FC<ContactCardProps> = ({ isIntro, className = '' }) => (
  <Link
    href="/contact"
    className={`
      block relative overflow-hidden p-6 sm:p-7 lg:p-8
      flex flex-col justify-between
      transition-all duration-500 ease-in-out group cursor-pointer
      ${isIntro
        ? 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30'
        : 'bg-[#f4f4f4] border border-gray-300 hover:border-[#5e17eb] hover:shadow-xl hover:shadow-[#5e17eb]/10'
      }
      ${className}
    `}
  >
    <div>
      <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-2 transition-colors duration-500 ${isIntro ? 'text-white' : 'text-gray-900 group-hover:text-[#5e17eb]'}`}>
        Contact
      </h3>
      <p className={`text-sm sm:text-xs md:text-xs lg:text-base leading-relaxed transition-colors duration-500 ${isIntro ? 'text-white/80' : 'text-gray-600'}`}>
        Got a question? Don&apos;t hesitate to ask us.
      </p>
    </div>
    <div className={`self-end mt-6 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isIntro ? 'text-white/90' : 'text-[#5e17eb]'}`}>
      <ArrowIcon />
    </div>
  </Link>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const AdventureHero: React.FC = () => {
  const [isIntro,    setIsIntro]    = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setIsIntro(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // body scroll lock now handled inside Navbar (it receives isMenuOpen)
  // no duplicate useEffect needed here

  return (
    <section
      className={`
        relative min-h-screen w-full
        transition-colors duration-700 ease-in-out
        ${isIntro ? 'bg-[#ff5b3b]' : 'bg-[#e8e4df]'}
      `}
    >
      {/* ── NEW NAVBAR — replaces old internal Navbar + MenuOverlay ── */}
      <Navbar
        isIntro={isIntro}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <div className="relative z-10 min-h-screen px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-12 lg:px-12 lg:pt-32 lg:pb-16">
        <div className="max-w-[1800px] mx-auto h-full">

          {/* ── HERO TITLE ── only font changed, sizes/position/transition unchanged ── */}
          <div className="relative z-20 mb-6 uppercase lg:mb-0 lg:absolute lg:ml-12 lg:top-4 lg:mt-[120px] xl:left-0 xl:top-0">
            <h1
              className={`
                text-[3.5rem] sm:text-[4rem] md:text-[6rem]
                lg:text-[7rem] xl:text-[8rem] 2xl:text-[9rem]
                tracking-[-0.04em] font-black
                transition-all duration-700 ease-in-out
              `}
              style={{
                fontFamily: "'Syne', sans-serif",
                // ── isIntro=true  → plain white on the coral bg ──
                // ── isIntro=false → purple→indigo gradient (brand palette) ──
                ...(isIntro
                  ? { color: 'white' }
                  : {
                      background:           'linear-gradient(135deg, #5e17eb 0%, #3d0fa3 55%, #1800ad 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor:  'transparent',
                      backgroundClip:       'text',
                    }
                ),
              }}
            >
              S r i L a n k a
            </h1>
          </div>

          {/* ── GRID — completely unchanged ─────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8">

            {/* LEFT COLUMN — unchanged */}
            <div className="lg:col-span-4 flex flex-col justify-end lg:pb-8 space-y-10 lg:space-y-12">
              <div className="space-y-6 max-w-md">
                <p className={`text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-medium transition-colors duration-700 ease-in-out ${isIntro ? 'text-white/60' : 'text-gray-500'}`}>
                  Begin Your Journey
                </p>
                <p className={`text-[13px] sm:text-sm lg:text-[15px] leading-relaxed transition-colors duration-700 ease-in-out ${isIntro ? 'text-white/85' : 'text-gray-700'}`}>
                  Explore the wonders of the great outdoors with our premier travel experiences.
                  Immerse yourself in stunning vistas, tranquil beaches, and invigorating adventures across Sri Lanka.
                </p>
              </div>

              <div className="space-y-4">
                <p className={`text-[9px] sm:text-[10px] tracking-wide transition-colors duration-700 ease-in-out ${isIntro ? 'text-white/50' : 'text-gray-500'}`}>
                  Exploring together:<br />stories from our recent trips
                </p>
                <div className="flex gap-3">
                  <SocialIconButton href="https://instagram.com" label="Follow us on Instagram" isIntro={isIntro}>
                    <InstagramIcon />
                  </SocialIconButton>
                  <SocialIconButton href="https://facebook.com" label="Follow us on Facebook" isIntro={isIntro}>
                    <FacebookIcon />
                  </SocialIconButton>
                  <SocialIconButton href="https://youtube.com" label="Subscribe on YouTube" isIntro={isIntro}>
                    <YouTubeIcon />
                  </SocialIconButton>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — video grid completely unchanged */}
            <div className="lg:col-span-8">

              {/* DESKTOP GRID */}
              <div className="hidden lg:block h-[calc(100vh-12rem)] min-h-[700px]">
                <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full">
                  <VideoTile src={videos[0].src} alt={videos[0].alt} isIntro={isIntro} className="col-span-7 row-span-7 mt-[200px] ml-[250px]" />
                  <VideoTile src={videos[1].src} alt={videos[1].alt} isIntro={isIntro} className="col-span-5 row-span-4" />
                  <VideoTile src={videos[2].src} alt={videos[2].alt} isIntro={isIntro} className="col-span-5 row-span-5" />
                  <VideoTile src={videos[3].src} alt={videos[3].alt} isIntro={isIntro} className="col-span-4 row-span-6" />
                  <VideoTile src={videos[4].src} alt={videos[4].alt} isIntro={isIntro} className="col-span-3 row-span-6" />
                  <ContactCard isIntro={isIntro} className="col-span-5 row-span-4" />
                </div>
              </div>

              {/* TABLET GRID */}
              <div className="hidden md:block lg:hidden h-[800px]">
                <div className="grid grid-cols-8 grid-rows-10 gap-4 h-full">
                  <VideoTile src={videos[0].src} alt={videos[0].alt} isIntro={isIntro} className="col-span-5 row-span-4" />
                  <VideoTile src={videos[1].src} alt={videos[1].alt} isIntro={isIntro} className="col-span-3 row-span-5" />
                  <VideoTile src={videos[2].src} alt={videos[2].alt} isIntro={isIntro} className="col-span-3 row-span-3" />
                  <VideoTile src={videos[3].src} alt={videos[3].alt} isIntro={isIntro} className="col-span-2 row-span-3" />
                  <ContactCard isIntro={isIntro} className="col-span-3 row-span-5" />
                  <VideoTile src={videos[4].src} alt={videos[4].alt} isIntro={isIntro} className="col-span-5 row-span-3" />
                </div>
              </div>

              {/* MOBILE GRID */}
              <div className="md:hidden space-y-4">
                <VideoTile src={videos[0].src} alt={videos[0].alt} isIntro={isIntro} className="w-full aspect-[4/3]" />
                <div className="grid grid-cols-2 gap-4">
                  <VideoTile src={videos[1].src} alt={videos[1].alt} isIntro={isIntro} className="aspect-[3/4]" />
                  <VideoTile src={videos[2].src} alt={videos[2].alt} isIntro={isIntro} className="aspect-[3/4]" />
                </div>
                <VideoTile src={videos[3].src} alt={videos[3].alt} isIntro={isIntro} className="w-full aspect-[16/9]" />
                <div className="grid grid-cols-2 gap-4">
                  <VideoTile src={videos[4].src} alt={videos[4].alt} isIntro={isIntro} className="aspect-square" />
                  <ContactCard isIntro={isIntro} className="aspect-square" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdventureHero;