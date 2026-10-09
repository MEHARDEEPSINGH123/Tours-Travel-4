import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-roamora-bg border-t border-roamora-border text-roamora-text pt-16 pb-12 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-roamora-border">
          {/* Brand & Purpose */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-2xl tracking-tight text-roamora-green">
                ROAMORA
              </span>
              <span className="font-mono text-xs uppercase text-roamora-muted tracking-widest border-l border-roamora-border pl-3">
                SINGAPORE
              </span>
            </div>

            <p className="font-sans text-xs text-roamora-text/80 leading-relaxed max-w-sm">
              An immersive travel publication combined with practical Singapore journey planning. We document local enclaves, reservoir trails, and heritage quarters with unhurried curation.
            </p>

            <div className="pt-2 font-mono text-[10px] text-roamora-muted uppercase tracking-wider space-y-1">
              <div>CURRENCY: SGD (SINGAPORE DOLLARS)</div>
              <div>LOCATION: SINGAPORE (SG)</div>
            </div>
          </div>

          {/* Quick Enclaves */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Enclaves & Regions
            </span>
            <ul className="space-y-2 text-xs font-sans text-roamora-text/85">
              <li>
                <Link href="/destinations/SG-MRN" className="hover:text-roamora-terracotta transition-colors">
                  Marina Bay & Downtown Core
                </Link>
              </li>
              <li>
                <Link href="/destinations/SG-CBD" className="hover:text-roamora-terracotta transition-colors">
                  Civic District & Bras Basah
                </Link>
              </li>
              <li>
                <Link href="/destinations/SG-CHN" className="hover:text-roamora-terracotta transition-colors">
                  Chinatown & Tanjong Pagar
                </Link>
              </li>
              <li>
                <Link href="/destinations/SG-PUL" className="hover:text-roamora-terracotta transition-colors">
                  Pulau Ubin Island Nature
                </Link>
              </li>
              <li>
                <Link href="/destinations/SG-MAC" className="hover:text-roamora-terracotta transition-colors">
                  MacRitchie & Central Catchment
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-roamora-green font-mono uppercase text-[11px] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
                  <span>All 15 Enclaves</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Planning & Catalogue */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Planning & Journeys
            </span>
            <ul className="space-y-2 text-xs font-sans text-roamora-text/85">
              <li>
                <Link href="/packages" className="hover:text-roamora-terracotta transition-colors">
                  Curated Packages (15 Journeys)
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="hover:text-roamora-terracotta transition-colors">
                  Day Itineraries & Timelines
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-roamora-terracotta transition-colors flex items-center gap-1 font-semibold text-roamora-green">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Interactive Journey Planner</span>
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-roamora-terracotta transition-colors">
                  Local Recommendations (20 Notes)
                </Link>
              </li>
              <li>
                <Link href="/#budget" className="hover:text-roamora-terracotta transition-colors">
                  Trip Budget Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Information */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
              Information
            </span>
            <ul className="space-y-2 text-xs font-sans text-roamora-text/85">
              <li>
                <Link href="/travel-info/visas" className="hover:text-roamora-terracotta transition-colors">
                  ICA Visa Preparation
                </Link>
              </li>
              <li>
                <Link href="/travel-info/policies" className="hover:text-roamora-terracotta transition-colors">
                  Policies & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-roamora-terracotta transition-colors">
                  About Roamora
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-roamora-terracotta transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom disclosure & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-mono text-roamora-muted">
          <div className="max-w-2xl leading-relaxed">
            DEMONSTRATION DISCLOSURE: Roamora Singapore is an editorial demonstration website. Package offers, accommodation concepts, and sample calendar inventory are fictional. Confirm final pricing and arrangements directly with verified operators.
          </div>

          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} ROAMORA SINGAPORE · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}
