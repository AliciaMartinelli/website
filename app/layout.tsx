import './globals.css';
import '../styles/glass.css';
import 'katex/dist/katex.min.css';
import { Inter, Public_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Dock from '@/components/Dock';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' });

export const metadata = {
  title: 'Alicia Martinelli — AI Explorer & Engineer',
  description: 'Ich erforsche, wie AI die Art verändert, wie wir entwickeln, lernen und erschaffen.',
  icons: {
    icon: [
      { url: '/favicon-16.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon-32.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${publicSans.variable}`}>
      <body className="min-h-screen antialiased selection:bg-am-periwinkle/30">
        {/* SVG Filter for Glass Cards */}
        <svg width="0" height="0" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}>
          <defs>
            <filter id="liquid-glass-filter" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" x="0" y="0" width="300" height="200">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" xChannelSelector="R" yChannelSelector="G" scale="20" />
            </filter>
          </defs>
        </svg>
        
        <Header />
        <main className="pb-28">{children}</main>
        <Dock />
      </body>
    </html>
  );
}
