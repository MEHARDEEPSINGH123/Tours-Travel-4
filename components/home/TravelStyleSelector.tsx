'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Utensils, Trees, Landmark, Users, Sparkles, Footprints, Camera } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { EditorialImage } from '@/components/shared/EditorialImage';
import { PriceLabel } from '@/components/shared/PriceLabel';
import { getStyleImage, getPackageImage } from '@/lib/image-manifest';
import { TravelStyle, Package, Destination } from '@/types/travel';

interface TravelStyleSelectorProps {
  styles: TravelStyle[];
  packages: Package[];
  destinations: Destination[];
}

export function TravelStyleSelector({
  styles,
  packages,
  destinations,
}: TravelStyleSelectorProps) {
  const [selectedStyleId, setSelectedStyleId] = useState<string>(styles[0]?.id || 'STYLE-FOOD');

  const currentStyle = styles.find((s) => s.id === selectedStyleId) || styles[0];

  // Map icons for styles
  const getStyleIcon = (id: string) => {
    switch (id) {
      case 'STYLE-FOOD':
        return <Utensils className="w-4 h-4" />;
      case 'STYLE-GREEN':
        return <Trees className="w-4 h-4" />;
      case 'STYLE-CULTURE':
        return <Landmark className="w-4 h-4" />;
      case 'STYLE-FAMILY':
        return <Users className="w-4 h-4" />;
      case 'STYLE-PREMIUM':
        return <Sparkles className="w-4 h-4" />;
      case 'STYLE-ACTIVE':
        return <Footprints className="w-4 h-4" />;
      case 'STYLE-PHOTO':
        return <Camera className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  // Find packages corresponding to current travel style
  const getStylePackages = () => {
    switch (selectedStyleId) {
      case 'STYLE-FOOD':
        return packages.filter((p) => p.audience.includes('food') || p.audience.includes('repeat') || p.id === 'PKG-002');
      case 'STYLE-GREEN':
        return packages.filter((p) => p.audience.includes('nature') || p.audience.includes('hikers') || p.id === 'PKG-003');
      case 'STYLE-CULTURE':
        return packages.filter((p) => p.audience.includes('culture') || p.audience.includes('first-time') || p.id === 'PKG-008');
      case 'STYLE-FAMILY':
        return packages.filter((p) => p.audience.includes('families') || p.id === 'PKG-004');
      case 'STYLE-PREMIUM':
        return packages.filter((p) => p.audience.includes('premium') || p.id === 'PKG-012');
      case 'STYLE-ACTIVE':
        return packages.filter((p) => p.audience.includes('active') || p.audience.includes('outdoor') || p.id === 'PKG-010');
      case 'STYLE-PHOTO':
        return packages.filter((p) => p.audience.includes('photographers') || p.audience.includes('couples') || p.id === 'PKG-005');
      default:
        return packages.slice(0, 3);
    }
  };

  const stylePackages = getStylePackages().slice(0, 3);
  const styleImage = getStyleImage(selectedStyleId);

  return (
    <section id="styles" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-card">
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          number="03"
          category="Travel Style Discovery"
          title="Find Your Kind of Journey"
          subtitle="Select your preferred expedition rhythm. Whether chasing morning laksa bowls, shaded reservoir trails, or architectural lines at blue hour, results adapt instantly."
        />

        {/* Style Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-10">
          {styles.map((style) => {
            const isSelected = style.id === selectedStyleId;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleId(style.id)}
                className={`flex flex-col items-center text-center p-3 sm:p-4 border transition-all ${
                  isSelected
                    ? 'border-roamora-green bg-roamora-green text-roamora-card shadow-subtle'
                    : 'border-roamora-border bg-roamora-bg text-roamora-text hover:border-roamora-terracotta'
                }`}
              >
                <div className={`mb-2 p-1.5 rounded-full ${isSelected ? 'text-roamora-card' : 'text-roamora-green'}`}>
                  {getStyleIcon(style.id)}
                </div>
                <span className="font-serif text-sm font-semibold leading-tight mb-1">
                  {style.name}
                </span>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${
                  isSelected ? 'text-roamora-gold' : 'text-roamora-muted'
                }`}>
                  Pace: {style.pace}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area for Selected Style */}
        <div className="bg-roamora-bg border border-roamora-border p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-roamora-border/70 mb-8">
            {/* Left description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs px-2 py-0.5 border border-roamora-terracotta text-roamora-terracotta bg-roamora-card font-semibold">
                  {currentStyle.id}
                </span>
                <span className="font-mono text-xs uppercase text-roamora-muted tracking-wider">
                  Rhythm: {currentStyle.pace}
                </span>
              </div>
              <h3 className="editorial-title text-3xl sm:text-4xl text-roamora-text mb-3">
                {currentStyle.name}
              </h3>
              <p className="font-sans text-base sm:text-lg text-roamora-text/80 leading-relaxed max-w-xl">
                {currentStyle.description}
              </p>
            </div>

            {/* Right Style visual photo */}
            <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden border border-roamora-border bg-roamora-sand">
              <EditorialImage
                src={styleImage.src}
                alt={styleImage.alt}
                fill
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-roamora-text/80 text-roamora-card px-2 py-1 font-mono text-[10px] uppercase">
                {currentStyle.name}
              </div>
            </div>
          </div>

          {/* Matched Curated Packages */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-roamora-muted">
                Recommended Demonstrations for {currentStyle.name}
              </span>
              <Link
                href="/packages"
                className="font-mono text-xs text-roamora-green hover:text-roamora-terracotta uppercase tracking-wider flex items-center gap-1"
              >
                <span>Browse All Packages</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stylePackages.map((pkg) => {
                const pkgImg = getPackageImage(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    className="bg-roamora-card border border-roamora-border p-4 flex flex-col justify-between hover:border-roamora-terracotta transition-all shadow-subtle group"
                  >
                    <div>
                      <div className="relative aspect-[16/10] mb-3 overflow-hidden bg-roamora-sand">
                        <EditorialImage
                          src={pkgImg.src}
                          alt={pkgImg.alt}
                          fill
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-roamora-card/90 px-2 py-0.5 font-mono text-[10px] text-roamora-text uppercase">
                          {pkg.duration}
                        </span>
                      </div>

                      <div className="font-mono text-[10px] text-roamora-terracotta uppercase tracking-wider mb-1">
                        {pkg.audience} · {pkg.pace} pace
                      </div>

                      <h4 className="font-serif text-lg font-bold text-roamora-text group-hover:text-roamora-terracotta transition-colors leading-snug mb-2">
                        {pkg.name}
                      </h4>

                      <p className="font-sans text-xs text-roamora-muted line-clamp-2 mb-4 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-roamora-border/60 flex items-center justify-between">
                      <PriceLabel
                        priceSGD={pkg.price_sgd_per_person_demo}
                        size="sm"
                        showDisclosure={false}
                      />
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="px-3 py-1.5 bg-roamora-green text-roamora-card font-mono text-[10px] uppercase tracking-wider hover:bg-roamora-green-hover transition-colors"
                      >
                        Inspect
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
