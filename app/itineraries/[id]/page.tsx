import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Bus,
  Utensils,
  CloudRain,
  Compass,
  AlertCircle,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { getItineraries, getEnrichedItinerary } from '@/lib/travel-data';
import { getDestinationImage } from '@/lib/image-manifest';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { calculateTotalDurationMinutes, formatMinutesToHours } from '@/lib/itinerary-utils';
import { ItineraryDetailClient } from './ItineraryDetailClient';

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const itineraries = getItineraries();
  return itineraries.map((it) => ({ id: it.id }));
}

export function generateMetadata({ params }: PageProps) {
  const data = getEnrichedItinerary(params.id);
  if (!data) return { title: 'Itinerary Not Found — Roamora' };
  return {
    title: `${data.itinerary.title} — Roamora Singapore`,
    description: `Curated Singapore day itinerary with sequential stops across ${data.destinations.map((d) => d.name).join(', ')}.`,
  };
}

export default function ItineraryDetailPage({ params }: PageProps) {
  const data = getEnrichedItinerary(params.id);

  if (!data) {
    notFound();
  }

  const { itinerary, destinations } = data;
  const totalMinutes = calculateTotalDurationMinutes(itinerary.stops);

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-roamora-border pb-4">
        <Link
          href="/itineraries"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-roamora-muted hover:text-roamora-green transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Itineraries</span>
        </Link>
        <span className="font-mono text-xs text-roamora-terracotta font-semibold">
          ITINERARY ID: {itinerary.id}
        </span>
      </div>

      {/* Header Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 border border-roamora-green bg-roamora-green-light text-roamora-green font-mono text-xs uppercase font-semibold">
              {itinerary.recommended_duration}
            </span>
            <span className="px-2.5 py-0.5 border border-roamora-border bg-roamora-card text-roamora-muted font-mono text-xs uppercase">
              {itinerary.pace} rhythm
            </span>
            <span className="px-2.5 py-0.5 border border-roamora-border bg-roamora-card text-roamora-muted font-mono text-xs uppercase">
              {itinerary.stops.length} Sequential Stops
            </span>
          </div>

          <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl text-roamora-text leading-[1.08]">
            {itinerary.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-roamora-text/80 leading-relaxed max-w-2xl">
            A sequenced day route balancing outdoor discovery, culinary pause points, and resting buffers. Estimated total stop duration: <strong>{formatMinutesToHours(totalMinutes)}</strong>.
          </p>

          <ItineraryDetailClient itinerary={itinerary} />
        </div>

        {/* Practical notes overview card */}
        <div className="lg:col-span-4 bg-roamora-card border border-roamora-border p-6 shadow-subtle space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block border-b border-roamora-border pb-2">
            Route Parameters
          </span>

          <div className="space-y-3 text-xs font-sans text-roamora-text">
            <div className="flex items-start gap-2.5">
              <Bus className="w-4 h-4 text-roamora-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                  Transit Mode
                </strong>
                <span className="text-roamora-muted leading-relaxed">
                  {itinerary.transport_guidance}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Utensils className="w-4 h-4 text-roamora-terracotta flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                  Meal Recommendations
                </strong>
                <span className="text-roamora-muted leading-relaxed">
                  {itinerary.meal_guidance}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CloudRain className="w-4 h-4 text-roamora-gold flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                  Wet Weather Contingency
                </strong>
                <span className="text-roamora-muted leading-relaxed">
                  {itinerary.rain_plan}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-roamora-sand border border-roamora-border text-[10px] font-mono text-roamora-muted leading-relaxed">
            DISCLOSURE: This is a demonstration suggested route, not a live GPS-monitored tour. Adjust according to personal pace and weather conditions.
          </div>
        </div>
      </div>

      {/* Sequential Vertical Stops Timeline */}
      <section className="pt-8 border-t border-roamora-border space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
            Step-by-Step Architecture
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl text-roamora-text mt-1">
            Sequential Route Timeline
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-4 before:top-3 before:bottom-3 before:w-[1px] before:bg-roamora-border">
          {itinerary.stops.map((stop) => (
            <div key={stop.order} className="relative group">
              {/* Dot badge */}
              <div className="absolute -left-6 sm:-left-10 top-1 w-8 h-8 rounded-full bg-roamora-card border-2 border-roamora-green flex items-center justify-center font-mono text-xs font-bold text-roamora-green group-hover:bg-roamora-green group-hover:text-roamora-card transition-colors shadow-subtle">
                0{stop.order}
              </div>

              {/* Stop card */}
              <div className="bg-roamora-card border border-roamora-border p-6 shadow-subtle hover:border-roamora-terracotta transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="font-serif text-2xl text-roamora-text font-bold">
                    {stop.title}
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-roamora-terracotta">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Suggested Stop Window: {stop.duration_minutes} minutes</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-roamora-text/80 leading-relaxed">
                  {stop.notes}
                </p>

                <div className="mt-4 pt-3 border-t border-roamora-border/60 flex items-center justify-between text-xs font-mono text-roamora-muted">
                  <span>STAGE 0{stop.order} OF 0{itinerary.stops.length}</span>
                  <span className="text-roamora-green font-semibold">FLEXIBLE EXECUTION</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enclaves Traversed */}
      <section className="pt-10 border-t border-roamora-border space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
            Territory Traversed
          </span>
          <h2 className="editorial-title text-3xl text-roamora-text mt-1">
            Enclaves Linked in This Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest) => {
            const destImg = getDestinationImage(dest.id);
            return (
              <div
                key={dest.id}
                className="bg-roamora-card border border-roamora-border p-5 flex flex-col justify-between shadow-subtle group hover:border-roamora-terracotta transition-colors"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden mb-3 bg-roamora-sand">
                    <EditorialImage
                      src={destImg.src}
                      alt={destImg.alt}
                      fill
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-roamora-terracotta uppercase">
                    {dest.region}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-roamora-text mt-1 mb-2">
                    <Link href={`/destinations/${dest.id}`}>{dest.name}</Link>
                  </h3>
                  <p className="font-sans text-xs text-roamora-muted line-clamp-2">
                    Highlights: {dest.highlights.join(' · ')}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-roamora-border">
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="font-mono text-xs uppercase text-roamora-green hover:underline flex items-center gap-1"
                  >
                    <span>Explore Enclave</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
