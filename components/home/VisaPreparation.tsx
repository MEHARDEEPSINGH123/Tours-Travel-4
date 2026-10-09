'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, AlertTriangle, CheckSquare, BookOpen, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { VisaGuide } from '@/types/travel';

interface VisaPreparationProps {
  visaGuides: VisaGuide[];
}

export function VisaPreparation({ visaGuides }: VisaPreparationProps) {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(
    visaGuides[0]?.id || 'VISA-001'
  );

  const activeGuide =
    visaGuides.find((g) => g.id === selectedGuideId) || visaGuides[0];

  return (
    <section id="visas" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionLabel
            number="08"
            category="Border Readiness"
            title="Visa & Entry Preparation"
            subtitle="Singapore immigration regulations, official SG Arrival Card guidance, and verified links to the Immigration & Checkpoints Authority (ICA)."
          />

          <Link
            href="/travel-info/visas"
            className="self-start md:self-end px-5 py-2.5 border border-roamora-border bg-roamora-bg hover:border-roamora-green hover:text-roamora-green text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Complete Visa Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mandatory Official Disclaimer Callout */}
        <div className="mb-10 p-4 sm:p-5 bg-roamora-terracotta-light border border-roamora-terracotta/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-roamora-terracotta flex-shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-roamora-text leading-relaxed">
            <strong className="font-mono uppercase text-[11px] text-roamora-terracotta block mb-0.5">
              Official Authority Notice
            </strong>
            Requirements change and depend on passport nationality, travel purpose, and individual history. Roamora provides general checklist guidance only and does not issue visas or guarantee entry. Always verify directly with Singapore ICA shortly before travel.
          </div>
        </div>

        {/* Guide Selector & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Guide Selector Tabs (Left) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-muted block mb-3">
              Preparation Modules
            </span>
            {visaGuides.map((guide) => {
              const isSelected = guide.id === selectedGuideId;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full text-left p-4 border transition-all ${
                    isSelected
                      ? 'bg-roamora-green text-roamora-card border-roamora-green shadow-subtle'
                      : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isSelected ? 'text-roamora-gold' : 'text-roamora-terracotta'}>
                      {guide.id}
                    </span>
                    <span className={isSelected ? 'text-roamora-card/70' : 'text-roamora-muted'}>
                      {guide.steps.length} Steps
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold leading-tight">
                    {guide.title}
                  </h4>
                  <p className={`font-sans text-xs mt-1 truncate ${isSelected ? 'text-roamora-card/80' : 'text-roamora-muted'}`}>
                    Target: {guide.audience}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Guide Steps & Official Sources (Right) */}
          <div className="lg:col-span-8 bg-roamora-bg border border-roamora-border p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-roamora-border/70">
              <div>
                <span className="font-mono text-xs text-roamora-terracotta uppercase tracking-wider block">
                  Target Audience: {activeGuide.audience}
                </span>
                <h3 className="editorial-title text-2xl sm:text-3xl text-roamora-text mt-1">
                  {activeGuide.title}
                </h3>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 bg-roamora-card border border-roamora-border text-roamora-green">
                CHECKLIST
              </span>
            </div>

            {/* Checklist Steps */}
            <div className="space-y-4 mb-8">
              {activeGuide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 bg-roamora-card border border-roamora-border shadow-subtle"
                >
                  <div className="w-5 h-5 rounded-full border border-roamora-green bg-roamora-green-light flex items-center justify-center font-mono text-[10px] text-roamora-green font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="font-sans text-sm text-roamora-text leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Official Sources Links */}
            <div className="p-4 bg-roamora-card border border-roamora-border">
              <span className="font-mono text-xs uppercase tracking-wider text-roamora-muted block mb-3">
                Official Government Portals:
              </span>
              <div className="flex flex-wrap gap-3">
                {activeGuide.official_sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-roamora-bg border border-roamora-border hover:border-roamora-green text-xs font-mono text-roamora-green uppercase tracking-wider transition-colors"
                  >
                    <span>{src.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Guide Disclaimer */}
            <p className="mt-4 font-mono text-[11px] text-roamora-muted leading-relaxed">
              Note: {activeGuide.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
