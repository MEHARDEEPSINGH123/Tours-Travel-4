import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  X,
  Calendar,
  Clock,
  Users,
  Compass,
  Building,
  ShieldCheck,
  AlertTriangle,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import { getPackages, getEnrichedPackage } from '@/lib/travel-data';
import { getPackageImage, getDestinationImage } from '@/lib/image-manifest';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { PriceLabel } from '@/components/shared/PriceLabel';
import { formatDate, formatDemoStatus, formatSGD } from '@/lib/travel-formatters';
import { PackageDetailClient } from './PackageDetailClient';

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const packages = getPackages();
  return packages.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: PageProps) {
  const data = getEnrichedPackage(params.id);
  if (!data) return { title: 'Package Not Found — Roamora' };
  return {
    title: `${data.package.name} — Roamora Singapore`,
    description: `${data.package.tagline}. Indicative SGD ${data.package.price_sgd_per_person_demo} per person demo pricing.`,
  };
}

export default function PackageDetailPage({ params }: PageProps) {
  const data = getEnrichedPackage(params.id);

  if (!data) {
    notFound();
  }

  const {
    package: pkg,
    destinations,
    activities,
    accommodation,
    availability,
    cancellationPolicyRules,
  } = data;

  const imageAsset = getPackageImage(pkg.id);

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-roamora-border pb-4">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-roamora-muted hover:text-roamora-green transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Package Catalogue</span>
        </Link>
        <span className="font-mono text-xs text-roamora-terracotta font-semibold">
          EXPEDITION ID: {pkg.id}
        </span>
      </div>

      {/* Package Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Title, Metadata, Pricing, Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 border border-roamora-green bg-roamora-green-light text-roamora-green font-mono text-xs uppercase font-semibold">
              {pkg.duration}
            </span>
            <span className="px-2.5 py-0.5 border border-roamora-border bg-roamora-card text-roamora-muted font-mono text-xs uppercase">
              {pkg.pace} pace
            </span>
            <span className="px-2.5 py-0.5 border border-roamora-terracotta/40 bg-roamora-terracotta-light text-roamora-terracotta font-mono text-xs uppercase">
              {pkg.audience}
            </span>
          </div>

          <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl text-roamora-text leading-[1.08]">
            {pkg.name}
          </h1>

          <p className="font-sans text-base sm:text-lg text-roamora-text/80 leading-relaxed">
            {pkg.tagline}
          </p>

          {/* Group size & Booking window */}
          <div className="p-4 bg-roamora-card border border-roamora-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-roamora-muted">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-roamora-green" />
              <span>Small group: {pkg.group_size.minimum} to {pkg.group_size.maximum} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-roamora-terracotta" />
              <span>{pkg.booking_window_note}</span>
            </div>
          </div>

          {/* Pricing Box with mandatory Demo Safeguards */}
          <div className="p-6 bg-roamora-card border-2 border-roamora-green shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <PriceLabel
              priceSGD={pkg.price_sgd_per_person_demo}
              size="lg"
            />

            <PackageDetailClient pkg={pkg} />
          </div>

          {/* Mandatory Safety Disclosure */}
          <div className="p-3.5 bg-roamora-sand border border-roamora-border text-xs font-mono text-roamora-muted leading-relaxed">
            SAFETY NOTE: {pkg.important_note}
          </div>
        </div>

        {/* Right Column: Hero Visual Photo */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden border border-roamora-border bg-roamora-sand shadow-card">
            <EditorialImage
              src={imageAsset.src}
              alt={imageAsset.alt}
              fill
              priority
            />
            <div className="absolute bottom-3 left-3 right-3 bg-roamora-card/90 backdrop-blur-sm p-3 border border-roamora-border text-xs font-mono text-roamora-muted flex items-center justify-between">
              <span>EXPEDITION REF: {pkg.id}</span>
              <span className="uppercase text-roamora-green font-semibold">
                Max {pkg.group_size.maximum} Guests
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enclaves Traversed */}
      <section className="pt-10 border-t border-roamora-border space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
            Territory Overview
          </span>
          <h2 className="editorial-title text-3xl text-roamora-text mt-1">
            Enclaves Traversed on This Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest) => {
            const destImg = getDestinationImage(dest.id);
            return (
              <div
                key={dest.id}
                className="bg-roamora-card border border-roamora-border p-4 shadow-subtle flex flex-col justify-between group hover:border-roamora-terracotta transition-colors"
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
                  <span className="font-mono text-[10px] text-roamora-terracotta uppercase block">
                    {dest.region}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-roamora-text group-hover:text-roamora-terracotta transition-colors mt-1">
                    <Link href={`/destinations/${dest.id}`}>{dest.name}</Link>
                  </h3>
                  <p className="font-sans text-xs text-roamora-muted mt-2 line-clamp-2">
                    Highlights: {dest.highlights.join(' · ')}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-roamora-border/60">
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="font-mono text-xs uppercase text-roamora-green hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Enclave</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inclusions & Exclusions Comparison Matrix */}
      <section className="pt-10 border-t border-roamora-border grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Included */}
        <div className="bg-roamora-card border border-roamora-border p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-roamora-green-light text-roamora-green flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-2xl text-roamora-text font-bold">
              Included in Demo Package
            </h3>
          </div>
          <ul className="space-y-3">
            {pkg.included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-roamora-text">
                <Check className="w-4 h-4 text-roamora-green flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="bg-roamora-card border border-roamora-border p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-roamora-terracotta-light text-roamora-terracotta flex items-center justify-center">
              <X className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-2xl text-roamora-text font-bold">
              Excluded From Package
            </h3>
          </div>
          <ul className="space-y-3">
            {pkg.not_included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-roamora-muted">
                <X className="w-4 h-4 text-roamora-terracotta flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Included Guided Activities */}
      {activities.length > 0 && (
        <section className="pt-10 border-t border-roamora-border space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Curated Itinerary Experiences
            </span>
            <h2 className="editorial-title text-3xl text-roamora-text mt-1">
              Included Guided Experiences ({activities.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-roamora-card border border-roamora-border p-5 flex flex-col justify-between shadow-subtle"
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
                  <p className="font-sans text-xs text-roamora-muted p-2.5 bg-roamora-bg border border-roamora-border mb-4">
                    <strong>Note: </strong>{act.practical_notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-roamora-border flex items-center justify-between text-xs font-mono text-roamora-muted">
                  <span>{act.format}</span>
                  <span className="text-roamora-green font-bold">INCLUDED</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accommodation Concept (if present) */}
      {accommodation && (
        <section className="pt-10 border-t border-roamora-border space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Stay Coordination
            </span>
            <h2 className="editorial-title text-3xl text-roamora-text mt-1">
              Demonstration Stay Concept: {accommodation.name}
            </h2>
          </div>

          <div className="bg-roamora-card border border-roamora-border p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-roamora-border pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-roamora-green" />
                <span className="font-serif text-xl font-bold text-roamora-text">
                  {accommodation.name} ({accommodation.area})
                </span>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 border border-roamora-gold bg-roamora-gold-light text-amber-900">
                Category: {accommodation.category}
              </span>
            </div>

            <p className="font-sans text-sm text-roamora-text/80 leading-relaxed">
              {accommodation.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-roamora-muted">
              <div>
                <strong>Check-in: </strong>{accommodation.check_in}
              </div>
              <div>
                <strong>Check-out: </strong>{accommodation.check_out}
              </div>
              <div>
                <strong>Amenities: </strong>{accommodation.amenities.join(', ')}
              </div>
            </div>

            <div className="p-3 bg-roamora-sand border border-roamora-border text-xs font-mono text-roamora-muted">
              DEMO NOTICE: Fictional accommodation concept for prototype package combinations; not a live hotel booking.
            </div>
          </div>
        </section>
      )}

      {/* Sample Departure Dates for this package */}
      {availability.length > 0 && (
        <section className="pt-10 border-t border-roamora-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
                Departure Windows
              </span>
              <h2 className="editorial-title text-3xl text-roamora-text mt-1">
                Sample Availability Dates
              </h2>
            </div>
            <span className="font-mono text-xs px-3 py-1 bg-roamora-card border border-roamora-border text-roamora-muted">
              SAMPLE DATES ONLY — NON-LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availability.map((av) => {
              const statusInfo = formatDemoStatus(av.status_demo);
              return (
                <div
                  key={av.id}
                  className="bg-roamora-card border border-roamora-border p-4 shadow-subtle space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-roamora-muted">{av.id}</span>
                    <span className="text-roamora-green font-semibold uppercase">{statusInfo.label}</span>
                  </div>
                  <div className="font-serif text-lg font-bold text-roamora-text">
                    {formatDate(av.date)}
                  </div>
                  <div className="text-xs font-mono text-roamora-muted">
                    Demo slots: {av.spaces_demo} spaces
                  </div>
                  <div className="pt-2 border-t border-roamora-border flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-roamora-muted">Rate:</span>
                    <span className="font-serif text-base font-bold text-roamora-green">
                      {formatSGD(av.price_sgd_per_person_demo)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Cancellation Policy Preview */}
      <section className="pt-10 border-t border-roamora-border space-y-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
            Commercial Governance
          </span>
          <h2 className="editorial-title text-3xl text-roamora-text mt-1">
            Cancellation & Change Framework
          </h2>
        </div>

        <div className="bg-roamora-card border border-roamora-border p-6 space-y-3">
          <p className="font-mono text-xs text-roamora-terracotta font-semibold">
            POLICY REF: {pkg.cancellation_policy_id}
          </p>
          <ul className="space-y-2 text-xs font-sans text-roamora-text/80">
            {cancellationPolicyRules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-roamora-terracotta">§</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
