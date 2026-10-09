import React from 'react';
import { getLocalRecommendations, getDestinations } from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { RecommendationsClient } from './RecommendationsClient';

export const metadata = {
  title: 'Local Recommendations — Roamora Singapore',
  description:
    '20 curated local travel recommendations and nuanced advice across Singapore enclaves.',
};

export default function RecommendationsPage() {
  const recommendations = getLocalRecommendations();
  const destinations = getDestinations();

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="DIR 04"
          category="Curator's Notebook"
          title="Local Recommendations & Nuances"
          subtitle="20 candid field notes documenting practical etiquette, morning heat management, hawker stall ordering, transit card choices, and neighborhood respect."
        />

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-roamora-muted">
          <span>CURATION: 20 EDITORIAL ADVISORIES</span>
          <span>·</span>
          <span>DESTINATIONS: 15 COVERED ENCLAVES</span>
          <span>·</span>
          <span>ETHOS: MINDFUL & LOCAL-FIRST</span>
        </div>
      </div>

      <RecommendationsClient
        recommendations={recommendations}
        destinations={destinations}
      />
    </div>
  );
}
