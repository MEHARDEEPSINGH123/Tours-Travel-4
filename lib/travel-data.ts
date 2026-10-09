import datasetJson from '@/data/roamora_singapore_dataset.json';
import {
  RoamoraDataset,
  Destination,
  TravelStyle,
  AccommodationOption,
  Activity,
  Package,
  Itinerary,
  LocalRecommendation,
  Facility,
  DemoAvailability,
  VisaGuide,
  BookingPolicies,
  FAQ,
  WebsiteContent,
} from '@/types/travel';

const dataset: RoamoraDataset = datasetJson as unknown as RoamoraDataset;

export function getDataset(): RoamoraDataset {
  return dataset;
}

export function getDestinations(): Destination[] {
  return dataset.destinations || [];
}

export function getDestinationById(id: string): Destination | undefined {
  return dataset.destinations.find((d) => d.id === id);
}

export function getTravelStyles(): TravelStyle[] {
  return dataset.travel_styles || [];
}

export function getTravelStyleById(id: string): TravelStyle | undefined {
  return dataset.travel_styles.find((s) => s.id === id);
}

export function getAccommodationOptions(): AccommodationOption[] {
  return dataset.accommodation_options || [];
}

export function getAccommodationById(id: string): AccommodationOption | undefined {
  return dataset.accommodation_options.find((a) => a.id === id);
}

export function getActivities(): Activity[] {
  return dataset.activities || [];
}

export function getActivityById(id: string): Activity | undefined {
  return dataset.activities.find((a) => a.id === id);
}

export function getActivitiesByDestination(destinationId: string): Activity[] {
  return dataset.activities.filter((a) => a.destination_id === destinationId);
}

export function getPackages(): Package[] {
  return dataset.packages || [];
}

export function getPackageById(id: string): Package | undefined {
  return dataset.packages.find((p) => p.id === id);
}

export function getItineraries(): Itinerary[] {
  return dataset.itineraries || [];
}

export function getItineraryById(id: string): Itinerary | undefined {
  return dataset.itineraries.find((it) => it.id === id);
}

export function getLocalRecommendations(): LocalRecommendation[] {
  return dataset.local_recommendations || [];
}

export function getRecommendationsByDestination(destinationId: string): LocalRecommendation[] {
  return dataset.local_recommendations.filter((r) => r.destination_id === destinationId);
}

export function getFacilities(): Facility[] {
  return dataset.facilities || [];
}

export function getDemoAvailability(packageId?: string): DemoAvailability[] {
  if (!packageId) return dataset.availability_calendar_demo || [];
  return dataset.availability_calendar_demo.filter((av) => av.package_id === packageId);
}

export function getVisaGuides(): VisaGuide[] {
  return dataset.visa_guides || [];
}

export function getBookingPolicies(): BookingPolicies {
  return dataset.booking_policies;
}

export function getFaqs(): FAQ[] {
  return dataset.faqs || [];
}

export function getWebsiteContent(): WebsiteContent {
  return dataset.website_content;
}

export interface EnrichedPackage {
  package: Package;
  destinations: Destination[];
  activities: Activity[];
  accommodation?: AccommodationOption;
  availability: DemoAvailability[];
  cancellationPolicyRules: string[];
}

export function getEnrichedPackage(packageId: string): EnrichedPackage | null {
  const pkg = getPackageById(packageId);
  if (!pkg) return null;

  const destinations = pkg.destination_ids
    .map((id) => getDestinationById(id))
    .filter((d): d is Destination => Boolean(d));

  const activities = pkg.activity_ids
    .map((id) => getActivityById(id))
    .filter((a): a is Activity => Boolean(a));

  const accommodation = pkg.hotel_id ? getAccommodationById(pkg.hotel_id) : undefined;
  const availability = getDemoAvailability(packageId);
  const cancellationPolicyRules = dataset.booking_policies.cancellation.rules || [];

  return {
    package: pkg,
    destinations,
    activities,
    accommodation,
    availability,
    cancellationPolicyRules,
  };
}

export interface EnrichedDestination {
  destination: Destination;
  packages: Package[];
  activities: Activity[];
  itineraries: Itinerary[];
  recommendations: LocalRecommendation[];
}

export function getEnrichedDestination(destinationId: string): EnrichedDestination | null {
  const dest = getDestinationById(destinationId);
  if (!dest) return null;

  const packages = dataset.packages.filter((pkg) =>
    pkg.destination_ids.includes(destinationId)
  );

  const activities = getActivitiesByDestination(destinationId);

  const itineraries = dataset.itineraries.filter((it) =>
    it.destination_ids.includes(destinationId)
  );

  const recommendations = getRecommendationsByDestination(destinationId);

  return {
    destination: dest,
    packages,
    activities,
    itineraries,
    recommendations,
  };
}

export interface EnrichedItinerary {
  itinerary: Itinerary;
  destinations: Destination[];
}

export function getEnrichedItinerary(itineraryId: string): EnrichedItinerary | null {
  const it = getItineraryById(itineraryId);
  if (!it) return null;

  const destinations = it.destination_ids
    .map((id) => getDestinationById(id))
    .filter((d): d is Destination => Boolean(d));

  return {
    itinerary: it,
    destinations,
  };
}
