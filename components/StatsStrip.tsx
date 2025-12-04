'use client';

import React, { useState, useEffect, useRef } from 'react';

type StatItem = {
  id: string;
  label: string;
  description: string;
  endValue: number;
  suffix?: string;
};

const STATS: StatItem[] = [
  {
    id: 'adventurers',
    label: 'Our Adventurers',
    description: 'Memorable experiences in diverse landscapes worldwide.',
    endValue: 878,
  },
  {
    id: 'trails',
    label: 'Unique Trails Offered',
    description: 'Diverse challenges across stunning landscapes.',
    endValue: 500,
    suffix: '+',
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction Rate',
    description: 'Exceptional experiences rated highly by participants.',
    endValue: 97,
    suffix: '%',
  },
];

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export default function StatsHighlightSection() {
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startAnimation = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      if (prefersReducedMotion) {
        setValues(STATS.map(stat => stat.endValue));
        return;
      }

      const duration = 1500;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = easeOutCubic(progress);
        setValues(STATS.map(stat => Math.round(stat.endValue * eased)));
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            startAnimation();
          }
        });
      },
      {
        threshold: [0.3],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#e8e4df] py-12 md:py-16 lg:py-20"
      aria-label="Adventure statistics"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 lg:mt-[80px] lg:mb-[60px]">
        <div className="grid gap-10 text-center md:grid-cols-3 md:gap-12">
          {STATS.map((stat, index) => (
            <div key={stat.id} className="flex flex-col items-center">
              <p className="lg:text-8xl md:text-4xl font-extrabold text-neutral-900">
                <span>{values[index]}</span>
                {stat.suffix && (
                  <span className="inline-block align-top lg:text-7xl md:text-3xl ml-1">
                    {stat.suffix}
                  </span>
                )}
              </p>
              <h3 className="mt-4 text-base md:text-lg font-dm-sans font-semibold text-neutral-900">
                {stat.label}
              </h3>
              <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}