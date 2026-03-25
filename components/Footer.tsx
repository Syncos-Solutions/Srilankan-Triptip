'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ─────────────────────────────────────────────
// Intersection Observer Hook (Maintained)
// ─────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
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

// ─────────────────────────────────────────────
// Footer Section
// ─────────────────────────────────────────────
const FooterSection: React.FC = () => {
  const topRef = useInView(0.1);
  const gridRef = useInView(0.1);
  const bottomRef = useInView(0.1);

  const [colomboTime, setColomboTime] = useState<string>('');

  // Live Time in Sri Lanka (Adds a highly premium, logistical touch)
  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setColomboTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative bg-[#050507] overflow-hidden pt-24 lg:pt-32 pb-8"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      {/* ── GIANT BACKGROUND WATERMARK ────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-[5%] text-[clamp(100px,22vw,350px)] font-black leading-none text-white/[0.02] tracking-tighter z-0"
        style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
      >
        TRIPTIP
      </span>

      {/* ── AMBIENT GLOW ──────────────────────── */}
      {/* <div 
        className="absolute bottom-0 right-0 w-[60%] h-[400px] blur-[180px] opacity-20 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #5e17eb, transparent 70%)' }}
      /> */}

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20 relative z-10">
        
        {/* ── TOP: CALL TO ACTION ───────────────── */}
        <div 
          ref={topRef.ref as React.RefObject<HTMLDivElement>}
          className="mb-20 lg:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/10 pb-16 lg:pb-24"
        >
          <div className="max-w-3xl">
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out ${
                topRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#5e17eb] animate-pulse" />
              <span
                className="text-xs font-bold tracking-[0.35em] uppercase text-[#f4f4f4]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Local Time in Colombo: {colomboTime}
              </span>
            </div>

            <h2
              className={`text-[clamp(44px,6.5vw,96px)] font-black leading-[1.05] tracking-tight text-[#f4f4f4] transition-all duration-700 ease-out delay-100 ${
                topRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
            >
              Your Sri Lankan <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', // Adjusted slightly brighter for dark background
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Story Awaits.
              </span>
            </h2>
          </div>

          <div 
            className={`transition-all duration-700 ease-out delay-200 ${
              topRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              type="button"
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 text-sm font-bold tracking-widest uppercase text-white transition-all duration-500 overflow-hidden border border-white/20 hover:border-transparent bg-white/5 backdrop-blur-sm"
            >
              {/* Hover Gradient Fill */}
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }} />
              
              <span className="relative z-10 flex items-center gap-3">
                Begin Journey
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* ── MIDDLE: NAVIGATION GRID ───────────── */}
        <div 
          ref={gridRef.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <div 
            className={`lg:col-span-4 transition-all duration-700 ease-out ${
              gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10  flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ffffff, #f4f4f4)' }}>
                <Image src="./SLtriptipLogo.svg" alt="Srilankan TripTip Logo" width={40} height={40} />
              </div>
              <span className="text-xl font-dm-sans tracking-widest uppercase text-[#f4f4f4]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Srilankan TripTip
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light pr-4 md:pr-10 mb-8">
              Curators of exceptional Sri Lankan experiences. Unforgettable, trusted, and deeply human. Since 2012.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-6">
              {['Instagram', 'Facebook', 'TripAdvisor'].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="group relative text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-[#f4f4f4] transition-colors duration-300"
                >
                  {social}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#5e17eb] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div 
            className={`lg:col-span-2 transition-all duration-700 ease-out delay-100 ${
              gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-8">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Gallery', 'Travel Journal', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="group flex items-center gap-3 text-gray-300 hover:text-[#f4f4f4] transition-colors duration-300 text-sm font-light">
                    <span className="w-0 h-px bg-[#5e17eb] transition-all duration-300 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div 
            className={`lg:col-span-3 transition-all duration-700 ease-out delay-200 ${
              gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-8">Experiences</h4>
            <ul className="space-y-4">
              {['Premium Taxi & Transit', 'Signature Crafted Tours', 'Bespoke Custom Planning', 'Corporate Retreats'].map((link) => (
                <li key={link}>
                  <a href="#" className="group flex items-center gap-3 text-gray-300 hover:text-[#f4f4f4] transition-colors duration-300 text-sm font-light">
                    <span className="w-0 h-px bg-[#5e17eb] transition-all duration-300 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters Column */}
          <div 
            className={`lg:col-span-3 transition-all duration-700 ease-out delay-300 ${
              gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-8">Headquarters</h4>
            <ul className="space-y-6 text-sm font-light text-gray-300">
              <li>
                <span className="block text-gray-500 mb-1 font-bold tracking-widest uppercase text-[10px]">Direct Email</span>
                <a href="mailto:journeys@triptip.lk" className="hover:text-[#5e17eb] transition-colors">journeys@triptip.lk</a>
              </li>
              <li>
                <span className="block text-gray-500 mb-1 font-bold tracking-widest uppercase text-[10px]">Concierge (24/7)</span>
                <a href="tel:+94771234567" className="hover:text-[#5e17eb] transition-colors">+94 77 123 4567</a>
              </li>
              <li>
                <span className="block text-gray-500 mb-1 font-bold tracking-widest uppercase text-[10px]">Location</span>
                145 Galle Road,<br />Colombo 03, Sri Lanka
              </li>
            </ul>
          </div>

        </div>

        {/* ── BOTTOM: LEGAL & SCROLL TO TOP ─────── */}
        <div 
          ref={bottomRef.ref as React.RefObject<HTMLDivElement>}
          className={`mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-1000 ease-out ${
            bottomRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Sri Lankan TripTip. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8 text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-[#f4f4f4] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f4f4f4] transition-colors">Terms of Service</a>
          </div>

          {/* Premium Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 hover:bg-[#5e17eb] hover:border-[#5e17eb] transition-all duration-500"
            aria-label="Scroll to top"
          >
            <svg 
              className="w-4 h-4 text-gray-300 group-hover:text-white transition-transform duration-300 group-hover:-translate-y-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="square" strokeLinejoin="miter" d="M12 19V5m-7 7l7-7 7 7" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;