# 🌹 Wedding Designer — Project Guide

> **Last Updated:** 2026-02-19  
> **Purpose:** Reference doc for AI agents and collaborators to understand the full project history, architecture, and upcoming work.

---

## 1. What This App Is

A **digital wedding invitation web app** — a mobile-first, phone-frame-styled React + Vite + TypeScript app. It simulates the experience a guest gets when they receive and open a wedding invitation.

**Current Screen Flow:**
```
WelcomeScreen → LoadingScreen → DashboardScreen
```

- **WelcomeScreen:** Shows couple's names, date, venue, and an "Open Invitation" button.
- **LoadingScreen:** Animated progress bar while the "invitation is being prepared."
- **DashboardScreen:** The actual invitation content — overview, timeline, banquet, guest list, gift registry, etc.

All content is driven by `data/dummy.jsonc`, parsed at runtime via `utils/jsonc.ts`.

---

## 2. Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Cloudflare Workers + D1 (SQLite) |
| Deployment | Cloudflare Pages via `wrangler.jsonc` |
| Data | `data/dummy.jsonc` (JSONC parsed at runtime) |
| Icons | Material Icons (via CDN in `index.html`) |
| Fonts | Google Fonts (script + serif) |

---

## 3. File Structure

```
/
├── App.tsx                    # Root app, screen state machine
├── index.tsx                  # Entry point
├── index.html                 # HTML shell, font/icon CDN links
├── types.ts                   # Shared TypeScript types (DummyData, etc.)
├── declarations.d.ts          # Module declarations (*.jsonc?raw)
├── vite.config.ts
├── tsconfig.json
├── wrangler.jsonc             # Cloudflare Workers config
├── PROJECT_GUIDE.md           # ← THIS FILE
│
├── data/
│   ├── dummy.jsonc            # All wedding content (names, venue, timeline, guests, etc.)
│   └── index.ts               # Parses JSONC and exports `data`
│
├── screens/
│   ├── WelcomeScreen.tsx
│   ├── LoadingScreen.tsx
│   └── DashboardScreen.tsx
│
├── components/
│   ├── Countdown.tsx          # Countdown timer component
│   └── TimelineItem.tsx       # Single timeline event card
│
├── services/
│   └── api.ts                 # Cloudflare D1 API calls (timeline events, etc.)
│
└── utils/
    └── jsonc.ts               # Strips comments from JSONC before JSON.parse
```

---

## 4. Key Data Shape (`data/dummy.jsonc`)

The `data` object (type: `DummyData` in `types.ts`) contains:

```
data.couple.fullNames.partner1 / .partner2
data.couple.initials
data.wedding.dateString
data.wedding.venue.name / .location
data.wedding.welcomeImage         ← URL for WelcomeScreen background
data.overview.*                   ← Countdown target date, overview cards
data.timeline[]                   ← Array of { time, title, location, icon }
data.guests.*                     ← totalInvited, rsvpReceived, confirmed, declined
data.banquet.*                    ← menu info
data.giftCards[]                  ← Array of gift registry items
```

---

## 5. 🆕 Design Selector System (Upcoming Feature)

### What It Is

The bride and groom will see a **Design Selector screen** when they first open the app. They must pick **one variant** for each of the three screens:

1. **Welcome Screen** — 15 variants
2. **Loading Screen** — 15 variants  
3. **Dashboard** — 15 variants

Only after selecting all 3 variants does the confirmation button activate. Pressing it saves the selection to `localStorage` and launches the invitation with the chosen designs.

On subsequent visits, the app skips the selector and goes directly to the invitation (using the saved selection).

### Why This Approach

