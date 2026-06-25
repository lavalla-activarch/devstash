# Current Feature

## Status

Completed

## Goals

Fix quick-win issues surfaced by the code audit:

1. Add `DATABASE_URL` runtime guard in `src/lib/prisma.ts` (fail fast with a clear error instead of a confusing Prisma crash)
2. Wrap shared DB functions with React `cache()` to deduplicate identical queries in the same request — `getRecentCollections` fires twice per dashboard load
3. Add `select` to the `items` include in `getRecentCollections` so only `type.name` is fetched instead of full item rows (including large `content TEXT`)
4. Fix sidebar icon lookup mismatch — seed stores PascalCase icon names (`"Code"`, `"StickyNote"`) but `TYPE_ICONS` map in `sidebar.tsx` keys on lowercase kebab-case (`"code"`, `"file-text"`); every type falls back to the generic File icon
5. Remove `cursor-pointer` from `ItemCard` since there is no click handler yet

## Notes

- These are all isolated, low-risk changes — no new features, no schema changes, no auth required
- Do NOT rotate DB credentials as part of this feature (that is a manual Neon dashboard task for the user)
- Do NOT add `loading.tsx` or Suspense yet — that is a separate, larger task
- Do NOT centralize `TYPE_ICONS` maps yet — that is a refactor, not a quick win

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
- **2026-06-25** — Completed Pro Badge Sidebar: installed ShadCN Badge component, added subtle outline `PRO` badge to File and Image item type rows in the sidebar
