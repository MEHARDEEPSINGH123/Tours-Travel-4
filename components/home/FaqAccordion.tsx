'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { FAQ } from '@/types/travel';

interface FaqAccordionProps {
  faqs: FAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-6 sm:px-12 lg:px-16 border-b border-roamora-border bg-roamora-bg">
      <div className="max-w-5xl mx-auto">
        <SectionLabel
          number="13"
          category="Practical Clarity"
          title="The Practical Details, Made Clear"
          subtitle="Honest answers regarding Roamora's prototype nature, SGD pricing methodology, visa boundaries, rain arrangements, and operational assumptions."
          alignment="center"
        />

        <div className="space-y-3 mt-8">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-roamora-card border border-roamora-border transition-colors hover:border-roamora-border-dark"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-roamora-green"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-roamora-terracotta font-semibold">
                      0{index + 1}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-roamora-text font-bold">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-roamora-muted flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-roamora-terracotta' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 border-t border-roamora-border/60 text-xs sm:text-sm font-sans text-roamora-text/80 leading-relaxed animate-fadeIn"
                  >
                    <p className="pl-8 sm:pl-9 border-l-2 border-roamora-green/40 py-1">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
