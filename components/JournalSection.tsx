'use client';

import React, { useEffect, useRef, useState } from 'react';

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
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [fired, threshold]);

  return { ref, inView };
};

// ─────────────────────────────────────────────
// Reading Progress Hook (For the Brain)
// ─────────────────────────────────────────────
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScrollY / scrollHeight).toFixed(4)) * 100);
      }
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return progress;
};

// ─────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────
const articles = [
  {
    id: 1,
    title: 'The Whispering Pines of Nuwara Eliya',
    excerpt: 'Deep in the central highlands lies a world untouched by time. Discover the emerald tea estates and the colonial charm of Sri Lanka’s coolest climate.',
    category: 'Highlands',
    readTime: '4 Min Read',
    date: 'Oct 12, 2023',
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1200&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Tracking the Elusive Leopard of Yala',
    excerpt: 'Patience is a virtue in the dry zone. A firsthand account of an early morning safari tracking the apex predator of the Sri Lankan wilderness.',
    category: 'Wildlife',
    readTime: '6 Min Read',
    date: 'Oct 05, 2023',
    image: 'https://images.unsplash.com/photo-1544866636-69fc87771744?w=800&q=80',
    featured: false,
  },
  {
    id: 3,
    title: 'Surf, Sand, and Slow Living in Hiriketiya',
    excerpt: 'Where the jungle meets the ocean. Why this horseshoe bay has become the ultimate sanctuary for slow, mindful travel.',
    category: 'Coastal',
    readTime: '3 Min Read',
    date: 'Sep 28, 2023',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
    featured: false,
  },
  {
    id: 4,
    title: 'The Architecture of Geoffrey Bawa',
    excerpt: 'Tropical modernism explained. Exploring how one man blurred the lines between the inside and the lush Sri Lankan outside.',
    category: 'Culture',
    readTime: '5 Min Read',
    date: 'Sep 15, 2023',
    image: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?w=800&q=80',
    featured: false,
  },
];

