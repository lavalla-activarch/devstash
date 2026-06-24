# Current Feature

## Status

In progress — Dashboard UI Phase 3

## Goals

Build out the main content area of the dashboard using mock data:

- 4 stats cards (total items, collections, favorite items, favorite collections)
- Pinned Items section
- Recent Collections section
- 10 Recent Items section

## Notes

- Use `src/lib/mock-data.js` directly (no database yet)
- Reference `context/screenshots/dashboard-ui-main.png` for layout
- Stats cards are not in the screenshot — add them at the top

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-06-24** — Initial Next.js + Tailwind CSS v4 setup (`chore: initial next.js and tailwind setup`)
- **2026-06-24** — Started Dashboard UI Phase 1
- **2026-06-24** — Completed Dashboard UI Phase 1: ShadCN init, `/dashboard` route, dark mode, top bar with search + New Item button, sidebar and main placeholders
- **2026-06-24** — Completed Dashboard UI Phase 2: collapsible sidebar (icon-only collapsed state, mobile Sheet drawer), types nav with counts linking to `/items/TYPE`, favorite + recent collections, user avatar area with settings icon