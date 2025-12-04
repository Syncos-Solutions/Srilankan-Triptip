// app/stories/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { STORIES, Continent, getContinents } from '@/constants/stories';

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

const ArrowIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function StoriesPage() {
  const [selectedContinent, setSelectedContinent] = useState<'All continents' | Continent>('All continents');

  const filteredStories = STORIES.filter(
    (story) => selectedContinent === 'All continents' || story.continent === selectedContinent
  );

  const continents = getContinents();

  return (
    <>
      <Navbar isIntro={false} />
      <main 
        aria-labelledby="our-stories-heading" 
        className="bg-[#e8e4df] min-h-screen pt-20 md:pt-24 lg:pt-28"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 pb-16 md:pb-20 lg:pb-24">
          <div className="mb-10 md:mb-12 lg:mb-16">
            <h1
              id="our-stories-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-dm-sans font-extrabold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight"
            >
              Our Stories
            </h1>

            <div className="max-w-3xl space-y-3 md:space-y-4 mb-8 md:mb-10 font-dm-sans">
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                From the peaks of the Rockies to the ancient forests of the Carpathians, our stories capture the essence of adventure and discovery. Each journey reveals the beauty of our planet and the importance of sustainable exploration.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Join us on a journey of discovery as we share tales from around the world. These stories celebrate the landscapes we explore, the cultures we encounter, and the transformative power of outdoor adventure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mt-6 md:mt-8 lg:mt-10">
              <div className="relative w-full sm:w-auto">
                <label htmlFor="continent-filter" className="sr-only">
                  Filter by continent
                </label>
                <div className="relative">
                  <select
                    id="continent-filter"
                    value={selectedContinent}
                    onChange={(e) => setSelectedContinent(e.target.value as 'All continents' | Continent)}
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
                    {continents.map((continent) => (
                      <option key={continent} value={continent}>
                        {continent}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              <button
                aria-label="Search stories"
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

          <section className="mt-8 md:mt-10 lg:mt-12 font-dm-sans">
            {filteredStories.length > 0 ? (
              <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStories.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group relative block h-64 md:h-72 lg:h-80 overflow-hidden rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    aria-label={`Read story about ${story.title}`}
                  >
                    <Image
                      src={story.cardImage?.src || story.heroImage.src}
                      alt={story.cardImage?.alt || story.heroImage.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover motion-safe:transition-opacity motion-safe:duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
                    />

                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 lg:p-6 text-white motion-safe:transition-colors motion-safe:duration-500 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:bg-[#ff5b3b] group-focus-visible:bg-[#ff5b3b]">
                      <div>
                        <p className="text-xl md:text-2xl lg:text-3xl font-semibold font-dm-sans leading-tight">
                          {story.title}
                        </p>
                        <p className="mt-2 md:mt-3 max-w-xs text-sm md:text-base opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          {story.excerpt}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-9 h-9 md:w-10 md:h-10 border-2 border-white rounded-lg flex items-center justify-center motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:translate-y-1">
                          <ArrowIcon />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16">
                <p className="text-lg md:text-xl text-gray-600">
                  No stories found for the selected continent. Try a different filter.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}