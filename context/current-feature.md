# Current Feature

## Status

Completed — Stats & Sidebar

## Goals

Show real database data in the stats cards and sidebar:

- Display stats (total items, collections, item types, tags) from the database, keeping the current design/layout
- Display system item types in the sidebar with their icons, linking to `/items/[typename]`
- Add "View all collections" link under the collections list that goes to `/collections`
- Keep star icons for favorite collections; for recents, show a colored circle based on the most-used item type in that collection
- Add any needed database functions to `src/lib/db/items.ts`

## Notes

- Reference spec: `context/features/stats-sidebar-spec.md`
- Reference: `src/lib/db/collections.ts` for db function patterns
- `src/lib/db/items.ts` already exists — add new functions as needed

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
- **2026-06-24** — Completed Stats & Sidebar: added `getItemTypesWithCounts` to `items.ts`, added `dominantTypeName` to `CollectionWithMeta`, fetched sidebar data server-side in `dashboard/layout.tsx`, sidebar now shows real item types with counts, favorite collections with star icons, recent collections with colored circles by dominant type, and "View all collections" link
