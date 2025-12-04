// AdventureHero.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ============================================================================
// VIDEO DATA
// ============================================================================
const videos = [
  { 
    id: 1, 
    src: 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
    alt: 'Tropical paradise',
  },
  { 
    id: 2, 
    src: 'https://assets.mixkit.co/videos/43162/43162-720.mp4',
    alt: 'Mountain vista',
  },
  { 
    id: 3, 
    src: 'https://assets.mixkit.co/videos/43165/43165-720.mp4',
    alt: 'Flower close-up',
  },
  { 
    id: 4, 
    src: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4',
    alt: 'Ocean waves and boat trip',
  },
  { 
    id: 5, 
    src: 'https://assets.mixkit.co/videos/43150/43150-720.mp4',
    alt: 'Ocean waves and boat trip (variant)',
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================
const HamburgerIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LogoIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <circle cx="14" cy="22" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="14" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="30" cy="22" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="30" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const ArrowIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface NavbarProps {
  isIntro: boolean;
  onMenuOpen: () => void;
}

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

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
// MENU ITEMS
// ============================================================================
const menuItems = [
  { label: 'HOME', href: '/', isAccent: false },
  { label: 'TRIPS', href: '/trips', isAccent: false },
  { label: 'STORIES', href: '/stories', isAccent: false },
  { label: 'CONTACT US', href: '/contact', isAccent: false },
  
];

// ============================================================================
// NAVBAR COMPONENT
// ============================================================================
const Navbar: React.FC<NavbarProps> = ({ isIntro, onMenuOpen }) => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
      <Link
        href="/"
        aria-label="Homepage"
        className={`
          transition-colors duration-700 ease-in-out
          ${isIntro ? 'text-white' : 'text-gray-900'}
          hover:opacity-80
        `}
      >
        <LogoIcon />
      </Link>

      <button
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        className={`
          p-2 -mr-2 transition-colors duration-700 ease-in-out
          ${isIntro ? 'text-white hover:text-white/70' : 'text-gray-900 hover:text-gray-500'}
        `}
      >
        <HamburgerIcon />
      </button>
    </nav>
  );
};

