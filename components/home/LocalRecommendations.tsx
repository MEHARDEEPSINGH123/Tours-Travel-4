'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Bookmark, Lightbulb, MapPin } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { LocalRecommendation, Destination } from '@/types/travel';

interface LocalRecommendationsProps {
  recommendations: LocalRecommendation[];
  destinations: Destination[];
}

export function LocalRecommendations({
  recommendations,
  destinations,
}: LocalRecommendationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(recommendations.map((r) => r.category)))];

  const filteredRecs =
    selectedCategory === 'ALL'
      ? recommendations
      : recommendations.filter((r) => r.category === selectedCategory);

  const getDestinationName = (id: string) => {
    return destinations.find((d) => d.id === id)?.name || id;
  };

  return (
    <section id="recommendations" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionLabel
            number="09"
            category="Curator's Notebook"
            title="Local Recommendations & Nuances"
            subtitle="20 candid editorial notes for navigating Singapore respectfully — from early morning reservoir packing to wet-weather alternatives and hawker etiquette."
          />

          <Link
            href="/recommendations"
            className="self-start md:self-end px-5 py-2.5 border border-roamora-border bg-roamora-card hover:border-roamora-green hover:text-roamora-green text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Read All 20 Notes</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-roamora-border/70">
          <span className="font-mono text-xs uppercase text-roamora-muted tracking-wider self-center mr-2">
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                selectedCategory === cat
                  ? 'bg-roamora-green text-roamora-card border-roamora-green'
                  : 'bg-roamora-card text-roamora-text border-roamora-border hover:border-roamora-terracotta'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecs.map((rec, index) => {
            const destName = getDestinationName(rec.destination_id);
            return (
              <article
                key={rec.id}
                className="bg-roamora-card border border-roamora-border p-5 sm:p-6 hover:border-roamora-terracotta transition-all shadow-subtle flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-roamora-muted mb-3 pb-2 border-b border-roamora-border/60">
                    <span className="text-roamora-terracotta font-semibold">
                      {rec.id}
                    </span>
                    <span className="uppercase px-2 py-0.5 bg-roamora-bg border border-roamora-border text-[10px]">
                      {rec.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-snug mb-3">
                    {rec.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-roamora-text/80 leading-relaxed mb-4">
                    {rec.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-roamora-border/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <Link
                      href={`/destinations/${rec.destination_id}`}
                      className="font-serif text-roamora-green hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-roamora-terracotta" />
                      <span>{destName}</span>
                    </Link>
                  </div>
                  <p className="font-mono text-[10px] text-roamora-muted">
                    Editorial note: {rec.editorial_note}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
