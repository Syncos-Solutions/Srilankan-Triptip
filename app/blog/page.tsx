'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

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
// Blog Data
// ─────────────────────────────────────────────
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'sigiriya-sunrise-secret',
    category: 'Culture',
    title: 'The Secret Hour at Sigiriya Nobody Tells You About',
    excerpt:
      'Before the crowds arrive, before the tour buses roll in — there is a 40-minute window at dawn where Sigiriya belongs entirely to you. Here is how to claim it.',
    image: '../blogimg/sigiriya.avif',
    author: 'Rohan Perera',
    authorRole: 'Lead Cultural Guide',
    date: 'Mar 18, 2025',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: '2',
    slug: 'ella-train-truth',
    category: 'Adventure',
    title: "Ella Train: The Truth Behind Sri Lanka's Most Famous Journey",
    excerpt:
      'Everyone photographs it. Few truly experience it. We reveal what the postcards never show — and how to ride it the right way.',
    image: 'https://images.unsplash.com/photo-1586101263897-8849e1de3c79?w=900&q=85',
    author: 'Amara Silva',
    authorRole: 'Adventure Specialist',
    date: 'Mar 04, 2025',
    readTime: '7 min read',
  },
  {
    id: '3',
    slug: 'colombo-street-food-guide',
    category: 'Food & Culture',
    title: 'Colombo After Dark: A Street Food Map That Actually Works',
    excerpt:
      'Forget the restaurant lists. The real Colombo reveals itself at 10pm, when the carts come out and the city finally relaxes.',
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=900&q=85',
    author: 'Nilan Fernando',
    authorRole: 'Cultural Correspondent',
    date: 'Feb 21, 2025',
    readTime: '6 min read',
  },
  {
    id: '4',
    slug: 'whale-watching-mirissa',
    category: 'Wildlife',
    title: "Blue Whales Off Mirissa: What the Season Charts Don't Tell You",
    excerpt:
      'Charts say November to April. Reality is more nuanced — and more rewarding for those who know where to look and when to wait.',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=900&q=85',
    author: 'Rohan Perera',
    authorRole: 'Lead Cultural Guide',
    date: 'Feb 08, 2025',
    readTime: '8 min read',
  },
  {
    id: '5',
    slug: 'kandy-temple-etiquette',
    category: 'Culture',
    title: "Temple of the Tooth: A Respectful Visitor's Complete Companion",
    excerpt:
      "Beyond the dress code, there is an entire ritual language spoken at the Temple of the Tooth. Learning it transforms a visit into a memory.",
    image: 'https://images.unsplash.com/photo-1590123591500-81e7ed70f86e?w=900&q=85',
    author: 'Amara Silva',
    authorRole: 'Adventure Specialist',
    date: 'Jan 27, 2025',
    readTime: '5 min read',
  },
  {
    id: '6',
    slug: 'nuwara-eliya-tea-plantation',
    category: 'Lifestyle',
    title: 'A Day Inside a Tea Plantation: From Leaf to Cup in Nuwara Eliya',
    excerpt:
      'We spent a full day with a third-generation tea picker in the misty hills of Nuwara Eliya. This is what she taught us.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    author: 'Nilan Fernando',
    authorRole: 'Cultural Correspondent',
    date: 'Jan 14, 2025',
    readTime: '9 min read',
  },
];

const categories = ['All', 'Culture', 'Adventure', 'Food & Culture', 'Wildlife', 'Lifestyle'];

