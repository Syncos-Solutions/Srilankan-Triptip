// app/trips/[slug]/page.tsx
'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTripBySlug, getOtherTrips, Trip } from '@/constants/trips';

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

interface OtherTripCardProps {
  trip: Trip;
}

const OtherTripCard: React.FC<OtherTripCardProps> = ({ trip }) => (
  <Link
    href={`/trips/${trip.slug}`}
    className="group relative block h-64 md:h-72 lg:h-80 overflow-hidden rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
    aria-label={`View details for ${trip.title}`}
  >
    <Image
      src={trip.cardImage?.src || trip.heroImage.src}
      alt={trip.cardImage?.alt || trip.heroImage.alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover motion-safe:transition-opacity motion-safe:duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
    />

    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white motion-safe:transition-colors motion-safe:duration-500 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:bg-[#ff5b3b] group-focus-visible:bg-[#ff5b3b]">
      <div>
        <p className="text-2xl md:text-3xl font-semibold font-dm-sans">{trip.location}</p>
        <p className="mt-3 max-w-xs text-sm md:text-base opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {trip.shortDescription}
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

type TripPageProps = {
  params: Promise<{ slug: string }>;
};

export default function TripPage({ params }: TripPageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const trip = getTripBySlug(resolvedParams.slug);
  const [shrinkProgress, setShrinkProgress] = useState(0);

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

  if (!trip) {
    return (
      <>
        <Navbar isIntro={false} />
        <main className="bg-[#e8e4df] min-h-screen flex items-center justify-center pt-20 md:pt-24 lg:pt-28">
          <div className="text-center font-dm-sans px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
            <p className="text-gray-700 mb-8">The trip you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/trips"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Trips
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherTrips = getOtherTrips(trip.id, 3);

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
        aria-labelledby="trip-title" 
        className="bg-[#e8e4df] min-h-screen pt-20 md:pt-24 lg:pt-32 text-gray-900"
      >
        {/* Title and Meta - Constrained to 1400px */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <h1
            id="trip-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-dm-sans font-extrabold mt-8 md:mt-12 lg:mt-16 tracking-tight leading-tight"
          >
            {trip.title}
          </h1>

          <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 text-sm md:text-base grid-cols-2 md:grid-cols-4 font-dm-sans">
            <MetaItem label="Category" value={trip.type} />
            <MetaItem label="Season" value={trip.season} />
            <MetaItem label="Location" value={trip.location} />
            <MetaItem label="Date" value={formatDate(trip.date)} />
          </div>
        </div>

        {/* Hero Image - Full Width with proper spacing */}
        <div className="mt-8 md:mt-10 lg:mt-12 px-4 md:px-6 lg:px-8">
          <div
            className="mb-12 md:mb-16 lg:mb-20 overflow-hidden bg-gray-200 will-change-transform w-full max-w-[1400px] mx-auto"
            style={{
              borderRadius: `${borderRadius}px`,
              transform: `translateY(${translateY}px) scale(${scale})`,
              transformOrigin: 'center top',
              transition: 'transform 0.2s linear',
            }}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] w-full">
              <Image
                src={trip.heroImage.src}
                alt={trip.heroImage.alt}
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
          {trip.description.map((paragraph, index) => (
            <p key={index} className="text-gray-700">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Other Future Trips - Constrained to 1400px */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24">
          <section className="mt-12 md:mt-16 lg:mt-24 font-dm-sans">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-dm-sans font-extrabold text-center text-gray-900 tracking-tight leading-tight">
              Other Future Trips
            </h2>
            <p className="mt-4 md:mt-6 text-center mb-8 md:mb-12 lg:mb-16 max-w-2xl mx-auto text-sm md:text-base text-gray-700 px-4">
              Stay tuned for our upcoming trips and start planning your next hiking adventure today!
            </p>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {otherTrips.map((otherTrip) => (
                <OtherTripCard key={otherTrip.id} trip={otherTrip} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}