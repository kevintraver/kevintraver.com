# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio site styled as a terminal window with a Tokyo Night color theme.

### Routing

The site uses Next.js App Router with route-based navigation that mimics terminal tabs:
- `/` → HomeTab
- `/projects` → ProjectsTab
- `/apps` → ApplicationsTab
- `/social` → SocialTab

Each route renders its corresponding tab component inside `TerminalShell`, which provides the persistent terminal chrome (title bar, tab bar, traffic lights).

### Key Components

- `src/components/terminal/TerminalShell.tsx` - Root layout wrapper with terminal chrome and tab navigation (uses Next.js `Link` for routing)
- `src/components/terminal/tabs/` - Tab content components, each with typing animation effect for command display

### Styling

- Tailwind CSS v4 with Tokyo Night color palette defined in `globals.css`
- Colors use `tn-*` prefix (e.g., `text-tn-blue`, `bg-tn-bg-dark`)
- JetBrains Mono font loaded via `next/font`

### Assets

- App icons stored in `public/icons/`
- Images use Next.js `Image` component
