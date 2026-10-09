import React from 'react';
import {
  getDataset,
  getDestinations,
  getTravelStyles,
  getPackages,
  getItineraries,
  getLocalRecommendations,
  getFacilities,
  getDemoAvailability,
  getVisaGuides,
  getBookingPolicies,
  getFaqs,
  getWebsiteContent,
} from '@/lib/travel-data';

import { ImmersiveHero } from '@/components/home/ImmersiveHero';
import { DestinationDiscovery } from '@/components/home/DestinationDiscovery';
import { TravelStyleSelector } from '@/components/home/TravelStyleSelector';
import { FeaturedJourneys } from '@/components/home/FeaturedJourneys';
import { PackageDiscovery } from '@/components/home/PackageDiscovery';
import { ItineraryTimeline } from '@/components/home/ItineraryTimeline';
import { BudgetPlanner } from '@/components/home/BudgetPlanner';
import { VisaPreparation } from '@/components/home/VisaPreparation';
import { LocalRecommendations } from '@/components/home/LocalRecommendations';
import { FacilitiesComparison } from '@/components/home/FacilitiesComparison';
import { DemoAvailabilitySection } from '@/components/home/DemoAvailabilitySection';
import { BookingPoliciesSection } from '@/components/home/BookingPoliciesSection';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { FinalJourneyCTA } from '@/components/home/FinalJourneyCTA';

export default function HomePage() {
  const websiteContent = getWebsiteContent();
  const destinations = getDestinations();
  const travelStyles = getTravelStyles();
  const packages = getPackages();
  const itineraries = getItineraries();
  const recommendations = getLocalRecommendations();
  const facilities = getFacilities();
  const availability = getDemoAvailability();
  const visaGuides = getVisaGuides();
  const bookingPolicies = getBookingPolicies();
  const faqs = getFaqs();

  // Pick top 3 featured packages for storytelling section
  const featuredPackages = packages.filter((p) =>
    ['PKG-001', 'PKG-003', 'PKG-005'].includes(p.id)
  );

  return (
    <div className="w-full flex flex-col">
      {/* 01. Cinematic Opening */}
      <ImmersiveHero heroData={websiteContent.hero} />

      {/* 02. Destination Discovery */}
      <DestinationDiscovery destinations={destinations} />

      {/* 03. Travel Style Discovery */}
      <TravelStyleSelector
        styles={travelStyles}
        packages={packages}
        destinations={destinations}
      />

      {/* 04. Featured Journeys (Storytelling-led) */}
      <FeaturedJourneys
        featuredPackages={featuredPackages}
        destinations={destinations}
      />

      {/* 05. Explore Packages (Filterable catalogue) */}
      <PackageDiscovery
        packages={packages}
        destinations={destinations}
      />

      {/* 06. Build Your Itinerary (Sequential timeline) */}
      <ItineraryTimeline
        itineraries={itineraries}
        destinations={destinations}
      />

      {/* 07. Trip Budget */}
      <BudgetPlanner packages={packages} />

      {/* 08. Visa and Entry Preparation */}
      <VisaPreparation visaGuides={visaGuides} />

      {/* 09. Local Recommendations */}
      <LocalRecommendations
        recommendations={recommendations}
        destinations={destinations}
      />

      {/* 10. Facilities & Inclusions */}
      <FacilitiesComparison facilities={facilities} />

      {/* 11. Sample Availability Calendar */}
      <DemoAvailabilitySection
        availability={availability}
        packages={packages}
      />

      {/* 12. Booking and Cancellation Information */}
      <BookingPoliciesSection policies={bookingPolicies} />

      {/* 13. FAQ */}
      <FaqAccordion faqs={faqs} />

      {/* 14. Final Journey CTA */}
      <FinalJourneyCTA />
    </div>
  );
}
