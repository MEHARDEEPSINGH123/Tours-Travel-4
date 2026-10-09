export interface ImageAsset {
  src: string;
  alt: string;
  photographer?: string;
}

// Curated high-resolution Unsplash photography specific to Singapore locations, architecture, and food
export const DESTINATION_IMAGES: Record<string, ImageAsset> = {
  'SG-MRN': {
    src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    alt: 'Marina Bay Sands skyline and waterfront illuminated at dusk in Singapore',
  },
  'SG-CBD': {
    src: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1600&q=80',
    alt: 'Civic District neoclassical architecture and modern skyscrapers in central Singapore',
  },
  'SG-CHN': {
    src: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1600&q=80',
    alt: 'Chinatown heritage shophouse streets with lanterns and historic facades',
  },
  'SG-LTL': {
    src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=80',
    alt: 'Haji Lane colorful murals and shophouses in Kampong Glam precinct',
  },
  'SG-SEN': {
    src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80',
    alt: 'Sentosa coastal shoreline with swaying palm trees and calm waters',
  },
  'SG-JUR': {
    src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    alt: 'Lush greenery and serene lakeside boardwalk at Jurong Lake Gardens',
  },
  'SG-MAC': {
    src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dense tropical forest trails and calm waters at MacRitchie Reservoir',
  },
  'SG-ECP': {
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80',
    alt: 'East Coast Park coastal recreation path and Peranakan architectural motifs',
  },
  'SG-PUL': {
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    alt: 'Rustic Pulau Ubin wooden jetties and Chek Jawa coastal nature',
  },
  'SG-BUK': {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Ancient primary rainforest canopy and hiking paths at Bukit Timah',
  },
  'SG-WDL': {
    src: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80',
    alt: 'Lush rainforest vegetation and wildlife sanctuary in the Mandai precinct',
  },
  'SG-HAR': {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    alt: 'Architectural Henderson Waves bridge along the Southern Ridges forest canopy walk',
  },
  'SG-BED': {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    alt: 'Authentic local market dining and vibrant neighbourhood life in eastern Singapore',
  },
  'SG-CLK': {
    src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    alt: 'Singapore River promenade illuminated in the evening at Clarke Quay',
  },
  'SG-CHG': {
    src: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Jewel Changi Airport magnificent Rain Vortex and lush indoor forest garden',
  },
};

export const PACKAGE_IMAGES: Record<string, ImageAsset> = {
  'PKG-001': {
    src: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Panoramic view of Marina Bay and the historic Civic District',
  },
  'PKG-002': {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Aromatic Singapore hawker feast with steaming local noodle dishes',
  },
  'PKG-003': {
    src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Green tree canopy reflecting over MacRitchie reservoir',
  },
  'PKG-004': {
    src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm coastal sands and tranquil beach waters on Sentosa Island',
  },
  'PKG-005': {
    src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Singapore skyline glowing with reflections during twilight blue hour',
  },
  'PKG-006': {
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pulau Ubin traditional kampong trails and coastal mangroves',
  },
  'PKG-007': {
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pastel Peranakan shophouse facades along East Coast Katong',
  },
  'PKG-008': {
    src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Artisan textile shops and historic lanes of Kampong Glam',
  },
  'PKG-009': {
    src: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Family discovering wildlife and lush green reserves in Mandai',
  },
  'PKG-010': {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pedestrian forest canopy trail connecting the Southern Ridges',
  },
  'PKG-011': {
    src: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Jewel Changi iconic indoor waterfall amidst tropical forest foliage',
  },
  'PKG-012': {
    src: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
    alt: 'Refined architectural perspectives in historic central Singapore',
  },
  'PKG-013': {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    alt: 'Quiet neighbourhood eateries and artisanal bakeries in Bedok & Siglap',
  },
  'PKG-014': {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sunlight filtering through ancient trees on Singapore hiking trails',
  },
  'PKG-015': {
    src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    alt: 'Singapore river illuminated bridges and evening riverside walkways',
  },
};

export const STYLE_IMAGES: Record<string, ImageAsset> = {
  'STYLE-FOOD': {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    alt: 'Singapore street food and steaming dishes',
  },
  'STYLE-GREEN': {
    src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
    alt: 'Lush tropical foliage and calm reservoir waters',
  },
  'STYLE-CULTURE': {
    src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Heritage district shophouses and historic architecture',
  },
  'STYLE-FAMILY': {
    src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80',
    alt: 'Relaxed island beach suitable for family exploration',
  },
  'STYLE-PREMIUM': {
    src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80',
    alt: 'Marina Bay skyline view showcasing curated elegance',
  },
  'STYLE-ACTIVE': {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80',
    alt: 'Canopy walk and hillside trails for active exploration',
  },
  'STYLE-PHOTO': {
    src: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1000&q=80',
    alt: 'Dramatic architectural geometry during golden hour in Singapore',
  },
};

export const EDITORIAL_HERO_IMAGE: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2000&q=85',
  alt: 'Iconic panoramic view of Singapore Marina Bay and waterfront architecture at blue hour',
};

export const EDITORIAL_CTA_IMAGE: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1800&q=85',
  alt: 'Atmospheric Singapore skyline and civic district architecture',
};

export function getDestinationImage(destinationId: string): ImageAsset {
  return (
    DESTINATION_IMAGES[destinationId] || {
      src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      alt: 'Singapore cityscape and travel destination',
    }
  );
}

export function getPackageImage(packageId: string): ImageAsset {
  return (
    PACKAGE_IMAGES[packageId] || {
      src: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80',
      alt: 'Roamora travel package experience in Singapore',
    }
  );
}

export function getStyleImage(styleId: string): ImageAsset {
  return (
    STYLE_IMAGES[styleId] || {
      src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80',
      alt: 'Roamora travel style',
    }
  );
}