// ─────────────────────────────────────────────
// Main Parent Component
// ─────────────────────────────────────────────
export default function JournalSection() {
  // Toggle between 'list' and 'article' to show both designs
  const [currentView, setCurrentView] = useState<'list' | 'article'>('list');
  const [activeArticle, setActiveArticle] = useState(articles[0]);

  const handleReadArticle = (article: typeof articles[0]) => {
    setActiveArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>
      {currentView === 'list' ? (
        <JournalList onRead={handleReadArticle} />
      ) : (
        <ArticleView article={activeArticle} onBack={() => setCurrentView('list')} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 1. Journal List Page (The "Blogs" Index)
// ─────────────────────────────────────────────
const JournalList: React.FC<{ onRead: (a: any) => void }> = ({ onRead }) => {
  const headerRef = useInView(0.1);
  const featuredRef = useInView(0.1);
  const gridRef = useInView(0.1);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="bg-[#f9f9f9] py-24 lg:py-32 relative overflow-hidden">
      {/* Background Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-[-2%] top-[2%] text-[clamp(100px,18vw,240px)] font-black leading-none text-black/[0.02] tracking-tighter z-0"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        JOURNAL
      </span>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 relative z-10">
        
        {/* Header */}
        <div ref={headerRef.ref as React.RefObject<HTMLDivElement>} className="mb-20 text-center max-w-3xl mx-auto">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ease-out ${
              headerRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="h-px w-8 bg-[#5e17eb]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb]">
              Curated Stories
            </span>
            <div className="h-px w-8 bg-[#5e17eb]" />
          </div>
          <h1
            className={`text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 transition-all duration-700 ease-out delay-100 ${
              headerRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The Travel <span style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dispatch.</span>
          </h1>
          <p className={`text-gray-500 font-light leading-relaxed transition-all duration-700 ease-out delay-200 ${headerRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Insights, cultural deep-dives, and field notes from our architects of travel. Read, dream, and prepare for your island escape.
          </p>
        </div>

        {/* Featured Article (The Anchor) */}
        <div 
          ref={featuredRef.ref as React.RefObject<HTMLDivElement>}
          onClick={() => onRead(featured)}
          className={`group cursor-pointer grid grid-cols-1 lg:grid-cols-2 bg-white shadow-sm hover:shadow-2xl transition-all duration-700 ease-out mb-16 lg:mb-24 ${
            featuredRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#5e17eb]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-gray-900 shadow-lg">
              Featured
            </div>
          </div>
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">
              <span className="text-[#5e17eb]">{featured.category}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 transition-colors duration-300 group-hover:text-[#5e17eb]" style={{ fontFamily: "'Syne', sans-serif" }}>
              {featured.title}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-10 text-sm lg:text-base">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-gray-900 group-hover:text-[#1800ad] transition-colors">
              Read Story
              <span className="w-8 h-px bg-gray-300 group-hover:bg-[#1800ad] group-hover:w-12 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div 
          ref={gridRef.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {rest.map((article, idx) => (
            <div 
              key={article.id} 
              onClick={() => onRead(article)}
              className={`group cursor-pointer flex flex-col transition-all duration-700 ease-out ${
                gridRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-[280px] overflow-hidden mb-6 bg-gray-100">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
                <span className="text-[#5e17eb]">{article.category}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight leading-tight mb-3 transition-colors duration-300 group-hover:text-[#5e17eb]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {article.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm mb-6 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-[#1800ad] transition-colors">
                Read Story
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// 2. Article View Page (The Single Blog Post)
// ─────────────────────────────────────────────
const ArticleView: React.FC<{ article: any; onBack: () => void }> = ({ article, onBack }) => {
  const contentRef = useInView(0.05);
  const scrollProgress = useScrollProgress();

  return (
    <article className="bg-[#ffffff] relative pb-24">
      
      {/* Fixed Reading Progress Bar (The Brain) */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} 
        />
      </div>

      {/* Back Button (Floating) */}
      <button 
        onClick={onBack}
        className="absolute top-10 left-6 lg:left-20 z-40 group flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-gray-900 bg-white/80 backdrop-blur-md px-5 py-3 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Journal
      </button>

      {/* Hero Image Full Width */}
      <div className="relative w-full h-[60vh] lg:h-[80vh] bg-gray-900 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Article Meta & Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-10 lg:px-20 pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto text-center lg:text-left animate-fade-in-up">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white/80 mb-6">
              <span className="bg-[#5e17eb] text-white px-3 py-1">{article.category}</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]" style={{ fontFamily: "'Syne', sans-serif" }}>
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Body (The Heart - Optimized for calm reading) */}
      <div 
        ref={contentRef.ref as React.RefObject<HTMLDivElement>}
        className={`max-w-3xl mx-auto px-6 pt-20 lg:pt-24 transition-all duration-1000 ease-out ${
          contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Author Byline */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-10 mb-10">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Author" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 tracking-widest uppercase">By TripTip Curators</p>
            <p className="text-xs text-gray-400 font-light mt-0.5">Local Experts & Travel Architects</p>
          </div>
        </div>

        {/* The Text - Extremely high leading, calm gray color, legible size */}
        <div className="prose prose-lg max-w-none text-gray-600 font-light leading-[1.9] tracking-wide">
          <p className="text-xl sm:text-2xl text-gray-900 leading-relaxed mb-10 font-normal">
            <span className="float-left text-7xl font-black text-[#5e17eb] pr-3 pt-2 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>T</span>
            {article.excerpt} The journey begins where the map ends. In Sri Lanka, the most profound experiences are rarely found on the beaten path. They are hidden in the mist of the highlands, the dense foliage of the dry zone, and the quiet smiles of the locals.
          </p>

          <p className="mb-8">
            As the sun breaks over the horizon, casting a golden hue over the emerald tea leaves, one realizes that time moves differently here. The rush of modern life fades, replaced by the rhythmic clatter of the coastal train and the distant chant of a temple ceremony.
          </p>

          {/* Elegant Pull Quote to break the text wall */}
          <blockquote className="relative my-16 py-8 px-8 sm:px-12 bg-[#f9f9f9] border-l-4 border-[#5e17eb]">
            <svg className="absolute top-4 left-4 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.353 0 2.628-.337 3.738-.921-.758 3.394-3.535 5.921-6.738 5.921v4c4.97 0 9-4.03 9-9V8h-6zm16 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.353 0 2.628-.337 3.738-.921-.758 3.394-3.535 5.921-6.738 5.921v4c4.97 0 9-4.03 9-9V8h-6z" />
            </svg>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 leading-[1.3] m-0 relative z-10" style={{ fontFamily: "'Syne', sans-serif" }}>
              "To travel here is not just to see a new country, but to feel the heartbeat of an ancient island."
            </p>
          </blockquote>

          <h3 className="text-2xl font-black text-gray-900 mt-12 mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
            Embracing the Unpredictable
          </h3>
          <p className="mb-8">
            Whether you are navigating the winding roads of Nuwara Eliya or tracking a leopard through the dense scrub of Yala National Park, the true luxury of Sri Lanka is its raw, unpolished authenticity. We curate the logistics perfectly, so you have the freedom to simply exist in the moment.
          </p>
          <p>
            Join us on this continuous journey of discovery. Every route is a story waiting to be written. What will yours say?
          </p>
        </div>

        {/* Share & End Article Footer */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Share Story</span>
            <div className="flex gap-3">
              {['FB', 'TW', 'IN'].map(social => (
                <button key={social} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-colors">
                  {social}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '#contact'}
            className="text-xs font-bold tracking-widest uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#1800ad] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left"
          >
            Start Planning Your Trip
          </button>
        </div>
      </div>
    </article>
  );
};