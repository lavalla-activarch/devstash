# CLAUDE.md

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Neon MCP

- **Project**: Devstash (`twilight-unit-69188610`)
- **Default branch**: development (`br-tiny-haze-ahnqzzzc`)
- ALWAYS use the development branch for all Neon MCP operations
- NEVER query or modify the production branch (`br-super-grass-ah5315v6`) unless the user explicitly says "production"
- When running SQL, always pass both `projectId` and `branchId` explicitly

## Commands

```bash
npm run dev       # Start dev server (Turbopack, outputs to .next/dev)
npm run build     # Production build (Turbopack by default)
npm run start     # Start production server
npm run lint      # Run ESLint (next build no longer lints automatically)
```