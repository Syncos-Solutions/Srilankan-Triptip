'use client';
// app/blog/[slug]/page.tsx
// Works with both /blog/[slug] and /blog/[uuid] (admin preview).
// Title, subtitle and all body content are ALWAYS visible.
// No opacity-0 gates on above-the-fold elements.

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter }        from 'next/navigation';
import Link                            from 'next/link';
import Navbar                          from '@/components/Navbar';
import Footer                          from '@/components/Footer';
import {
  getPostBySlug,
  getRelatedPosts,
  incrementViewCount,
  formatBlogDate,
  type BlogPost,
  type BlogPostCard,
  type ContentBlock,
  type GalleryImage,
} from '@/lib/supabase-client';

// ─────────────────────────────────────────────────────────────
// HOOK — fires once when element enters viewport
// Used only for BELOW-the-fold blocks, not hero content.
// ─────────────────────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const [fired,  setFired]  = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // SSR guard
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !fired) { setInView(true); setFired(true); } },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, [fired, threshold]);

  return { ref, inView };
};

// ─────────────────────────────────────────────────────────────
// READING PROGRESS BAR
// ─────────────────────────────────────────────────────────────
const ReadingProgressBar: React.FC = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none">
      <div className="h-full transition-all duration-100 ease-linear"
        style={{ width: `${pct}%`, background: 'linear-gradient(to right,#5e17eb,#1800ad)' }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// FLOATING SHARE SIDEBAR (desktop only)
// ─────────────────────────────────────────────────────────────
const FloatingSidebar: React.FC<{ readTime: string }> = ({ readTime }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 340);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const share = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const map: Record<string,string> = {
      twitter:  `https://twitter.com/intent/tweet?url=${url}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${url}`,
    };
    window.open(map[platform], '_blank');
  };

  const socials = [
    { id: 'twitter',  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { id: 'facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { id: 'whatsapp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
  ];

  return (
    <aside
      className="hidden xl:flex flex-col items-center gap-5 fixed left-6 2xl:left-10 z-40 transition-all duration-500"
      style={{ top: '50%', transform: 'translateY(-50%)', opacity: show ? 1 : 0, pointerEvents: show ? 'all' : 'none' }}>
      <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300">Share</span>
      <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom,#5e17eb,#1800ad)' }} />
      {socials.map(s => (
        <button key={s.id} type="button" onClick={() => share(s.id)} aria-label={`Share on ${s.id}`}
          className="w-9 h-9 flex items-center justify-center border border-[#e8e4df] text-gray-400 bg-white transition-all duration-300 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:scale-110">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
        </button>
      ))}
      <div className="w-px h-8 bg-[#e8e4df]" />
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-300"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
        {readTime}
      </span>
    </aside>
  );
};

// ─────────────────────────────────────────────────────────────
// CONTENT BLOCK COMPONENTS
// Individual blocks have entrance animations.
// ─────────────────────────────────────────────────────────────
const PullQuote: React.FC<{ text: string }> = ({ text }) => {
  const { ref, inView } = useInView(0.2);
  return (
    <blockquote ref={ref as React.RefObject<HTMLQuoteElement>}
      className={`my-14 lg:my-20 border-l-4 pl-8 lg:pl-12 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      style={{ borderColor: '#5e17eb' }}>
      <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight italic"
        style={{ fontFamily: "'Syne',sans-serif" }}>
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
};

const InlineImage: React.FC<{ src: string; alt: string; caption?: string }> = ({ src, alt, caption }) => {
  const { ref, inView } = useInView(0.1);
  return (
    <figure ref={ref as React.RefObject<HTMLElement>}
      className={`my-12 lg:my-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img src={src} alt={alt}
          className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out hover:scale-105" />
      </div>
      {caption && <figcaption className="mt-3 text-xs text-gray-400 tracking-wide font-light">{caption}</figcaption>}
    </figure>
  );
};

const ImageGallery: React.FC<{ images: GalleryImage[]; caption?: string }> = ({ images, caption }) => {
  const { ref, inView } = useInView(0.05);
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (!images?.length) return null;
  const count = images.length;
  const gridClass = count === 2 ? 'grid-cols-1 sm:grid-cols-2'
    : count === 3 ? 'grid-cols-1 sm:grid-cols-3'
    : 'grid-cols-2';

  return (
    <figure ref={ref as React.RefObject<HTMLElement>}
      className={`my-14 lg:my-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-6 h-[2px]" style={{ background: 'linear-gradient(to right,#5e17eb,#1800ad)' }} />
        <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#5e17eb]">
          Photo Gallery · {count} Images
        </span>
      </div>
      <div className={`grid ${gridClass} gap-2 sm:gap-3`}>
        {images.map((img, idx) => (
          <div key={idx} className="group relative overflow-hidden cursor-pointer"
            style={{ aspectRatio: count <= 3 ? '4/3' : '3/2',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.6s ease ${idx * 80}ms, transform 0.6s ease ${idx * 80}ms` }}
            onClick={() => setLightbox(idx)} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setLightbox(idx)}>
            <img src={img.src} alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.6),transparent 50%)' }}>
              {img.caption && <p className="absolute bottom-3 left-3 text-white text-xs font-light">{img.caption}</p>}
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-4 text-xs text-gray-400 tracking-wide font-light">{caption}</figcaption>}

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white transition-colors z-10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {lightbox > 0 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              className="absolute left-4 sm:left-8 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white transition-colors z-10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}>
            <img src={images[lightbox].src} alt={images[lightbox].alt}
              className="max-w-full max-h-[78vh] object-contain" />
            <div className="flex items-center justify-between w-full mt-3 px-1">
              <p className="text-white/60 text-xs font-light">
                {images[lightbox].caption || images[lightbox].alt}
              </p>
              <span className="text-white/40 text-xs">{lightbox + 1} / {images.length}</span>
            </div>
          </div>
          {lightbox < images.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              className="absolute right-4 sm:right-8 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white transition-colors z-10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </figure>
  );
};

