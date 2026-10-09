import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertCircle, FileText, RefreshCw, Lock, Plane } from 'lucide-react';
import { getBookingPolicies } from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';

export const metadata = {
  title: 'Booking & Cancellation Policies — Roamora Singapore',
  description:
    'Operational governance, demonstration cancellation tiers, date amendment rules, and traveller data notices.',
};

export default function PoliciesPage() {
  const policies = getBookingPolicies();

  const policySections = [
    {
      key: 'booking',
      data: policies.booking,
      icon: FileText,
      description: 'Terms regarding reservation requests, pricing disclosures, and verification.',
    },
    {
      key: 'cancellation',
      data: policies.cancellation,
      icon: RefreshCw,
      description: 'Illustrative cancellation tiers, refund boundaries, and operator exclusions.',
    },
    {
      key: 'changes',
      data: policies.changes,
      icon: ShieldCheck,
      description: 'Rules regarding date amendments, participant adjustments, and operator lead times.',
    },
    {
      key: 'privacy',
      data: policies.privacy,
      icon: Lock,
      description: 'Information security principles, data minimization, and third-party handling.',
    },
    {
      key: 'travel_documents',
      data: policies.travel_documents,
      icon: Plane,
      description: 'Traveller responsibility for valid passports, ICA approvals, and SG Arrival Cards.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="INFO 02"
          category="Operational Governance"
          title="Booking & Commercial Policies"
          subtitle="A comprehensive review of Roamora's prototype operational policies. These clauses outline cancellation thresholds, confirmation standards, and compliance frameworks."
        />

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-roamora-muted">
          <span>STATUS: DEMONSTRATION TEMPLATES</span>
          <span>·</span>
          <span>LEGAL REVIEW: REQUIRED BEFORE COMMERCIAL LAUNCH</span>
        </div>
      </div>

      {/* Mandatory Safeguard Banner */}
      <div className="p-6 bg-roamora-card border-2 border-roamora-terracotta flex items-start gap-4 shadow-subtle">
        <AlertCircle className="w-6 h-6 text-roamora-terracotta flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs sm:text-sm font-sans text-roamora-text leading-relaxed">
          <strong className="font-mono uppercase text-xs text-roamora-terracotta block">
            Commercial Demonstration Disclosure
          </strong>
          <p>
            The cancellation tiers and booking conditions below are demonstration examples provided for interface evaluation. They do not constitute an executed contract between the user and any licensed travel agency. Do not treat these sample policies as approved commercial terms.
          </p>
        </div>
      </div>

      {/* Policy Groups */}
      <div className="space-y-10">
        {policySections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <article
              key={sec.key}
              className="bg-roamora-card border border-roamora-border p-6 sm:p-8 shadow-subtle space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-roamora-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-roamora-green-light text-roamora-green flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-roamora-terracotta font-semibold uppercase block">
                      § 0{idx + 1} · {sec.data.id}
                    </span>
                    <h2 className="editorial-title text-2xl sm:text-3xl text-roamora-text">
                      {sec.data.title}
                    </h2>
                  </div>
                </div>

                <div className="font-mono text-xs px-3 py-1 bg-roamora-bg border border-roamora-border text-roamora-muted self-start sm:self-center">
                  Status: <span className="text-roamora-text font-bold">{sec.data.status}</span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-roamora-muted">
                {sec.description}
              </p>

              {/* Rules List */}
              <div className="space-y-3">
                {sec.data.rules.map((rule, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-start gap-3.5 p-3.5 bg-roamora-bg border border-roamora-border"
                  >
                    <span className="font-mono text-xs text-roamora-green font-bold flex-shrink-0 mt-0.5">
                      0{rIdx + 1}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-roamora-text/85 leading-relaxed">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
