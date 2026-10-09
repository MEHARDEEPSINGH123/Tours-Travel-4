import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Compass, CloudRain, Utensils, Bus } from 'lucide-react';
import { getItineraries, getDestinations } from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { calculateTotalDurationMinutes, formatMinutesToHours } from '@/lib/itinerary-utils';

export const metadata = {
  title: 'Itineraries Directory — Roamora Singapore',
  description:
    '8 curated Singapore day itineraries structured with sequential stops, transit advice, and wet weather alternatives.',
};

export default function ItinerariesPage() {
  const itineraries = getItineraries();
  const destinations = getDestinations();

  const getDestinationName = (id: string) => {
    return destinations.find((d) => d.id === id)?.name || id;
  };

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="DIR 03"
          category="Journey Architecture"
          title="Itineraries & Day Timelines"
          subtitle="8 thoughtfully paced Singapore day plans mapped with ordered stops, resting buffers, transit modes, and indoor rain contingency ideas."
        />

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-roamora-muted">
          <span>CATALOGUE: 8 ARCHITECTURAL DAY PLANS</span>
          <span>·</span>
          <span>PACING: EASY, MODERATE & ACTIVE</span>
          <span>·</span>
          <span>NON-LIVE DEMONSTRATION ROUTES</span>
        </div>
      </div>

      {/* Directory Grid of Itineraries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {itineraries.map((it) => {
          const totalMinutes = calculateTotalDurationMinutes(it.stops);
          return (
            <article
              key={it.id}
              className="bg-roamora-card border border-roamora-border p-6 sm:p-8 flex flex-col justify-between hover:border-roamora-terracotta transition-all shadow-subtle group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono text-roamora-muted pb-3 mb-4 border-b border-roamora-border/60">
                  <span className="text-roamora-terracotta font-semibold">{it.id}</span>
                  <span className="uppercase">{it.recommended_duration} · {it.pace} rhythm</span>
                </div>

                {/* Title */}
                <h2 className="editorial-title text-2xl sm:text-3xl text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-tight mb-3">
                  <Link href={`/itineraries/${it.id}`}>{it.title}</Link>
                </h2>

                {/* Enclaves */}
                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase text-roamora-muted block mb-1">
                    Enclaves Linked:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {it.destination_ids.map((id) => (
                      <span
                        key={id}
                        className="px-2 py-0.5 bg-roamora-bg border border-roamora-border text-xs font-serif text-roamora-text"
                      >
                        {getDestinationName(id)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sequential Stops Preview */}
                <div className="space-y-2 mb-6 p-4 bg-roamora-bg border border-roamora-border">
                  <div className="flex items-center justify-between text-xs font-mono text-roamora-muted mb-2">
                    <span className="uppercase font-semibold">Timeline ({it.stops.length} Stages)</span>
                    <span className="text-roamora-green font-bold">{formatMinutesToHours(totalMinutes)}</span>
                  </div>
                  <ol className="space-y-1 text-xs font-sans text-roamora-text/80">
                    {it.stops.map((stop) => (
                      <li key={stop.order} className="flex items-center justify-between gap-2">
                        <span className="truncate">
                          <strong className="font-mono text-[10px] text-roamora-terracotta mr-1.5">
                            0{stop.order}
                          </strong>
                          {stop.title}
                        </span>
                        <span className="font-mono text-[10px] text-roamora-muted flex-shrink-0">
                          {stop.duration_minutes}m
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Guidance highlights */}
                <div className="space-y-2 text-xs font-sans text-roamora-muted">
                  <p className="flex items-start gap-2">
                    <Bus className="w-3.5 h-3.5 text-roamora-green flex-shrink-0 mt-0.5" />
                    <span><strong>Transit:</strong> {it.transport_guidance}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CloudRain className="w-3.5 h-3.5 text-roamora-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Rain Contingency:</strong> {it.rain_plan}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-roamora-border flex items-center justify-between">
                <Link
                  href={`/planner?itinerary=${it.id}`}
                  className="font-mono text-xs uppercase tracking-wider text-roamora-terracotta hover:underline flex items-center gap-1 font-semibold"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Customize in Planner</span>
                </Link>

                <Link
                  href={`/itineraries/${it.id}`}
                  className="px-4 py-2 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-wider hover:bg-roamora-green-hover transition-colors flex items-center gap-1.5"
                >
                  <span>Route Dossier</span>
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
