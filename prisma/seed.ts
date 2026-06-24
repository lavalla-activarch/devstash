import "dotenv/config"
import bcrypt from "bcryptjs"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // ── User ──────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("12345678", 12)
  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      id: "user_demo",
      name: "Demo User",
      email: "demo@devstash.io",
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  })
  console.log(`  User: ${user.email}`)

  // ── Item Types ────────────────────────────────────────────────────────────
  const itemTypes = [
    { id: "type_snippet", name: "snippet", icon: "Code",       color: "#3b82f6", isSystem: true },
    { id: "type_prompt",  name: "prompt",  icon: "Sparkles",   color: "#8b5cf6", isSystem: true },
    { id: "type_command", name: "command", icon: "Terminal",   color: "#f97316", isSystem: true },
    { id: "type_note",    name: "note",    icon: "StickyNote", color: "#fde047", isSystem: true },
    { id: "type_file",    name: "file",    icon: "File",       color: "#6b7280", isSystem: true },
    { id: "type_image",   name: "image",   icon: "Image",      color: "#ec4899", isSystem: true },
    { id: "type_link",    name: "link",    icon: "Link",       color: "#10b981", isSystem: true },
  ]

  for (const itemType of itemTypes) {
    await prisma.itemType.upsert({
      where: { id: itemType.id },
      update: {},
      create: { ...itemType, userId: null },
    })
  }
  console.log(`  Item types: ${itemTypes.length}`)

  // ── Collections ───────────────────────────────────────────────────────────
  const collections = [
    { id: "col_react",    name: "React Patterns",    description: "Reusable React patterns and hooks",              isFavorite: true  },
    { id: "col_ai",       name: "AI Workflows",       description: "AI prompts and workflow automations",            isFavorite: false },
    { id: "col_devops",   name: "DevOps",             description: "Infrastructure and deployment resources",        isFavorite: false },
    { id: "col_terminal", name: "Terminal Commands",  description: "Useful shell commands for everyday development", isFavorite: true  },
    { id: "col_design",   name: "Design Resources",   description: "UI/UX resources and references",                isFavorite: false },
  ]

  for (const col of collections) {
    await prisma.collection.upsert({
      where: { id: col.id },
      update: {},
      create: { ...col, userId: user.id },
    })
  }
  console.log(`  Collections: ${collections.length}`)

  // ── Items ─────────────────────────────────────────────────────────────────
  const items = [
    // React Patterns — 3 snippets
    {
      id: "item_react_1",
      title: "Custom React Hooks",
      description: "useDebounce, useLocalStorage, and other reusable hooks",
      contentType: "text",
      content: `import { useState, useEffect, useRef } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue] as const
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}`,
      typeId: "type_snippet",
      collectionId: "col_react",
      language: "typescript",
      isFavorite: true,
      isPinned: true,
      url: null as string | null,
      tags: ["react", "hooks", "typescript"],
    },
    {
      id: "item_react_2",
      title: "React Component Patterns",
      description: "Context providers and compound components",
      contentType: "text",
      content: `import { createContext, useContext, useState, type ReactNode } from 'react'

// Context Provider Pattern
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

// Compound Component Pattern
interface TabsProps { children: ReactNode; defaultTab: string }
interface TabProps { id: string; children: ReactNode }

export function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  return <div data-active={activeTab} onClick={e => {
    const tab = (e.target as HTMLElement).closest('[data-tab]')?.getAttribute('data-tab')
    if (tab) setActiveTab(tab)
  }}>{children}</div>
}

Tabs.Tab = function Tab({ id, children }: TabProps) {
  return <div data-tab={id}>{children}</div>
}`,
      typeId: "type_snippet",
      collectionId: "col_react",
      language: "typescript",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["react", "patterns", "context", "typescript"],
    },
    {
      id: "item_react_3",
      title: "React Utility Functions",
      description: "cn, formatDate, truncate, and groupBy helpers",
      contentType: "text",
      content: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    ...options,
  }).format(new Date(date))
}

export function truncate(str: string, maxLength: number): string {
  return str.length <= maxLength ? str : str.slice(0, maxLength - 3) + '...'
}

export function groupBy<T, K extends string>(
  items: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const group = key(item)
      if (!acc[group]) acc[group] = []
      acc[group].push(item)
      return acc
    },
    {} as Record<K, T[]>
  )
}`,
      typeId: "type_snippet",
      collectionId: "col_react",
      language: "typescript",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["react", "utilities", "typescript", "tailwind"],
    },

    // AI Workflows — 3 prompts
    {
      id: "item_ai_1",
      title: "Code Review Prompt",
      description: "Thorough code review covering bugs, security, and performance",
      contentType: "text",
      content: `Review the following code and provide structured feedback:

**Bugs & Logic Errors**
- Identify bugs, edge cases, and incorrect logic
- Point out potential runtime errors or unhandled exceptions

