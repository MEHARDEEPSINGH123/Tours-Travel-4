import React from 'react';
import {
  getDestinations,
  getActivities,
  getPackages,
  getItineraries,
  getTravelStyles,
} from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { PlannerInteractive } from './PlannerInteractive';

export const metadata = {
  title: 'Interactive Journey Planner — Roamora Singapore',
  description:
    'Assemble your custom Singapore expedition. Select enclaves, guided activities, pacing rhythms, and calculate live SGD budget estimates.',
};

export default function PlannerPage() {
  const destinations = getDestinations();
  const activities = getActivities();
  const packages = getPackages();
  const itineraries = getItineraries();
  const travelStyles = getTravelStyles();

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="EXP 08"
          category="Expedition Atelier"
          title="Custom Journey & Budget Planner"
          subtitle="Assemble a personalized Singapore draft route. Pick your enclaves, mix guided experiences, adjust daily rhythm, and calculate transparent Singapore Dollar estimates."
        />

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-roamora-muted">
          <span>INTERACTION: DRAFT ITINERARY ATELIER</span>
          <span>·</span>
          <span>CURRENCY: SGD</span>
          <span>·</span>
          <span>NON-BOOKING DEMONSTRATION WORKSPACE</span>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <PlannerInteractive
        destinations={destinations}
        activities={activities}
        packages={packages}
        itineraries={itineraries}
        travelStyles={travelStyles}
      />
    </div>
  );
}