- Same invitation content for all guests (`dummy.jsonc` doesn't change)
- Only the **visual presentation** changes between variants (colors, fonts, layout style)
- The bride and groom are the ones selecting — guests just see the final result
- `localStorage` is used initially (no login needed); can be upgraded to Cloudflare D1 later

### Planned Architecture

#### New Types (`types.ts`)
```ts
export interface DesignSelection {
  welcome: number;   // 1–15
  loading: number;   // 1–15
  dashboard: number; // 1–15
}
```

#### New Context (`context/DesignContext.tsx`)
```tsx
// Provides selection state across the app
// Reads/writes localStorage key: "weddingDesignSelection"
// Exposes: selection, setSelection, isComplete, clearSelection
```

#### New Data File (`data/designs.json`)
```json
{
  "welcome": [
    { "id": 1, "label": "Classic Ivory", "accent": "#c8a96e" },
    ...15 entries
  ],
  "loading": [...15 entries],
  "dashboard": [...15 entries]
}
```

#### Screen Variants
```
screens/
├── welcome/
│   ├── WelcomeV1.tsx    ← existing WelcomeScreen renamed/moved
│   ├── WelcomeV2.tsx
│   └── ... WelcomeV15.tsx
├── loading/
│   ├── LoadingV1.tsx
│   └── ... LoadingV15.tsx
└── dashboard/
    ├── DashboardV1.tsx
    └── ... DashboardV15.tsx
```

All variants share the same props interface as the current screens. Variant differences = visual only (CSS/class changes), not content.

#### Updated App Router (`App.tsx`)
```tsx
type ScreenState = 'selector' | 'welcome' | 'loading' | 'dashboard';

// On mount: check localStorage
//   → if selection exists: start at 'welcome'
//   → if not: start at 'selector'

// Dynamic variant selection:
const WelcomeVariants = [WelcomeV1, ..., WelcomeV15];
const ActiveWelcome = WelcomeVariants[selection.welcome - 1];
```

#### Selector UI (`screens/DesignSelectorScreen.tsx`)
- 3 sections, each with a horizontally scrollable grid of 15 `VariantCard` components
- Card shows: variant number, label, accent color swatch
- Selected card gets a gold ring + checkmark
- "Confirm & Launch" button is disabled until all 3 sections have a selection

#### Reusable Atom (`components/VariantCard.tsx`)
- Props: `id`, `label`, `accent`, `isSelected`, `onSelect`

---

## 6. Conversation History Summary

| Date | Topic |
|---|---|
| Feb 16 | Initial app setup, added Design Page to sidebar |
| Feb 16 | Consolidated dummy data into JSONC |
| Feb 16 | Set up Cloudflare Workers + D1 database |
| Feb 16 | Fixed timeline update bug (D1 API) |
| Feb 19 | Added countdown timer with date picker |
| Feb 19 | Updated dashboard with guest stats, timeline preview, banquet, gift cards |
| Feb 19 | Design page sections: "Choose Front Page / Loading / Dashboard Design" (options 1–10) |
| Feb 19 | Switched to JSONC format for dummy data |
| **Feb 19** | **🔴 Planned: Full Design Selector System (this guide)** |

---

## 7. Agent Instructions for Implementing the Design Selector

If you are an AI agent picking up this task, follow this order:

1. **Add `DesignSelection` to `types.ts`**
2. **Create `context/DesignContext.tsx`** (localStorage persistence)
3. **Create `data/designs.json`** (15 entries × 3 sections)
4. **Create variant screen files** — start with V1 (copy of existing), then V2–V15 as reskins
5. **Create `components/VariantCard.tsx`** atom
6. **Create `screens/DesignSelectorScreen.tsx`** using VariantCard
7. **Update `App.tsx`** — wrap in provider, add `'selector'` state, dynamic variant loading
8. **Test manually** in browser at `localhost:5173`

> **Strict rules from user:**
> - Max 500 lines per file — split if needed
> - No hardcoded data in UI files — all data in `/data/*.json`
> - Surgical edits only — never rewrite an entire file unnecessarily
> - Use Atomic Design for components (atoms in `/components/`)

---

## 8. Environment Setup

```bash
# Install dependencies
npm install

# Run local dev server (default port 5173)
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

`.env.local` contains Cloudflare credentials (not committed to git).
