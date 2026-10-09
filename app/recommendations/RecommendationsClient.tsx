'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowUpRight, Filter } from 'lucide-react';
import { LocalRecommendation, Destination } from '@/types/travel';

interface RecommendationsClientProps {
  recommendations: LocalRecommendation[];
  destinations: Destination[];
}

export function RecommendationsClient({
  recommendations,
  destinations,
}: RecommendationsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', ...Array.from(new Set(recommendations.map((r) => r.category)))];

  const filteredRecs = recommendations.filter((r) => {
    if (selectedCategory !== 'ALL' && r.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchNote = r.editorial_note.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchNote) return false;
    }
    return true;
  });

  const getDestinationName = (id: string) => {
    return destinations.find((d) => d.id === id)?.name || id;
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="bg-roamora-card border border-roamora-border p-6 shadow-subtle space-y-4">
        <div className="max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-roamora-muted" />
          <input
            type="text"
            placeholder="Search recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-roamora-bg border border-roamora-border text-xs text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-roamora-border/70">
          <span className="font-mono text-xs uppercase text-roamora-muted mr-2">
            Categories ({categories.length - 1}):
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border transition-all ${
                selectedCategory === cat
                  ? 'bg-roamora-green text-roamora-card border-roamora-green'
                  : 'bg-roamora-bg text-roamora-text border-roamora-border hover:border-roamora-terracotta'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 20 notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecs.map((rec) => {
          const destName = getDestinationName(rec.destination_id);
          return (
            <article
              key={rec.id}
              className="bg-roamora-card border border-roamora-border p-6 shadow-subtle flex flex-col justify-between hover:border-roamora-terracotta transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-roamora-muted mb-3 pb-2 border-b border-roamora-border/60">
                  <span className="text-roamora-terracotta font-semibold">{rec.id}</span>
                  <span className="uppercase px-2 py-0.5 bg-roamora-bg border border-roamora-border text-[10px]">
                    {rec.category}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-snug mb-3 font-bold">
                  {rec.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-roamora-text/80 leading-relaxed mb-4">
                  {rec.description}
                </p>
              </div>

              <div className="pt-4 border-t border-roamora-border/60 space-y-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/destinations/${rec.destination_id}`}
                    className="font-serif text-xs text-roamora-green hover:underline flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-roamora-terracotta" />
                    <span>{destName}</span>
                  </Link>
                  <ArrowUpRight className="w-3.5 h-3.5 text-roamora-muted group-hover:text-roamora-terracotta transition-colors" />
                </div>
                <p className="font-mono text-[10px] text-roamora-muted leading-relaxed">
                  Editorial: {rec.editorial_note}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
