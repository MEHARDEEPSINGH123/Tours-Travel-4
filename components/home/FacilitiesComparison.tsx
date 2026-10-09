'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ShieldAlert, FileText, Smartphone, Users, Building, Bus, Utensils, Accessibility, CloudRain } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Facility } from '@/types/travel';

interface FacilitiesComparisonProps {
  facilities: Facility[];
}

export function FacilitiesComparison({ facilities }: FacilitiesComparisonProps) {
  const getFacilityIcon = (id: string) => {
    switch (id) {
      case 'FAC-001':
        return <Smartphone className="w-5 h-5" />;
      case 'FAC-002':
        return <Users className="w-5 h-5" />;
      case 'FAC-003':
        return <Building className="w-5 h-5" />;
      case 'FAC-004':
        return <Bus className="w-5 h-5" />;
      case 'FAC-005':
        return <Utensils className="w-5 h-5" />;
      case 'FAC-006':
        return <Accessibility className="w-5 h-5" />;
      case 'FAC-007':
        return <CloudRain className="w-5 h-5" />;
      case 'FAC-008':
        return <FileText className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  return (
    <section id="facilities" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-card">
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          number="10"
          category="Standard Inclusions"
          title="Expedition Inclusions & Service Standards"
          subtitle="Explore the 8 core facility standards accompanying Roamora journeys. We set clear expectations on what is coordinated versus what requires direct supplier confirmation."
        />

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-roamora-bg border border-roamora-border p-5 flex flex-col justify-between hover:border-roamora-green transition-all shadow-subtle"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-full bg-roamora-green-light text-roamora-green flex items-center justify-center">
                    {getFacilityIcon(fac.id)}
                  </div>
                  <span className="font-mono text-[10px] text-roamora-muted uppercase font-semibold">
                    {fac.id}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-roamora-text mb-2">
                  {fac.name}
                </h3>

                <p className="font-sans text-xs text-roamora-text/80 leading-relaxed mb-4">
                  {fac.description}
                </p>
              </div>

              <div className="pt-3 border-t border-roamora-border/60">
                <span className="font-mono text-[10px] text-roamora-muted uppercase tracking-wider block mb-1">
                  Availability Scope:
                </span>
                <span className="inline-block px-2 py-0.5 bg-roamora-card border border-roamora-border font-mono text-[10px] text-roamora-green">
                  {fac.available_for.join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Operational Guardrails Box */}
        <div className="bg-roamora-bg border border-roamora-border p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-roamora-terracotta flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-xs font-sans text-roamora-text">
              <strong className="font-mono uppercase text-[11px] text-roamora-terracotta block">
                Honest Service Expectations Notice
              </strong>
              <p className="leading-relaxed">
                Capturing dietary restrictions or mobility requests does not constitute a legal guarantee that every independent third-party hawker stall, boat operator, or heritage museum can accommodate them. In a live deployment, all accessibility and dietary parameters must be confirmed in writing with each individual supplier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
