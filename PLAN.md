# kevintraver.com - Personal Portfolio

## Concept

A personal portfolio site with a **live "hackertyper" effect** in the background - my actual dotfiles typing out continuously behind frosted glass content cards. It immediately signals "power user" and makes the site feel alive.

---

## Confirmed Stack

| Layer               | Tool                          |
| ------------------- | ----------------------------- |
| Framework           | Next.js (App Router)          |
| Styling             | Tailwind CSS                  |
| Syntax Highlighting | Shiki                         |
| Theme               | Tokyo Night                   |
| Dotfiles Source     | GitHub API (build-time fetch) |
| Hosting             | Vercel                        |

---

## Project Structure

```
kevintraver.com/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Home page (fetches dotfiles at build)
│   └── globals.css             # Tailwind + Tokyo Night variables
├── components/
│   ├── background/
│   │   ├── DotfilesBackground.tsx   # Container for terminal panes
│   │   ├── TerminalPane.tsx         # Single terminal window
│   │   └── TypingEngine.tsx         # Character-by-character renderer
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── RaycastGallery.tsx
│   │   ├── Projects.tsx
│   │   └── DotfilesExplorer.tsx
│   └── ui/
│       ├── Card.tsx                 # Frosted glass card
│       └── TerminalChrome.tsx       # Window title bar, traffic lights
├── lib/
│   ├── dotfiles/
│   │   ├── fetcher.ts          # GitHub raw content fetcher
│   │   ├── manifest.ts         # List of dotfiles to fetch
│   │   └── types.ts            # TypeScript interfaces
│   └── shiki/
│       └── tokenizer.ts        # Pre-tokenize at build time
├── hooks/
│   ├── useTypingAnimation.ts   # requestAnimationFrame loop
│   ├── useVisibilityPause.ts   # Pause when tab hidden
│   └── useReducedMotion.ts     # Accessibility
└── public/fonts/
    └── JetBrainsMono-*.woff2
```

---

## Core Architecture

### Dotfiles Pipeline (Build Time)

Fetch from `https://raw.githubusercontent.com/kevintraver/dotfiles/master/`:

| File                             | Language | Description                          |
| -------------------------------- | -------- | ------------------------------------ |
| `zsh/aliases/tools.zsh`          | Shell    | CLI tool shortcuts (43 lines)        |
| `zsh/aliases/git.zsh`            | Shell    | Git + AI commit aliases (28 lines)   |
| `zsh/aliases/filesystem.zsh`     | Shell    | eza-based ls commands (20 lines)     |
| `zsh/aliases/development.zsh`    | Shell    | Dev tool shortcuts (12 lines)        |
| `zsh/aliases/networking.zsh`     | Shell    | IP/proxy commands (12 lines)         |
| `yabai/scripts/focus_meeting.sh` | Shell    | Meeting window focus script (93 lines)|

Pre-tokenize with Shiki's `codeToTokens()` using `tokyo-night` theme:

```typescript
interface TokenizedDotfile {
  path: string
  filename: string
  language: string
  lines: { tokens: { content: string; color: string }[] }[]
}
```

### Typing Engine

- `requestAnimationFrame` for smooth 60fps animation
- Reveal characters progressively with pre-computed syntax colors
- Variable speed (~40 chars/sec with ±30% variability)
- Random micro-pauses for human feel
- Blinking block cursor

### Multi-Pane Layout

- 2-3 terminal panes in CSS Grid background
- Each pane types different file independently
- Staggered start times (0ms, 500ms, 1000ms)
- Cycle through file playlist when complete

### Performance Optimizations

- `will-change: transform` for GPU acceleration
- Pause on `visibilitychange` (tab hidden)
- Memoize completed lines
- Respect `prefers-reduced-motion`
- Mobile: single pane or static fallback

---

## Implementation Phases

### Phase 1: Project Setup

- [ ] Initialize Next.js with App Router, TypeScript, Tailwind
- [ ] Configure Tokyo Night color palette in `globals.css`
- [ ] Add JetBrains Mono font
- [ ] Create basic layout and page structure
- [ ] Deploy to Vercel (empty shell)

### Phase 2: Dotfiles Pipeline