// ============================================================================
// MENU OVERLAY COMPONENT
// ============================================================================
const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
        fixed inset-0 z-50 bg-white
        flex flex-col
        transition-all duration-500 ease-in-out
        ${isOpen 
          ? 'opacity-100 visible translate-y-0' 
          : 'opacity-0 invisible -translate-y-4'
        }
      `}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
        <Link
          href="/"
          aria-label="Homepage"
          onClick={onClose}
          className="text-gray-900 hover:opacity-80 transition-opacity"
        >
          <LogoIcon />
        </Link>

        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2 -mr-2 text-gray-900 hover:text-gray-500 transition-colors"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <ul className="flex flex-col items-center gap-5 sm:gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              style={{ 
                transitionDelay: isOpen ? `${index * 75}ms` : '0ms' 
              }}
              className={`
                transition-all duration-500 ease-out
                ${isOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
                }
              `}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={`
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                  font-bold tracking-wide
                  transition-colors duration-300
                  ${item.isAccent
                    ? 'text-[#ff5b3b] hover:text-[#e04a2d]'
                    : 'text-gray-900 hover:text-gray-400'
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// SOCIAL ICON BUTTON COMPONENT
// ============================================================================
const SocialIconButton: React.FC<SocialIconButtonProps> = ({
  children,
  href,
  label,
  isIntro,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`
      w-10 h-10 sm:w-11 sm:h-11
      rounded-sm border
      flex items-center justify-center
      transition-all duration-500 ease-in-out
      hover:scale-110
      ${isIntro
        ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
        : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-100'
      }
    `}
  >
    {children}
  </a>
);

// ============================================================================
// VIDEO TILE COMPONENT
// ============================================================================
const VideoTile: React.FC<VideoTileProps> = ({
  src,
  alt,
  isIntro,
  className = '',
}) => {
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
      } catch (error) {
        console.error('Video autoplay failed:', error);
        setTimeout(async () => {
          try {
            await video.play();
            setIsLoaded(true);
          } catch (retryError) {
            console.error('Video retry failed:', retryError);
          }
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
    <div
      className={`
        relative overflow-hidden rounded-sm
        bg-gray-200
        ${className}
      `}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-500
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
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
        className={`
          absolute inset-0 bg-[#a89680] pointer-events-none z-10
          transition-opacity duration-700 ease-in-out
          ${isIntro ? 'opacity-40' : 'opacity-0'}
        `}
        aria-hidden="true"
      />
    </div>
  );
};

// ============================================================================
// CONTACT CARD COMPONENT
// ============================================================================
const ContactCard: React.FC<ContactCardProps> = ({ isIntro, className = '' }) => (
  <Link
    href="/contact"
    className={`
      block relative overflow-hidden rounded-sm
      p-6 sm:p-7 lg:p-8
      flex flex-col justify-between
      transition-all duration-500 ease-in-out
      group cursor-pointer
      ${isIntro
        ? 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30'
        : 'bg-[#f9f7f5] border border-gray-300 hover:border-gray-500 hover:shadow-lg'
      }
      ${className}
    `}
  >
    <div>
      <h3
        className={`
          text-lg sm:text-xl lg:text-2xl font-semibold mb-2
          transition-colors duration-500
          ${isIntro ? 'text-white' : 'text-gray-900'}
        `}
      >
        Contact
      </h3>
      <p
        className={`
          text-sm sm:text-xs md:text-xs lg:text-base leading-relaxed
          transition-colors duration-500
          ${isIntro ? 'text-white/80' : 'text-gray-500'}
        `}
      >
        Got a question? Don&apos;t hesitate to ask us.
      </p>
    </div>

    <div
      className={`
        self-end mt-6
        transition-all duration-300
        group-hover:translate-x-1 group-hover:-translate-y-1
        ${isIntro ? 'text-white/90' : 'text-gray-800'}
      `}
    >
      <ArrowIcon />
    </div>
  </Link>
);

// ============================================================================
// MAIN ADVENTURE HERO COMPONENT
// ============================================================================
const AdventureHero: React.FC = () => {
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <section
      className={`
        relative min-h-screen w-full
        transition-colors duration-700 ease-in-out
        ${isIntro ? 'bg-[#ff5b3b]' : 'bg-[#e8e4df]'}
      `}
    >
      <Navbar isIntro={isIntro} onMenuOpen={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="relative z-10 min-h-screen px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-12 lg:px-12 lg:pt-32 lg:pb-16">
        <div className="max-w-[1800px] mx-auto h-full">
          
          {/* HERO TITLE - Overlapping the grid */}
          <div className="relative z-20 mb-6 lg:mb-0 lg:absolute lg:ml-12 lg:top-4 lg:mt-[120px]  xl:left-0 xl:top-0">
            <h1
              className={`
                text-[3.5rem] leading-[0.82]
                sm:text-[5rem]
                md:text-[6rem]
                lg:text-[7rem]
                xl:text-[8.5rem]
                2xl:text-[10rem]
                font-black tracking-[-0.04em]
                transition-colors duration-700 ease-in-out
                ${isIntro ? 'text-white' : 'text-[#2d2d2d]'}
              `}
            >
              ADVENTURE
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8">
            
            {/* ================================================ */}
            {/* LEFT COLUMN - Text Content */}
            {/* ================================================ */}
            <div className="lg:col-span-4 flex flex-col justify-end lg:pb-8 space-y-10 lg:space-y-12">
              
              <div className="space-y-6 max-w-md">
                <p
                  className={`
                    text-[9px] sm:text-[10px]
                    tracking-[0.3em] uppercase font-medium
                    transition-colors duration-700 ease-in-out
                    ${isIntro ? 'text-white/60' : 'text-gray-500'}
                  `}
                >
                  Begin Your Journey
                </p>
                <p
                  className={`
                    text-[13px] sm:text-sm lg:text-[15px]
                    leading-relaxed
                    transition-colors duration-700 ease-in-out
                    ${isIntro ? 'text-white/85' : 'text-gray-700'}
                  `}
                >
                  Explore the wonders of the great outdoors with our premier
                  hiking website. Immerse yourself in stunning vistas, tranquil
                  forests, and invigorating trails.
                </p>
              </div>

              <div className="space-y-4">
                <p
                  className={`
                    text-[9px] sm:text-[10px]
                    tracking-wide
                    transition-colors duration-700 ease-in-out
                    ${isIntro ? 'text-white/50' : 'text-gray-500'}
                  `}
                >
                  Exploring together:<br/>stories from our recent trips
                </p>

                <div className="flex gap-3">
                  <SocialIconButton
                    href="https://instagram.com"
                    label="Follow us on Instagram"
                    isIntro={isIntro}
                  >
                    <InstagramIcon />
                  </SocialIconButton>
                  <SocialIconButton
                    href="https://facebook.com"
                    label="Follow us on Facebook"
                    isIntro={isIntro}
                  >
                    <FacebookIcon />
                  </SocialIconButton>
                  <SocialIconButton
                    href="https://youtube.com"
                    label="Subscribe on YouTube"
                    isIntro={isIntro}
                  >
                    <YouTubeIcon />
                  </SocialIconButton>
                </div>
              </div>
            </div>

            {/* ================================================ */}
            {/* RIGHT COLUMN - PROFESSIONAL VIDEO GRID */}
            {/* ================================================ */}
            <div className="lg:col-span-8 ">
              
              {/* ============================================== */}
              {/* DESKTOP GRID (lg and up) - Modern Asymmetric */}
              {/* ============================================== */}
              <div className="hidden lg:block h-[calc(100vh-12rem)] min-h-[700px]">
                <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full">
                  
                  {/* Row 1-5: Top Section */}
                  {/* Video 1 - Large hero video (top left) */}
                  <VideoTile
                    src={videos[0].src}
                    alt={videos[0].alt}
                    isIntro={isIntro}
                    className="col-span-7 row-span-7 mt-[200px] ml-[250px]"
                  />
                  
                  {/* Video 2 - Tall portrait (top right) */}
                  <VideoTile
                    src={videos[1].src}
                    alt={videos[1].alt}
                    isIntro={isIntro}
                    className="col-span-5 row-span-4"
                  />
                  
                  {/* Row 6-12: Bottom Section */}
                  {/* Video 3 - Medium square (bottom left) */}
                  <VideoTile
                    src={videos[2].src}
                    alt={videos[2].alt}
                    isIntro={isIntro}
                    className="col-span-5 row-span-5"
                  />
                  
                  {/* Video 4 - Wide landscape (bottom center) */}
                  <VideoTile
                    src={videos[3].src}
                    alt={videos[3].alt}
                    isIntro={isIntro}
                    className="col-span-4 row-span-6"
                  />
                  
                  
                  
                  {/* Video 5 - Small accent (bottom right) */}
                  <VideoTile
                    src={videos[4].src}
                    alt={videos[4].alt}
                    isIntro={isIntro}
                    className="col-span-3 row-span-6"
                  />
                  {/* Contact Card - Bottom center-right */}
                  <ContactCard
                    isIntro={isIntro}
                    className="col-span-5 row-span-4 "
                  />
                </div>
              </div>

              {/* ============================================== */}
              {/* TABLET GRID (md to lg) - Balanced Layout */}
              {/* ============================================== */}
              <div className="hidden md:block lg:hidden h-[800px]">
                <div className="grid grid-cols-8 grid-rows-10 gap-4 h-full">
                  
                  {/* Video 1 - Large hero */}
                  <VideoTile
                    src={videos[0].src}
                    alt={videos[0].alt}
                    isIntro={isIntro}
                    className="col-span-5 row-span-4"
                  />
                  
                  {/* Video 2 - Tall right */}
                  <VideoTile
                    src={videos[1].src}
                    alt={videos[1].alt}
                    isIntro={isIntro}
                    className="col-span-3 row-span-5"
                  />
                  
                  {/* Video 3 - Medium */}
                  <VideoTile
                    src={videos[2].src}
                    alt={videos[2].alt}
                    isIntro={isIntro}
                    className="col-span-3 row-span-3"
                  />
                  
                  {/* Video 4 - Medium */}
                  <VideoTile
                    src={videos[3].src}
                    alt={videos[3].alt}
                    isIntro={isIntro}
                    className="col-span-2 row-span-3"
                  />
                  
                  {/* Contact Card */}
                  <ContactCard
                    isIntro={isIntro}
                    className="col-span-3 row-span-5"
                  />
                  
                  {/* Video 5 - Bottom accent */}
                  <VideoTile
                    src={videos[4].src}
                    alt={videos[4].alt}
                    isIntro={isIntro}
                    className="col-span-5 row-span-3"
                  />
                </div>
              </div>

              {/* ============================================== */}
              {/* MOBILE GRID (below md) - Stack Layout */}
              {/* ============================================== */}
              <div className="md:hidden space-y-4">
                
                {/* Video 1 - Hero */}
                <VideoTile
                  src={videos[0].src}
                  alt={videos[0].alt}
                  isIntro={isIntro}
                  className="w-full aspect-[4/3]"
                />
                
                {/* Two column row */}
                <div className="grid grid-cols-2 gap-4">
                  <VideoTile
                    src={videos[1].src}
                    alt={videos[1].alt}
                    isIntro={isIntro}
                    className="aspect-[3/4]"
                  />
                  <VideoTile
                    src={videos[2].src}
                    alt={videos[2].alt}
                    isIntro={isIntro}
                    className="aspect-[3/4]"
                  />
                </div>
                
                {/* Full width video */}
                <VideoTile
                  src={videos[3].src}
                  alt={videos[3].alt}
                  isIntro={isIntro}
                  className="w-full aspect-[16/9]"
                />
                
                {/* Two column row */}
                <div className="grid grid-cols-2 gap-4">
                  <VideoTile
                    src={videos[4].src}
                    alt={videos[4].alt}
                    isIntro={isIntro}
                    className="aspect-square"
                  />
                  <ContactCard
                    isIntro={isIntro}
                    className="aspect-square"
                  />
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