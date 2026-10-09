import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MapPin, Train, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { getDestinations, getEnrichedDestination } from '@/lib/travel-data';
import { getDestinationImage, getPackageImage } from '@/lib/image-manifest';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { PriceLabel } from '@/components/shared/PriceLabel';

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const destinations = getDestinations();
  return destinations.map((d) => ({ id: d.id }));
}

export function generateMetadata({ params }: PageProps) {
  const data = getEnrichedDestination(params.id);
  if (!data) return { title: 'Destination Not Found — Roamora' };
  return {
    title: `${data.destination.name} — Roamora Singapore`,
    description: `Explore ${data.destination.name} in ${data.destination.region}. Highlights, local activities, packages, and practical transit guidance.`,
  };
}

export default function DestinationDetailPage({ params }: PageProps) {
  const data = getEnrichedDestination(params.id);

  if (!data) {
    notFound();
  }

  const { destination, packages, activities, itineraries, recommendations } = data;
  const imageAsset = getDestinationImage(destination.id);

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between border-b border-roamora-border pb-4">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-roamora-muted hover:text-roamora-green transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Destination Archive</span>
        </Link>
        <span className="font-mono text-xs text-roamora-terracotta font-semibold">
          ENCLAVE ID: {destination.id}
        </span>
      </div>

      {/* Main Destination Hero Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 border border-roamora-green bg-roamora-green-light text-roamora-green font-mono text-xs uppercase font-semibold">
              {destination.region}
            </span>
            <span className="font-mono text-xs text-roamora-muted uppercase">
              Type: {destination.type}
            </span>
          </div>

          <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl text-roamora-text leading-[1.08]">
            {destination.name}
          </h1>

          <p className="font-sans text-base sm:text-lg text-roamora-text/80 leading-relaxed">
            Curated Singapore enclave featuring distinctive spatial textures, local culinary stops, and heritage character. Recommended pacing: <strong>{destination.duration_hint}</strong>.
          </p>

          {/* Highlights */}
          <div className="pt-2">
            <span className="font-mono text-xs uppercase tracking-wider text-roamora-muted block mb-2">
              Primary Highlights:
            </span>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-roamora-card border border-roamora-border font-serif text-sm text-roamora-text shadow-subtle"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Transit & Accessibility Callouts */}
          <div className="space-y-3 pt-4 border-t border-roamora-border">
            <div className="flex items-start gap-2.5 text-xs">
              <Train className="w-4 h-4 text-roamora-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-[11px] uppercase text-roamora-text block">
                  Getting Around
                </strong>
                <span className="text-roamora-muted leading-relaxed">
                  {destination.getting_around}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-roamora-terracotta flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-[11px] uppercase text-roamora-text block">
                  Accessibility Notes
                </strong>
                <span className="text-roamora-muted leading-relaxed">
                  {destination.accessibility_notes}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] overflow-hidden border border-roamora-border bg-roamora-sand shadow-card">
            <EditorialImage
              src={imageAsset.src}
              alt={imageAsset.alt}
              fill
              priority
            />
            <div className="absolute bottom-3 left-3 right-3 bg-roamora-card/90 backdrop-blur-sm p-3 border border-roamora-border text-xs font-mono text-roamora-muted flex items-center justify-between">
              <span>ARCHIVE PLATE: {destination.id}</span>
              <span className="uppercase text-roamora-green font-semibold">{destination.duration_hint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Guided Activities (ACT-XXX) */}
      {activities.length > 0 && (
        <section className="pt-10 border-t border-roamora-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
                Local Experiences
              </span>
              <h2 className="editorial-title text-3xl text-roamora-text mt-1">
                Activities in {destination.name}
              </h2>
            </div>
            <span className="font-mono text-xs text-roamora-muted">
              {activities.length} Guided Experiences
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-roamora-card border border-roamora-border p-5 flex flex-col justify-between shadow-subtle hover:border-roamora-terracotta transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-roamora-muted mb-2">
                    <span className="text-roamora-terracotta font-semibold">{act.id}</span>
                    <span className="uppercase">{act.duration}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-roamora-text mb-2">
                    {act.name}
                  </h3>

                  <p className="font-sans text-xs text-roamora-text/80 leading-relaxed mb-4">
                    {act.description}
                  </p>

                  <div className="p-2.5 bg-roamora-bg border border-roamora-border text-[11px] font-sans text-roamora-muted mb-4">
                    <strong className="font-mono text-[10px] uppercase text-roamora-text block">
                      Practical Notes:
                    </strong>
                    {act.practical_notes}
                  </div>
                </div>

                <div className="pt-3 border-t border-roamora-border flex items-baseline justify-between">
                  <PriceLabel
                    priceSGD={act.price_sgd_per_person_demo}
                    size="sm"
                    showDisclosure={false}
                  />
                  <span className="font-mono text-[10px] text-roamora-muted uppercase">
                    {act.format}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Associated Packages */}
      {packages.length > 0 && (
        <section className="pt-10 border-t border-roamora-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
                Expedition Combinations
              </span>
              <h2 className="editorial-title text-3xl text-roamora-text mt-1">
                Packages Traversing This Enclave
              </h2>
            </div>
            <span className="font-mono text-xs text-roamora-muted">
              {packages.length} Matching Packages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const pkgImg = getPackageImage(pkg.id);
              return (
                <div
                  key={pkg.id}
                  className="bg-roamora-card border border-roamora-border p-5 flex flex-col justify-between shadow-subtle hover:border-roamora-terracotta transition-all group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden mb-3 bg-roamora-sand">
                      <EditorialImage
                        src={pkgImg.src}
                        alt={pkgImg.alt}
                        fill
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-roamora-card/90 px-2 py-0.5 font-mono text-[10px] uppercase text-roamora-text">
                        {pkg.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-snug mb-2">
                      <Link href={`/packages/${pkg.id}`}>{pkg.name}</Link>
                    </h3>

                    <p className="font-sans text-xs text-roamora-muted line-clamp-2 mb-4 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-roamora-border flex items-center justify-between">
                    <PriceLabel
                      priceSGD={pkg.price_sgd_per_person_demo}
                      size="sm"
                      showDisclosure={false}
                    />
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="px-3.5 py-1.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-wider hover:bg-roamora-green-hover transition-colors"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Local Recommendations for this destination */}
      {recommendations.length > 0 && (
        <section className="pt-10 border-t border-roamora-border space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Curator Notes
            </span>
            <h2 className="editorial-title text-3xl text-roamora-text mt-1">
              Field Recommendations for {destination.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-roamora-card border border-roamora-border p-5 shadow-subtle space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-roamora-muted">
                  <span className="text-roamora-terracotta font-semibold">{rec.id}</span>
                  <span className="uppercase">{rec.category}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-roamora-text">
                  {rec.title}
                </h3>
                <p className="font-sans text-xs text-roamora-text/80 leading-relaxed">
                  {rec.description}
                </p>
                <p className="font-mono text-[10px] text-roamora-muted pt-1">
                  Note: {rec.editorial_note}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
