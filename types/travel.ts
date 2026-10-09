export interface Destination {
  id: string;
  name: string;
  region: string;
  type: string;
  best_for: string[];
  duration_hint: string;
  highlights: string[];
  getting_around: string;
  accessibility_notes: string;
  image_key: string;
}

export interface TravelStyle {
  id: string;
  name: string;
  description: string;
  pace: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  area: string;
  category: string;
  fictional_demo: boolean;
  summary: string;
  amenities: string[];
  check_in: string;
  check_out: string;
  accessibility: string;
}

export interface Activity {
  id: string;
  name: string;
  destination_id: string;
  category: string;
  duration: string;
  price_sgd_per_person_demo: number;
  format: string;
  description: string;
  includes: string[];
  excludes: string[];
  practical_notes: string;
  availability_source: string;
  availability_is_live: boolean;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  price_sgd_per_person_demo: number;
  price_label: string;
  destination_ids: string[];
  activity_ids: string[];
  audience: string;
  pace: string;
  hotel_id: string | null;
  package_type: string;
  group_size: {
    minimum: number;
    maximum: number;
  };
  included: string[];
  not_included: string[];
  booking_window_note: string;
  availability_id: string;
  cancellation_policy_id: string;
  accessibility: string;
  important_note: string;
}

export interface ItineraryStop {
  order: number;
  title: string;
  duration_minutes: number;
  notes: string;
}

export interface Itinerary {
  id: string;
  title: string;
  destination_ids: string[];
  recommended_duration: string;
  pace: string;
  stops: ItineraryStop[];
  transport_guidance: string;
  meal_guidance: string;
  rain_plan: string;
  live_route: boolean;
}

export interface LocalRecommendation {
  id: string;
  title: string;
  destination_id: string;
  category: string;
  description: string;
  editorial_note: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  available_for: string[];
}

export interface DemoAvailability {
  id: string;
  package_id: string;
  date: string;
  status_demo: 'sample_limited' | 'sample_on_request' | 'sample_open' | string;
  spaces_demo: number;
  price_sgd_per_person_demo: number;
  is_live: boolean;
  last_updated_demo: string;
  note: string;
}

export interface VisaSource {
  name: string;
  url: string;
}

export interface VisaGuide {
  id: string;
  title: string;
  audience: string;
  steps: string[];
  official_sources: VisaSource[];
  disclaimer: string;
}

export interface PolicyRuleGroup {
  id: string;
  title: string;
  status: string;
  rules: string[];
}

export interface BookingPolicies {
  booking: PolicyRuleGroup;
  cancellation: PolicyRuleGroup;
  changes: PolicyRuleGroup;
  privacy: PolicyRuleGroup;
  travel_documents: PolicyRuleGroup;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface WebsiteHero {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primary_cta: string;
  secondary_cta: string;
  disclaimer: string;
}

export interface WebsiteContent {
  hero: WebsiteHero;
  section_labels: string[];
  brand_voice: {
    traits: string[];
    avoid: string[];
  };
  design_direction: {
    palette: Record<string, string>;
    fonts: Record<string, string>;
    navigation: string;
  };
}

export interface RoamoraDataset {
  metadata: {
    brand: string;
    dataset_name: string;
    version: string;
    generated_date: string;
    market: string;
    currency: string;
    language: string;
    purpose: string;
    data_integrity_note: string;
    counts: Record<string, number>;
    implementation_notes: string[];
  };
  destinations: Destination[];
  travel_styles: TravelStyle[];
  accommodation_options: AccommodationOption[];
  activities: Activity[];
  packages: Package[];
  itineraries: Itinerary[];
  local_recommendations: LocalRecommendation[];
  facilities: Facility[];
  availability_calendar_demo: DemoAvailability[];
  visa_guides: VisaGuide[];
  booking_policies: BookingPolicies;
  faqs: FAQ[];
  website_content: WebsiteContent;
}
