'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Compass } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { getDestinationImage } from '@/lib/image-manifest';
import { Destination } from '@/types/travel';

interface DestinationDiscoveryProps {
  destinations: Destination[];
}

export function DestinationDiscovery({ destinations }: DestinationDiscoveryProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  const regions = ['ALL', ...Array.from(new Set(destinations.map((d) => d.region)))];

  const filteredDestinations =
    selectedRegion === 'ALL'
      ? destinations
      : destinations.filter((d) => d.region === selectedRegion);

  return (
    <section id="destinations" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionLabel
            number="02"
            category="Destination Discovery"
            title="Singapore, Beyond One Postcard"
            subtitle="From the futuristic waterfront to Pulau Ubin's unhurried kampong lanes, discover 15 distinct Singapore enclaves mapped with local awareness."
          />

          <Link
            href="/destinations"
            className="self-start md:self-end px-5 py-2.5 border border-roamora-border bg-roamora-card hover:border-roamora-green hover:text-roamora-green text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>View All 15 Enclaves</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-roamora-border/70">
          <span className="font-mono text-xs uppercase tracking-wider text-roamora-muted mr-2">
            Filter Region:
          </span>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedRegion === region
                  ? 'bg-roamora-green text-roamora-card border-roamora-green'
                  : 'bg-roamora-card text-roamora-text border-roamora-border hover:border-roamora-terracotta'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Asymmetric Destination Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredDestinations.map((dest, index) => {
            const imageAsset = getDestinationImage(dest.id);
            // Intentional asymmetric sizing pattern based on index
            const isHeroItem = index % 5 === 0;
            const isMediumItem = index % 5 === 1 || index % 5 === 2;
            const colSpan = isHeroItem
              ? 'md:col-span-8'
              : isMediumItem
              ? 'md:col-span-4'
              : 'md:col-span-6';

            return (
              <article
                key={dest.id}
                className={`${colSpan} group flex flex-col justify-between bg-roamora-card border border-roamora-border p-4 sm:p-5 hover:border-roamora-terracotta transition-all shadow-subtle hover:shadow-card`}
              >
                <div>
                  {/* Top card metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-roamora-muted mb-3 pb-2 border-b border-roamora-border/60">
                    <span className="text-roamora-terracotta font-semibold">
                      {dest.id}
                    </span>
                    <span className="uppercase">{dest.region}</span>
                  </div>

                  {/* Destination Image */}
                  <div className={`relative overflow-hidden mb-4 bg-roamora-sand ${isHeroItem ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <EditorialImage
                      src={imageAsset.src}
                      alt={imageAsset.alt}
                      fill
                      className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-roamora-card/90 backdrop-blur-sm border border-roamora-border px-2 py-0.5 font-mono text-[10px] uppercase text-roamora-text">
                      {dest.duration_hint}
                    </div>
                  </div>

                  {/* Destination Information */}
                  <h3 className="editorial-title text-2xl sm:text-3xl text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-tight mb-2">
                    <Link href={`/destinations/${dest.id}`} className="hover:underline">
                      {dest.name}
                    </Link>
                  </h3>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 bg-roamora-bg border border-roamora-border text-roamora-text/80"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Transit note */}
                  <p className="font-sans text-xs text-roamora-muted mt-2">
                    <strong className="font-mono uppercase text-[10px] text-roamora-text">Transit: </strong>
                    {dest.getting_around}
                  </p>
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 mt-4 border-t border-roamora-border/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-roamora-muted">
                    Best for: {dest.best_for.join(' · ')}
                  </span>
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="font-mono text-xs uppercase tracking-wider text-roamora-green group-hover:text-roamora-terracotta flex items-center gap-1 font-semibold"
                  >
                    <span>Explore Enclave</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
