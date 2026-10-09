'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Info, Clock, AlertCircle } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { formatDate, formatSGD, formatDemoStatus } from '@/lib/travel-formatters';
import { DemoAvailability, Package } from '@/types/travel';

interface DemoAvailabilitySectionProps {
  availability: DemoAvailability[];
  packages: Package[];
}

export function DemoAvailabilitySection({
  availability,
  packages,
}: DemoAvailabilitySectionProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0]?.id || 'PKG-001');

  const pkgAvailability = availability.filter((a) => a.package_id === selectedPkgId);
  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  return (
    <section id="availability" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          number="11"
          category="Calendar Prototype"
          title="Sample Availability — Demonstration Data"
          subtitle="Inspect prototype departure calendars and seasonal capacity modeling. All inventory dates and space counts are mock records for interaction design testing."
        />

        {/* Prominent Mandatory Demo Banner */}
        <div className="mb-10 p-4 sm:p-5 bg-roamora-card border-2 border-roamora-terracotta flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-roamora-terracotta flex-shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-roamora-text leading-relaxed">
            <strong className="font-mono uppercase text-[11px] text-roamora-terracotta block mb-0.5">
              Sample Availability — Demonstration Data Only
            </strong>
            This calendar is not connected to live tour operators or hotel reservation engines. Selecting a date does not reserve slots or charge a card. Real bookings require verified supplier inventory.
          </div>
        </div>

        {/* Package Selector */}
        <div className="mb-8">
          <label className="block font-mono text-xs uppercase tracking-wider text-roamora-muted mb-2">
            Select Package to Preview Sample Departure Dates:
          </label>
          <div className="flex flex-wrap gap-2">
            {packages.slice(0, 6).map((pkg) => {
              const isSelected = pkg.id === selectedPkgId;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    isSelected
                      ? 'bg-roamora-green text-roamora-card border-roamora-green shadow-subtle'
                      : 'bg-roamora-card text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                  }`}
                >
                  <span className="font-bold">{pkg.id}</span> · {pkg.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pkgAvailability.map((slot) => {
            const statusInfo = formatDemoStatus(slot.status_demo);
            const toneColors = {
              green: 'bg-roamora-green-light text-roamora-green border-roamora-green/30',
              amber: 'bg-roamora-gold-light text-amber-900 border-roamora-gold/40',
              slate: 'bg-roamora-sand text-roamora-muted border-roamora-border',
            }[statusInfo.tone];

            return (
              <div
                key={slot.id}
                className="bg-roamora-card border border-roamora-border p-5 flex flex-col justify-between hover:border-roamora-border-dark transition-all shadow-subtle"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-roamora-muted mb-3 pb-2 border-b border-roamora-border/60">
                    <span>{slot.id}</span>
                    <span className={`px-2 py-0.5 text-[10px] uppercase font-mono border ${toneColors}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-roamora-green" />
                    <span className="font-serif text-lg font-bold text-roamora-text">
                      {formatDate(slot.date)}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-roamora-muted mb-4">
                    Indicative space: {slot.spaces_demo} demo spaces available
                  </p>
                </div>

                <div className="pt-3 border-t border-roamora-border/60">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-roamora-muted uppercase">Sample Rate:</span>
                    <span className="font-serif text-lg font-bold text-roamora-green">
                      {formatSGD(slot.price_sgd_per_person_demo)}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-roamora-muted block mt-1">
                    {slot.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-roamora-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-roamora-muted">
          <span>
            Calendar Version: Seeded Sample Oct 2026 · Realtime: False
          </span>
          <span className="text-roamora-terracotta font-semibold">
            NO REAL-TIME TRANSACTIONS
          </span>
        </div>
      </div>
    </section>
  );
}
