import { Package } from '@/types/travel';

export interface PackageFilterState {
  destinationId: string;
  duration: string;
  pace: string;
  audience: string;
  maxBudget: number;
  searchQuery: string;
}

export const INITIAL_PACKAGE_FILTERS: PackageFilterState = {
  destinationId: 'ALL',
  duration: 'ALL',
  pace: 'ALL',
  audience: 'ALL',
  maxBudget: 1000,
  searchQuery: '',
};

export function filterPackages(
  packages: Package[],
  filters: PackageFilterState
): Package[] {
  return packages.filter((pkg) => {
    // Search query matches name, tagline, or audience
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = pkg.name.toLowerCase().includes(q);
      const matchTagline = pkg.tagline.toLowerCase().includes(q);
      const matchAudience = pkg.audience.toLowerCase().includes(q);
      if (!matchName && !matchTagline && !matchAudience) {
        return false;
      }
    }

    // Destination filter
    if (filters.destinationId !== 'ALL') {
      if (!pkg.destination_ids.includes(filters.destinationId)) {
        return false;
      }
    }

    // Duration filter ('1 day', '2 days', '3 days', '4 days')
    if (filters.duration !== 'ALL') {
      if (pkg.duration !== filters.duration) {
        return false;
      }
    }

    // Pace filter ('easy', 'balanced', 'moderate', 'active')
    if (filters.pace !== 'ALL') {
      if (pkg.pace.toLowerCase() !== filters.pace.toLowerCase()) {
        return false;
      }
    }

    // Audience filter
    if (filters.audience !== 'ALL') {
      if (pkg.audience.toLowerCase() !== filters.audience.toLowerCase()) {
        return false;
      }
    }

    // Budget filter
    if (pkg.price_sgd_per_person_demo > filters.maxBudget) {
      return false;
    }

    return true;
  });
}
