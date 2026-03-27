// app/blog/[slug]/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface RelatedPost {
  slug: string;
  category: string;
  title: string;
  image: string;
  readTime: string;
  date: string;
}

// ============================================================================
// CUSTOM HOOK - Intersection Observer
// ============================================================================
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

// ============================================================================
// READING PROGRESS BAR COMPONENT
// ============================================================================
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, percent));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full transition-all duration-100 ease-linear"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, #5e17eb, #1800ad)',
        }}
      />
    </div>
  );
};

// ============================================================================
// FLOATING SIDEBAR COMPONENT
// ============================================================================
const FloatingSidebar: React.FC<{ readTime: string }> = ({ readTime }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 340);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const share = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${url}`,
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <div
      className="hidden xl:flex flex-col items-center gap-4 fixed left-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-500"
      style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? 'auto' : 'none' }}
      aria-label="Share and reading tools"
    >
      {/* Read time */}
      <div className="flex flex-col items-center gap-1 mb-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
          />
        </svg>
        <span className="text-[9px] tracking-widest text-gray-400 uppercase writing-vertical">
          {readTime}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-[#e8e4df]" />

      {/* Share buttons */}
      {[
        {
          id: 'twitter',
          label: 'Share on X',
          path: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z',
        },
        {
          id: 'facebook',
          label: 'Share on Facebook',
          path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
        },
        {
          id: 'whatsapp',
          label: 'Share on WhatsApp',
          path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
        },
      ].map((social) => (
        <button
          key={social.id}
          type="button"
          onClick={() => share(social.id)}
          aria-label={social.label}
          className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-400 transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:scale-110"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d={social.path} />
          </svg>
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// PULL QUOTE COMPONENT
// ============================================================================
const PullQuote: React.FC<{ text: string }> = ({ text }) => {
  const { ref, inView } = useInView(0.2);

  return (
    <blockquote
      ref={ref as React.RefObject<HTMLQuoteElement>}
      className={`my-14 lg:my-20 border-l-4 pl-8 lg:pl-12 transition-all duration-700 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
      style={{ borderColor: '#5e17eb' }}
    >
      <p
        className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight italic"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
};

