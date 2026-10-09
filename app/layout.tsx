import type { Metadata } from 'next';
import { DM_Serif_Display, Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import { ExpeditionIndex } from '@/components/navigation/ExpeditionIndex';
import { Footer } from '@/components/shared/Footer';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ROAMORA SINGAPORE — Premium Travel Discovery & Journey Planner',
  description:
    'An immersive travel publication combined with practical journey planning. Discover 15 Singapore enclaves, curated packages, sequential itineraries, and transparent SGD budgeting.',
  keywords: [
    'Singapore travel',
    'Marina Bay',
    'Pulau Ubin',
    'Singapore itineraries',
    'Singapore food tour',
    'Roamora Singapore',
  ],
  authors: [{ name: 'Roamora Singapore Editorial' }],
  openGraph: {
    title: 'ROAMORA SINGAPORE — The Expedition Index',
    description:
      'Small discoveries. Thoughtful routes. More room to travel your way in Singapore.',
    type: 'website',
    locale: 'en_SG',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-SG"
      className={`${dmSerifDisplay.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body className="bg-roamora-bg text-roamora-text antialiased selection:bg-roamora-green selection:text-roamora-card min-h-screen flex flex-col">
        {/* Flagship Navigation: The Expedition Index */}
        <ExpeditionIndex />

        {/* Main Content Area - offset for desktop left rail */}
        <div className="lg:pl-[72px] flex-1 flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
