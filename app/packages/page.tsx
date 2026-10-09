import React from 'react';
import { getPackages, getDestinations } from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { PackageDiscovery } from '@/components/home/PackageDiscovery';

export const metadata = {
  title: 'Curated Travel Packages — Roamora Singapore',
  description:
    'Discover 15 thoughtfully paced demonstration packages covering Singapore heritage streets, island nature, and urban architecture.',
};

export default function PackagesPage() {
  const packages = getPackages();
  const destinations = getDestinations();

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-8">
      {/* Directory Intro */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="DIR 02"
          category="Expedition Catalogue"
          title="Curated Packages Directory"
          subtitle="All 15 demonstration itineraries structured with transparent Singapore Dollar pricing, small-group allocations (2–8 guests), and balanced pacing."
        />
      </div>

      {/* Package Discovery Filter & Grid Component */}
      <PackageDiscovery packages={packages} destinations={destinations} />
    </div>
  );
}