const TipsList: React.FC<{ heading?: string; items: string[] }> = ({ heading, items }) => {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
      className={`my-10 lg:my-14 border border-[#e8e4df] p-6 sm:p-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {heading && (
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] mb-5">{heading}</p>
      )}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-white text-[9px] font-black mt-0.5"
              style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContentDivider: React.FC = () => (
  <div className="my-14 lg:my-20 flex items-center gap-6">
    <div className="flex-1 h-px bg-[#e8e4df]" />
    <div className="w-2 h-2" style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)', transform: 'rotate(45deg)' }} />
    <div className="flex-1 h-px bg-[#e8e4df]" />
  </div>
);

// ─────────────────────────────────────────────────────────────
// BLOCK RENDERER — fallback to excerpt if blocks empty
// ─────────────────────────────────────────────────────────────
const ContentBlockRenderer: React.FC<{ blocks: ContentBlock[]; excerpt?: string }> = ({ blocks, excerpt }) => {
  if (!blocks?.length) {
    if (excerpt) {
      return (
        <p className="text-xl sm:text-2xl text-gray-900 leading-relaxed font-light mb-8">
          {excerpt}
        </p>
      );
    }
    return null;
  }

  return (
    <>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'lead_paragraph':
            return <p key={idx} className="text-xl sm:text-2xl text-gray-900 leading-relaxed font-light mb-8">{block.text}</p>;
          case 'paragraph':
            return <p key={idx} className="text-base sm:text-lg text-gray-600 leading-[1.85] font-light mb-7">{block.text}</p>;
          case 'heading':
            return <h2 key={idx} className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-5 mt-12"
              style={{ fontFamily: "'Syne',sans-serif" }}>{block.text}</h2>;
          case 'subheading':
            return <h3 key={idx} className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-4 mt-10"
              style={{ fontFamily: "'Syne',sans-serif" }}>{block.text}</h3>;
          case 'pull_quote':
            return <PullQuote key={idx} text={block.text ?? ''} />;
          case 'image':
            return <InlineImage key={idx} src={block.src ?? ''} alt={block.alt ?? ''} caption={block.caption} />;
          case 'image_gallery':
            return <ImageGallery key={idx} images={block.images ?? []} caption={block.caption} />;
          case 'tips_list':
            return <TipsList key={idx} heading={block.heading} items={block.items ?? []} />;
          case 'divider':
            return <ContentDivider key={idx} />;
          default:
            if (block.text) {
              return <p key={idx} className="text-base text-gray-600 leading-relaxed font-light mb-7">{block.text}</p>;
            }
            return null;
        }
      })}
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────
const Skeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-[#e8e4df] w-full" style={{ height: 'clamp(480px,65vh,780px)' }} />
    <div className="bg-[#f4f4f4] px-6 sm:px-12 lg:px-20 py-6 border-b border-[#e8e4df]">
      <div className="max-w-[780px] mx-auto flex items-center gap-4">
        <div className="w-12 h-12 bg-[#e8e4df] flex-shrink-0" />
        <div>
          <div className="h-4 w-32 bg-[#e8e4df] mb-2" />
          <div className="h-3 w-24 bg-[#e8e4df]" />
        </div>
      </div>
    </div>
    <div className="px-6 sm:px-12 lg:px-20 pt-14 max-w-[780px] mx-auto space-y-5">
      {[100, 90, 85, 95, 80, 75, 88].map((w, i) => (
        <div key={i} className="h-4 bg-[#f0eeeb]" style={{ width: `${w}%` }} />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// NOT FOUND
// ─────────────────────────────────────────────────────────────
const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-20">
    <div className="w-1 h-20 mb-8" style={{ background: 'linear-gradient(to bottom,#5e17eb,#1800ad)' }} />
    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4"
      style={{ fontFamily: "'Syne',sans-serif" }}>
      Story Not Found.
    </h1>
    <p className="text-gray-500 font-light text-base max-w-sm leading-relaxed mb-10">
      This story may have been removed or is not yet published.
    </p>
    <Link href="/blog"
      className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase text-white"
      style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)' }}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to All Stories
    </Link>
  </div>
);

// ─────────────────────────────────────────────────────────────
// RELATED CARD
// ─────────────────────────────────────────────────────────────
const RelatedCard: React.FC<{ post: BlogPostCard; delay: number; inView: boolean }> = ({ post, delay, inView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/blog/${post.slug}`} className="group block"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      <div className="overflow-hidden mb-4" style={{ aspectRatio: '3/2' }}>
        <img src={post.hero_image} alt={post.hero_image_alt ?? post.title}
          className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
      </div>
      <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-2">
        {post.category}
      </span>
      <h4 className="text-lg font-black tracking-tight leading-snug mb-2 transition-colors duration-300"
        style={{ fontFamily: "'Syne',sans-serif", color: hovered ? '#5e17eb' : '#111' }}>
        {post.title}
      </h4>
      <p className="text-xs text-gray-400">{formatBlogDate(post.published_at)} · {post.read_time}</p>
    </Link>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
const BlogViewPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug   = typeof params?.slug === 'string'
    ? params.slug
    : Array.isArray(params?.slug) ? params.slug[0] : '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [post,       setPost]       = useState<BlogPost | null>(null);
  const [related,    setRelated]    = useState<BlogPostCard[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [notFound,   setNotFound]   = useState(false);

  // Only used for hero Ken Burns zoom (not for title/text visibility)
  const heroImgRef = useInView(0.1);
  const relatedRef = useInView(0.1);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setPost(null);
    setRelated([]);

    getPostBySlug(slug)
      .then(async data => {
        if (cancelled) return;
        if (!data) { setNotFound(true); setLoading(false); return; }
        setPost(data);
        setLoading(false);
        incrementViewCount(data.slug || slug);
        if (data.related_slugs?.length > 0) {
          const rel = await getRelatedPosts(data.related_slugs);
          if (!cancelled) setRelated(rel);
        }
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[BlogViewPage]', err);
        setNotFound(true);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const shareFn = (platform: string) => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const map: Record<string,string> = {
      twitter:  `https://twitter.com/intent/tweet?url=${url}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${url}`,
    };
    window.open(map[platform], '_blank');
  };

  const getInitials = (p: BlogPost) =>
    p.author_initials ||
    p.author.split(' ').map((n: string) => n[0] || '').join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Navbar isIntro={false} isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)} onMenuClose={() => setIsMenuOpen(false)} />
      <ReadingProgressBar />
      {post && <FloatingSidebar readTime={post.read_time} />}

      {/* LOADING */}
      {loading && (
        <article className="bg-white overflow-hidden" style={{ fontFamily: "'DM Sans','Syne',sans-serif" }}>
          <Skeleton />
        </article>
      )}

      {/* NOT FOUND */}
      {!loading && notFound && (
        <main className="bg-[#f4f4f4]" style={{ fontFamily: "'DM Sans','Syne',sans-serif" }}>
          <NotFound />
          <Footer />
        </main>
      )}

      {/* ARTICLE */}
      {!loading && !notFound && post && (
        <article className="bg-white overflow-hidden" style={{ fontFamily: "'DM Sans','Syne',sans-serif" }}>

          {/* ── HERO ─────────────────────────────────────────
              Title, subtitle, meta are ALWAYS visible.
              Only the hero image has the Ken Burns zoom effect.
          ─────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(480px,65vh,780px)' }}>

            {/* Background image — Ken Burns zoom effect */}
            <img
              ref={heroImgRef.ref as React.RefObject<HTMLImageElement>}
              src={post.hero_image}
              alt={post.hero_image_alt ?? post.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] ease-out ${heroImgRef.inView ? 'scale-100' : 'scale-105'}`}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.93) 0%,rgba(0,0,0,0.52) 50%,rgba(0,0,0,0.12) 100%)' }} />

            {/* Purple tint */}
            <div className="absolute inset-0 opacity-[0.14]"
              style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)' }} />

            {/* Breadcrumb + Back button — always visible */}
            <div className="absolute top-6 sm:top-8 left-6 sm:left-8 right-6 sm:right-8 flex items-center justify-between z-10"
              style={{ marginTop: 'max(0px, env(safe-area-inset-top))' }}>

              {/* Back button */}
              <button
                type="button"
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Back</span>
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2">
                <Link href="/blog" className="text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors">
                  Journal
                </Link>
                <span className="text-white/30 text-xs">/</span>
                <span className="text-white/60 text-xs tracking-widest uppercase truncate max-w-[120px] sm:max-w-none">
                  {post.category}
                </span>
              </div>
            </div>

            {/* ── TEXT CONTENT — NO OPACITY GATE ────────────
                These render immediately on mount.
                Do NOT add transition-based opacity classes here.
            ───────────────────────────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 xl:px-28 pb-10 sm:pb-14 lg:pb-16">

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-white px-3 py-1.5 border border-white/30">
                  {post.category}
                </span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs">{post.read_time}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs">{formatBlogDate(post.published_at)}</span>
              </div>

              {/* ── TITLE — always visible, no opacity animation ── */}
              <h1
                className="font-black text-white leading-[0.95] tracking-tight mb-5 max-w-4xl"
                style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(26px,5.5vw,78px)' }}
              >
                {post.title}
              </h1>

              {/* ── SUBTITLE — always visible ── */}
              {post.subtitle && (
                <p
                  className="text-white/78 font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(13px,1.4vw,18px)' }}
                >
                  {post.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* ── AUTHOR BAR ───────────────────────────────── */}
          <div className="bg-[#f4f4f4] px-6 sm:px-12 lg:px-20 xl:px-28 py-5 border-b border-[#e8e4df]">
            <div className="max-w-[780px] mx-auto flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)' }}>
                  {getInitials(post)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-400 font-light">{post.author_role}</p>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                {(['twitter','facebook','whatsapp'] as const).map(s => (
                  <button key={s} type="button" onClick={() => shareFn(s)}
                    className="w-8 h-8 flex items-center justify-center border border-[#e8e4df] text-gray-400 text-xs transition-all hover:border-[#5e17eb] hover:text-[#5e17eb]"
                    aria-label={`Share on ${s}`}>
                    {s === 'twitter' ? 'X' : s === 'facebook' ? 'f' : 'W'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── ARTICLE BODY — always visible, no opacity lock ── */}
          <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pt-14 lg:pt-20 pb-0 max-w-[1200px] mx-auto">
            <div className="max-w-[780px] mx-auto">
              <ContentBlockRenderer blocks={post.body_content} excerpt={post.excerpt} />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-8 pb-4 border-t border-[#e8e4df] mt-4">
                  {post.tags.map(tag => (
                    <span key={tag}
                      className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border border-[#e8e4df] text-gray-500 hover:border-[#5e17eb] hover:text-[#5e17eb] transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ── BACK TO BLOG — inline below content ── */}
              <div className="pt-10 pb-2">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-gray-400 transition-all duration-300 hover:text-[#5e17eb] hover:gap-5"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to All Stories
                </Link>
              </div>
            </div>
          </div>

          {/* ── PHOTO JOURNAL — always visible ── */}
          {post.gallery_images?.length > 0 && (
            <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pt-10 pb-16 lg:pb-24 max-w-[1200px] mx-auto">
              <div className="max-w-[780px] mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-10 bg-[#5e17eb]" />
                  <div>
                    <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]">Photo Journal</p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">
                      {post.gallery_images.length} Images from the Field
                    </p>
                  </div>
                </div>
                <ImageGallery images={post.gallery_images} />
              </div>
            </div>
          )}

          {/* ── AUTHOR BIO ── */}
          <div className="bg-[#f4f4f4] px-6 sm:px-12 lg:px-20 xl:px-28 py-14 lg:py-16">
            <div className="max-w-[780px] mx-auto flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)' }}>
                {getInitials(post)}
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5e17eb] block mb-1">Written By</span>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1"
                  style={{ fontFamily: "'Syne',sans-serif" }}>
                  {post.author}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{post.author_role}</p>
                {post.author_bio && (
                  <p className="text-sm text-gray-600 leading-relaxed font-light max-w-lg">{post.author_bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── CTA BAND ── */}
          <div className="px-6 sm:px-12 lg:px-20 py-16 lg:py-20"
            style={{ background: 'linear-gradient(135deg,#5e17eb,#1800ad)' }}>
            <div className="max-w-[780px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <div className="w-8 h-px bg-white/40 mb-5" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight"
                  style={{ fontFamily: "'Syne',sans-serif" }}>
                  Want This Experience<br />For Yourself?
                </h3>
                <p className="text-white/70 font-light text-sm mt-3 max-w-sm leading-relaxed">
                  Our guides have the access, knowledge and contacts to make experiences like this happen for you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/tours"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-[#5e17eb] text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 hover:gap-5">
                  See Our Tours
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-3 px-7 py-4 border border-white/40 text-white text-xs font-black tracking-[0.2em] uppercase transition-all hover:border-white hover:bg-white/10">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* ── RELATED POSTS ── */}
          {related.length > 0 && (
            <div ref={relatedRef.ref as React.RefObject<HTMLDivElement>}
              className="bg-white px-6 sm:px-12 lg:px-20 py-20 lg:py-28">
              <div className="max-w-[1400px] mx-auto">
                <div className={`flex items-center gap-4 mb-12 transition-all duration-700 ${relatedRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <div className="w-1 h-8 bg-[#5e17eb]" />
                  <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]">Continue Reading</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                  {related.map((rPost, i) => (
                    <RelatedCard key={rPost.id} post={rPost} delay={i * 120} inView={relatedRef.inView} />
                  ))}
                </div>
                <div className={`mt-16 transition-all duration-700 delay-400 ${relatedRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <Link href="/blog"
                    className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-gray-400 transition-all duration-300 hover:text-[#5e17eb] hover:gap-5">
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to All Stories
                  </Link>
                </div>
              </div>
            </div>
          )}

        </article>
      )}

      {!loading && <Footer />}
    </>
  );
};

export default BlogViewPage;