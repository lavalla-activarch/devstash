# Current Feature

## Status

Completed — Dashboard Items

## Goals

Replace dummy item data in the dashboard main area (pinned and recent items) with real data from the Neon database via Prisma:

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in server component (no client-side fetching)
- Item card icon/border derived from the item type
- Display item type tags and anything else currently shown
- If there are no pinned items, nothing should display there
- Update collection stats display

## Notes

- Reference spec: `context/features/dashboard-items-spec.md`
- Reference screenshot: `context/screenshots/dashboard-ui-main.png`
- Replace mock data from `src/lib/mock-data.ts` in the pinned and recent items sections only
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
- **2026-06-24** — Completed Dashboard Items: created `src/lib/db/items.ts` (getItemStats, getPinnedItems, getRecentItems), replaced mock item data with real Neon DB data, updated ItemCard to use typeName, pinned section hidden when empty