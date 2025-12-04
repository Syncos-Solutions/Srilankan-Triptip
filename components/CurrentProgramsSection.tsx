'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// NOTE: Add these domains to next.config.js:
// images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }

type Program = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  paragraphs: string[];
};

const PROGRAMS: Program[] = [
  {
    id: 'hiking',
    title: 'Hiking',
    image: {
      src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80',
      alt: 'Hiker with backpack walking on mountain trail at sunset',
    },
    paragraphs: [
      'Experience the raw beauty of nature as you traverse challenging mountain trails and peaceful forest paths. Our hiking programs cater to all skill levels, from beginner day hikes to advanced multi-day expeditions through remote wilderness.',
      'Led by experienced guides who know the terrain intimately, you\'ll discover hidden waterfalls, panoramic viewpoints, and pristine alpine meadows. Learn essential wilderness skills including navigation, trail safety, and Leave No Trace principles.',
      'Whether you\'re seeking solitude in nature or the camaraderie of group hiking, our programs offer transformative experiences that reconnect you with the natural world and challenge your physical and mental boundaries.',
    ],
  },
  {
    id: 'mountain-biking',
    title: 'Mountain Biking',
    image: {
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
      alt: 'Mountain biker riding through forest trail',
    },
    paragraphs: [
      'Ride through rugged terrain and experience the thrill of mountain biking on some of the most spectacular trails in the region. Our mountain biking programs combine technical skill development with exhilarating descents and challenging climbs.',
      'From flowy singletrack to rocky technical sections, our routes showcase diverse terrain that will test and improve your riding abilities. Professional instructors provide guidance on bike handling, cornering techniques, and trail reading skills.',
      'Join us for day rides or multi-day bike-packing adventures where you\'ll camp under the stars and wake up to new trails each morning. All fitness levels welcome, with routes customized to match your experience and ambition.',
    ],
  },
  {
    id: 'running',
    title: 'Running',
    image: {
      src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80',
      alt: 'Trail runner on mountain path with scenic valley view',
    },
    paragraphs: [
      'Take your running to new heights with our trail running programs designed for those who want to escape the pavement and embrace the mountains. Experience the freedom of running on soft dirt paths, rocky ridgelines, and alpine meadows.',
      'Our programs focus on building trail-specific skills including uphill power hiking, technical downhill running, and navigating varied terrain safely. Learn proper pacing strategies for elevation gain and develop the endurance needed for longer mountain runs.',
      'Whether training for your first trail race or simply looking to add variety to your running routine, our experienced coaches will help you discover the joy of running in wild places while improving your fitness and confidence on the trails.',
    ],
  },
  {
    id: 'outdoor-school',
    title: 'Outdoor School',
    image: {
      src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
      alt: 'Group of people camping with tent in mountain wilderness',
    },
    paragraphs: [
      'Inspire the next generation of outdoor enthusiasts through our comprehensive outdoor education programs. Young adventurers learn valuable life skills while developing a deep appreciation for nature and building confidence through outdoor challenges.',
      'Our curriculum covers wilderness skills, environmental science, team building, and outdoor leadership. Kids engage in hands-on activities like shelter building, fire making, plant identification, and wildlife tracking, all within a safe and supportive environment.',
      'Through carefully designed experiences that balance adventure with education, we foster resilience, environmental stewardship, and a lifelong love of the outdoors. Our programs run year-round, adapting to seasons to showcase the dynamic beauty of nature.',
    ],
  },
];

const CurrentProgramsSection: React.FC = () => {
  const [activeProgramId, setActiveProgramId] = useState<string>(PROGRAMS[0].id);
  const programRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    programRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveProgramId(PROGRAMS[index].id);
          }
        },
        {
          threshold: [0.4, 0.5, 0.6],
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      aria-labelledby="current-programs-heading"
      className="bg-[#e8e4df] py-20 sm:py-24 lg:py-32 px-4 md:px-8"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2
            id="current-programs-heading"
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold font-dm-sans text-gray-900 mb-8 tracking-tight"
          >
            Current Programs
          </h2>
          <p className="text-lg sm:text-xl lg:text-xl text-gray-700 leading-relaxed max-w-4xl">
            Embark on a transformative adventure with our outdoor programs designed to challenge,
            inspire, and connect you with nature. From rugged mountain trails to serene forest
            paths, our expertly crafted experiences cater to adventurers of all levels and
            aspirations.
          </p>
        </div>

        {/* Two Column Layout - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left Column - Sticky Image Panel */}
          <div className="sticky top-24 self-start h-[600px] xl:h-[700px]">
            <div className="relative h-full w-full rounded-sm  overflow-hidden shadow-lg bg-gray-200">
              {PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className={`
                    absolute inset-0
                    motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out
                    ${
                      activeProgramId === program.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6 pointer-events-none'
                    }
                  `}
                >
                  <Image
                    src={program.image.src}
                    alt={program.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={program.id === PROGRAMS[0].id}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Scrollable Programs */}
          <div className="space-y-32">
            {PROGRAMS.map((program, index) => (
              <div
                key={program.id}
                ref={(el) => {
                  programRefs.current[index] = el;
                }}
                className={`
                  min-h-[80vh] flex flex-col justify-center
                  motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out
                  ${
                    activeProgramId === program.id
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-60 translate-y-4'
                  }
                `}
              >
                <h3 className="text-4xl xl:text-5xl font-dm-sans text-gray-900 mb-6 tracking-tight">
                  {program.title}
                </h3>
                <div className="space-y-5">
                  {program.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-base xl:text-lg text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-16">
          {PROGRAMS.map((program, index) => (
            <div key={program.id} className="space-y-6">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-gray-200">
                <Image
                  src={program.image.src}
                  alt={program.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-3xl sm:text-4xl font-dm-sans font-semibold text-gray-900 mb-5 tracking-tight">
                  {program.title}
                </h3>
                <div className="space-y-4">
                  {program.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-base sm:text-lg text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentProgramsSection;