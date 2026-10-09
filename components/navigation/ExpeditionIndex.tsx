'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Compass } from 'lucide-react';
import { EditorialMenu } from './EditorialMenu';

interface SectionMarker {
  id: string;
  number: string;
  label: string;
}

const HOMEPAGE_SECTIONS: SectionMarker[] = [
  { id: 'opening', number: '01', label: 'Opening' },
  { id: 'destinations', number: '02', label: 'Destinations' },
  { id: 'styles', number: '03', label: 'Travel Styles' },
  { id: 'featured', number: '04', label: 'Featured Journeys' },
  { id: 'packages', number: '05', label: 'Packages' },
  { id: 'itineraries', number: '06', label: 'Itineraries' },
  { id: 'budget', number: '07', label: 'Trip Budget' },
  { id: 'visas', number: '08', label: 'Visa Preparation' },
  { id: 'recommendations', number: '09', label: 'Local Advice' },
  { id: 'facilities', number: '10', label: 'Inclusions' },
  { id: 'availability', number: '11', label: 'Demo Dates' },
  { id: 'policies', number: '12', label: 'Policies' },
  { id: 'faq', number: '13', label: 'FAQ' },
];

export function ExpeditionIndex() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomepage) return;

      const viewportOffset = window.innerHeight * 0.35;
      const scrollY = window.scrollY;
      const currentScrollPoint = scrollY + viewportOffset;

      const totalSections = HOMEPAGE_SECTIONS.length;
      const sectionElements = HOMEPAGE_SECTIONS.map((sec) => document.getElementById(sec.id));
      const sectionTops = sectionElements.map((el) => (el ? el.offsetTop : null));

      // Determine active section index
      let activeIdx = 0;
      for (let i = 0; i < totalSections; i++) {
        const top = sectionTops[i];
        if (top !== null && currentScrollPoint >= top) {
          activeIdx = i;
        }
      }

      // Calculate smooth interpolation fraction between active section and next section
      let fraction = 0;
      const currentTop = sectionTops[activeIdx] ?? 0;
      const nextTop =
        activeIdx < totalSections - 1
          ? (sectionTops[activeIdx + 1] ?? (currentTop + 800))
          : (document.documentElement.scrollHeight - window.innerHeight);

      if (nextTop > currentTop) {
        fraction = Math.min(1, Math.max(0, (currentScrollPoint - currentTop) / (nextTop - currentTop)));
      }

      // If at bottom of page, force 100%
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && scrollY >= maxScroll - 50) {
        activeIdx = totalSections - 1;
        fraction = 1;
      }

      // Synchronize progress percentage strictly with the dots (from dot 0 to dot 12)
      const syncedPercent = ((activeIdx + fraction) / (totalSections - 1)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, syncedPercent)));
      setActiveSectionIndex(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  const scrollToSection = (sectionId: string) => {
    if (isHomepage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const currentSectionData = HOMEPAGE_SECTIONS[activeSectionIndex] || HOMEPAGE_SECTIONS[0];

  return (
    <>
      {/* ========================================================
          DESKTOP EXPEDITION INDEX RAIL (Left side, fixed)
          ======================================================== */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[72px] bg-roamora-bg/95 backdrop-blur-md border-r border-roamora-border z-40 flex-col justify-between items-center py-6 select-none"
        aria-label="Expedition Index Rail"
      >
        {/* Top: Brand mark & Menu trigger */}
        <div className="flex flex-col items-center gap-6 w-full px-2">
          {/* Brand Mark */}
          <Link
            href="/"
            className="group flex flex-col items-center text-center"
            title="Roamora Singapore Homepage"
          >
            <div className="w-10 h-10 border border-roamora-green flex items-center justify-center bg-roamora-card text-roamora-green group-hover:bg-roamora-green group-hover:text-roamora-card transition-colors">
              <span className="font-serif font-bold text-sm tracking-tighter">RM</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-roamora-muted mt-1 opacity-70">
              SG
            </span>
          </Link>

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 p-2 border border-roamora-border hover:border-roamora-green hover:bg-roamora-sand transition-all group cursor-pointer"
            title="Open Editorial Navigation Index"
            aria-label="Open Editorial Index"
          >
            <Menu className="w-4 h-4 text-roamora-green group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-roamora-muted group-hover:text-roamora-green">
              INDEX
            </span>
          </button>
        </div>

        {/* Center: Synchronized Vertical Scroll Line with Dots */}
        <div className="flex-1 flex flex-col items-center justify-center my-4 relative w-full px-1">
          {isHomepage ? (
            <div className="relative flex flex-col items-center justify-between h-[360px] py-2 w-full">
              {/* Background Guideline from center of first dot to center of last dot */}
              <div className="absolute top-3.5 bottom-3.5 w-[1.5px] bg-roamora-border left-1/2 -translate-x-1/2" />

              {/* Synchronized Active Fill Line: tracks exactly with the dots */}
              <div
                className="absolute top-3.5 w-[2px] bg-roamora-green left-1/2 -translate-x-1/2 transition-all duration-100 ease-out pointer-events-none"
                style={{
                  height: `calc(${scrollProgress}% * (100% - 28px) / 100)`,
                }}
              />

              {/* 13 Dot Markers */}
              {HOMEPAGE_SECTIONS.map((sec, idx) => {
                const isActive = activeSectionIndex === idx;
                const isHovered = hoveredSection === sec.id;
                // A dot is reached when the synchronized scroll progress has reached its position
                const isReached = scrollProgress >= (idx / (HOMEPAGE_SECTIONS.length - 1)) * 100 - 0.5;

                return (
                  <div
                    key={sec.id}
                    className="relative z-10 flex items-center justify-center"
                    onMouseEnter={() => setHoveredSection(sec.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      aria-label={`Jump to section ${sec.number}: ${sec.label}`}
                      className="group flex items-center justify-center w-5 h-5 focus:outline-none cursor-pointer"
                    >
                      {isActive ? (
                        /* Active Dot: Outer ring with inner solid dot, synced to line */
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-roamora-green bg-roamora-card flex items-center justify-center shadow-subtle transition-all duration-200 scale-110">
                          <span className="w-1.5 h-1.5 rounded-full bg-roamora-green" />
                        </span>
                      ) : (
                        /* Standard Dot: solid green when reached by line fill, muted border before */
                        <span
                          className={`rounded-full transition-all duration-200 ${
                            isReached
                              ? 'w-2 h-2 bg-roamora-green hover:scale-125'
                              : 'w-2 h-2 bg-roamora-border group-hover:bg-roamora-terracotta group-hover:scale-125'
                          }`}
                        />
                      )}
                    </button>

                    {/* Flyout Tooltip on hover or when active */}
                    {(isHovered || isActive) && (
                      <div className="absolute left-[34px] px-2.5 py-1 bg-roamora-card border border-roamora-border shadow-card whitespace-nowrap pointer-events-none transition-all z-30">
                        <span className="font-mono text-[9px] text-roamora-terracotta mr-1.5 font-bold">
                          {sec.number}
                        </span>
                        <span className="font-mono text-[10px] text-roamora-text font-semibold uppercase tracking-wider">
                          {sec.label}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-[1px] h-20 bg-roamora-border" />
              <Link
                href="/"
                className="font-mono text-[9px] text-roamora-muted hover:text-roamora-green uppercase tracking-widest writing-vertical rotate-180"
              >
                ← Back to Index
              </Link>
              <div className="w-[1px] h-20 bg-roamora-border" />
            </div>
          )}
        </div>

        {/* Bottom: Journey Planner shortcut & Live section indicator */}
        <div className="flex flex-col items-center gap-4 w-full px-2">
          {/* Planner Shortcut */}
          <Link
            href="/planner"
            className="flex flex-col items-center gap-1 p-2 border border-roamora-border hover:border-roamora-terracotta hover:bg-roamora-terracotta-light transition-all group"
            title="Interactive Journey & Budget Planner"
          >
            <Compass className="w-4 h-4 text-roamora-terracotta group-hover:rotate-45 transition-transform" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-roamora-muted group-hover:text-roamora-terracotta font-semibold">
              PLAN
            </span>
          </Link>

          {/* Current Section Code */}
          <div className="text-center font-mono text-[9px] text-roamora-muted tracking-widest border-t border-roamora-border pt-2 w-full">
            <span>SEC</span>
            <div className="text-roamora-text font-bold">
              {isHomepage ? currentSectionData.number : 'DIR'}
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE EXPEDITION DOCK (Screen < 1024px)
          Compact, non-intrusive bottom dock + subtle top bar
          ======================================================== */}
      <div className="lg:hidden">
        {/* Subtle top header bar */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-roamora-bg/95 backdrop-blur-md border-b border-roamora-border z-40 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-roamora-green">ROAMORA</span>
            <span className="font-mono text-[9px] text-roamora-muted tracking-wider uppercase border-l border-roamora-border pl-2">
              SG
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/planner"
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-roamora-terracotta border border-roamora-border bg-roamora-card hover:bg-roamora-sand transition-colors flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Planner</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-roamora-card bg-roamora-green hover:bg-roamora-green-hover transition-colors flex items-center gap-1"
              aria-label="Open Expedition Menu"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
          </div>
        </header>

        {/* Floating bottom dock for easy thumb navigation */}
        <nav
          className="fixed bottom-3 left-4 right-4 bg-roamora-card/95 backdrop-blur-md border border-roamora-border shadow-drawer z-40 rounded-full px-4 py-2 flex items-center justify-between"
          aria-label="Mobile Expedition Dock"
        >
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-roamora-text hover:text-roamora-green px-2 py-1"
          >
            <Menu className="w-4 h-4 text-roamora-terracotta" />
            <span>Menu</span>
          </button>

          <div className="h-4 w-[1px] bg-roamora-border" />

          {isHomepage && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-roamora-muted">
              <span>Sec {currentSectionData.number}:</span>
              <span className="text-roamora-text font-bold truncate max-w-[100px]">
                {currentSectionData.label}
              </span>
            </div>
          )}

          {!isHomepage && (
            <Link
              href="/"
              className="text-[11px] font-mono text-roamora-muted hover:text-roamora-green"
            >
              ← Index
            </Link>
          )}

          <div className="h-4 w-[1px] bg-roamora-border" />

          <Link
            href="/planner"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-roamora-terracotta hover:text-roamora-text px-2 py-1 font-semibold"
          >
            <Compass className="w-4 h-4" />
            <span>Plan</span>
          </Link>
        </nav>
      </div>

      {/* Full-screen Editorial Menu Modal */}
      <EditorialMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
