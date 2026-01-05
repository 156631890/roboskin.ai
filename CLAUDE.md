# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RoboSkin Website** - A modern Next.js application for RoboSkin.ai, a company developing advanced artificial skin technology for robotics.

**Tech Stack:**
- Next.js 16.1.1 with React 19.2.3
- TypeScript
- Tailwind CSS 4
- App Router architecture

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── applications/       # Applications page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy policy
│   ├── research/           # Research page
│   ├── technology/         # Technology page
│   ├── layout.tsx          # Root layout with Navigation & Footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── Navigation.tsx      # Site navigation
│   └── Footer.tsx          # Site footer
└── lib/                    # Utilities and data
    └── blog-data.ts        # Content data
```

### Key Patterns

**Path Aliases**: The project uses `@/*` as an alias for `./src/*` (configured in `tsconfig.json`)

**App Router**: Uses Next.js 13+ App Router pattern where:
- Each folder in `src/app/` becomes a route
- `page.tsx` files define route content
- `layout.tsx` files wrap child routes

**Component Structure**:
- Root layout (`src/app/layout.tsx`) includes Navigation and Footer components
- Uses Geist fonts (Geist Sans and Geist Mono) from `next/font/google`
- Tailwind CSS for all styling

**Page Content**: Pages use server components by default (no `'use client'` directive needed unless using client-side features like hooks)

### Styling Conventions

- Tailwind CSS utility classes for all styling
- Color scheme: Primary blue (`bg-blue-600`, `text-blue-600`)
- Responsive design with `sm:`, `md:`, `lg:` breakpoints
- Flexbox layouts for component structure
- Section-based page organization

## Development Notes

- No existing AI assistant rules (.cursorrules, .github/copilot-instructions.md)
- Standard Next.js create-next-app template foundation
- All components use TypeScript with proper type imports
- Icons use inline SVG components