// ============================================================================
// INLINE IMAGE COMPONENT
// ============================================================================
const InlineImage: React.FC<{ src: string; alt: string; caption?: string }> = ({
  src,
  alt,
  caption,
}) => {
  const { ref, inView } = useInView(0.1);

  return (
    <figure
      ref={ref as React.RefObject<HTMLElement>}
      className={`my-12 lg:my-16 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out hover:scale-105"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-gray-400 tracking-wide font-light">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// ============================================================================
// RELATED POST CARD COMPONENT
// ============================================================================
const RelatedCard: React.FC<{ post: RelatedPost; delay: number; inView: boolean }> = ({
  post,
  delay,
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
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="overflow-hidden mb-4" style={{ aspectRatio: '3/2' }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      </div>
      <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-2">
        {post.category}
      </span>
      <h4
        className="text-lg font-black tracking-tight leading-snug mb-2 transition-colors duration-300"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: hovered ? '#5e17eb' : '#111',
        }}
      >
        {post.title}
      </h4>
      <p className="text-xs text-gray-400">
        {post.date} · {post.readTime}
      </p>
    </Link>
  );
};

// ============================================================================
// RELATED POSTS DATA
// ============================================================================
const relatedPosts: RelatedPost[] = [
  {
    slug: 'ella-train-truth',
    category: 'Adventure',
    title: "Ella Train: The Truth Behind Sri Lanka's Most Famous Journey",
    image: 'https://images.unsplash.com/photo-1586101263897-8849e1de3c79?w=900&q=85',
    readTime: '7 min read',
    date: 'Mar 04, 2025',
  },
  {
    slug: 'colombo-street-food-guide',
    category: 'Food & Culture',
    title: 'Colombo After Dark: A Street Food Map That Actually Works',
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=900&q=85',
    readTime: '6 min read',
    date: 'Feb 21, 2025',
  },
  {
    slug: 'nuwara-eliya-tea-plantation',
    category: 'Lifestyle',
    title: 'A Day Inside a Tea Plantation: From Leaf to Cup in Nuwara Eliya',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    readTime: '9 min read',
    date: 'Jan 14, 2025',
  },
];

// ============================================================================
// MAIN BLOG VIEW PAGE COMPONENT
// ============================================================================
const BlogViewPage: React.FC = () => {
  // State Management
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Intersection Observer Hooks
  const heroRef = useInView(0.1);
  const contentRef = useInView(0.05);
  const relatedRef = useInView(0.1);

  // Example post data — in production, fetch by slug via params
  const post = {
    category: 'Culture',
    title: 'The Secret Hour at Sigiriya Nobody Tells You About',
    subtitle:
      'Before the crowds arrive, before the tour buses roll in — there is a 40-minute window at dawn where Sigiriya belongs entirely to you.',
    heroImage: '../blogimg/sigiriya.avif',
    author: 'Rohan Perera',
    authorRole: 'Lead Cultural Guide, Sri Lankan TripTip',
    authorBio:
      "Rohan has guided over 800 guests through Sri Lanka's cultural heartland over 11 years. Born in Dambulla, he grew up in the shadow of Sigiriya.",
    date: 'March 18, 2025',
    readTime: '5 min read',
    tags: ['Sigiriya', 'Sunrise', 'Ancient Sri Lanka', 'Photography'],
  };

  // Lock body scroll when menu is open
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
    <>
    <Navbar
            isIntro={false}
            isMenuOpen={isMenuOpen}
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
          />
      {/* Reading progress */}
      <ReadingProgressBar />

      {/* Floating sidebar */}
      <FloatingSidebar readTime={post.readTime} />

      <article
        className="bg-[#ffffff] overflow-hidden"
        style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
        aria-label={post.title}
      >
        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className="relative overflow-hidden"
          style={{ height: 'clamp(480px, 65vh, 780px)' }}
        >
          
          <img
            src={post.heroImage}
            alt={post.title}
            className={`absolute inset-0 w-full h-full  object-cover transition-all duration-[2500ms] ease-out ${
              heroRef.inView ? 'scale-100' : 'scale-105'
            }`}
          />

          {/* Deep gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.1) 100%)',
            }}
          />

          {/* Purple tint overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
          />

          {/* Top nav breadcrumb */}
          <div className="absolute top-8 left-8 lg:mt-[80px] right-8 flex items-center gap-2 z-10">
            <Link
              href="/blog"
              className="text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              Journal
            </Link>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white/60 text-xs tracking-widest uppercase">
              {post.category}
            </span>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 xl:px-28 pb-12 lg:pb-16">
            {/* Meta row */}
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-700 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span
                className="text-[10px] font-bold tracking-[0.35em] uppercase text-white px-3 py-1.5 border border-white/30"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {post.category}
              </span>
              <span className="text-white/50 text-xs">·</span>
              <span className="text-white/60 text-xs">{post.readTime}</span>
              <span className="text-white/50 text-xs">·</span>
              <span className="text-white/60 text-xs">{post.date}</span>
            </div>

            {/* Title */}
            <h1
              className={`font-black text-white leading-[0.95] tracking-tight mb-6 max-w-4xl transition-all duration-700 delay-100 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(32px, 5.5vw, 80px)',
              }}
            >
              {post.title}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-white/75 font-light leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
                heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontSize: 'clamp(14px, 1.4vw, 18px)' }}
            >
              {post.subtitle}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* AUTHOR BAR */}
        {/* ============================================================ */}
        <div className="bg-[#f4f4f4] px-6 sm:px-12 lg:px-20 xl:px-28 py-6 border-b border-[#e8e4df]">
          <div className="max-w-[780px] mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              >
                {post.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p
                  className="text-sm font-bold text-gray-900"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {post.author}
                </p>
                <p className="text-xs text-gray-400 font-light">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {['twitter', 'facebook', 'whatsapp'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-[#e8e4df] text-gray-400 text-xs transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb]"
                  aria-label={`Share on ${s}`}
                >
                  {s === 'twitter' ? 'X' : s === 'facebook' ? 'F' : 'W'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ARTICLE CONTENT */}
        {/* ============================================================ */}
        <div
          ref={contentRef.ref as React.RefObject<HTMLDivElement>}
          className={`px-6 sm:px-12 lg:px-20 xl:px-28 pt-14 lg:pt-20 pb-0 max-w-[1200px] mx-auto transition-all duration-700 ${
            contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-[780px] mx-auto">
            {/* Opening paragraph */}
            <p
              className="text-xl sm:text-2xl text-gray-900 leading-relaxed font-light mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Most people set their alarms for 7am when they visit Sigiriya. They arrive at the
              gates with the tour groups, shoulder-to-shoulder on the spiral staircase, phone
              cameras raised. They get the picture. They do not get the experience.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              Set your alarm for 5:15am instead. You will need to negotiate entry with the site
              manager — and yes, this takes a local contact or a trusted guide. But if you can
              arrange it, you will walk into one of the ancient world&apos;s great monuments while
              it still belongs to the birds and the mist.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              Sigiriya at dawn is a different geological and psychological event. The Lion Rock,
              which rises 200 metres from the flat jungle, turns from charcoal to amber to a
              burning rust-red as the sun crests the eastern hills. The frescoes in the mirror wall
              gallery, which date from the 5th century, catch the low morning light in a way that
              makes the painted eyes seem to follow you. Historians have argued for decades whether
              this was an intentional architectural trick or coincidence. Standing there at 6am with
              no one else around, the question feels irrelevant.
            </p>

            {/* Pull quote */}
            <PullQuote text="The painted eyes catch the low morning light and seem to follow you. At 6am, with no one else around, the question of whether it was intentional feels completely irrelevant." />

            <h2
              className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-5 mt-12"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              How to Arrange It
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              The standard public gates open at 7am. Pre-dawn access exists but is not officially
              advertised — it operates through the site&apos;s conservation office and requires
              advance booking. Do not arrive and expect to negotiate on the spot; you will be turned
              away. This is precisely the kind of access our guides can facilitate, because they
              have spent years building trust with the site managers.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              You will also need a torch (not just your phone). The stone steps at the base are
              uneven and the lower sections of the climb have no artificial lighting. Bring water, a
              light layer — the early morning at altitude is cooler than you expect — and crucially,
              leave the drone at the hotel. No drone access is permitted before standard hours, and
              attempting to fly one will end your pre-dawn privilege permanently.
            </p>

            {/* Inline image */}
            <InlineImage
              src="../blogimg/sigiriya.avif"
              alt="The ancient mirror wall gallery at Sigiriya"
              caption="The mirror wall gallery, where 5th-century frescoes catch the dawn light in ways that feel deliberate."
            />

            <h2
              className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              The 40-Minute Window
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              Expect roughly 40 minutes of genuine solitude before the first standard visitors begin
              their ascent. This window — from approximately 6:10am to 6:50am on most mornings — is
              when the experience is closest to what the site&apos;s original architect, King
              Kashyapa, intended it to feel like: vast, silent, and faintly terrifying. The jungle
              below you is still waking up. The mist in the valley has not yet burned off. The city
              of Dambulla, visible on a clear day, is a grey smudge on the horizon.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              Bring a journal or just sit. After years of guiding, I still do not have the right
              words for what it feels like to be alone on that summit at dawn. Every guest I have
              brought here has gone quiet. Every single one.
            </p>

            {/* Second pull quote */}
            <PullQuote text="After years of guiding, I still do not have the right words for what it feels like to be alone on that summit at dawn. Every guest I've brought here has gone quiet. Every single one." />

            <h2
              className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-5 mt-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              The Practical Truth
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">
              This is not the trip for everyone. The climb at dawn requires reasonable fitness — the
              final approach involves a near-vertical iron staircase bolted to the rock face, and
              without crowds in front of you, the exposure feels considerably more dramatic. Guests
              with serious vertigo should know this before committing.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-14">
              For everyone else: this is the version of Sri Lanka that we exist to show you. Not the
              postcard. The real thing, at the only hour it reveals itself without reservation. Book
              it before your first coffee on the first morning you arrive in the island. You will
              thank yourself for the rest of the trip.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 pb-12 border-t border-[#e8e4df]">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-colors duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* AUTHOR BIO */}
        {/* ============================================================ */}
        <div className="bg-[#f4f4f4] px-6 sm:px-12 lg:px-20 xl:px-28 py-16">
          <div className="max-w-[780px] mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div
                className="w-20 h-20 flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
              >
                {post.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-1">
                  Written By
                </span>
                <h3
                  className="text-xl font-black text-gray-900 tracking-tight mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {post.author}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{post.authorRole}</p>
                <p className="text-sm text-gray-600 leading-relaxed font-light max-w-lg">
                  {post.authorBio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CTA BAND */}
        {/* ============================================================ */}
        <div
          className="px-6 sm:px-12 lg:px-20 py-16 lg:py-20"
          style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }}
        >
          <div className="max-w-[780px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <div className="w-8 h-px bg-white/40 mb-5" />
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want This Experience
                <br />
                For Yourself?
              </h3>
              <p className="text-white/70 font-light text-sm mt-3 max-w-sm leading-relaxed">
                Our guides have the access, the knowledge and the contacts to make mornings like
                this happen for you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-[#5e17eb] text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 hover:gap-5"
              >
                See Our Tours
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-4 border border-white/40 text-white text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RELATED POSTS */}
        {/* ============================================================ */}
        <div
          ref={relatedRef.ref as React.RefObject<HTMLDivElement>}
          className="bg-[#ffffff] px-6 sm:px-12 lg:px-20 py-20 lg:py-28"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Section label */}
            <div
              className={`flex items-center gap-4 mb-12 transition-all duration-700 ${
                relatedRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-1 h-8 bg-[#5e17eb]" />
              <span
                className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Continue Reading
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
              {relatedPosts.map((rPost, i) => (
                <RelatedCard
                  key={rPost.slug}
                  post={rPost}
                  delay={i * 120}
                  inView={relatedRef.inView}
                />
              ))}
            </div>

            {/* Back to all */}
            <div
              className={`mt-16 transition-all duration-700 delay-400 ${
                relatedRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-gray-400 transition-all duration-300 hover:text-[#5e17eb] hover:gap-5"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
                Back to All Stories
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogViewPage;