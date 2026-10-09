import { Itinerary, ItineraryStop } from '@/types/travel';

export function calculateTotalDurationMinutes(stops: ItineraryStop[]): number {
  return stops.reduce((acc, stop) => acc + (stop.duration_minutes || 0), 0);
}

export function formatMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours} hrs`;
  return `${hours} hrs ${remainingMinutes}m`;
}

export interface CustomItineraryDraft {
  title: string;
  selectedDestinationIds: string[];
  selectedActivityIds: string[];
  preferredPace: string;
  notes: string;
  estimatedDays: number;
}
