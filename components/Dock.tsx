'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/ai-lab', label: 'AI Lab' },
  { href: '/community', label: 'Community' },
  { href: '/speaking', label: 'Talks' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Bio' },
  { href: '/contact', label: 'Kontakt' },
];

export default function Dock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-8 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
      <nav className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl px-4 py-2 shadow-lg sm:px-8">
        <div className="flex justify-evenly items-center w-full gap-2 sm:gap-8 overflow-x-auto scrollbar-hide">
          {links.map((l) => {
            const active = pathname === l.href || (l.href === '/' && pathname === '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative group"
              >
                {active && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 bg-white/40 shadow-md rounded-2xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  className="relative px-3 py-2 rounded-2xl transition-all duration-300 hover:scale-110 sm:px-4 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span 
                    className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      active 
                        ? 'text-gray-900 font-semibold' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}
                  >
                    <span className="hidden sm:inline">{l.label}</span>
                    <span className="sm:hidden">{l.label.split(' ')[0]}</span>
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