// ─────────────────────────────────────────────
// Featured Post Card
// ─────────────────────────────────────────────
const FeaturedCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative overflow-hidden"
      style={{ height: 'clamp(460px, 55vw, 680px)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Read: ${post.title}`}
    >
      {/* Background image */}
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
        style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
      />

      {/* Layered dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* Purple tint on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(94,23,235,0.22), rgba(24,0,173,0.18))',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top metadata */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
        <span
          className="text-[10px] font-bold tracking-[0.35em] uppercase text-white/70 px-3 py-1.5 border border-white/20 backdrop-blur-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {post.category}
        </span>
        <span className="text-[10px] tracking-widest text-white/50 uppercase">
          Featured Story
        </span>
      </div>

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:p-14">
        {/* Animated line */}
        <div
          className="h-px mb-6 transition-all duration-700 ease-out"
          style={{
            background: 'linear-gradient(to right, #5e17eb, #1800ad)',
            width: hovered ? '80px' : '40px',
          }}
        />

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.0] tracking-tight mb-5 max-w-3xl"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {post.title}
        </h2>

        <p
          className="text-white/70 text-base lg:text-lg font-light leading-relaxed max-w-2xl mb-8 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0.7,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          }}
        >
          {post.excerpt}
        </p>

        {/* Author + CTA row */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-9 h-9 flex items-center justify-center text-white text-xs font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
            >
              {post.author
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p
                className="text-white text-sm font-bold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {post.author}
              </p>
              <p className="text-white/50 text-xs">
                {post.date} · {post.readTime}
              </p>
            </div>
          </div>

          <div
            className="flex items-center text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300"
            style={{
              color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
              gap: hovered ? '12px' : '8px',
            }}
          >
            Read Story
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────
// Grid Post Card
// ─────────────────────────────────────────────
const GridCard: React.FC<{ post: BlogPost; delay?: number; inView: boolean }> = ({
  post,
  delay = 0,
  inView,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {/* Category pill */}
        <span
          className="absolute top-4 left-4 text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5"
          style={{
            background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
            color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {post.category}
        </span>

        {/* Read time badge */}
        <span className="absolute top-4 right-4 text-[10px] text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1">
          {post.readTime}
        </span>
      </div>

      {/* Text content */}
      <div className="pt-5 pb-6 border-b border-[#e8e4df]">
        {/* Animated accent */}
        <div
          className="h-px mb-4 transition-all duration-500"
          style={{
            background: 'linear-gradient(to right, #5e17eb, #1800ad)',
            width: hovered ? '48px' : '24px',
          }}
        />

        <h3
          className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight leading-snug mb-3 transition-colors duration-300"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? '#5e17eb' : '#111',
          }}
        >
          {post.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed font-light mb-5 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
            >
              {post.author
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{post.author}</p>
              <p className="text-[10px] text-gray-400">{post.date}</p>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
            style={{ color: hovered ? '#5e17eb' : '#bbb' }}
          >
            Read
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────
// Side Story Card
// ─────────────────────────────────────────────
const SideCard: React.FC<{ post: BlogPost; index: number; inView: boolean }> = ({
  post,
  index,
  inView,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-4 py-5 border-b border-[#e8e4df] last:border-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(20px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Numbered index */}
      <span
        className="text-[clamp(28px,3vw,40px)] font-black leading-none flex-shrink-0 transition-colors duration-300 w-10"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: hovered ? '#5e17eb' : '#e8e4df',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#5e17eb] mb-1 block">
          {post.category}
        </span>
        <h4
          className="text-sm font-bold leading-snug mb-1.5 transition-colors duration-300 line-clamp-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? '#5e17eb' : '#111',
          }}
        >
          {post.title}
        </h4>
        <p className="text-[10px] text-gray-400">
          {post.date} · {post.readTime}
        </p>
      </div>

      {/* Thumbnail */}
      <div className="w-16 h-14 overflow-hidden flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────
// Main Blogs Page
// ─────────────────────────────────────────────
const BlogsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useInView(0.1);
  const gridRef = useInView(0.08);
  const sideRef = useInView(0.08);

  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  const filtered =
    activeCategory === 'All'
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  return (
    <main
      className="bg-[#f4f4f4] overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      {/* ── PAGE HEADER ────────────────────────────── */}
      <div
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className="relative bg-[#ffffff] px-6 sm:px-10 lg:px-20 pt-24 pb-14 overflow-hidden"
      >
        {/* Watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-4 top-2 font-black leading-none tracking-tighter text-[#f4f4f4]"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(100px,16vw,200px)',
          }}
        >
          JOURNAL
        </span>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Label */}
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
            <span className="text-xs tracking-widest text-gray-400 uppercase">
              Travel Journal
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-black tracking-tighter text-gray-900 leading-[0.93] mb-6 transition-all duration-700 delay-100 ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(44px,7.5vw,110px)',
            }}
          >
            Stories That
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Make You Book.
            </span>
          </h1>

          <div
            className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-700 delay-200 ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="max-w-md text-base sm:text-lg text-gray-500 leading-relaxed font-light">
              Real dispatches from the field. Not travel brochures — honest, intimate guides
              written by the people who live this island every day.
            </p>
            <div className="text-right flex-shrink-0">
              <span className="text-xs tracking-[0.25em] text-gray-400 uppercase">
                {blogPosts.length} Stories Published
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED POST ──────────────────────────── */}
      <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 pb-0">
        <div className="max-w-[1400px] mx-auto">
          <FeaturedCard post={featured} />
        </div>
      </div>

      {/* ── CATEGORY FILTER ────────────────────────── */}
      <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-8 border-b border-[#e8e4df] sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto flex items-center overflow-x-auto">
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
        </div>
      </div>

      {/* ── MAIN GRID + SIDEBAR ────────────────────── */}
      <div className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-20">

          {/* Left: Grid */}
          <div ref={gridRef.ref as React.RefObject<HTMLDivElement>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
              {filtered.map((post, i) => (
                <GridCard key={post.id} post={post} delay={i * 100} inView={gridRef.inView} />
              ))}
            </div>

            {/* Load more */}
            <div
              className={`mt-16 flex items-center gap-6 transition-all duration-700 delay-500 ${
                gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex-1 h-px bg-[#e8e4df]" />
              <button
                type="button"
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase border border-gray-300 text-gray-700 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
              >
                Load More Stories
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="flex-1 h-px bg-[#e8e4df]" />
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside ref={sideRef.ref as React.RefObject<HTMLDivElement>} className="space-y-12">
            {/* Must-reads */}
            <div>
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  sideRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="w-1 h-6 bg-[#5e17eb]" />
                <span
                  className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Must Reads
                </span>
              </div>
              {blogPosts.slice(0, 4).map((post, i) => (
                <SideCard key={post.id} post={post} index={i} inView={sideRef.inView} />
              ))}
            </div>

            {/* Newsletter CTA */}
            <div
              className={`p-8 transition-all duration-700 delay-300 ${
                sideRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
            >
              <div className="w-8 h-px bg-white/40 mb-6" />
              <h4
                className="text-xl font-black text-white tracking-tight leading-tight mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Get Stories
                <br />
                Before Everyone Else.
              </h4>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                One email a month. Local insights, hidden routes, honest guides. Never spam.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-light focus:outline-none focus:border-white/60 transition-colors"
                />
                <button
                  type="button"
                  className="w-full py-3 bg-white text-[#5e17eb] text-xs font-black tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Categories */}
            <div
              className={`transition-all duration-700 delay-400 ${
                sideRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-[#5e17eb]" />
                <span
                  className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Browse Topics
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase border border-[#e8e4df] text-gray-600 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:bg-[#f8f6ff]"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── CLOSING CTA ────────────────────────────── */}
      <div className="bg-[#e8e4df] px-6 sm:px-10 lg:px-20 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-4">
              Ready to Go?
            </span>
            <h3
              className="font-black text-gray-900 tracking-tight leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(28px, 4vw, 52px)',
              }}
            >
              These Stories Are Real.
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #5e17eb, #1800ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Your Journey Can Be Too.
              </span>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <button
              type="button"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:opacity-90 hover:gap-5"
              style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
            >
              Plan Your Trip
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase text-gray-900 border border-gray-300 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogsPage;