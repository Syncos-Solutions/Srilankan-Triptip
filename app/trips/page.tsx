// app/trips/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TRIPS, Season, Trip, filterTripsBySeason } from '@/constants/trips';

// ============================================================================
// ICONS
// ============================================================================
const ChevronDownIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ============================================================================
// TRIP SECTION COMPONENT
// ============================================================================
interface TripSectionProps {
  trip: Trip;
  index: number;
  isVisible: boolean;
  sectionRef: (node: HTMLElement | null) => void;
}

const TripSection: React.FC<TripSectionProps> = ({ trip, index, isVisible, sectionRef }) => {
  const isReversed = index % 2 === 1;

  return (
    <Link href={`/trips/${trip.slug}`} className="block group cursor-pointer">
      <section
        ref={sectionRef}
        className={`
          mt-12 md:mt-16 lg:mt-20 xl:mt-24
          motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{
          transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
        }}
      >
        <div className={`grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-16 lg:items-center`}>
          {/* Text Column */}
          <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-dm-sans text-gray-900 leading-tight tracking-tight mb-4 md:mb-5 lg:mb-6 group-hover:text-[#ff5b3b] transition-colors duration-300">
              {trip.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-900">
                {trip.type}
              </span>
              <span className="text-xs md:text-sm text-gray-500">•</span>
              <span className="text-xs md:text-sm font-medium text-gray-600">
                {trip.location}
              </span>
              <span className="text-xs md:text-sm text-gray-500">•</span>
              <span className="text-xs md:text-sm font-medium text-gray-600">
                {trip.season}
              </span>
            </div>

            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
              {trip.shortDescription}
            </p>
          </div>

          {/* Image Column */}
          <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden shadow-lg bg-gray-200">
              <Image
                src={trip.heroImage.src}
                alt={trip.heroImage.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function TripsPage() {
  const [selectedSeason, setSelectedSeason] = useState<Season | 'All'>('All');
  const [visibleTripIds, setVisibleTripIds] = useState<Set<string>>(new Set());
  const observerRefs = useRef<Map<string, HTMLElement>>(new Map());

  const filteredTrips = filterTripsBySeason(selectedSeason);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tripId = entry.target.getAttribute('data-trip-id');
            if (tripId) {
              setVisibleTripIds((prev) => new Set(prev).add(tripId));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observerRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredTrips]);

  const setSectionRef = (tripId: string) => (node: HTMLElement | null) => {
    if (node) {
      node.setAttribute('data-trip-id', tripId);
      observerRefs.current.set(tripId, node);
    } else {
      observerRefs.current.delete(tripId);
    }
  };

  return (
    <>
      <Navbar isIntro={false} />
      <main 
        aria-labelledby="future-trips-heading" 
        className="bg-[#e8e4df] min-h-screen pt-20 md:pt-24 lg:pt-28"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 pb-16 md:pb-20 lg:pb-24">
          <div className="mb-10 md:mb-12 lg:mb-16">
            <h1
              id="future-trips-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-dm-sans font-extrabold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight"
            >
              Future Trips
            </h1>

            <div className="max-w-3xl space-y-3 md:space-y-4 mb-8 md:mb-10 font-dm-sans">
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Choose from a variety of excursions designed to suit all preferences and fitness
                levels. From gentle nature walks to challenging mountain treks, each journey is
                carefully crafted to provide unforgettable experiences in stunning natural settings.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Along the way, you'll have the opportunity to forge lasting connections with
                like-minded adventurers, learn from expert guides, and discover the transformative
                power of nature. Every trip is more than just a destination—it's a journey of
                personal growth and discovery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mt-6 md:mt-8 lg:mt-10">
              <div className="relative w-full sm:w-auto">
                <label htmlFor="season-filter" className="sr-only">
                  Filter by season
                </label>
                <div className="relative">
                  <select
                    id="season-filter"
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value as Season | 'All')}
                    className="
                      appearance-none
                      w-full sm:w-auto
                      pl-4 md:pl-5 pr-10 md:pr-12 py-2.5 md:py-3
                      bg-[#e8e4df]
                      border border-gray-300
                      rounded-lg
                      text-sm md:text-base text-gray-900 font-medium
                      cursor-pointer
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
                      motion-safe:transition-all motion-safe:duration-200
                      hover:border-gray-900
                    "
                  >
                    <option value="All">All seasons</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                  </select>
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              <button
                aria-label="Search trips"
                className="
                  w-10 h-10 md:w-11 md:h-11
                  flex items-center justify-center
                  bg-[#e8e4df]
                  border border-gray-300
                  rounded-lg
                  text-gray-900
                  motion-safe:transition-all motion-safe:duration-200
                  hover:border-gray-900
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
                "
              >
                <SearchIcon />
              </button>
            </div>
          </div>

          <div className='font-dm-sans'>
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip, index) => (
                <TripSection
                  key={trip.id}
                  trip={trip}
                  index={index}
                  isVisible={visibleTripIds.has(trip.id)}
                  sectionRef={setSectionRef(trip.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 md:py-16">
                <p className="text-lg md:text-xl text-gray-600">
                  No trips found for the selected season. Try a different filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}