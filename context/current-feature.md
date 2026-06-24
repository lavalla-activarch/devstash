# Current Feature

## Status

Completed — Prisma + Neon PostgreSQL Setup

## Goals

Set up Prisma ORM with Neon PostgreSQL database:

- Install and configure Prisma 7 (has breaking changes — read upgrade guide)
- Connect to Neon PostgreSQL (serverless)
- Create initial schema based on data models in `context/project-overview.md`
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Create initial migration via `prisma migrate dev`

## Notes

- Use Prisma 7 — read the full upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup reference: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- Always use `prisma migrate dev` for schema changes — never `db push`
- `DATABASE_URL` = development branch; production branch is separate
- Schema will evolve — this is the initial setup only

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-06-24** — Initial Next.js + Tailwind CSS v4 setup (`chore: initial next.js and tailwind setup`)
- **2026-06-24** — Started Dashboard UI Phase 1
- **2026-06-24** — Completed Dashboard UI Phase 1: ShadCN init, `/dashboard` route, dark mode, top bar with search + New Item button, sidebar and main placeholders
- **2026-06-24** — Completed Dashboard UI Phase 2: collapsible sidebar (icon-only collapsed state, mobile Sheet drawer), types nav with counts linking to `/items/TYPE`, favorite + recent collections, user avatar area with settings icon
- **2026-06-24** — Completed Dashboard UI Phase 3: main content area with 4 stats cards, collections grid, pinned items section, 10 recent items section using mock data
- **2026-06-24** — Completed Prisma + Neon PostgreSQL Setup: Prisma 7, pg driver adapter, full schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth models), initial migration applied to Neon dev branch