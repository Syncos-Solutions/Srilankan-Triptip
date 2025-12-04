'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type PrepStep = {
  id: string;
  title: string;
  description: string;
};

const STEPS: PrepStep[] = [
  {
    id: 'route',
    title: 'Route Planning and Research',
    description:
      'Choose a trail suited to your fitness level and experience. Study the terrain, elevation changes, and potential hazards. Check weather forecasts and seasonal conditions. Use maps and online resources to gather detailed information. Proper planning ensures a safe and enjoyable hike.',
  },
  {
    id: 'conditioning',
    title: 'Physical Conditioning and Training',
    description:
      'Build endurance and strength through regular walking, running, or hiking. Practice with a loaded backpack to simulate trail conditions. Gradually increase distance and difficulty. Proper conditioning reduces injury risk and improves your overall hiking performance.',
  },
  {
    id: 'gear',
    title: 'Gear Selection and Packing',
    description:
      'Pack essential gear including a quality backpack, sturdy hiking boots, navigation tools, first aid kit, adequate food and water, and appropriate shelter. Test your gear before the trip and use a checklist to ensure nothing is forgotten. The right equipment can make or break your adventure.',
  },
];

// Note: Add images.pexels.com to next.config.js images.domains
const IMAGES = [
  {
    id: 'landscape_1',
    src: 'https://images.pexels.com/photos/12661776/pexels-photo-12661776.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Scenic mountain landscape with dramatic clouds',
  },
  {
    id: 'landscape_2',
    src: 'https://images.pexels.com/photos/18015009/pexels-photo-18015009.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Snow‑capped mountain peaks with clear sky',
  },
  {
    id: 'landscape_3',
    src: 'https://images.pexels.com/photos/16161548/pexels-photo-16161548.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Valley and distant mountains view with natural scenery',
  },
];

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TourPreparationSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((step, index) => {
      if (!step) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStepIndex(index);
            } else {
              const rect = entry.boundingClientRect;
              if (rect.top > 0) {
                setActiveStepIndex((prev) => Math.min(prev, index - 1));
              }
            }
          });
        },
        {
          threshold: 0.4,
          rootMargin: '-20% 0px -40% 0px',
        }
      );

      observer.observe(step);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      className="bg-[#e8e4df] py-16 md:py-20 lg:py-24"
      aria-labelledby="tour-preparation-heading"
    >
      <div className="max-w-6xl lg:max-w-[1500px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2
            id="tour-preparation-heading"
            className="font-dm-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-neutral-900"
          >
            Tour Preparation
          </h2>
          <p className="font-dm-sans mt-4 md:mt-5 lg:mt-6 max-w-3xl text-sm md:text-base lg:text-lg text-neutral-700 leading-relaxed">
            Proper preparation is key to a successful hiking tour. Plan your route by
            selecting a trail that matches your fitness level and gather detailed
            information about terrain, weather, and conditions to ensure a safe and
            enjoyable adventure.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16 md:items-start">
          {/* Left Column: Steps */}
          <div className="space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20 xl:space-y-24">
            {STEPS.map((step, index) => (
              <article
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={clsx(
                  'min-h-[35vh] sm:min-h-[38vh] md:min-h-[40vh] lg:min-h-[45vh]',
                  'transition-all duration-700 ease-out motion-safe:transform',
                  activeStepIndex >= index
                    ? 'motion-safe:opacity-100 motion-safe:translate-y-0'
                    : 'motion-safe:opacity-0 motion-safe:translate-y-6'
                )}
              >
                <h3 className="font-dm-sans text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-neutral-900 leading-tight">
                  {step.title}
                </h3>
                <p className="font-dm-sans mt-3 md:mt-4 max-w-xl text-sm sm:text-base md:text-base lg:text-lg leading-relaxed text-neutral-700">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          {/* Right Column: Stacked Images */}
          <div className="mt-12 md:mt-0 md:sticky md:top-24 lg:top-28">
            <div className="relative h-[380px] sm:h-[420px] md:h-[460px] lg:h-[520px] xl:h-[580px]">
              {/* Image 1: Map & Compass */}
              <div
                className={clsx(
                  'absolute inset-x-0 top-0 z-0',
                  'transition-all duration-700 ease-out motion-safe:transform',
                  activeStepIndex >= 0
                    ? 'motion-safe:opacity-100 motion-safe:translate-y-0'
                    : 'motion-safe:opacity-0 motion-safe:translate-y-6',
                  activeStepIndex >= 1 && 'motion-safe:-translate-y-2'
                )}
              >
                <Image
                  src={IMAGES[0].src}
                  alt={IMAGES[0].alt}
                  width={800}
                  height={600}
                  className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[450px] 2xl:h-[550px] w-full object-cover rounded-sm shadow-md"
                />
              </div>

              {/* Image 2: Canyon Hiker */}
              <div
                className={clsx(
                  'absolute top-12 sm:top-14 md:top-16 left-4 sm:left-5 md:left-6 right-0 z-10',
                  'transition-all duration-700 ease-out motion-safe:transform',
                  activeStepIndex >= 1
                    ? 'motion-safe:opacity-100 motion-safe:translate-y-0'
                    : 'motion-safe:opacity-0 motion-safe:translate-y-10',
                  activeStepIndex >= 2 && 'motion-safe:-translate-y-2'
                )}
              >
                <Image
                  src={IMAGES[1].src}
                  alt={IMAGES[1].alt}
                  width={800}
                  height={600}
                  className="h-64 sm:h-72 md:h-80 lg:h-88 xl:h-[420px] 2xl:h-[500px] w-[90%] object-cover rounded-sm shadow-md"
                />
              </div>

              {/* Image 3: Group of Hikers */}
              <div
                className={clsx(
                  'absolute top-24 sm:top-28 md:top-32 left-8 sm:left-10 md:left-12 right-0 z-20',
                  'transition-all duration-700 ease-out motion-safe:transform',
                  activeStepIndex >= 2
                    ? 'motion-safe:opacity-100 motion-safe:translate-y-0'
                    : 'motion-safe:opacity-0 motion-safe:translate-y-16'
                )}
              >
                <Image
                  src={IMAGES[2].src}
                  alt={IMAGES[2].alt}
                  width={800}
                  height={600}
                  className="h-64 sm:h-72 md:h-80 lg:h-88 xl:h-[420px] 2xl:h-[500px] w-[80%] object-cover rounded-sm shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}