import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const itemTypesData = [
  { id: "type_snippet", name: "Snippet", icon: "code", isSystem: true },
  { id: "type_prompt", name: "Prompt", icon: "sparkles", isSystem: true },
  { id: "type_command", name: "Command", icon: "terminal", isSystem: true },
  { id: "type_note", name: "Note", icon: "file-text", isSystem: true },
  { id: "type_file", name: "File", icon: "file", isSystem: true },
  { id: "type_image", name: "Image", icon: "image", isSystem: true },
  { id: "type_url", name: "URL", icon: "link", isSystem: true },
]

const collectionsData = [
  { id: "col_1", name: "React Patterns", description: "Common React patterns and hooks", isFavorite: true },
  { id: "col_2", name: "Python Snippets", description: "Useful Python code snippets", isFavorite: false },
  { id: "col_3", name: "Context Files", description: "AI context files for projects", isFavorite: false },
  { id: "col_4", name: "Interview Prep", description: "Technical interview preparation", isFavorite: true },
  { id: "col_5", name: "Git Commands", description: "Frequently used git commands", isFavorite: true },
  { id: "col_6", name: "AI Prompts", description: "Curated AI prompts for coding", isFavorite: false },
  { id: "col_7", name: "Python Snippets 2", description: "Useful Python code snippets", isFavorite: false },
  { id: "col_8", name: "Interview Prep 2", description: "Technical interview preparation", isFavorite: false },
  { id: "col_9", name: "AI Prompts 2", description: "Curated AI prompts for coding", isFavorite: false },
]

const itemsData = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch session
  }, [])

  return { user, loading }
}`,
    typeId: "type_snippet",
    collectionId: "col_1",
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    tags: ["react", "auth", "hooks"],
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText)
      return await res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
}`,
    typeId: "type_snippet",
    collectionId: "col_1",
    language: "javascript",
    isFavorite: false,
    isPinned: true,
    tags: ["api", "error-handling", "fetch"],
  },
  {
    id: "item_3",
    title: "Git Rebase Workflow",
    description: "Clean up commit history before merging",
    contentType: "text",
    content: "git rebase -i HEAD~3",
    typeId: "type_command",
    collectionId: "col_5",
    language: "bash",
    isFavorite: true,
    isPinned: false,
    tags: ["git", "workflow"],
  },
  {
    id: "item_4",
    title: "Explain Code Prompt",
    description: "Prompt template for explaining complex code",
    contentType: "text",
    content:
      "Explain the following code step by step. Focus on what it does, why it works, and any potential issues:\n\n```\n{{code}}\n```",
    typeId: "type_prompt",
    collectionId: "col_6",
    language: null,
    isFavorite: true,
    isPinned: false,
    tags: ["ai", "code-review"],
  },
  {
    id: "item_5",
    title: "Python List Comprehension",
    description: "Filter and transform lists efficiently",
    contentType: "text",
    content: "result = [x * 2 for x in items if x > 0]",
    typeId: "type_snippet",
    collectionId: "col_2",
    language: "python",
    isFavorite: false,
    isPinned: false,
    tags: ["python", "list"],
  },
  {
    id: "item_6",
    title: "Next.js Project Context",
    description: "System prompt context for a Next.js project",
    contentType: "text",
    content:
      "You are working on a Next.js 15 app using React 19, Tailwind CSS v4, and Prisma. The app uses server components by default...",
    typeId: "type_file",
    collectionId: "col_3",
    language: null,
    isFavorite: false,
    isPinned: false,
    tags: ["context", "nextjs", "ai"],
  },
]

async function main() {
  console.log("Seeding database...")

  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: { id: "user_1", name: "John Doe", email: "demo@devstash.io", isPro: false },
  })
  console.log(`  User: ${user.email}`)

  for (const itemType of itemTypesData) {
    await prisma.itemType.upsert({
      where: { id: itemType.id },
      update: {},
      create: { ...itemType, userId: null },
    })
  }
  console.log(`  Item types: ${itemTypesData.length}`)

  for (const col of collectionsData) {
    await prisma.collection.upsert({
      where: { id: col.id },
      update: {},
      create: { ...col, userId: user.id },
    })
  }
  console.log(`  Collections: ${collectionsData.length}`)

  const allTagNames = [...new Set(itemsData.flatMap((item) => item.tags))]
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

  for (const { tags, ...itemData } of itemsData) {
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
  console.log(`  Items: ${itemsData.length}`)

  console.log("Done!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
