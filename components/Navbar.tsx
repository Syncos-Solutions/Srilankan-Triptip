'use client';
// components/Navbar.tsx
// Exact match to Sri_Lanka_Triptip_v3.html navbar.
// ─ Fixed 68px bar: text logo + two-line hamburger, scroll-aware colour
// ─ Full-screen dark overlay: slides down, 58/42 split grid
// ─ Left: numbered nav links + staggered animation + BOOK NOW footer
// ─ Right: crossfade image per hovered link

import { useEffect, useState } from 'react';
import Link                    from 'next/link';
import Image from 'next/image';

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const ACCENT  = '#5e17eb';
const ACCENT2 = '#1800ad';

// All 8 nav links — full site navigation
const NAV_LINKS = [
  { label: 'Home',            tag: 'Pearl of the Indian Ocean', href: '/'                },
  { label: 'About',           tag: 'Our Story & Mission',       href: '/about'           },
  { label: 'Tours',           tag: 'Explore Sri Lanka',         href: '/tours'           },
  { label: 'Taxi',            tag: 'Island Transfers',          href: '/taxi'            },
  { label: 'Custom Planning', tag: 'Bespoke Journeys',          href: '/custom-planning' },
  { label: 'Gallery',         tag: 'Visual Stories',            href: '/gallery'         },
  { label: 'Blog',            tag: 'Insights & Culture',        href: '/blog'            },
  { label: 'Contact Us',      tag: 'Get in Touch',              href: '/contact'         },
];

// Right panel images — one per link slot (repeats if more links than images)
const NAV_IMGS = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=900&q=85',
  'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=85',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=85',
  'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=900&q=85',
];

