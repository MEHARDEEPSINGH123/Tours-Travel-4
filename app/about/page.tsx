import React from 'react';
import Link from 'next/link';
import { Compass, BookOpen, Sparkles, Shield, ArrowUpRight, Check, X } from 'lucide-react';
import { getWebsiteContent } from '@/lib/travel-data';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { EDITORIAL_HERO_IMAGE } from '@/lib/image-manifest';

export const metadata = {
  title: 'About Roamora — Singapore Travel Publication & Atelier',
  description:
    'The philosophy behind Roamora Singapore: an editorial travel publication paired with an unhurried, transparent journey planner.',
};

export default function AboutPage() {
  const content = getWebsiteContent();

  return (
    <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-roamora-border pb-8">
        <SectionLabel
          number="MAN 01"
          category="Brand Manifesto"
          title="The Roamora Singapore Thesis"
          subtitle="An independent travel publication combined with a practical journey planner. We believe the best journeys in Singapore happen between the marquee attractions."
        />
      </div>

      {/* Main Editorial Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
            Considered Travel, Not Mass Tourism
          </span>

          <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl text-roamora-text leading-tight">
            Small Discoveries. Thoughtful Routes. More Room to Travel Your Way.
          </h2>

          <div className="space-y-4 font-sans text-base text-roamora-text/80 leading-relaxed">
            <p>
              Singapore is often depicted through a single prism: Marina Bay skyline reflections, luxury shopping concourses, and rapid airport layovers. While those landmarks represent architectural marvels, they only scratch the surface of this equatorial island.
            </p>
            <p>
              Roamora was designed to counter generic booking portals and superficial bucket-list checklists. We treat travel curation like architectural publishing: mapping primary rainforest trails at dawn, chronicling Peranakan shophouse craft in Katong, and pacing multi-stop food crawls so guests actually have room to breathe.
            </p>
            <p>
              Every recommendation is grounded in local awareness — highlighting operating realities, honest transit guidance, and wet-weather alternatives.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/planner"
              className="px-6 py-3 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-green-hover transition-colors flex items-center gap-2 shadow-subtle"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Journey Planner</span>
            </Link>
            <Link
              href="/packages"
              className="px-6 py-3 border border-roamora-border bg-roamora-card text-roamora-text font-mono text-xs uppercase tracking-wider hover:border-roamora-terracotta hover:text-roamora-terracotta transition-colors flex items-center gap-2"
            >
              <span>Explore Packages</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Visual Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden border border-roamora-border bg-roamora-sand shadow-card p-3 bg-roamora-card">
            <EditorialImage
              src={EDITORIAL_HERO_IMAGE.src}
              alt="Singapore architectural skyline and civic quarter"
              fill
            />
            <div className="absolute bottom-4 left-4 right-4 bg-roamora-card/90 backdrop-blur-sm p-3 border border-roamora-border text-xs font-mono text-roamora-muted">
              <span>MANIFESTO ARCHIVE · RM-SG</span>
              <div className="text-roamora-text font-bold mt-0.5">EST. EXPEDITION INDEX 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Voice & Governance Standards */}
      <section className="bg-roamora-card border border-roamora-border p-8 sm:p-10 space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
            Our Publishing Standards
          </span>
          <h3 className="editorial-title text-3xl text-roamora-text mt-1">
            What Guides Us & What We Refuse
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traits we embrace */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-roamora-green font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Principles We Prioritise:</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-roamora-text">
              {content.brand_voice.traits.map((trait, idx) => (
                <li key={idx} className="flex items-center gap-2.5 p-2.5 bg-roamora-bg border border-roamora-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-roamora-green" />
                  <span className="font-semibold uppercase font-mono text-xs text-roamora-text">{trait}</span>
                  <span className="text-roamora-muted text-xs">— deliberate travel without unnecessary noise</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Things we avoid */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-roamora-terracotta font-bold flex items-center gap-2">
              <X className="w-4 h-4" />
              <span>Practices We Strictly Avoid:</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-roamora-text">
              {content.brand_voice.avoid.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 p-2.5 bg-roamora-bg border border-roamora-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-roamora-terracotta" />
                  <span className="font-semibold uppercase font-mono text-xs text-roamora-terracotta">{item}</span>
                  <span className="text-roamora-muted text-xs">— zero artificial pressure or false scarcity</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Demonstration Disclaimer */}
        <div className="p-4 bg-roamora-sand border border-roamora-border text-xs font-mono text-roamora-muted leading-relaxed">
          NOTE ON PLATFORM STATUS: Roamora Singapore is an editorial demonstration concept. It does not claim real commercial licensure, awards, verified customer counts, or live hotel bookings. All packages and sample availability records are mock demonstration content.
        </div>
      </section>
    </div>
  );
}
