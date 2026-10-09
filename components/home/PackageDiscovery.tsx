'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, RotateCcw, ArrowUpRight, Compass, Filter, Check, X } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { PriceLabel } from '@/components/shared/PriceLabel';
import { EnquiryModal } from '@/components/shared/EnquiryModal';
import { getPackageImage } from '@/lib/image-manifest';
import { filterPackages, INITIAL_PACKAGE_FILTERS, PackageFilterState } from '@/lib/travel-filters';
import { Package, Destination } from '@/types/travel';

interface PackageDiscoveryProps {
  packages: Package[];
  destinations: Destination[];
}

export function PackageDiscovery({ packages, destinations }: PackageDiscoveryProps) {
  const [filters, setFilters] = useState<PackageFilterState>(INITIAL_PACKAGE_FILTERS);
  const [selectedEnquiryPkg, setSelectedEnquiryPkg] = useState<Package | null>(null);

  const filteredPackages = filterPackages(packages, filters);

  const handleReset = () => {
    setFilters(INITIAL_PACKAGE_FILTERS);
  };

  const getDestinationName = (id: string) => {
    return destinations.find((d) => d.id === id)?.name || id;
  };

  return (
    <section id="packages" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionLabel
            number="05"
            category="Curated Catalogue"
            title="Explore Packages"
            subtitle="15 thoughtfully paced demonstration packages covering Singapore's heritage lanes, urban reserves, and coastal pause points. Filter by pace, duration, or budget."
          />

          <Link
            href="/packages"
            className="self-start md:self-end px-5 py-2.5 border border-roamora-border bg-roamora-card hover:border-roamora-green hover:text-roamora-green text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Catalogue Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-roamora-card border border-roamora-border p-6 mb-10 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-roamora-muted mb-1.5">
                Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-roamora-muted" />
                <input
                  type="text"
                  placeholder="Keyword..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-roamora-bg border border-roamora-border text-xs text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
                />
              </div>
            </div>

            {/* Destination filter */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-roamora-muted mb-1.5">
                Enclave & Area
              </label>
              <select
                value={filters.destinationId}
                onChange={(e) => setFilters({ ...filters, destinationId: e.target.value })}
                className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-xs text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
              >
                <option value="ALL">All Enclaves ({destinations.length})</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration filter */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-roamora-muted mb-1.5">
                Duration
              </label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-xs text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
              >
                <option value="ALL">Any Duration</option>
                <option value="1 day">1 Day</option>
                <option value="2 days">2 Days</option>
                <option value="3 days">3 Days</option>
                <option value="4 days">4 Days</option>
              </select>
            </div>

            {/* Pace filter */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-roamora-muted mb-1.5">
                Pace
              </label>
              <select
                value={filters.pace}
                onChange={(e) => setFilters({ ...filters, pace: e.target.value })}
                className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-xs text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
              >
                <option value="ALL">Any Pace</option>
                <option value="easy">Easy</option>
                <option value="balanced">Balanced</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
              </select>
            </div>

            {/* Budget Range filter */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono text-[11px] uppercase tracking-wider text-roamora-muted">
                <span>Max Budget</span>
                <span className="text-roamora-green font-bold">SGD ${filters.maxBudget}</span>
              </div>
              <input
                type="range"
                min={100}
                max={1000}
                step={50}
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: Number(e.target.value) })}
                className="w-full accent-roamora-green h-1.5 bg-roamora-sand"
              />
            </div>
          </div>

          {/* Filter Status Bar */}
          <div className="mt-4 pt-4 border-t border-roamora-border/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-roamora-muted">
            <div className="flex items-center gap-2">
              <span className="text-roamora-text font-bold">
                {filteredPackages.length} of {packages.length}
              </span>
              <span>demonstration packages matched</span>
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-1 bg-roamora-bg border border-roamora-border hover:border-roamora-terracotta hover:text-roamora-terracotta transition-colors flex items-center gap-1.5 text-xs font-mono uppercase"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Package Card Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-roamora-card border border-roamora-border p-12 text-center max-w-lg mx-auto">
            <Compass className="w-10 h-10 mx-auto text-roamora-terracotta mb-3" />
            <h4 className="editorial-title text-2xl text-roamora-text mb-2">
              No matching packages
            </h4>
            <p className="font-sans text-xs text-roamora-muted mb-6 leading-relaxed">
              Adjust your budget threshold or broaden the duration and enclave filters.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-wider hover:bg-roamora-green-hover transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => {
              const imageAsset = getPackageImage(pkg.id);
              return (
                <article
                  key={pkg.id}
                  className="bg-roamora-card border border-roamora-border flex flex-col justify-between hover:border-roamora-terracotta transition-all shadow-subtle hover:shadow-card group p-5"
                >
                  <div>
                    {/* Header meta */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-roamora-muted pb-2.5 mb-3 border-b border-roamora-border/60">
                      <span className="text-roamora-terracotta font-semibold">{pkg.id}</span>
                      <span className="uppercase">{pkg.duration} · {pkg.pace}</span>
                    </div>

                    {/* Image with badge */}
                    <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-roamora-sand border border-roamora-border/50">
                      <EditorialImage
                        src={imageAsset.src}
                        alt={imageAsset.alt}
                        fill
                        className="group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-roamora-card/90 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-roamora-text uppercase tracking-wider">
                        {pkg.audience}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="editorial-title text-2xl text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-tight mb-2">
                      <Link href={`/packages/${pkg.id}`}>
                        {pkg.name}
                      </Link>
                    </h3>

                    <p className="font-sans text-xs text-roamora-text/80 line-clamp-2 leading-relaxed mb-4">
                      {pkg.tagline}
                    </p>

                    {/* Enclaves */}
                    <div className="mb-4 text-[11px] font-mono text-roamora-muted">
                      <span className="uppercase block text-[9px] text-roamora-muted mb-0.5">Enclaves:</span>
                      <span className="text-roamora-text font-serif">
                        {pkg.destination_ids.map(getDestinationName).join(', ')}
                      </span>
                    </div>

                    {/* Included snippet */}
                    <div className="p-3 bg-roamora-bg border border-roamora-border text-xs mb-4">
                      <span className="font-mono text-[10px] uppercase text-roamora-green font-semibold block mb-1">
                        Includes ({pkg.included.length} items):
                      </span>
                      <p className="font-sans text-[11px] text-roamora-text/80 truncate">
                        {pkg.included.slice(0, 2).join(' · ')}...
                      </p>
                    </div>
                  </div>

                  {/* Card bottom actions & price */}
                  <div className="pt-4 border-t border-roamora-border">
                    <div className="flex items-end justify-between mb-4">
                      <PriceLabel
                        priceSGD={pkg.price_sgd_per_person_demo}
                        size="sm"
                      />
                      <span className="font-mono text-[10px] text-roamora-muted">
                        Max {pkg.group_size.maximum} guests
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="py-2.5 text-center border border-roamora-border bg-roamora-bg text-roamora-text font-mono text-xs uppercase tracking-wider hover:border-roamora-green hover:text-roamora-green transition-colors"
                      >
                        Inspect
                      </Link>
                      <button
                        onClick={() => setSelectedEnquiryPkg(pkg)}
                        className="py-2.5 text-center bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-wider hover:bg-roamora-green-hover transition-colors"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Transparent Notice */}
        <div className="mt-12 p-4 bg-roamora-card border border-roamora-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-roamora-muted">
          <span>
            DISCLOSURE: All packages and prices shown are illustrative demonstration data for prototype journey planning.
          </span>
          <Link href="/travel-info/policies" className="text-roamora-terracotta hover:underline uppercase whitespace-nowrap">
            Read Policy Terms →
          </Link>
        </div>
      </div>

      {/* Enquiry Modal */}
      {selectedEnquiryPkg && (
        <EnquiryModal
          isOpen={Boolean(selectedEnquiryPkg)}
          onClose={() => setSelectedEnquiryPkg(null)}
          itemTitle={selectedEnquiryPkg.name}
          itemType="Package"
        />
      )}
    </section>
  );
}
