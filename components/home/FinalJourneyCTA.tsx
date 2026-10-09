'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Sparkles, MapPin } from 'lucide-react';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { EDITORIAL_CTA_IMAGE } from '@/lib/image-manifest';

export function FinalJourneyCTA() {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 bg-roamora-green text-roamora-card relative overflow-hidden border-b border-roamora-border">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-roamora-card/10 border border-roamora-gold/40 text-roamora-gold font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Journey Begins In Planning</span>
            </div>

            <h2 className="editorial-title text-4xl sm:text-5xl md:text-6xl text-roamora-card leading-[1.08] tracking-tight">
              More Room to Travel Your Way.
            </h2>

            <p className="font-sans text-base sm:text-lg text-roamora-card/80 max-w-xl leading-relaxed">
              Step away from rush-hour tour buses. Build an unhurried Singapore day combining morning laksa stalls, shaded reservoir boardwalks, and blue-hour architectural viewpoints.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/planner"
                className="px-6 py-3.5 bg-roamora-terracotta text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-terracotta-hover transition-colors flex items-center gap-2 shadow-card"
              >
                <Compass className="w-4 h-4" />
                <span>Launch Journey Planner</span>
              </Link>

              <Link
                href="/packages"
                className="px-6 py-3.5 border border-roamora-card/30 hover:border-roamora-gold text-roamora-card font-mono text-xs uppercase tracking-widest hover:text-roamora-gold transition-colors flex items-center gap-2"
              >
                <span>Browse Package Directory</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="font-mono text-[10px] text-roamora-card/60 pt-4">
              Demo Platform Notice · All prices in SGD are illustrative and non-binding.
            </p>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-roamora-gold/30 p-3 bg-roamora-green-hover shadow-drawer">
              <div className="relative aspect-[4/5] overflow-hidden">
                <EditorialImage
                  src={EDITORIAL_CTA_IMAGE.src}
                  alt={EDITORIAL_CTA_IMAGE.alt}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-roamora-green/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="font-mono text-[10px] uppercase text-roamora-gold tracking-widest">
                    Expedition Plate 14
                  </span>
                  <p className="font-serif text-lg text-roamora-card mt-1">
                    Singapore Civic District at Dusk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
