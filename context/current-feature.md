# Current Feature

## Status

Completed — Dashboard Collections

## Goals

Replace dummy collection data in the dashboard main area with real data from the Neon database via Prisma:

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in server component (no client-side fetching)
- Collection card border color derived from most-used content type in that collection
- Show small icons of all types present in that collection
- Keep the current design (reference: `context/screenshots/dashboard-ui-main.png`)
- Update collection stats display
- Do not add items underneath the cards yet

## Notes

- Reference spec: `context/features/dashboard-collections-spec.md`
- Replace mock data from `src/lib/mock-data.ts` in the collections grid section only
- Keep existing layout and card design intact

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-06-24** — Initial Next.js + Tailwind CSS v4 setup (`chore: initial next.js and tailwind setup`)
- **2026-06-24** — Completed Dashboard UI Phase 1: ShadCN init, `/dashboard` route, dark mode, top bar with search + New Item button, sidebar and main placeholders
- **2026-06-24** — Completed Dashboard UI Phase 2: collapsible sidebar (icon-only collapsed state, mobile Sheet drawer), types nav with counts linking to `/items/TYPE`, favorite + recent collections, user avatar area with settings icon
- **2026-06-24** — Completed Dashboard UI Phase 3: main content area with 4 stats cards, collections grid, pinned items section, 10 recent items section using mock data
- **2026-06-24** — Completed Prisma + Neon PostgreSQL Setup: Prisma 7, pg driver adapter, full schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth models), initial migration applied to Neon dev branch
- **2026-06-24** — Completed Seed Data: demo user (bcryptjs), 7 system item types, 5 collections with 18 items (snippets, prompts, commands, links), 35 tags applied to Neon dev branch
- **2026-06-24** — Completed Dashboard Collections: replaced mock collection data with real Neon DB data via Prisma, added colored left border (dominant type), type icon row per card, updated collection stats