- [ ] Create `lib/dotfiles/manifest.ts` with file list
- [ ] Implement `lib/dotfiles/fetcher.ts` (GitHub raw fetch)
- [ ] Implement `lib/shiki/tokenizer.ts` (Shiki tokenization)
- [ ] Fetch dotfiles in `app/page.tsx` at build time
- [ ] Verify tokenized output structure

### Phase 3: Single Pane Typing

- [ ] Create `TerminalChrome.tsx` (title bar, traffic lights)
- [ ] Create `TerminalPane.tsx` (container with chrome)
- [ ] Implement `useTypingAnimation.ts` hook
- [ ] Create `TypingEngine.tsx` (progressive char render)
- [ ] Add blinking cursor
- [ ] Implement `useVisibilityPause.ts`

### Phase 4: Multi-Pane Background

- [ ] Create `DotfilesBackground.tsx` container
- [ ] CSS Grid layout for 2-3 panes
- [ ] Staggered start times
- [ ] File cycling on completion
- [ ] Blur/dim overlay layer

### Phase 5: Content Sections

- [ ] Hero section (name, tagline, CTA)
- [ ] About section (brief intro)
- [ ] Raycast Extensions gallery
- [ ] Projects showcase
- [ ] Dotfiles Explorer (interactive viewer)
- [ ] Frosted glass Card component

### Phase 6: Visual Polish

- [ ] Scroll-based effects (slow/pause typing at key sections)
- [ ] Subtle CRT scan-line or noise texture (optional)
- [ ] Final visual tweaks

### Phase 7: Performance & Accessibility

- [ ] Mobile responsive (single pane / static fallback)
- [ ] `prefers-reduced-motion` support
- [ ] SEO meta tags, Open Graph
- [ ] Lighthouse audit

### Phase 8: Easter Eggs (Optional)

- [ ] Include funny comments from actual dotfiles
- [ ] Occasionally "type" a fake error and then "fix" it
- [ ] Vim-style mode indicator in corner (NORMAL / INSERT)
- [ ] Keyboard shortcut to pause/resume the effect

---

## Foreground Content Sections

| Section                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| **Hero**               | Name, tagline, subtle CTA                        |
| **About**              | Brief intro, AI + tooling focus                  |
| **Raycast Extensions** | Gallery of published extensions with icons/links |
| **Projects**           | Selected work with descriptions                  |
| **Dotfiles Explorer**  | Interactive viewer with annotations              |
| **Contact**            | Links, email, socials                            |

---

## Tokyo Night Color Palette

```css
:root {
  /* Backgrounds */
  --tn-bg: #1a1b26;
  --tn-bg-dark: #16161e;
  --tn-bg-highlight: #292e42;

  /* Foreground */
  --tn-fg: #a9b1d6;
  --tn-fg-dark: #565f89;

  /* Syntax */
  --tn-blue: #7aa2f7;
  --tn-cyan: #7dcfff;
  --tn-magenta: #bb9af7;
  --tn-green: #9ece6a;
  --tn-orange: #ff9e64;
  --tn-red: #f7768e;
  --tn-yellow: #e0af68;

  /* Terminal chrome */
  --tn-terminal-bg: rgba(26, 27, 38, 0.85);
  --tn-terminal-border: #292e42;
}
```

---

## Key Files to Create

| Priority | File                                           | Purpose                              |
| -------- | ---------------------------------------------- | ------------------------------------ |
| 1        | `lib/dotfiles/fetcher.ts`                      | GitHub fetch + Shiki tokenization    |
| 2        | `hooks/useTypingAnimation.ts`                  | Core rAF animation loop              |
| 3        | `components/background/TypingEngine.tsx`       | Progressive character renderer       |
| 4        | `components/background/DotfilesBackground.tsx` | Multi-pane orchestration             |
| 5        | `app/page.tsx`                                 | Build-time fetch, layout composition |

---

## Inspiration

- [Hackertyper](https://hackertyper.net) - the OG
- Matrix digital rain - ambient code aesthetic
- [Stripe's](https://stripe.com) animated code blocks
- Terminal emulator UIs (Warp, Hyper)
