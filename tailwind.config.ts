import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        am: {
          periwinkle: '#C9C9EB',
          razz: '#DF0F51',
          rose: '#FDECF6',
          apricot: '#FFA161',
          lilac: '#E185C8',
          ink: '#111827',
          bg: '#F8F9FB',
          white: '#FFFFFF',
        },
      },
      borderRadius: {
        'xl2': '1.25rem',
        'pill': '999px',
      },
      boxShadow: {
        glass: '0 1px 0 rgba(255,255,255,0.5) inset, 0 10px 30px rgba(17,24,39,0.08)',
      },
      backdropBlur: {
        glass: '20px',
      },
      fontFamily: {
        'public-sans': ['var(--font-public-sans)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
