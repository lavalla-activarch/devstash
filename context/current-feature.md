# Current Feature

## Status

<!-- Not Started | In Progress | Completed -->

## Goals

<!-- What success looks like -->

## Notes

<!-- Additional context, constraints, or details from spec -->

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
- **2026-06-25** — Completed Code Audit Quick Wins: `DATABASE_URL` runtime guard, all DB functions wrapped with `cache()`, `getRecentCollections` items include switched to `select`, sidebar icon lookup fixed (type name key + correct colors), PRO badge check lowercased, `cursor-pointer` removed from `ItemCard`