**Security**
- Flag vulnerabilities (injection, XSS, auth issues, unsafe data handling)
- Highlight missing input validation

**Performance**
- Identify unnecessary re-renders, N+1 queries, or inefficient algorithms
- Suggest meaningful optimizations

**Code Quality**
- Note violations of DRY, SRP, or readability concerns
- Suggest better naming, structure, or patterns

Format each finding as:
\`[SEVERITY: high|medium|low] Description — Suggested fix\`

Code to review:
\`\`\`
{{code}}
\`\`\``,
      typeId: "type_prompt",
      collectionId: "col_ai",
      language: null as string | null,
      isFavorite: true,
      isPinned: true,
      url: null as string | null,
      tags: ["ai", "code-review", "prompt"],
    },
    {
      id: "item_ai_2",
      title: "Documentation Generation Prompt",
      description: "Generate clear, concise docs for functions and modules",
      contentType: "text",
      content: `Generate documentation for the following code. Include:

1. **Summary** — One sentence describing what it does
2. **Parameters** — Name, type, and description for each param
3. **Returns** — Type and description of return value
4. **Example** — A short usage example
5. **Notes** — Caveats, side effects, or requirements

Keep it concise and developer-friendly. Use TypeScript types where applicable.

Code:
\`\`\`
{{code}}
\`\`\``,
      typeId: "type_prompt",
      collectionId: "col_ai",
      language: null as string | null,
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["ai", "documentation", "prompt"],
    },
    {
      id: "item_ai_3",
      title: "Refactoring Assistant Prompt",
      description: "Improve readability, reduce duplication, and apply better patterns",
      contentType: "text",
      content: `Refactor the following code to improve its quality:

Goals:
- Improve readability and naming
- Remove duplication (DRY)
- Simplify complex logic where possible
- Apply appropriate design patterns

Constraints:
- Do NOT add new features
- Do NOT change function signatures unless clearly broken
- Maintain the exact same external behavior
- Preserve comments that explain non-obvious behavior

After refactoring, briefly explain the key changes and why.

Code to refactor:
\`\`\`
{{code}}
\`\`\``,
      typeId: "type_prompt",
      collectionId: "col_ai",
      language: null as string | null,
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["ai", "refactoring", "prompt"],
    },

    // DevOps — 1 snippet + 1 command + 2 links
    {
      id: "item_devops_1",
      title: "Dockerfile — Node.js Multi-stage Build",
      description: "Production-ready multi-stage Dockerfile for Node.js apps",
      contentType: "text",
      content: `# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
      typeId: "type_snippet",
      collectionId: "col_devops",
      language: "dockerfile",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["docker", "nodejs", "deployment"],
    },
    {
      id: "item_devops_2",
      title: "Deploy to Production",
      description: "Build, push Docker image, run migrations, and deploy",
      contentType: "text",
      content: `#!/bin/bash
set -e

IMAGE="ghcr.io/$GITHUB_REPOSITORY:$GITHUB_SHA"

echo "Building image..."
docker build -t "$IMAGE" .

echo "Pushing image..."
docker push "$IMAGE"

echo "Running migrations..."
docker run --rm --env-file .env.production "$IMAGE" npx prisma migrate deploy

echo "Deploying..."
docker service update --image "$IMAGE" app_web

echo "Deployment complete!"`,
      typeId: "type_command",
      collectionId: "col_devops",
      language: "bash",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["docker", "deployment", "bash", "ci-cd"],
    },
    {
      id: "item_devops_3",
      title: "Docker Documentation",
      description: "Official Docker docs — Dockerfiles, CLI reference, and Compose",
      contentType: "text",
      content: null,
      url: "https://docs.docker.com",
      typeId: "type_link",
      collectionId: "col_devops",
      language: null as string | null,
      isFavorite: false,
      isPinned: false,
      tags: ["docker", "docs"],
    },
    {
      id: "item_devops_4",
      title: "GitHub Actions Documentation",
      description: "Official GitHub Actions docs — workflows, triggers, and reusable actions",
      contentType: "text",
      content: null,
      url: "https://docs.github.com/en/actions",
      typeId: "type_link",
      collectionId: "col_devops",
      language: null as string | null,
      isFavorite: false,
      isPinned: false,
      tags: ["github-actions", "ci-cd", "docs"],
    },

    // Terminal Commands — 4 commands
    {
      id: "item_cmd_1",
      title: "Git Cleanup & Rebase",
      description: "Delete merged branches, squash commits, rebase on main",
      contentType: "text",
      content: `# Delete merged local branches
git branch --merged main | grep -v 'main' | xargs git branch -d

# Interactive rebase — squash last 3 commits
git rebase -i HEAD~3

# Rebase current branch onto latest main
git fetch origin && git rebase origin/main

# Undo last commit but keep changes staged
git reset --soft HEAD~1`,
      typeId: "type_command",
      collectionId: "col_terminal",
      language: "bash",
      isFavorite: true,
      isPinned: false,
      url: null as string | null,
      tags: ["git", "terminal", "workflow"],
    },
    {
      id: "item_cmd_2",
      title: "Docker Container Management",
      description: "Stop, remove, inspect, and shell into containers",
      contentType: "text",
      content: `# Stop and remove all containers
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# Remove all unused images, containers, networks
docker system prune -af

# Follow logs for a running container
docker logs -f <container_name>

# Open a shell in a running container
docker exec -it <container_name> sh

# List images sorted by size
docker images --format "table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}" | sort -k3 -h`,
      typeId: "type_command",
      collectionId: "col_terminal",
      language: "bash",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["docker", "terminal", "containers"],
    },
    {
      id: "item_cmd_3",
      title: "Process Management",
      description: "Find and kill processes by port or name",
      contentType: "text",
      content: `# Find process using a port (macOS/Linux)
lsof -i :3000

# Kill process on a specific port
kill -9 $(lsof -t -i:3000)

# Top processes by CPU usage
ps aux --sort=-%cpu | head -10

# Find and kill a process by name
pkill -f "node server.js"

# Monitor real-time process usage
htop`,
      typeId: "type_command",
      collectionId: "col_terminal",
      language: "bash",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["processes", "terminal", "debugging"],
    },
    {
      id: "item_cmd_4",
      title: "Package Manager Utilities",
      description: "npm shortcuts for auditing, updating, and cleaning dependencies",
      contentType: "text",
      content: `# List outdated packages
npm outdated

# Update all dependencies (respects semver ranges)
npm update

# Audit for security vulnerabilities
npm audit

# Remove extraneous packages from node_modules
npm prune

# Run a package without installing it globally
npx create-next-app@latest my-app

# List globally installed packages
npm list -g --depth=0

# Clear the npm cache
npm cache clean --force`,
      typeId: "type_command",
      collectionId: "col_terminal",
      language: "bash",
      isFavorite: false,
      isPinned: false,
      url: null as string | null,
      tags: ["npm", "terminal", "dependencies"],
    },

    // Design Resources — 4 links
    {
      id: "item_design_1",
      title: "Tailwind CSS Docs",
      description: "Official Tailwind CSS documentation — utilities, configuration, plugins",
      contentType: "text",
      content: null,
      url: "https://tailwindcss.com/docs",
      typeId: "type_link",
      collectionId: "col_design",
      language: null as string | null,
      isFavorite: true,
      isPinned: true,
      tags: ["tailwind", "css", "docs"],
    },
    {
      id: "item_design_2",
      title: "shadcn/ui",
      description: "Beautifully designed components built with Radix UI and Tailwind CSS",
      contentType: "text",
      content: null,
      url: "https://ui.shadcn.com",
      typeId: "type_link",
      collectionId: "col_design",
      language: null as string | null,
      isFavorite: true,
      isPinned: false,
      tags: ["shadcn", "components", "ui"],
    },
    {
      id: "item_design_3",
      title: "Radix UI Primitives",
      description: "Unstyled, accessible component primitives for design systems",
      contentType: "text",
      content: null,
      url: "https://www.radix-ui.com",
      typeId: "type_link",
      collectionId: "col_design",
      language: null as string | null,
      isFavorite: false,
      isPinned: false,
      tags: ["radix", "components", "accessibility"],
    },
    {
      id: "item_design_4",
      title: "Lucide Icons",
      description: "Beautiful & consistent open-source icon library for React",
      contentType: "text",
      content: null,
      url: "https://lucide.dev",
      typeId: "type_link",
      collectionId: "col_design",
      language: null as string | null,
      isFavorite: false,
      isPinned: false,
      tags: ["icons", "lucide", "ui"],
    },
  ]

  // ── Tags ──────────────────────────────────────────────────────────────────
  const allTagNames = [...new Set(items.flatMap(item => item.tags))]
  const tagMap = new Map<string, string>()
  for (const name of allTagNames) {
    const tag = await prisma.tag.upsert({
      where: { userId_name: { userId: user.id, name } },
      update: {},
      create: { name, userId: user.id },
    })
    tagMap.set(name, tag.id)
  }
  console.log(`  Tags: ${allTagNames.length}`)

  // ── Items + ItemTags ──────────────────────────────────────────────────────
  for (const { tags, ...itemData } of items) {
    const item = await prisma.item.upsert({
      where: { id: itemData.id },
      update: {},
      create: { ...itemData, userId: user.id },
    })
    for (const tagName of tags) {
      await prisma.itemTag.upsert({
        where: { itemId_tagId: { itemId: item.id, tagId: tagMap.get(tagName)! } },
        update: {},
        create: { itemId: item.id, tagId: tagMap.get(tagName)! },
      })
    }
  }
  console.log(`  Items: ${items.length}`)

  console.log("Done!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
