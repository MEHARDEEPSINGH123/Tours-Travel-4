'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Info, ShieldCheck, ArrowUpRight, Check, Plus } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { formatSGD } from '@/lib/travel-formatters';
import { Package } from '@/types/travel';

interface BudgetPlannerProps {
  packages: Package[];
}

interface ExtraItem {
  id: string;
  name: string;
  priceSGDPerPerson: number;
  description: string;
  selected: boolean;
}

const INITIAL_EXTRAS: ExtraItem[] = [
  {
    id: 'food_stipend',
    name: 'Hawker & Local Dining Reserve',
    priceSGDPerPerson: 55,
    description: 'Estimated daily budget for kopi, kaya toast, lunch stall, and dinner tastings.',
    selected: true,
  },
  {
    id: 'transit_pass',
    name: 'Singapore Tourist MRT/Bus Pass Card',
    priceSGDPerPerson: 25,
    description: 'Unlimited public transit across Singapore MRT rail lines and buses.',
    selected: true,
  },
  {
    id: 'nature_rentals',
    name: 'Bicycle & Bumboat Island Transfer Reserve',
    priceSGDPerPerson: 28,
    description: 'Bumboat return to Pulau Ubin plus all-day bike hire with helmet.',
    selected: false,
  },
  {
    id: 'museum_pass',
    name: 'Civic District Gallery & Heritage Pass',
    priceSGDPerPerson: 40,
    description: 'Admission estimate for National Gallery and Asian Civilisations Museum.',
    selected: false,
  },
];

