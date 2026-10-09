import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-roamora-card border border-roamora-border flex items-center justify-center text-roamora-terracotta">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-roamora-terracotta block">
          Error 404 · Off the Map
        </span>

        <h1 className="editorial-title text-4xl sm:text-5xl text-roamora-text">
          Enclave Not Charted
        </h1>

        <p className="font-sans text-sm text-roamora-muted leading-relaxed">
          The Singapore expedition route or record you requested does not exist in our editorial archive.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-roamora-green text-roamora-card font-mono text-xs uppercase tracking-widest hover:bg-roamora-green-hover transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Expedition Index</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
