'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, Compass, MapPin } from 'lucide-react';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { EDITORIAL_HERO_IMAGE } from '@/lib/image-manifest';
import { WebsiteHero } from '@/types/travel';

interface ImmersiveHeroProps {
  heroData: WebsiteHero;
}

export function ImmersiveHero({ heroData }: ImmersiveHeroProps) {
  const scrollToNext = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="opening"
      className="relative min-h-[92vh] flex flex-col justify-between pt-8 sm:pt-12 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-roamora-border bg-roamora-bg"
    >
      {/* Top Editorial Eyebrow & Coordinates */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-roamora-border/60 pb-5">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-roamora-green" />
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-muted">
            {heroData.eyebrow || 'A different way to discover Singapore'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-roamora-muted tracking-wider">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-roamora-terracotta" />
            <span>Singapore</span>
          </span>
          <span className="text-roamora-border">·</span>
          <span className="text-roamora-green font-semibold">SGT (UTC+8)</span>
          <span className="hidden md:inline text-roamora-border">·</span>
          <span className="hidden md:inline uppercase text-[11px] text-roamora-muted">
            Equatorial Archive
          </span>
        </div>
      </div>

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-8 lg:my-12">
        {/* Left Typography Block */}
        <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[1px] w-6 bg-roamora-terracotta" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-roamora-terracotta font-semibold">
              ROAMORA SINGAPORE ARCHIVE · VOL. 04
            </span>
          </div>

          <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-roamora-text leading-[1.05] tracking-tight">
            {heroData.headline || 'THE WORLD IS WAITING.'}
          </h1>

          <p className="mt-6 font-sans text-lg sm:text-xl text-roamora-text/80 max-w-xl leading-relaxed">
            {heroData.subheadline || 'Small discoveries. Thoughtful routes. More room to travel your way.'}
          </p>

          <p className="mt-3 font-sans text-xs sm:text-sm text-roamora-muted max-w-lg leading-relaxed">
            An independent travel publication combined with practical Singapore journey planning. We map neighbourhood food, equatorial forest trails, and heritage quarters with unhurried curation.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToNext}
              className="px-6 py-3.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-green-hover transition-all flex items-center gap-2 group shadow-subtle"
            >
              <span>{heroData.primary_cta || 'Discover Your Next Journey'}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <Link
              href="/planner"
              className="px-6 py-3.5 border border-roamora-border bg-roamora-card text-roamora-text font-mono text-xs uppercase tracking-widest hover:border-roamora-terracotta hover:text-roamora-terracotta transition-all flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-roamora-terracotta" />
              <span>{heroData.secondary_cta || 'Build My Itinerary'}</span>
            </Link>
          </div>
        </div>

        {/* Right Editorial Visual Composition */}
        <div className="lg:col-span-5 relative">
          <div className="relative border border-roamora-border bg-roamora-card p-3 shadow-card">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-roamora-sand">
              <EditorialImage
                src={EDITORIAL_HERO_IMAGE.src}
                alt={EDITORIAL_HERO_IMAGE.alt}
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-roamora-text/80 via-roamora-text/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-roamora-card z-10 pointer-events-none">
                <span className="font-mono text-[10px] text-roamora-gold uppercase tracking-widest block">
                  Featured Perspective
                </span>
                <p className="font-serif text-lg leading-snug mt-1">
                  Twilight over Marina Bay & Civic Quarters
                </p>
                <p className="font-mono text-[10px] text-roamora-card/70 mt-0.5">
                  Archival Capture · SGT 19:24
                </p>
              </div>
            </div>

            {/* Micro annotations underneath photo */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-roamora-muted px-1">
              <span>PLATE 01 · OVERVIEW</span>
              <span className="uppercase text-roamora-green font-semibold">SGD DEMO PRICING</span>
            </div>
          </div>

          {/* Floating offset badge */}
          <div className="hidden sm:block absolute -bottom-6 -left-8 bg-roamora-card border border-roamora-border p-4 shadow-card max-w-[210px] z-20">
            <span className="font-mono text-[9px] uppercase tracking-wider text-roamora-terracotta block">
              Curated Field Notes
            </span>
            <p className="font-serif text-xs text-roamora-text mt-1 leading-snug">
              15 Enclaves · 20 Experiences · 15 Demonstration Journeys
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Banner */}
      <div className="pt-6 border-t border-roamora-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-roamora-muted">
        <div className="flex items-center gap-6">
          <span>01 OF 13 EXPEDITION PHASES</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">AUTUMN · WINTER 2026</span>
        </div>
        <div className="text-[11px] text-roamora-text font-semibold flex items-center gap-2">
          <span>SCROLL TO EXPEDITION INDEX</span>
          <ArrowDown className="w-3.5 h-3.5 text-roamora-terracotta animate-bounce" />
        </div>
      </div>
    </section>
  );
}
