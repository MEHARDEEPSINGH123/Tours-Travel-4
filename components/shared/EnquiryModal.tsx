'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, AlertCircle } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle?: string;
  itemType?: 'Package' | 'Itinerary' | 'Custom Journey';
  defaultDate?: string;
  defaultTravellers?: number;
}

export function EnquiryModal({
  isOpen,
  onClose,
  itemTitle = 'General Journey Enquiry',
  itemType = 'Package',
  defaultDate = '',
  defaultTravellers = 2,
}: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [travellers, setTravellers] = useState(defaultTravellers);
  const [preferredDate, setPreferredDate] = useState(defaultDate);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultDate) setPreferredDate(defaultDate);
    if (defaultTravellers) setTravellers(defaultTravellers);
  }, [defaultDate, defaultTravellers]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-roamora-text/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <div className="relative w-full max-w-lg bg-roamora-card border border-roamora-border p-6 sm:p-8 shadow-drawer">
        <button
          onClick={onClose}
          aria-label="Close enquiry modal"
          className="absolute top-5 right-5 p-2 text-roamora-muted hover:text-roamora-text hover:bg-roamora-sand transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-roamora-green-light flex items-center justify-center text-roamora-green">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-roamora-terracotta uppercase tracking-widest">
              Prototype Enquiry Dispatched
            </span>
            <h3 className="editorial-title text-2xl sm:text-3xl mt-2 mb-3 text-roamora-text">
              Thank You, {name}
            </h3>
            <p className="font-sans text-sm text-roamora-muted leading-relaxed max-w-md mx-auto mb-6">
              Your planning request for <strong>{itemTitle}</strong> has been received in this demonstration environment.
              In a commercial deployment, an expedition curator would verify actual supplier availability and written quotes.
            </p>
            <div className="p-3 bg-roamora-bg border border-roamora-border text-xs font-mono text-roamora-muted mb-6">
              DEMO NOTICE: No payment method was charged. No live hotel or tour reservation was created.
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-roamora-green text-roamora-card text-xs font-mono tracking-widest uppercase hover:bg-roamora-green-hover transition-colors"
            >
              Return to Discovery
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="font-mono text-xs text-roamora-terracotta uppercase tracking-widest">
                Curated Planning Request
              </span>
              <h3 id="enquiry-title" className="editorial-title text-2xl sm:text-3xl text-roamora-text mt-1">
                Enquire: {itemTitle}
              </h3>
              <p className="font-sans text-xs text-roamora-muted mt-1">
                {itemType} consultation · Transparent indicative SGD guidance
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-roamora-terracotta-light border border-roamora-terracotta/30 flex items-center gap-2 text-xs font-sans text-roamora-terracotta">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Clara Tan"
                    className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-sm text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clara@example.com"
                    className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-sm text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-1">
                    Traveller Count
                  </label>
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-sm text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'traveller' : 'travellers'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-sm text-roamora-text focus:outline-none focus:border-roamora-green font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-roamora-muted uppercase tracking-wider mb-1">
                  Specific Requests, Accessibility or Dietary Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about mobility preferences, dietary needs, or pace adjustments..."
                  className="w-full px-3 py-2 bg-roamora-bg border border-roamora-border text-sm text-roamora-text focus:outline-none focus:border-roamora-green font-sans resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-roamora-green text-roamora-card font-mono text-xs tracking-widest uppercase hover:bg-roamora-green-hover transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Planning Enquiry
                </button>
              </div>

              <p className="font-mono text-[10px] text-roamora-muted text-center leading-tight">
                Illustrative demonstration form. No commercial contract or payment is established.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