export function BudgetPlanner({ packages }: BudgetPlannerProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0]?.id || 'PKG-001');
  const [travellers, setTravellers] = useState<number>(2);
  const [extras, setExtras] = useState<ExtraItem[]>(INITIAL_EXTRAS);

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  const toggleExtra = (id: string) => {
    setExtras((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const basePackageCost = selectedPkg.price_sgd_per_person_demo * travellers;
  const extrasCostPerPerson = extras
    .filter((e) => e.selected)
    .reduce((sum, e) => sum + e.priceSGDPerPerson, 0);
  const totalExtrasCost = extrasCostPerPerson * travellers;
  const grandTotal = basePackageCost + totalExtrasCost;
  const perPersonTotal = grandTotal / travellers;

  return (
    <section id="budget" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          number="07"
          category="Expedition Economics"
          title="Trip Budget & Planning Architecture"
          subtitle="Transparent financial modeling in Singapore Dollars (SGD). Calculate baseline package estimates alongside realistic out-of-pocket food, transit, and rental reserves."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-roamora-card border border-roamora-border p-6 sm:p-8 shadow-subtle">
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block mb-4">
                Step 1 · Choose Baseline Demonstration Package
              </span>

              <div className="space-y-3 mb-6">
                <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider">
                  Select Package
                </label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-roamora-bg border border-roamora-border text-sm text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — {pkg.duration} ({formatSGD(pkg.price_sgd_per_person_demo)} per person)
                    </option>
                  ))}
                </select>
                <p className="font-sans text-xs text-roamora-muted mt-1">
                  Tagline: {selectedPkg.tagline}
                </p>
              </div>

              {/* Number of Travellers */}
              <div className="space-y-3 mb-6 pt-4 border-t border-roamora-border/70">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-xs text-roamora-muted uppercase tracking-wider">
                    Number of Travellers:
                  </label>
                  <span className="font-mono text-sm text-roamora-green font-bold">
                    {travellers} {travellers === 1 ? 'person' : 'people'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 6, 8].map((count) => (
                    <button
                      key={count}
                      onClick={() => setTravellers(count)}
                      className={`flex-1 py-2 text-xs font-mono uppercase border transition-all ${
                        travellers === count
                          ? 'bg-roamora-green text-roamora-card border-roamora-green'
                          : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Extras */}
              <div className="pt-4 border-t border-roamora-border/70">
                <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block mb-3">
                  Step 2 · Optional Estimated Incidentals
                </span>
                <p className="font-sans text-xs text-roamora-muted mb-4 leading-relaxed">
                  Real travel in Singapore requires meals, local transit taps, and park admissions. Toggle transparent demo estimates:
                </p>

                <div className="space-y-2.5">
                  {extras.map((extra) => (
                    <label
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`flex items-start justify-between p-3.5 border cursor-pointer transition-all ${
                        extra.selected
                          ? 'bg-roamora-green-light/40 border-roamora-green text-roamora-text'
                          : 'bg-roamora-bg border-roamora-border text-roamora-muted hover:border-roamora-border-dark'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center ${
                          extra.selected ? 'bg-roamora-green border-roamora-green text-roamora-card' : 'border-roamora-border bg-roamora-card'
                        }`}>
                          {extra.selected && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <span className="font-serif text-sm font-semibold text-roamora-text block">
                            {extra.name}
                          </span>
                          <span className="font-sans text-xs text-roamora-muted block mt-0.5">
                            {extra.description}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-roamora-green whitespace-nowrap ml-4">
                        +{formatSGD(extra.priceSGDPerPerson)} per person
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Breakdown Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-roamora-card border-2 border-roamora-green p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-roamora-border mb-6">
                <div>
                  <span className="font-mono text-[10px] text-roamora-terracotta uppercase tracking-widest block">
                    Financial Summary
                  </span>
                  <h4 className="editorial-title text-2xl text-roamora-text">
                    Estimated Expedition Budget
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-roamora-green-light flex items-center justify-center text-roamora-green">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-3 font-mono text-xs pb-6 border-b border-roamora-border">
                <div className="flex justify-between items-center text-roamora-text">
                  <span>Baseline Package ({selectedPkg.name}):</span>
                  <span className="font-semibold">{formatSGD(basePackageCost)}</span>
                </div>
                <div className="text-[11px] text-roamora-muted pl-2">
                  ↳ {travellers} × {formatSGD(selectedPkg.price_sgd_per_person_demo)}
                </div>

                <div className="flex justify-between items-center text-roamora-text pt-2">
                  <span>Selected Incidentals ({extras.filter((e) => e.selected).length}):</span>
                  <span className="font-semibold">{formatSGD(totalExtrasCost)}</span>
                </div>
                <div className="text-[11px] text-roamora-muted pl-2">
                  ↳ {travellers} × {formatSGD(extrasCostPerPerson)}
                </div>
              </div>

              {/* Grand Total display */}
              <div className="py-6 border-b border-roamora-border space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-roamora-muted">
                    Total Estimated Group Cost:
                  </span>
                  <span className="editorial-title text-3xl sm:text-4xl text-roamora-green font-bold">
                    {formatSGD(grandTotal)}
                  </span>
                </div>

                <div className="flex items-baseline justify-between text-xs font-mono text-roamora-terracotta">
                  <span>Estimated Per-Person:</span>
                  <span className="font-bold text-base">{formatSGD(perPersonTotal)} SGD</span>
                </div>
              </div>

              {/* Inclusions / Exclusions breakdown note */}
              <div className="mt-4 space-y-2 text-xs font-sans text-roamora-muted">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-roamora-green flex-shrink-0 mt-0.5" />
                  <span>Includes digital route notes, pre-trip guide, and small-group guided slots.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-roamora-terracotta flex-shrink-0 mt-0.5" />
                  <span>Excludes international airfares, insurance, and official ICA visa fees.</span>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-6 pt-4 border-t border-roamora-border">
                <Link
                  href="/planner"
                  className="w-full py-3 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-green-hover transition-colors flex items-center justify-center gap-2"
                >
                  <span>Build Custom Plan with This Budget</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-4 bg-roamora-sand border border-roamora-border text-[11px] font-mono text-roamora-muted leading-relaxed">
              DISCLAIMER: Illustrative demo price. Confirm the final quote with the operator. Does not represent a binding booking quotation or financial obligation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
