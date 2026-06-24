export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "demo@devstash.io",
  isPro: false,
};

export const mockItemTypes = [
  { id: "type_snippet", name: "Snippet", icon: "code", isSystem: true },
  { id: "type_prompt", name: "Prompt", icon: "sparkles", isSystem: true },
  { id: "type_command", name: "Command", icon: "terminal", isSystem: true },
  { id: "type_note", name: "Note", icon: "file-text", isSystem: true },
  { id: "type_file", name: "File", icon: "file", isSystem: true },
  { id: "type_image", name: "Image", icon: "image", isSystem: true },
  { id: "type_url", name: "URL", icon: "link", isSystem: true },
];

export const mockCollections = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: false,
    itemCount: 5,
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: true,
    itemCount: 24,
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
  },
  {
    id: "col_7",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
  },
  {
    id: "col_8",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
  },
  {
    id: "col_9",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
  },
];

export const mockItems = [
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
    createdAt: "2026-01-15",
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
    createdAt: "2026-01-12",
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
    createdAt: "2026-01-10",
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
    createdAt: "2026-01-08",
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
    createdAt: "2026-01-05",
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
    createdAt: "2026-01-03",
  },
];

export const mockTypeCounts: Record<string, number> = {
  type_snippet: 24,
  type_prompt: 18,
  type_command: 15,
  type_note: 12,
  type_file: 5,
  type_image: 3,
  type_url: 8,
};
