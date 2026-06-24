import prisma from "@/lib/prisma"

export type ItemWithMeta = {
  id: string
  title: string
  description: string | null
  typeName: string
  isFavorite: boolean
  isPinned: boolean
  tags: string[]
  createdAt: string
}

export type ItemStats = {
  totalItems: number
  favoriteItems: number
}

export async function getItemStats(userEmail: string): Promise<ItemStats> {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count({ where: { user: { email: userEmail } } }),
    prisma.item.count({ where: { user: { email: userEmail }, isFavorite: true } }),
  ])
  return { totalItems, favoriteItems }
}

export async function getPinnedItems(userEmail: string): Promise<ItemWithMeta[]> {
  const items = await prisma.item.findMany({
    where: { user: { email: userEmail }, isPinned: true },
    include: {
      type: { select: { name: true } },
      tags: { include: { tag: { select: { name: true } } } },
    },
    orderBy: { updatedAt: "desc" },
  })
  return items.map(toItemWithMeta)
}

export async function getRecentItems(userEmail: string): Promise<ItemWithMeta[]> {
  const items = await prisma.item.findMany({
    where: { user: { email: userEmail } },
    include: {
      type: { select: { name: true } },
      tags: { include: { tag: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  })
  return items.map(toItemWithMeta)
}

function toItemWithMeta(item: {
  id: string
  title: string
  description: string | null
  isFavorite: boolean
  isPinned: boolean
  createdAt: Date
  type: { name: string }
  tags: { tag: { name: string } }[]
}): ItemWithMeta {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    typeName: item.type.name,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    tags: item.tags.map((t) => t.tag.name),
    createdAt: item.createdAt.toISOString(),
  }
}
