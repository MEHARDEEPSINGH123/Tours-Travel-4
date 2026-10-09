'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Check, Calendar } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { PriceLabel } from '@/components/shared/PriceLabel';
import { getPackageImage } from '@/lib/image-manifest';
import { Package, Destination } from '@/types/travel';

interface FeaturedJourneysProps {
  featuredPackages: Package[];
  destinations: Destination[];
}

export function FeaturedJourneys({
  featuredPackages,
  destinations,
}: FeaturedJourneysProps) {
  const getDestinationNames = (ids: string[]) => {
    return ids
      .map((id) => destinations.find((d) => d.id === id)?.name || id)
      .join(' · ');
  };

  return (
    <section id="featured" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          number="04"
          category="Curated Narratives"
          title="Journeys With a Point of View"
          subtitle="Selected small-group demonstration routes arranged with spatial narrative and editorial restraint. Each journey balances key landmarks with quiet local moments."
        />

        <div className="space-y-12">
          {featuredPackages.map((pkg, idx) => {
            const imageAsset = getPackageImage(pkg.id);
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={pkg.id}
                className={`bg-roamora-card border border-roamora-border p-6 sm:p-8 lg:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual side */}
                <div className={`lg:col-span-6 relative ${isReversed ? 'lg:col-start-7' : ''}`}>
                  <div className="relative aspect-[16/11] overflow-hidden border border-roamora-border bg-roamora-sand">
                    <EditorialImage
                      src={imageAsset.src}
                      alt={imageAsset.alt}
                      fill
                      className="transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-roamora-card/90 backdrop-blur-sm px-3 py-1 font-mono text-xs text-roamora-green uppercase tracking-wider font-semibold border border-roamora-border">
                      {pkg.duration} · {pkg.pace} pace
                    </div>
                  </div>

                  {/* Caption underneath */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-roamora-muted px-1">
                    <span>INDEX: {pkg.id}</span>
                    <span className="uppercase">{pkg.audience}</span>
                  </div>
                </div>

                {/* Content side */}
                <div className={`lg:col-span-6 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs uppercase px-2 py-0.5 border border-roamora-terracotta text-roamora-terracotta bg-roamora-terracotta-light">
                        Featured Journey
                      </span>
                      <span className="font-mono text-xs text-roamora-muted">
                        Max {pkg.group_size.maximum} guests
                      </span>
                    </div>

                    <h3 className="editorial-title text-3xl sm:text-4xl text-roamora-text leading-tight mb-3">
                      <Link href={`/packages/${pkg.id}`} className="hover:text-roamora-terracotta transition-colors">
                        {pkg.name}
                      </Link>
                    </h3>

                    <p className="font-sans text-base text-roamora-text/80 leading-relaxed mb-4">
                      {pkg.tagline}
                    </p>

                    {/* Destination Enclaves */}
                    <div className="p-3.5 bg-roamora-bg border border-roamora-border mb-4">
                      <span className="font-mono text-[10px] uppercase text-roamora-muted tracking-wider block mb-1">
                        Enclaves Traversed:
                      </span>
                      <p className="font-serif text-sm text-roamora-text">
                        {getDestinationNames(pkg.destination_ids)}
                      </p>
                    </div>

                    {/* Included services bullet highlights */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] uppercase text-roamora-muted tracking-wider block">
                        Included in demo package:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans text-roamora-text/80">
                        {pkg.included.slice(0, 4).map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-roamora-green flex-shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price and CTA row */}
                  <div className="pt-6 border-t border-roamora-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <PriceLabel
                      priceSGD={pkg.price_sgd_per_person_demo}
                      size="md"
                    />

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="px-5 py-2.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-wider hover:bg-roamora-green-hover transition-colors flex items-center gap-2"
                      >
                        <span>Package Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
