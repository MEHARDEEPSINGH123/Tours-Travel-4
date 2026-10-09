'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, CloudRain, Utensils, Bus, Compass, AlertCircle } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { calculateTotalDurationMinutes, formatMinutesToHours } from '@/lib/itinerary-utils';
import { Itinerary, Destination } from '@/types/travel';

interface ItineraryTimelineProps {
  itineraries: Itinerary[];
  destinations: Destination[];
}

export function ItineraryTimeline({
  itineraries,
  destinations,
}: ItineraryTimelineProps) {
  const [selectedItineraryId, setSelectedItineraryId] = useState<string>(
    itineraries[0]?.id || 'IT-001'
  );

  const activeItinerary =
    itineraries.find((it) => it.id === selectedItineraryId) || itineraries[0];

  const getDestinationName = (id: string) => {
    return destinations.find((d) => d.id === id)?.name || id;
  };

  const totalMinutes = calculateTotalDurationMinutes(activeItinerary.stops);

  return (
    <section id="itineraries" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionLabel
            number="06"
            category="Journey Architecture"
            title="Build a Day That Breathes"
            subtitle="Explore 8 curated day plans structured as sequential vertical timelines. Each itinerary integrates resting windows, local transit guidance, and wet-weather alternatives."
          />

          <Link
            href="/itineraries"
            className="self-start md:self-end px-5 py-2.5 border border-roamora-border bg-roamora-bg hover:border-roamora-green hover:text-roamora-green text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>All Itineraries</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Itinerary Tab Selector */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-roamora-border/70 scrollbar-none">
          {itineraries.map((it) => {
            const isSelected = it.id === selectedItineraryId;
            return (
              <button
                key={it.id}
                onClick={() => setSelectedItineraryId(it.id)}
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-roamora-green text-roamora-card border-roamora-green shadow-subtle'
                    : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                }`}
              >
                <span className="font-bold">{it.id}</span>
                <span className="hidden sm:inline">· {it.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Timeline Layout for Active Itinerary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Metadata & Guidance Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-roamora-bg border border-roamora-border p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-roamora-terracotta mb-2">
                <span>{activeItinerary.id}</span>
                <span>·</span>
                <span className="uppercase">{activeItinerary.recommended_duration}</span>
                <span>·</span>
                <span className="uppercase">{activeItinerary.pace} rhythm</span>
              </div>

              <h3 className="editorial-title text-3xl sm:text-4xl text-roamora-text mb-4 leading-tight">
                {activeItinerary.title}
              </h3>

              <div className="space-y-4 text-xs font-sans text-roamora-text/80 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-roamora-muted uppercase tracking-wider block mb-1">
                    Enclaves Linked:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItinerary.destination_ids.map((id) => (
                      <span
                        key={id}
                        className="px-2 py-0.5 bg-roamora-card border border-roamora-border font-serif text-xs text-roamora-text"
                      >
                        {getDestinationName(id)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-roamora-card border border-roamora-border flex items-center justify-between font-mono text-xs">
                  <span className="text-roamora-muted">Total Stop Window:</span>
                  <span className="text-roamora-green font-bold">
                    {formatMinutesToHours(totalMinutes)}
                  </span>
                </div>
              </div>

              {/* Context Guidance Cards */}
              <div className="space-y-3 pt-4 border-t border-roamora-border/70">
                <div className="flex items-start gap-2.5 text-xs">
                  <Bus className="w-4 h-4 text-roamora-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                      Transit Guidance
                    </strong>
                    <span className="text-roamora-muted leading-relaxed">
                      {activeItinerary.transport_guidance}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs">
                  <Utensils className="w-4 h-4 text-roamora-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                      Meal Guidance
                    </strong>
                    <span className="text-roamora-muted leading-relaxed">
                      {activeItinerary.meal_guidance}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs">
                  <CloudRain className="w-4 h-4 text-roamora-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                      Wet Weather Alternative
                    </strong>
                    <span className="text-roamora-muted leading-relaxed">
                      {activeItinerary.rain_plan}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-roamora-border flex items-center justify-between">
                <Link
                  href={`/itineraries/${activeItinerary.id}`}
                  className="font-mono text-xs uppercase tracking-wider text-roamora-green hover:text-roamora-terracotta flex items-center gap-1 font-semibold"
                >
                  <span>Detailed Route Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/planner"
                  className="font-mono text-xs uppercase tracking-wider text-roamora-terracotta hover:underline"
                >
                  Customize in Planner →
                </Link>
              </div>
            </div>

            <div className="p-3 bg-roamora-bg border border-roamora-border text-[10px] font-mono text-roamora-muted flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-roamora-terracotta flex-shrink-0" />
              <span>
                Demonstration timeline. Not a guaranteed live GPS track. Adjust according to local heat and operating hours.
              </span>
            </div>
          </div>

          {/* Right Sequential Vertical Timeline of Stops */}
          <div className="lg:col-span-7 bg-roamora-bg border border-roamora-border p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-roamora-border/70">
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-muted">
                Ordered Expedition Stops
              </span>
              <span className="font-mono text-xs text-roamora-terracotta font-semibold">
                {activeItinerary.stops.length} Sequential Stages
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-roamora-border">
              {activeItinerary.stops.map((stop, index) => (
                <div key={stop.order} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-roamora-card border-2 border-roamora-green flex items-center justify-center text-[10px] font-mono font-bold text-roamora-green group-hover:bg-roamora-green group-hover:text-roamora-card transition-colors">
                    0{stop.order}
                  </div>

                  {/* Stop Content Card */}
                  <div className="bg-roamora-card border border-roamora-border p-4 sm:p-5 hover:border-roamora-terracotta transition-colors shadow-subtle">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-serif text-lg sm:text-xl text-roamora-text font-bold">
                        {stop.title}
                      </h4>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-roamora-muted">
                        <Clock className="w-3.5 h-3.5 text-roamora-terracotta" />
                        <span>Approx. {stop.duration_minutes} mins</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-roamora-text/75 leading-relaxed">
                      {stop.notes}
                    </p>

                    <div className="mt-3 pt-2 border-t border-roamora-border/50 flex items-center justify-between text-[10px] font-mono text-roamora-muted">
                      <span>PHASE 0{stop.order} OF 0{activeItinerary.stops.length}</span>
                      <span className="text-roamora-green">FLEXIBLE EXECUTION</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
