import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, AlertTriangle, CheckSquare, Clock, Globe } from 'lucide-react';
import { getVisaGuides } from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';

export const metadata = {
  title: 'Visa & Entry Preparation — Roamora Singapore',
  description:
    'Singapore immigration checklist, SG Arrival Card submission guidance, and official ICA authority resources.',
};

export default function VisaPage() {
  const visaGuides = getVisaGuides();

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="INFO 01"
          category="Border Readiness"
          title="Visa & Entry Preparation Dossier"
          subtitle="Essential pre-departure checklists and official links to the Singapore Immigration & Checkpoints Authority (ICA). Prepare your travel documents with clarity."
        />

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-roamora-muted">
          <span>PORTAL: SINGAPORE IMMIGRATION & CHECKPOINTS AUTHORITY</span>
          <span>·</span>
          <span>ICA PORTAL: ICA.GOV.SG</span>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-6 bg-roamora-terracotta-light border-2 border-roamora-terracotta/40 flex items-start gap-4 shadow-subtle">
        <AlertTriangle className="w-6 h-6 text-roamora-terracotta flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs sm:text-sm font-sans text-roamora-text leading-relaxed">
          <strong className="font-mono uppercase text-xs text-roamora-terracotta block">
            Legal & Immigration Authority Disclaimer
          </strong>
          <p>
            Entry requirements into Singapore depend entirely upon passport nationality, travel purpose, and border authority discretion. Roamora is an independent travel publication and planning prototype; we do not determine visa eligibility, grant approvals, or guarantee entry. Always consult the official ICA portal directly before departure.
          </p>
        </div>
      </div>

      {/* 3 Visa Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {visaGuides.map((guide, idx) => (
          <article
            key={guide.id}
            className="bg-roamora-card border border-roamora-border p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:border-roamora-green transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-roamora-muted pb-3 mb-4 border-b border-roamora-border/60">
                <span className="text-roamora-terracotta font-semibold">{guide.id}</span>
                <span className="uppercase">MODULE 0{idx + 1}</span>
              </div>

              <h2 className="editorial-title text-2xl text-roamora-text mb-2 leading-tight">
                {guide.title}
              </h2>

              <span className="font-mono text-xs text-roamora-green uppercase tracking-wider block mb-6">
                Target: {guide.audience}
              </span>

              {/* Steps */}
              <div className="space-y-3 mb-8">
                <span className="font-mono text-[10px] uppercase text-roamora-muted tracking-wider block">
                  Checklist Steps ({guide.steps.length}):
                </span>
                <ol className="space-y-2.5 text-xs font-sans text-roamora-text/85">
                  {guide.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-roamora-green-light border border-roamora-green flex items-center justify-center font-mono text-[9px] text-roamora-green font-bold flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Official Source link */}
            <div className="pt-4 border-t border-roamora-border space-y-3">
              <span className="font-mono text-[10px] uppercase text-roamora-muted block">
                Official Sources:
              </span>
              {guide.official_sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-roamora-bg border border-roamora-border hover:border-roamora-green text-xs font-mono text-roamora-green uppercase tracking-wider transition-colors flex items-center justify-between"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
              <p className="font-mono text-[10px] text-roamora-muted pt-1">
                Note: {guide.disclaimer}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Standard Arrival Card Brief */}
      <div className="bg-roamora-card border border-roamora-border p-6 sm:p-8 space-y-4">
        <h3 className="editorial-title text-2xl text-roamora-text">
          Key Reminder: SG Arrival Card (SGAC) with Electronic Health Declaration
        </h3>
        <p className="font-sans text-xs sm:text-sm text-roamora-text/80 leading-relaxed max-w-3xl">
          All travellers (including Singapore Citizens and Permanent Residents returning from abroad) must complete the SG Arrival Card within 3 calendar days before arrival in Singapore. It is free of charge on the official ICA website or the MyICA Mobile App. Beware of unauthorized third-party commercial portals that charge fees for this submission.
        </p>
        <div className="pt-2 flex items-center gap-4 text-xs font-mono">
          <a
            href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card"
            target="_blank"
            rel="noopener noreferrer"
            className="text-roamora-green hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Official SG Arrival Card Portal (ICA)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
