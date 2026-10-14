# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Architecture

A single-page Next.js 16 personal site for a general audience: a short intro and a "Get in touch" mailto button. Keep it simple.

- `src/app/page.tsx` - The entire page
- `src/app/layout.tsx` - Root layout, metadata, Geist font via `next/font`
- `src/app/globals.css` - Tailwind CSS v4 import and base colors

Deployed on Vercel; pushing to `main` triggers a rebuild.
