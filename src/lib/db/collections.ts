import prisma from "@/lib/prisma"

const TYPE_BORDER_COLORS: Record<string, string> = {
  snippet: "border-l-blue-500",
  prompt:  "border-l-purple-500",
  command: "border-l-green-500",
  note:    "border-l-yellow-500",
  file:    "border-l-slate-500",
  image:   "border-l-pink-500",
  link:    "border-l-orange-500",
}

export type CollectionWithMeta = {
  id: string
  name: string
  description: string | null
  isFavorite: boolean
  itemCount: number
  borderColor: string
  typeNames: string[]
}

export async function getRecentCollections(userEmail: string): Promise<CollectionWithMeta[]> {
  const collections = await prisma.collection.findMany({
    where: { user: { email: userEmail } },
    include: {
      items: {
        include: { type: { select: { name: true } } },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return collections.map((col) => {
    const typeCounts: Record<string, number> = {}
    for (const item of col.items) {
      const name = item.type.name.toLowerCase()
      typeCounts[name] = (typeCounts[name] ?? 0) + 1
    }

    let dominantType = ""
    let maxCount = 0
    for (const [name, count] of Object.entries(typeCounts)) {
      if (count > maxCount) {
        maxCount = count
        dominantType = name
      }
    }

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      borderColor: TYPE_BORDER_COLORS[dominantType] ?? "border-l-zinc-600",
      typeNames: Object.keys(typeCounts),
    }
  })
}
