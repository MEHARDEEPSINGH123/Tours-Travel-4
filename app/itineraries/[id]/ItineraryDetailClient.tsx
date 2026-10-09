'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Send } from 'lucide-react';
import { EnquiryModal } from '@/components/shared/EnquiryModal';
import { Itinerary } from '@/types/travel';

interface ItineraryDetailClientProps {
  itinerary: Itinerary;
}

export function ItineraryDetailClient({ itinerary }: ItineraryDetailClientProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="px-6 py-3.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-green-hover transition-colors flex items-center gap-2 shadow-subtle"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enquire About This Itinerary</span>
        </button>

        <Link
          href={`/planner?itinerary=${itinerary.id}`}
          className="px-6 py-3.5 border border-roamora-border bg-roamora-bg text-roamora-text font-mono text-xs uppercase tracking-widest hover:border-roamora-terracotta hover:text-roamora-terracotta transition-colors flex items-center gap-2"
        >
          <Compass className="w-3.5 h-3.5 text-roamora-terracotta" />
          <span>Customize in Planner</span>
        </Link>
      </div>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        itemTitle={itinerary.title}
        itemType="Itinerary"
      />
    </>
  );
}
