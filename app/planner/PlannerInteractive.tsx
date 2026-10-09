'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  Check,
  Plus,
  Trash2,
  Calendar,
  Users,
  Clock,
  Sparkles,
  Send,
  AlertCircle,
  RotateCcw,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Destination, Activity, Package, Itinerary, TravelStyle } from '@/types/travel';
import { formatSGD } from '@/lib/travel-formatters';
import { EnquiryModal } from '@/components/shared/EnquiryModal';

interface PlannerInteractiveProps {
  destinations: Destination[];
  activities: Activity[];
  packages: Package[];
  itineraries: Itinerary[];
  travelStyles: TravelStyle[];
}

export function PlannerInteractive({
  destinations,
  activities,
  packages,
  itineraries,
  travelStyles,
}: PlannerInteractiveProps) {
  // Planner State
  const [days, setDays] = useState<number>(3);
  const [travellers, setTravellers] = useState<number>(2);
  const [pace, setPace] = useState<string>('balanced');
  const [selectedEnclaveIds, setSelectedEnclaveIds] = useState<string[]>([
    'SG-MRN',
    'SG-CHN',
    'SG-MAC',
  ]);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([
    'ACT-001',
    'ACT-004',
    'ACT-008',
  ]);
  const [includeFoodPass, setIncludeFoodPass] = useState<boolean>(true);
  const [includeTransitPass, setIncludeTransitPass] = useState<boolean>(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);

  // Toggle Enclave
  const toggleEnclave = (id: string) => {
    setSelectedEnclaveIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Activity
  const toggleActivity = (id: string) => {
    setSelectedActivityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset function
  const handleReset = () => {
    setDays(3);
    setTravellers(2);
    setPace('balanced');
    setSelectedEnclaveIds(['SG-MRN', 'SG-CHN']);
    setSelectedActivityIds(['ACT-001', 'ACT-004']);
    setIncludeFoodPass(true);
    setIncludeTransitPass(true);
  };

  // Budget calculations
  const selectedActivitiesData = activities.filter((a) =>
    selectedActivityIds.includes(a.id)
  );
  const activitiesTotalPerPerson = selectedActivitiesData.reduce(
    (sum, a) => sum + a.price_sgd_per_person_demo,
    0
  );

  // Incidentals: food SGD 55/day/person, transit SGD 10/day/person
  const foodTotalPerPerson = includeFoodPass ? days * 55 : 0;
  const transitTotalPerPerson = includeTransitPass ? days * 10 : 0;

  const perPersonGrandTotal =
    activitiesTotalPerPerson + foodTotalPerPerson + transitTotalPerPerson;
  const groupGrandTotal = perPersonGrandTotal * travellers;

  const selectedDestinationsData = destinations.filter((d) =>
    selectedEnclaveIds.includes(d.id)
  );

  return (
    <div className="space-y-12">
      {/* Top Banner Notice */}
      <div className="p-4 bg-roamora-card border border-roamora-border flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-roamora-green flex-shrink-0 mt-0.5" />
        <div className="text-xs font-sans text-roamora-text leading-relaxed">
          <strong className="font-mono uppercase text-[11px] text-roamora-green block mb-0.5">
            Interactive Draft Atelier
          </strong>
          Select enclaves, guided experiences, and pacing parameters. This tool generates a preliminary route brief and illustrative Singapore Dollar budget estimate. No booking transaction is executed.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configurator Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Phase 1: Temporal Rhythm */}
          <section className="bg-roamora-card border border-roamora-border p-6 shadow-subtle space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Phase 01 · Duration & Party Size
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-2">
                  Trip Duration ({days} {days === 1 ? 'day' : 'days'})
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5, 7].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`flex-1 py-2 text-xs font-mono uppercase border transition-all ${
                        days === d
                          ? 'bg-roamora-green text-roamora-card border-roamora-green font-bold'
                          : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-2">
                  Traveller Count ({travellers} {travellers === 1 ? 'person' : 'people'})
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 6, 8].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTravellers(t)}
                      className={`flex-1 py-2 text-xs font-mono uppercase border transition-all ${
                        travellers === t
                          ? 'bg-roamora-green text-roamora-card border-roamora-green font-bold'
                          : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-2">
                Pacing Rhythm
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'easy', label: 'Easy (Unhurried)' },
                  { id: 'balanced', label: 'Balanced (Standard)' },
                  { id: 'active', label: 'Active (Fast & High Steps)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPace(item.id)}
                    className={`p-2.5 text-xs font-serif border text-center transition-all ${
                      pace === item.id
                        ? 'bg-roamora-green text-roamora-card border-roamora-green font-bold'
                        : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Phase 2: Select Enclaves */}
          <section className="bg-roamora-card border border-roamora-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta">
                Phase 02 · Enclaves of Interest ({selectedEnclaveIds.length} selected)
              </span>
              <span className="font-mono text-[10px] text-roamora-muted">
                15 AVAILABLE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto p-1 border border-roamora-border/60 bg-roamora-bg">
              {destinations.map((dest) => {
                const isSelected = selectedEnclaveIds.includes(dest.id);
                return (
                  <button
                    key={dest.id}
                    onClick={() => toggleEnclave(dest.id)}
                    className={`p-3 text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-roamora-green-light/60 border-roamora-green text-roamora-text'
                        : 'bg-roamora-card border-roamora-border text-roamora-muted hover:border-roamora-border-dark'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-roamora-terracotta">
                        {dest.id}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-roamora-green" />
                      )}
                    </div>
                    <span className="font-serif text-xs font-bold leading-tight">
                      {dest.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase text-roamora-muted mt-1">
                      {dest.region}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Phase 3: Select Experiences */}
          <section className="bg-roamora-card border border-roamora-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta">
                Phase 03 · Guided Experiences ({selectedActivityIds.length} selected)
              </span>
              <span className="font-mono text-[10px] text-roamora-muted">
                20 EXPERIENCES
              </span>
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto p-1 border border-roamora-border/60 bg-roamora-bg">
              {activities.map((act) => {
                const isSelected = selectedActivityIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    onClick={() => toggleActivity(act.id)}
                    className={`p-3 border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-roamora-green-light/60 border-roamora-green text-roamora-text'
                        : 'bg-roamora-card border-roamora-border text-roamora-muted hover:border-roamora-border-dark'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-roamora-green border-roamora-green text-roamora-card' : 'border-roamora-border'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <span className="font-serif text-xs font-bold text-roamora-text block">
                          {act.name}
                        </span>
                        <span className="font-mono text-[10px] text-roamora-muted">
                          {act.duration} · {act.destination_id} · {act.category}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold text-roamora-green whitespace-nowrap">
                      {formatSGD(act.price_sgd_per_person_demo)}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Phase 4: Incidentals & Inclusions */}
          <section className="bg-roamora-card border border-roamora-border p-6 shadow-subtle space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Phase 04 · Food & Transit Allocations
            </span>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 bg-roamora-bg border border-roamora-border cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeFoodPass}
                    onChange={(e) => setIncludeFoodPass(e.target.checked)}
                    className="accent-roamora-green w-4 h-4"
                  />
                  <div>
                    <span className="font-serif text-sm font-semibold text-roamora-text block">
                      Include Daily Hawker & Food Reserve
                    </span>
                    <span className="font-sans text-xs text-roamora-muted">
                      Estimated SGD $55 per day per person for local tastings, kopi, and dinner
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-roamora-green font-bold">
                  +{formatSGD(days * 55)} per person
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 bg-roamora-bg border border-roamora-border cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeTransitPass}
                    onChange={(e) => setIncludeTransitPass(e.target.checked)}
                    className="accent-roamora-green w-4 h-4"
                  />
                  <div>
                    <span className="font-serif text-sm font-semibold text-roamora-text block">
                      Include Daily MRT & Bus Pass Allowance
                    </span>
                    <span className="font-sans text-xs text-roamora-muted">
                      Estimated SGD $10 per day per person for unlimited contactless transit
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-roamora-green font-bold">
                  +{formatSGD(days * 10)} per person
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Live Draft Summary & Budget Output */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <div className="bg-roamora-card border-2 border-roamora-green p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-roamora-border">
              <div>
                <span className="font-mono text-[10px] text-roamora-terracotta uppercase tracking-widest block">
                  Interactive Dossier
                </span>
                <h3 className="editorial-title text-2xl text-roamora-text">
                  Custom Singapore Draft
                </h3>
              </div>
              <button
                onClick={handleReset}
                title="Reset planner"
                className="p-2 border border-roamora-border hover:bg-roamora-sand text-roamora-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Parameters Badge List */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 bg-roamora-bg border border-roamora-border text-roamora-green font-semibold">
                {days} Days Duration
              </span>
              <span className="px-2 py-0.5 bg-roamora-bg border border-roamora-border text-roamora-text">
                {travellers} {travellers === 1 ? 'Guest' : 'Guests'}
              </span>
              <span className="px-2 py-0.5 bg-roamora-bg border border-roamora-border text-roamora-muted uppercase">
                {pace} rhythm
              </span>
            </div>

            {/* Enclaves Summary */}
            <div className="space-y-1.5 text-xs">
              <span className="font-mono text-[10px] uppercase text-roamora-muted tracking-wider block">
                Selected Enclaves ({selectedDestinationsData.length}):
              </span>
              <p className="font-serif text-sm text-roamora-text leading-relaxed">
                {selectedDestinationsData.map((d) => d.name).join(', ') || 'No enclaves selected'}
              </p>
            </div>

            {/* Activities Summary */}
            <div className="space-y-1.5 text-xs">
              <span className="font-mono text-[10px] uppercase text-roamora-muted tracking-wider block">
                Selected Experiences ({selectedActivitiesData.length}):
              </span>
              <ul className="space-y-1 font-sans text-xs text-roamora-text/80 max-h-32 overflow-y-auto">
                {selectedActivitiesData.map((act) => (
                  <li key={act.id} className="flex justify-between items-center pr-2">
                    <span className="truncate">· {act.name}</span>
                    <span className="font-mono text-[11px] text-roamora-green ml-2">
                      {formatSGD(act.price_sgd_per_person_demo)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Financial Math Breakdown */}
            <div className="pt-4 border-t border-roamora-border space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-roamora-muted">
                <span>Experiences ({selectedActivitiesData.length}):</span>
                <span>{formatSGD(activitiesTotalPerPerson * travellers)}</span>
              </div>
              {includeFoodPass && (
                <div className="flex justify-between text-roamora-muted">
                  <span>Food Reserve ({days}d × {travellers}p):</span>
                  <span>{formatSGD(foodTotalPerPerson * travellers)}</span>
                </div>
              )}
              {includeTransitPass && (
                <div className="flex justify-between text-roamora-muted">
                  <span>Transit Reserve ({days}d × {travellers}p):</span>
                  <span>{formatSGD(transitTotalPerPerson * travellers)}</span>
                </div>
              )}

              <div className="pt-4 border-t border-roamora-border flex items-baseline justify-between text-roamora-text">
                <span className="uppercase font-semibold text-xs text-roamora-muted">
                  Group Estimated Total:
                </span>
                <span className="editorial-title text-3xl font-bold text-roamora-green">
                  {formatSGD(groupGrandTotal)}
                </span>
              </div>

              <div className="flex justify-between text-xs text-roamora-terracotta">
                <span>Per Person Estimate:</span>
                <span className="font-bold">{formatSGD(perPersonGrandTotal)} SGD</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-roamora-border">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-3.5 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-green-hover transition-colors flex items-center justify-center gap-2 shadow-card"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Custom Draft Enquiry</span>
              </button>
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="p-3.5 bg-roamora-sand border border-roamora-border text-[11px] font-mono text-roamora-muted leading-relaxed">
            PROTOTYPE NOTICE: Illustrative SGD estimates. Final rates depend on seasonal operator quotes and attraction operating hours.
          </div>
        </div>
      </div>

      {/* Enquiry Modal with Draft Title */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        itemTitle={`Custom ${days}-Day Singapore Journey (${selectedDestinationsData.length} enclaves, ${selectedActivitiesData.length} activities)`}
        itemType="Custom Journey"
        defaultTravellers={travellers}
      />
    </div>
  );
}
