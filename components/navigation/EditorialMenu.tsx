'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Compass, Shield, BookOpen, MapPin } from 'lucide-react';

interface EditorialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuLinkItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  href: string;
  previewImage: string;
}

const MENU_ITEMS: MenuLinkItem[] = [
  {
    id: 'destinations',
    number: '01',
    title: 'Destinations',
    subtitle: '15 distinctive Singapore enclaves from Marina Bay to Pulau Ubin',
    href: '/destinations',
    previewImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'packages',
    number: '02',
    title: 'Curated Packages',
    subtitle: 'Considered small-group journeys with transparent SGD demo pricing',
    href: '/packages',
    previewImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'itineraries',
    number: '03',
    title: 'Itineraries',
    subtitle: 'Timelines with recommended paces, transit, and rain alternatives',
    href: '/itineraries',
    previewImage: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'planner',
    number: '04',
    title: 'Journey Planner',
    subtitle: 'Interactive budget calculator and personalized draft route builder',
    href: '/planner',
    previewImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'recommendations',
    number: '05',
    title: 'Local Recommendations',
    subtitle: 'Editorial advice on hawker culture, morning timing, and etiquette',
    href: '/recommendations',
    previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'visas',
    number: '06',
    title: 'Visa & Entry Guide',
    subtitle: 'Checklist steps, ICA official sources, and travel reminders',
    href: '/travel-info/visas',
    previewImage: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'policies',
    number: '07',
    title: 'Booking & Policies',
    subtitle: 'Sample cancellation tiers, change terms, and demonstration disclosures',
    href: '/travel-info/policies',
    previewImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'about',
    number: '08',
    title: 'About Roamora',
    subtitle: 'Editorial publication meets practical Singapore journey planning',
    href: '/about',
    previewImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
  },
];

export function EditorialMenu({ isOpen, onClose }: EditorialMenuProps) {
  const [activeItem, setActiveItem] = useState<MenuLinkItem>(MENU_ITEMS[0]);
  const [singaporeTime, setSingaporeTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setSingaporeTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-roamora-bg flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Editorial Index Navigation"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 sm:px-12 py-6 border-b border-roamora-border bg-roamora-bg sticky top-0 z-20">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-2xl sm:text-3xl tracking-tight text-roamora-green font-bold"
              >
                ROAMORA
              </Link>
              <span className="hidden sm:inline-block font-mono text-[11px] text-roamora-muted tracking-widest uppercase border-l border-roamora-border pl-6">
                SINGAPORE EXPEDITION INDEX
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end font-mono text-[11px] text-roamora-muted tracking-widest">
                <span>SINGAPORE (SGT UTC+8)</span>
                <span className="text-roamora-text font-bold">{singaporeTime || '12:00:00'}</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center gap-2 px-4 py-2 border border-roamora-border hover:bg-roamora-sand transition-colors font-mono text-xs uppercase tracking-wider text-roamora-text"
              >
                <X className="w-4 h-4 text-roamora-terracotta" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 sm:px-12 py-8 sm:py-12">
            {/* Links column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-roamora-terracotta uppercase tracking-widest block mb-4">
                  Index Directory
                </span>
                <nav className="divide-y divide-roamora-border/60">
                  {MENU_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveItem(item)}
                      className="group py-3 sm:py-4 transition-colors"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-baseline justify-between w-full group-hover:text-roamora-terracotta transition-colors"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span className="font-mono text-xs text-roamora-muted group-hover:text-roamora-terracotta">
                            {item.number}
                          </span>
                          <span className="editorial-title text-2xl sm:text-3xl md:text-4xl text-roamora-text group-hover:text-roamora-terracotta">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-roamora-border group-hover:text-roamora-terracotta group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </Link>
                      <p className="font-sans text-xs sm:text-sm text-roamora-muted mt-1 ml-8 sm:ml-12 max-w-md hidden sm:block">
                        {item.subtitle}
                      </p>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Quick links & disclaimer at bottom of links */}
              <div className="pt-8 border-t border-roamora-border/70 mt-8 flex flex-wrap gap-4 text-xs font-mono text-roamora-muted">
                <Link href="/planner" onClick={onClose} className="hover:text-roamora-green flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-roamora-terracotta" />
                  <span>Interactive Planner</span>
                </Link>
                <span className="text-roamora-border">·</span>
                <Link href="/travel-info/policies" onClick={onClose} className="hover:text-roamora-green flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-roamora-green" />
                  <span>Policies & Safety</span>
                </Link>
                <span className="text-roamora-border">·</span>
                <Link href="/travel-info/visas" onClick={onClose} className="hover:text-roamora-green flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-roamora-gold" />
                  <span>ICA Visa Checklist</span>
                </Link>
              </div>
            </div>

            {/* Visual editorial side pane (desktop) */}
            <div className="hidden lg:col-span-5 lg:flex flex-col justify-between pl-8 border-l border-roamora-border">
              <div className="space-y-4">
                <span className="font-mono text-[11px] text-roamora-muted uppercase tracking-widest block">
                  Curated Preview
                </span>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-roamora-border bg-roamora-sand">
                  <Image
                    key={activeItem.previewImage}
                    src={activeItem.previewImage}
                    alt={activeItem.title}
                    fill
                    sizes="400px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-roamora-text/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-roamora-card">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-roamora-gold">
                      Section {activeItem.number}
                    </span>
                    <h4 className="editorial-title text-xl leading-tight">
                      {activeItem.title}
                    </h4>
                  </div>
                </div>

                <div className="p-4 bg-roamora-card border border-roamora-border text-xs font-sans text-roamora-muted space-y-2">
                  <div className="flex items-center gap-2 text-roamora-text font-medium">
                    <MapPin className="w-3.5 h-3.5 text-roamora-terracotta" />
                    <span>Curated Singapore Experience</span>
                  </div>
                  <p className="leading-relaxed">
                    Roamora combines narrative travel writing with practical route guidance, transparent demo pricing, and verified Singapore immigration checkpoints links.
                  </p>
                </div>
              </div>

              {/* Status footer */}
              <div className="p-3 bg-roamora-sand border border-roamora-border text-[10px] font-mono text-roamora-muted leading-relaxed">
                STATUS: Populated demonstration platform. All prices in SGD are illustrative and subject to live supplier confirmation.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
