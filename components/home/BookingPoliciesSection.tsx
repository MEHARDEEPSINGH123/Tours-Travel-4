'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, FileCheck, RefreshCw, Lock, Plane, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { BookingPolicies } from '@/types/travel';

interface BookingPoliciesSectionProps {
  policies: BookingPolicies;
}

export function BookingPoliciesSection({ policies }: BookingPoliciesSectionProps) {
  const [activeTab, setActiveTab] = useState<'booking' | 'cancellation' | 'changes' | 'privacy' | 'travel_documents'>('cancellation');

  const policyTabs = [
    { key: 'cancellation' as const, label: 'Cancellation Terms', icon: RefreshCw, data: policies.cancellation },
    { key: 'booking' as const, label: 'Booking & Confirmation', icon: FileCheck, data: policies.booking },
    { key: 'changes' as const, label: 'Date Amendments', icon: Shield, data: policies.changes },
    { key: 'privacy' as const, label: 'Privacy & Data', icon: Lock, data: policies.privacy },
    { key: 'travel_documents' as const, label: 'Entry Documents', icon: Plane, data: policies.travel_documents },
  ];

  const currentPolicy = policyTabs.find((t) => t.key === activeTab)?.data || policies.cancellation;

  return (
    <section id="policies" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionLabel
            number="12"
            category="Operational Governance"
            title="Booking, Cancellation & Commercial Policies"
            subtitle="Transparent inspection of prototype terms. These templates illustrate how refund tiers, date modifications, and participant privacy are structured before commercial deployment."
          />

          <Link
            href="/travel-info/policies"
            className="self-start md:self-end px-5 py-2.5 border border-roamora-border bg-roamora-bg hover:border-roamora-green hover:text-roamora-green text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Full Policy Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {policyTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-3.5 border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-roamora-green text-roamora-card border-roamora-green shadow-subtle'
                    : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-roamora-card' : 'text-roamora-green'}`} />
                <span className="font-serif text-sm font-bold leading-tight">
                  {tab.label}
                </span>
                <span className={`font-mono text-[9px] uppercase tracking-wider mt-1 ${isSelected ? 'text-roamora-gold' : 'text-roamora-muted'}`}>
                  {tab.data.status.slice(0, 15)}...
                </span>
              </button>
            );
          })}
        </div>

        {/* Policy Details Box */}
        <div className="bg-roamora-bg border border-roamora-border p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-roamora-border/70 mb-6">
            <div>
              <span className="font-mono text-xs uppercase text-roamora-terracotta font-semibold block mb-1">
                POLICY ID: {currentPolicy.id}
              </span>
              <h3 className="editorial-title text-2xl sm:text-3xl text-roamora-text">
                {currentPolicy.title}
              </h3>
            </div>
            <div className="px-3 py-1 bg-roamora-card border border-roamora-border text-xs font-mono text-roamora-muted self-start sm:self-center">
              Status: <span className="text-roamora-text font-semibold">{currentPolicy.status}</span>
            </div>
          </div>

          {/* Rules List */}
          <div className="space-y-4">
            {currentPolicy.rules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-roamora-card border border-roamora-border shadow-subtle"
              >
                <span className="font-mono text-xs text-roamora-terracotta font-bold flex-shrink-0 mt-0.5">
                  § {idx + 1}.0
                </span>
                <p className="font-sans text-xs sm:text-sm text-roamora-text leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-3.5 bg-roamora-sand border border-roamora-border text-[11px] font-mono text-roamora-muted">
            NOTICE: These clauses represent demonstration templates requiring commercial and legal counsel review before commercial deployment.
          </div>
        </div>
      </div>
    </section>
  );
}