// ─────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────
interface NavbarProps {
  isIntro:     boolean;   // when true = sitting over a light page → logo is dark
  isMenuOpen:  boolean;
  onMenuOpen:  () => void;
  onMenuClose: () => void;
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Navbar({
  isIntro,
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hovIdx,   setHovIdx]   = useState(-1);
  const [imgIdx,   setImgIdx]   = useState(0);
  const [imgVis,   setImgVis]   = useState(true);

  // Scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Body lock when overlay open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Crossfade on hover change
  useEffect(() => {
    if (hovIdx < 0) return;
    setImgVis(false);
    const t = setTimeout(() => {
      setImgIdx(hovIdx % NAV_IMGS.length);
      setImgVis(true);
    }, 110);
    return () => clearTimeout(t);
  }, [hovIdx]);

  // Logo/hamburger colour:
  // ─ overlay open  → transparent (overlay has its own logo)
  // ─ isIntro=true  → dark on light hero background
  // ─ scrolled      → white over darker scroll context
  const onDark      = !isIntro || scrolled;
  const logoColor   = isMenuOpen ? 'transparent' : onDark ? '#ffffff' : '#0a0a0a';
  const dotColor    = isMenuOpen ? 'transparent' : ACCENT;
  const subColor    = isMenuOpen ? 'transparent' : onDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
  const lineColor   = isMenuOpen ? 'transparent' : onDark ? '#000000' : '#0a0a0a';

  return (
    <>
      {/* ── FIXED BAR ───────────────────────────────────── */}
      <header
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          bottom:         12,
          zIndex:         100,
          height:         88,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 clamp(20px,4.5vw,56px)',
          pointerEvents:  isMenuOpen ? 'none' : 'all',
        }}
      >
        {/* Text logo */}
        <Link href="/" aria-label="Sri Lankan TripTip — Home" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily:    "'Syne', sans-serif",
            fontWeight:    800,
            fontSize:      16,
            letterSpacing: '-0.02em',
            color:         logoColor,
            lineHeight:    1,
            transition:    'color 0.4s',
          }}>
            {/* <Image src="/SLtriptipLogo.svg" alt="Logo" width={100} height={50}  /> */}
            {/* SRILANKAN<span style={{ color: dotColor }}>.</span>TRIPTIP */}
          </div>
          
        </Link>

        {/* Two-line hamburger */}
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          style={{
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            padding:       '10px 6px',
            display:       'flex',
            flexDirection: 'column',
            gap:           7,
            alignItems:    'flex-end',
          }}
        >
          <span style={{ display: 'block', width: 32, height: 1.5, background: lineColor, transition: 'background 0.4s' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: lineColor, transition: 'background 0.4s' }} />
        </button>
      </header>

      {/* ── FULL-SCREEN OVERLAY ─────────────────────────── */}
      <div
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        style={{
          position:            'fixed',
          inset:               0,
          zIndex:              200,
          display:             'grid',
          gridTemplateColumns: '58% 42%',
          background:          '#080808',
          transform:           isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition:          'transform 0.65s cubic-bezier(0.76,0,0.24,1)',
        }}
      >
        {/* ── LEFT PANEL ─────────────────────────────── */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          padding:       'clamp(24px,4vw,60px)',
          borderRight:   '1px solid rgba(0,0,0,0.15)',
          overflow:      'hidden',
        }}>

          {/* Header row: logo + close */}
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            paddingBottom:  36,
            borderBottom:   '1px solid rgba(0,0,0,0.15)',
            marginBottom:   28,
            opacity:        isMenuOpen ? 1 : 0,
            transition:     'opacity 0.4s ease 300ms',
          }}>
            <Link
              href="/"
              onClick={onMenuClose}
              style={{
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    800,
                fontSize:      16,
                color:         'white',
                textDecoration: 'none',
              }}
            >
              SRILANKAN<span style={{ color: ACCENT }}>.</span>TRIPTIP
            </Link>

            <button
              type="button"
              onClick={onMenuClose}
              aria-label="Close menu"
              style={{
                background:  'none',
                border:      '1px solid rgba(0,0,0,0.15)',
                cursor:      'pointer',
                width:       40,
                height:      40,
                display:     'flex',
                alignItems:  'center',
                justifyContent: 'center',
                color:       'rgba(0,0,0,0.15)',
                fontSize:    20,
                transition:  'all 0.2s',
                flexShrink:  0,
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'rgba(255,255,255,0.5)';
                b.style.color = 'white';
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'rgba(255,255,255,0.15)';
                b.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              ×
            </button>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onMenuClose}
                onMouseEnter={() => setHovIdx(i)}
                onMouseLeave={() => setHovIdx(-1)}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        24,
                  textDecoration: 'none',
                  padding:    '11px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  color:      hovIdx === i ? ACCENT : 'white',
                  opacity:    isMenuOpen ? 1 : 0,
                  transform:  isMenuOpen ? 'translateX(0)' : 'translateX(-48px)',
                  transition: `opacity 0.55s ease ${i * 55 + 180}ms, transform 0.55s ease ${i * 55 + 180}ms, color 0.2s`,
                }}
              >
                {/* Index number */}
                <span style={{
                  fontSize:      10,
                  letterSpacing: '0.25em',
                  color:         hovIdx === i ? ACCENT : 'rgba(255,255,255,0.22)',
                  fontFamily:    "'DM Sans', sans-serif",
                  width:         26,
                  flexShrink:    0,
                  transition:    'color 0.2s',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Label + tag */}
                <div>
                  <div style={{
                    fontFamily:    "'Syne', sans-serif",
                    fontWeight:    800,
                    fontSize:      'clamp(22px,3.5vw,44px)',
                    letterSpacing: '-0.03em',
                    lineHeight:    1.05,
                  }}>
                    {link.label}
                  </div>
                  {/* Tag — height animates on hover */}
                  <div style={{
                    fontSize:      10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.28)',
                    fontFamily:    "'DM Sans', sans-serif",
                    height:        hovIdx === i ? 17 : 0,
                    overflow:      'hidden',
                    transition:    'height 0.22s ease',
                    opacity:       hovIdx === i ? 1 : 0,
                    marginTop:     2,
                  }}>
                    {link.tag}
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer row: BOOK NOW + stats */}
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            paddingTop:     24,
            borderTop:      '1px solid rgba(255,255,255,0.05)',
            marginTop:      16,
            flexWrap:       'wrap',
            gap:            12,
            opacity:        isMenuOpen ? 1 : 0,
            transition:     'opacity 0.5s ease 700ms',
          }}>
            <Link
              href="/custom-planning"
              onClick={onMenuClose}
              style={{
                background:     ACCENT,
                color:          'white',
                padding:        '12px 28px',
                fontSize:       10,
                letterSpacing:  '0.3em',
                textTransform:  'uppercase',
                fontWeight:     700,
                textDecoration: 'none',
                fontFamily:     "'DM Sans', sans-serif",
                transition:     'background 0.3s',
                whiteSpace:     'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = ACCENT2}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = ACCENT}
            >
              BOOK NOW
            </Link>

            <div style={{ display: 'flex', gap: 20 }}>
              {['500+ Tours', '12+ Years', '98% Sat.'].map(s => (
                <span key={s} style={{
                  fontSize:      9,
                  color:         'rgba(255,255,255,0.22)',
                  letterSpacing: '0.1em',
                  fontFamily:    "'DM Sans', sans-serif",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT IMAGE PANEL ───────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={NAV_IMGS[imgIdx]}
            alt=""
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    imgVis ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          />
          {/* Accent tint */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: `linear-gradient(135deg,${ACCENT},${ACCENT2})`,
            opacity:    0.15,
          }} />
          {/* Left vignette blending into dark left panel */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to right,rgba(8,8,8,0.6),transparent)',
          }} />
          {/* Bottom caption */}
          <div style={{
            position:   'absolute',
            bottom:     36,
            left:       28,
            opacity:    isMenuOpen ? 1 : 0,
            transition: 'opacity 0.5s ease 480ms',
          }}>
            <div style={{
              fontSize:      9,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.38)',
              fontFamily:    "'DM Sans', sans-serif",
              marginBottom:  8,
            }}>
              {hovIdx >= 0 ? NAV_LINKS[hovIdx].tag : 'PEARL OF THE INDIAN OCEAN'}
            </div>
            <div style={{ width: 28, height: 1, background: ACCENT }} />
          </div>
        </div>

      </div>
    </>
  );
}