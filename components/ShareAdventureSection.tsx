'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// NOTE: Add these domains to your next.config.js:
// images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }

type Post = {
  id: number;
  src: string;
  alt: string;
  handle: string;
};

const posts: Post[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Misty mountain peaks at sunrise',
    handle: '@MountainViews',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    alt: 'Hiker overlooking vast canyon landscape',
    handle: '@CanyonTrails',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    alt: 'Alpine lake surrounded by mountains',
    handle: '@EmmaJones',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    alt: 'Sunset silhouette on mountain ridge',
    handle: '@OliviaHiking',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&q=80',
    alt: 'Hiker tying boots on forest trail',
    handle: '@David_Brown',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    alt: 'Dense forest trail with sunlight',
    handle: '@TrailSeekers',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=800&q=80',
    alt: 'Mountain summit with hiker backpack',
    handle: '@PeakExplorers',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
    alt: 'Hiker walking on scenic mountain path',
    handle: '@WildernessWander',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
    alt: 'Group of hikers on forest trail',
    handle: '@GroupAdventure',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80',
    alt: 'Mountain valley vista',
    handle: '@ValleyViews',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    alt: 'Lakeside mountain reflection',
    handle: '@LakeReflections',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
    alt: 'Rocky mountain terrain',
    handle: '@RockyPaths',
  },
];

const ShareAdventureSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Duplicate posts for infinite scroll
  const duplicatedPosts = [...posts, ...posts];

  return (
    <>
      <style jsx global>{`
        @keyframes horizontal-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .horizontal-scroll {
          animation: horizontal-scroll 40s linear infinite;
        }

        .gallery-wrapper:hover .horizontal-scroll {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizontal-scroll {
            animation: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-labelledby="share-adventure-heading"
        className={`
          bg-[#e8e4df] py-16 md:py-20 lg:py-24 px-4 md:px-8
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Heading & Subheading */}
          <div className="mb-12 md:mb-16 lg:mb-20 max-w-[1400px] mx-auto">
            <h2
              id="share-adventure-heading"
              className="text-4xl sm:text-5xl lg:text-8xl xl:text-8xl font-extrabold font-dm-sans text-gray-900 mb-6 tracking-tight"
            >
              Share Your Adventure
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl">
              Show us how you{' '}
              <span className="text-[#ff5b3b] font-semibold">#Hiking</span> by
              tagging us{' '}
              <span className="text-[#ff5b3b] font-semibold">@Adventure</span>{' '}
              for a chance to be featured!
            </p>
          </div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative overflow-hidden gallery-wrapper">
            <div className="horizontal-scroll flex gap-4 md:gap-5 lg:gap-4">
              {duplicatedPosts.map((post, index) => (
                <div
                  key={`${post.id}-${index}`}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-md overflow-hidden shadow-lg group bg-gray-200 flex-shrink-0"
                >
                  <Image
                    src={post.src}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-white drop-shadow-lg">
                      {post.handle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Instruction Text */}
          <div className="mt-8 text-center max-w-7xl mx-auto">
            <p className="text-sm md:text-base text-gray-500">
              Hover over the gallery to pause auto-scroll
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShareAdventureSection;