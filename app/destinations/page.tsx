import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Compass, Train } from 'lucide-react';
import { getDestinations } from '@/lib/travel-data';
import { getDestinationImage } from '@/lib/image-manifest';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { EditorialImage } from '@/components/shared/EditorialImage';

export const metadata = {
  title: 'Destinations Directory — Roamora Singapore',
  description:
    '15 curated Singapore enclaves mapped across central districts, coastal corridors, and northern wildlife reserves.',
};

export default function DestinationsPage() {
  const destinations = getDestinations();

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8 mb-12">
        <SectionLabel
          number="DIR 01"
          category="Enclave Archive"
          title="Singapore Destination Directory"
          subtitle="Explore 15 distinct districts across Singapore. Each enclave captures specific historical layers, architectural compositions, transit lines, and accessibility parameters."
        />

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-roamora-muted">
          <span>TOTAL CATALOGUE: 15 LOCATIONS</span>
          <span>·</span>
          <span>MARKET: SINGAPORE (SG)</span>
          <span>·</span>
          <span>TRANSIT FOCUS: MRT, WALKING & BUMBOATS</span>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => {
          const imageAsset = getDestinationImage(dest.id);

          return (
            <article
              key={dest.id}
              className="bg-roamora-card border border-roamora-border p-5 flex flex-col justify-between hover:border-roamora-terracotta transition-all shadow-subtle group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs font-mono text-roamora-muted mb-3 pb-2 border-b border-roamora-border/60">
                  <span className="text-roamora-terracotta font-semibold">
                    {dest.id}
                  </span>
                  <span className="uppercase">{dest.region}</span>
                </div>

                {/* Photo */}
                <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-roamora-sand border border-roamora-border/50">
                  <EditorialImage
                    src={imageAsset.src}
                    alt={imageAsset.alt}
                    fill
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-2 left-2 bg-roamora-card/90 px-2 py-0.5 font-mono text-[10px] uppercase text-roamora-text">
                    {dest.duration_hint}
                  </div>
                </div>

                {/* Name */}
                <h2 className="editorial-title text-2xl text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-tight mb-2">
                  <Link href={`/destinations/${dest.id}`}>
                    {dest.name}
                  </Link>
                </h2>

                {/* Highlights */}
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

                {/* Transit & Accessibility snippet */}
                <div className="space-y-1.5 text-xs font-sans text-roamora-muted mt-3 pt-3 border-t border-roamora-border/60">
                  <p className="flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-roamora-green flex-shrink-0" />
                    <span><strong>Getting around:</strong> {dest.getting_around}</span>
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-roamora-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-roamora-muted uppercase">
                  Type: {dest.type}
                </span>
                <Link
                  href={`/destinations/${dest.id}`}
                  className="px-3.5 py-1.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-wider hover:bg-roamora-green-hover transition-colors flex items-center gap-1.5"
                >
                  <span>Explore Enclave</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
