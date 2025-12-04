// app/stories/[slug]/page.tsx
'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoryBySlug, getOtherStories, Story } from '@/constants/stories';

const ArrowIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

interface MetaItemProps {
  label: string;
  value: string;
}

const MetaItem: React.FC<MetaItemProps> = ({ label, value }) => (
  <div>
    <p className="text-xs tracking-[0.15em] uppercase font-semibold text-gray-500 mb-1">
      {label}
    </p>
    <p className="text-sm md:text-base font-medium text-gray-900">{value}</p>
  </div>
);

interface OtherStoryCardProps {
  story: Story;
}

const OtherStoryCard: React.FC<OtherStoryCardProps> = ({ story }) => (
  <Link
    href={`/stories/${story.slug}`}
    className="group relative block h-64 md:h-72 lg:h-80 overflow-hidden rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
    aria-label={`View details for ${story.title}`}
  >
    <Image
      src={story.cardImage?.src || story.heroImage.src}
      alt={story.cardImage?.alt || story.heroImage.alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover motion-safe:transition-opacity motion-safe:duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
    />

    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white motion-safe:transition-colors motion-safe:duration-500 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:bg-[#ff5b3b] group-focus-visible:bg-[#ff5b3b]">
      <div>
        <p className="text-2xl md:text-3xl font-semibold font-dm-sans">{story.location}</p>
        <p className="mt-3 max-w-xs text-sm md:text-base opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {story.excerpt}
        </p>
      </div>
      <div className="flex justify-end">
        <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:translate-y-1">
          <ArrowIcon />
        </div>
      </div>
    </div>
  </Link>
);

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default function StoryPage({ params }: StoryPageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const story = getStoryBySlug(resolvedParams.slug);
  const [shrinkProgress, setShrinkProgress] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 300;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / maxScroll, 1);
      setShrinkProgress(progress);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  if (!story) {
    return (
      <>
        <Navbar isIntro={false} />
        <main className="bg-[#e8e4df] min-h-screen flex items-center justify-center pt-20 md:pt-24 lg:pt-28">
          <div className="text-center font-dm-sans px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Story Not Found</h1>
            <p className="text-gray-700 mb-8">The story you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/stories"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Stories
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherStories = getOtherStories(story.slug, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
  };

  const scale = 1 - shrinkProgress * 0.12;
  const translateY = shrinkProgress * 40;
  const borderRadius = 4 + shrinkProgress * 8;

  return (
    <>
      <Navbar isIntro={false} />
      <main 
        aria-labelledby="story-title" 
        className="bg-[#e8e4df] min-h-screen pt-20 md:pt-24 lg:pt-32 text-gray-900"
      >
        {/* Title and Meta - Constrained to 1400px */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <h1
            id="story-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-dm-sans font-extrabold mt-8 md:mt-12 lg:mt-16 tracking-tight leading-tight"
          >
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mt-3 md:mt-4 font-dm-sans leading-relaxed">
              {story.subtitle}
            </p>
          )}

          <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 text-sm md:text-base grid-cols-2 md:grid-cols-4 font-dm-sans">
            <MetaItem label="Continent" value={story.continent} />
            <MetaItem label="Location" value={story.location} />
            <MetaItem label="Date" value={formatDate(story.date)} />
            <MetaItem label="Category" value="Travel Story" />
          </div>
        </div>

        {/* Hero Image - Full Width with proper spacing */}
        <div className="mt-8 md:mt-10 lg:mt-12 px-4 md:px-6 lg:px-8 lg:w-full">
          <div
            className="mb-12 md:mb-16 lg:mb-20 overflow-hidden bg-[#e8e4df] will-change-transform w-full max-w-[1400px] mx-auto"
            style={{
              borderRadius: `${borderRadius}px`,
              transform: `translateY(${translateY}px) scale(${scale})`,
              transformOrigin: 'center top',
              transition: 'transform 0.2s linear',
            }}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] xl:h-[800px] w-full">
              <Image
                src={story.heroImage.src}
                alt={story.heroImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Description - Centered, narrower width */}
        <section className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 space-y-4 md:space-y-5 text-sm md:text-base leading-relaxed mb-16 md:mb-20 lg:mb-24 font-dm-sans">
          {story.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Other Stories - Constrained to 1400px */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24">
          <section className="mt-12 md:mt-16 lg:mt-24 font-dm-sans">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-dm-sans font-extrabold text-center text-gray-900 tracking-tight leading-tight">
              More Stories
            </h2>
            <p className="mt-4 md:mt-6 text-center mb-8 md:mb-12 lg:mb-16 max-w-2xl mx-auto text-sm md:text-base text-gray-700 px-4">
              Discover more journeys from around the world and get inspired for your next adventure.
            </p>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {otherStories.map((otherStory) => (
                <OtherStoryCard key={otherStory.slug} story={otherStory} />
              ))}
            </div>
          </section>
        </div>

        {/* Share Your Story Section */}
        <section
          ref={ctaRef}
          className={`max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 border-t border-black/10 pt-10 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-24 font-dm-sans transition-all duration-700 ease-out ${
            ctaVisible
              ? 'motion-safe:opacity-100 motion-safe:translate-y-0'
              : 'motion-safe:opacity-0 motion-safe:translate-y-4'
          }`}
        >
          <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 md:items-start">
            {/* Left column: heading + social */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-dm-sans font-light text-gray-900 leading-tight">
                Share Your Story
              </h2>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-neutral-700">
                Discover your next unforgettable journey!
              </p>
              
              <div className="flex gap-3 mt-4 md:mt-6">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 md:w-11 md:h-11 border border-neutral-800 rounded-sm flex items-center justify-center hover:bg-black/5 transition-colors duration-200 ease-out"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 md:w-11 md:h-11 border border-neutral-800 rounded-sm flex items-center justify-center hover:bg-black/5 transition-colors duration-200 ease-out"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-10 h-10 md:w-11 md:h-11 border border-neutral-800 rounded-sm flex items-center justify-center hover:bg-black/5 transition-colors duration-200 ease-out"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right column: description text */}
            <div className="text-sm md:text-base leading-relaxed text-neutral-800 space-y-3 md:space-y-4 font-dm-sans">
              <p>
                Welcome to Discover Your Path, where the thrill of exploration meets the tranquility of nature. Dive into a wealth of hiking resources, from trail guides that uncover hidden gems to gear reviews that ensure you&apos;re equipped for every terrain.
              </p>
              <p>
                Join our community of outdoor enthusiasts at Trailblazer&apos;s Hub and embark on your next adventure equipped with knowledge and inspiration!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}