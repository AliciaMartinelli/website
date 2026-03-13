# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Alicia Martinelli — an AI researcher/engineer portfolio site. Content is primarily in German. Built as a statically exported Next.js site.

## Commands

- `npm run dev` — start dev server
- `npm run build` — static export build (outputs to `out/`)
- `npm run lint` — ESLint via `next lint`

No test framework is configured.

## Architecture

**Next.js 14 App Router** with static export (`output: 'export'` in next.config.js). Styled with **Tailwind CSS** using a custom `am-*` color palette (periwinkle, razz, rose, apricot, lilac, ink, bg, white). Fonts: Inter and Public Sans via `next/font/google`.

### Key directories

- `app/` — Pages using App Router. Each route has its own directory with a `page.tsx`. Routes: home, about, blog, ai-lab, agents, community, contact, open-source, speaking, stammtisch.
- `components/` — Shared UI components (Header, Dock, GlassCard, BentoGrid, etc.). Glass morphism is a central design pattern.
- `content/blog/` — MDX blog posts parsed with `gray-matter` for frontmatter. `template.mdx` is excluded from listings.
- `lib/` — Data and utilities:
  - `blog.ts` — reads MDX files from `content/blog/`, parses frontmatter, returns typed `BlogPost` objects
  - `experiments.ts` — hardcoded experiment data (AI lab entries)
  - `talks.ts` — hardcoded talk/speaking data with date utilities
- `types/` — TypeScript interfaces (`BlogPost`, `react-katex` declarations)
- `styles/` — `glass.css` for glass morphism effects, `globals.css` for base styles

### Blog system

Blog posts are MDX files in `content/blog/`. Frontmatter fields: title, excerpt, date, tags, thumbnail. Posts are rendered with KaTeX math support and syntax highlighting via `prism-react-renderer`. The slug is derived from the filename.

### Path aliases

`@/*` maps to the project root (configured in tsconfig.json).

### Static assets

`public/` contains favicons, SVG backgrounds, talk slide PDFs, and AI experiment images. AI lab experiment pages also store media directly in their `app/ai-lab/[experiment]/media/` directories.
