'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─────────────────────────────────────────────
// Intersection Observer Hook
// ─────────────────────────────────────────────
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
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [fired, threshold]);

  return { ref, inView };
};

// ─────────────────────────────────────────────
// Animated Counter
// ─────────────────────────────────────────────
const Counter: React.FC<{
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}> = ({ target, suffix = '', duration = 1600, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
};

// ─────────────────────────────────────────────
// Star Rating
// ─────────────────────────────────────────────
const Stars: React.FC<{ count?: number; size?: string }> = ({ count = 5, size = 'w-3.5 h-3.5' }) => (
  <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`${size} ${i < count ? 'text-[#5e17eb]' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  tripType: string;
  duration: string;
  date: string;
  rating: number;
  review: string;
  highlight: string;
  avatar: string;
  platform: 'Google' | 'TripAdvisor' | 'Direct';
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'James Whitfield',
    country: 'United Kingdom',
    countryCode: 'GB',
    tripType: 'Bespoke Journey',
    duration: '14 Days',
    date: '2 weeks ago',
    rating: 5,
    review:
      "We've traveled across Southeast Asia for 12 years. Nothing — absolutely nothing — has matched what TripTip orchestrated for us. Every detail was invisible in the best possible way. You simply arrived and it was perfect.",
    highlight: 'Nothing has matched what TripTip orchestrated.',
    avatar: 'JW',
    platform: 'Google',
  },
  {
    id: 2,
    name: 'Sophie Marchand',
    country: 'France',
    countryCode: 'FR',
    tripType: 'Signature Tour',
    duration: '10 Days',
    date: '1 month ago',
    rating: 5,
    review:
      "Our guide Rohan knew Sigiriya the way a poet knows their verses — by heart. He showed us a Sri Lanka no guidebook will ever print. I cried at the sunrise. I don't cry at sunrises.",
    highlight: "I cried at the sunrise. I don't cry at sunrises.",
    avatar: 'SM',
    platform: 'TripAdvisor',
  },
  {
    id: 3,
    name: 'Dr. Aditya Nair',
    country: 'India',
    countryCode: 'IN',
    tripType: 'Premium Taxi',
    duration: '5 Days',
    date: '3 weeks ago',
    rating: 5,
    review:
      "I travel for conferences every month. I've been in hundreds of cars. This was the first time a driver felt like a host — proactively suggesting stops, sharing stories, making a transfer feel like the beginning of something.",
    highlight: 'The first time a driver felt like a host.',
    avatar: 'AN',
    platform: 'Google',
  },
  {
    id: 4,
    name: 'Lena Brandt',
    country: 'Germany',
    countryCode: 'DE',
    tripType: 'Bespoke Journey',
    duration: '18 Days',
    date: '6 weeks ago',
    rating: 5,
    review:
      "I told them: no itinerary, no schedule, just follow what interests us. They built something around that phrase that took us to places we could never have found ourselves. The whole journey felt authored.",
    highlight: 'The whole journey felt authored.',
    avatar: 'LB',
    platform: 'Direct',
  },
  {
    id: 5,
    name: 'Rachel & Tom Okafor',
    country: 'Australia',
    countryCode: 'AU',
    tripType: 'Signature Tour',
    duration: '12 Days',
    date: '2 months ago',
    rating: 5,
    review:
      "Our honeymoon. We said two things: we love the ocean, and we love silence. Every single morning we woke up to both. TripTip understood something about us that we hadn't quite articulated ourselves.",
    highlight: 'They understood something we hadn\'t articulated.',
    avatar: 'RO',
    platform: 'TripAdvisor',
  },
  {
    id: 6,
    name: 'Marcus van den Berg',
    country: 'Netherlands',
    countryCode: 'NL',
    tripType: 'Bespoke Journey',
    duration: '21 Days',
    date: '1 month ago',
    rating: 5,
    review:
      "Three weeks across the whole island. By day four I stopped checking the schedule. That's trust. That's what they build — not just logistics, but the confidence to fully let go and just be somewhere.",
    highlight: 'By day four I stopped checking the schedule.',
    avatar: 'MB',
    platform: 'Google',
  },
];

// Marquee strip items — compact social proof
const marqueeItems = [
  { name: 'Emma L.', country: '🇬🇧', text: '"Flawless from arrival to farewell."' },
  { name: 'Carlos R.', country: '🇪🇸', text: '"Best travel decision of my life."' },
  { name: 'Yuki T.', country: '🇯🇵', text: '"The guide was extraordinary."' },
  { name: 'Priya M.', country: '🇸🇬', text: '"Truly felt looked after."' },
  { name: 'Oliver K.', country: '🇩🇪', text: '"Nothing was left to chance."' },
  { name: 'Fatima A.', country: '🇦🇪', text: '"Every sunrise was arranged perfectly."' },
  { name: 'David C.', country: '🇺🇸', text: '"Five stars feels insufficient."' },
  { name: 'Ingrid H.', country: '🇸🇪', text: '"The most human travel service I know."' },
];

// ─────────────────────────────────────────────
// Platform Icon
// ─────────────────────────────────────────────
const PlatformBadge: React.FC<{ platform: Review['platform'] }> = ({ platform }) => {
  const config = {
    Google: { label: 'Google', color: '#4285F4' },
    TripAdvisor: { label: 'TripAdvisor', color: '#34E0A1' },
    Direct: { label: 'Verified', color: '#5e17eb' },
  }[platform];

  return (
    <span
      className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1"
      style={{
        border: `1px solid ${config.color}22`,
        color: config.color,
        background: `${config.color}0D`,
      }}
    >
      {config.label}
    </span>
  );
};

// ─────────────────────────────────────────────
// Featured Review Card (large, hero treatment)
// ─────────────────────────────────────────────
const FeaturedReview: React.FC<{ review: Review; inView: boolean }> = ({ review, inView }) => (
  <div
    className="lg:col-span-2 relative overflow-hidden bg-[#0d0d0d] p-10 sm:p-12 lg:p-16"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.8s ease 0ms, transform 0.8s ease 0ms',
    }}
  >
    {/* Decorative dot grid */}
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 w-48 h-48 opacity-[0.06]"
      style={{
        backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
        backgroundSize: '12px 12px',
      }}
    />

    {/* Oversized opening quote mark */}
    <div
      aria-hidden="true"
      className="absolute top-8 left-10 font-black leading-none select-none pointer-events-none"
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '160px',
        color: 'rgba(94,23,235,0.12)',
        lineHeight: 1,
      }}
    >
      &ldquo;
    </div>

    <div className="relative z-10">
      {/* Stars + platform */}
      <div className="flex items-center gap-4 mb-8">
        <Stars size="w-4 h-4" />
        <PlatformBadge platform={review.platform} />
      </div>

      {/* The highlight quote — magazine pull-quote style */}
      <p
        className="text-[clamp(22px,3.5vw,42px)] font-black text-white leading-tight tracking-tight mb-8"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        &ldquo;{review.highlight}&rdquo;
      </p>

      {/* Full review */}
      <p className="text-white/60 text-base lg:text-lg font-light leading-relaxed mb-10 max-w-2xl">
        {review.review}
      </p>

      {/* Divider */}
      <div
        className="w-12 h-px mb-8"
        style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }}
      />

      {/* Reviewer details */}
      <div className="flex items-center gap-5 flex-wrap">
        <div
          className="w-12 h-12 flex items-center justify-center text-white text-sm font-black flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
        >
          {review.avatar}
        </div>
        <div>
          <p
            className="text-white text-base font-bold leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {review.name}
          </p>
          <p className="text-white/40 text-xs mt-0.5 tracking-wide">
            {review.country} · {review.tripType} · {review.duration}
          </p>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <p className="text-white/25 text-xs tracking-widest uppercase">{review.date}</p>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Regular Review Card
// ─────────────────────────────────────────────
const ReviewCard: React.FC<{ review: Review; delay: number; inView: boolean }> = ({
  review, delay, inView,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-[#ffffff] p-8 lg:p-10 border border-[#e8e4df] transition-all duration-500 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s`,
        borderColor: hovered ? '#5e17eb33' : '#e8e4df',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out"
        style={{
          background: 'linear-gradient(to right, #5e17eb, #1800ad)',
          width: hovered ? '100%' : '0%',
        }}
      />

      {/* Stars + platform */}
      <div className="flex items-center justify-between mb-6">
        <Stars />
        <PlatformBadge platform={review.platform} />
      </div>

      {/* Highlight quote */}
      <p
        className="text-lg lg:text-xl font-black text-gray-900 leading-snug tracking-tight mb-4 transition-colors duration-300"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: hovered ? '#5e17eb' : '#111',
        }}
      >
        &ldquo;{review.highlight}&rdquo;
      </p>

      {/* Review body */}
      <p className="text-sm text-gray-500 leading-relaxed font-light mb-7 line-clamp-3">
        {review.review}
      </p>

      {/* Divider */}
      <div className="w-8 h-px bg-[#e8e4df] mb-6 transition-all duration-300 group-hover:w-12"
        style={{ background: hovered ? 'linear-gradient(to right,#5e17eb,#1800ad)' : '#e8e4df' }}
      />

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 flex items-center justify-center text-white text-xs font-black flex-shrink-0 transition-transform duration-300"
          style={{
            background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-bold text-gray-900 truncate"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {review.name}
          </p>
          <p className="text-[10px] text-gray-400 truncate">
            {review.country} · {review.tripType}
          </p>
        </div>
        <p className="text-[10px] text-gray-300 flex-shrink-0 tracking-wide">{review.date}</p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Marquee Strip (infinite scroll)
// ─────────────────────────────────────────────
const MarqueeStrip: React.FC = () => {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden bg-[#f4f4f4] py-5 border-y border-[#e8e4df]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #f4f4f4, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f4f4f4, transparent)' }} />

      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: 'marqueeScroll 32s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 border-r border-[#e8e4df] flex-shrink-0"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, s) => (
                <svg key={s} className="w-2.5 h-2.5 text-[#5e17eb]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {item.name}
            </span>
            <span className="text-xs text-gray-400 font-light">{item.text}</span>
            <span className="text-base">{item.country}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// Trust Metrics Strip
// ─────────────────────────────────────────────
const trustMetrics = [
  { value: 4800, suffix: '+', label: 'Verified Reviews', sub: 'Across Google & TripAdvisor' },
  { value: 98, suffix: '%', label: 'Would Recommend', sub: 'Based on post-trip surveys' },
  { value: 12, suffix: '+', label: 'Years of Trust', sub: 'Continuously 5-star rated' },
  { value: 47, suffix: '', label: 'Countries Served', sub: 'Travelers from every continent' },
];

// ─────────────────────────────────────────────
// Main Testimonials Section
// ─────────────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const heroRef = useInView(0.1);
  const metricsRef = useInView(0.1);
  const featuredRef = useInView(0.1);
  const gridRef = useInView(0.08);
  const ctaRef = useInView(0.1);

  const [activeSlide, setActiveSlide] = useState(0);
  const featuredReview = reviews[activeSlide];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-[#f4f4f4] overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      {/* ── SECTION HEADER ──────────────────── */}
      <div
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-12 pt-24 pb-0 overflow-hidden"
      >
        {/* Ghost watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-2 top-2 font-black leading-none tracking-tighter text-[#f4f4f4]"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(90px,14vw,180px)',
          }}
        >
          VOICES
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
              Real Travelers
            </span>
            <div className="h-px w-12 bg-[#5e17eb]" />
            <span className="text-xs tracking-widest text-gray-400 uppercase">
              Verified Reviews
            </span>
          </div>

          {/* Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <h2
              id="testimonials-heading"
              className={`text-[clamp(42px,7vw,104px)] font-black leading-[0.92] tracking-tighter text-gray-900 transition-all duration-700 delay-100 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              4,800 Travelers
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Can&apos;t Be Wrong.
              </span>
            </h2>

            {/* Right side descriptor */}
            <div
              className={`lg:pb-4 max-w-xs transition-all duration-700 delay-200 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-8 h-px bg-[#5e17eb] mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Every review below is unedited and verified. These are the words of real
                guests — not marketing copy. Read them and then decide.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full h-px bg-[#e8e4df]" />
      </div>

      {/* ── TRUST METRICS ───────────────────── */}
      <div
        ref={metricsRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-12"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e8e4df]">
          {trustMetrics.map((m, i) => (
            <div
              key={m.label}
              className={`px-6 lg:px-10 first:pl-0 last:pr-0 transition-all duration-700 ease-out ${
                metricsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: metricsRef.inView ? `${i * 80}ms` : '0ms' }}
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
                <Counter target={m.value} suffix={m.suffix} inView={metricsRef.inView} />
              </div>
              <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">
                {m.label}
              </div>
              <div className="text-[11px] text-gray-400 leading-snug">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE STRIP ───────────────────── */}
      <MarqueeStrip />

      {/* ── FEATURED REVIEW ─────────────────── */}
      <div
        ref={featuredRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-12 py-20 lg:py-28"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section micro-label */}
          <div
            className={`flex items-center gap-4 mb-12 transition-all duration-700 ${
              featuredRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="w-1 h-8" style={{ background: 'linear-gradient(to bottom, #5e17eb, #1800ad)' }} />
            <span
              className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Featured Voice
            </span>
            {/* Slide indicators */}
            <div className="ml-auto flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSlide(i)}
                  aria-label={`View review ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: activeSlide === i ? '32px' : '8px',
                    height: '3px',
                    background: activeSlide === i
                      ? 'linear-gradient(to right, #5e17eb, #1800ad)'
                      : '#d4cfc9',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Featured + mini stack grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#e8e4df]">
            {/* Main featured */}
            <FeaturedReview review={featuredReview} inView={featuredRef.inView} />

            {/* Right side — quick previews */}
            <div className="bg-[#ffffff] divide-y divide-[#e8e4df]">
              {reviews
                .filter((_, i) => i !== activeSlide)
                .slice(0, 3)
                .map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveSlide(reviews.indexOf(r))}
                    className="w-full text-left p-6 lg:p-8 group hover:bg-[#f8f6ff] transition-colors duration-200"
                    style={{
                      opacity: featuredRef.inView ? 1 : 0,
                      transform: featuredRef.inView ? 'translateX(0)' : 'translateX(24px)',
                      transition: `opacity 0.6s ease ${200 + i * 100}ms, transform 0.6s ease ${200 + i * 100}ms`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Stars count={r.rating} size="w-3 h-3" />
                      <span className="text-[9px] text-gray-400 tracking-widest ml-auto">{r.date}</span>
                    </div>
                    <p
                      className="text-sm font-black text-gray-800 leading-snug mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-[#5e17eb]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      &ldquo;{r.highlight}&rdquo;
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
                      >
                        {r.avatar}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900">{r.name}</span>
                        <span className="text-[10px] text-gray-400 block">{r.tripType} · {r.country}</span>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── REVIEW GRID ─────────────────────── */}
      <div
        ref={gridRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-12 py-20 lg:py-28"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label */}
          <div
            className={`flex items-center gap-4 mb-14 transition-all duration-700 ${
              gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="w-1 h-8" style={{ background: 'linear-gradient(to bottom, #5e17eb, #1800ad)' }} />
            <span
              className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              More From Our Guests
            </span>
            <div className="ml-auto">
              <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">
                All Verified · All Unedited
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e4df]">
            {reviews.map((review, i) => (
              <div key={review.id} className="bg-[#f4f4f4]">
                <ReviewCard review={review} delay={i * 100} inView={gridRef.inView} />
              </div>
            ))}
          </div>

          {/* All reviews CTA */}
          <div
            className={`mt-12 flex items-center gap-6 transition-all duration-700 delay-600 ${
              gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex-1 h-px bg-[#e8e4df]" />
            <a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase border border-gray-300 text-gray-700 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
            >
              Read All 4,800+ Reviews
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <div className="flex-1 h-px bg-[#e8e4df]" />
          </div>
        </div>
      </div>

      {/* ── TRUST CLOSING BAND ──────────────── */}
      <div
        ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#e8e4df] px-6 sm:px-10 lg:px-12 py-20 lg:py-24 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto relative">
          {/* Decorative oversized text */}
          <span
            aria-hidden="true"
            className="absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(80px,12vw,160px)',
              color: '#d4cfc9',
              letterSpacing: '-6px',
            }}
          >
            TRUST
          </span>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            <div className="max-w-[1400px]">
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="h-px w-8 bg-[#5e17eb]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]">
                  Join 4,800+ Travelers
                </span>
              </div>
              <h3
                className={`text-[clamp(28px,4.5vw,58px)] font-black text-gray-900 tracking-tighter leading-[0.95] transition-all duration-700 delay-100 ${
                  ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Your Review Is
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Waiting to Be Written.
                </span>
              </h3>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 flex-shrink-0 transition-all duration-700 delay-200 ${
                ctaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                type="button"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
                style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }}
                aria-label="Start planning your trip"
              >
                Start Planning
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
                aria-label="Contact us"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;