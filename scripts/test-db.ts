import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Testing database connection...\n")

  const user = await prisma.user.findFirst({
    include: {
      _count: {
        select: { items: true, collections: true, tags: true },
      },
    },
  })
  console.log("User:", user?.email)
  console.log("  Items:", user?._count.items)
  console.log("  Collections:", user?._count.collections)
  console.log("  Tags:", user?._count.tags)

  const itemTypes = await prisma.itemType.findMany({ orderBy: { name: "asc" } })
  console.log(`\nItem types (${itemTypes.length}):`)
  for (const t of itemTypes) console.log(`  [${t.icon}] ${t.name}`)

  const collections = await prisma.collection.findMany({ orderBy: { name: "asc" } })
  console.log(`\nCollections (${collections.length}):`)
  for (const c of collections) console.log(`  ${c.isFavorite ? "★" : "·"} ${c.name}`)

  const items = await prisma.item.findMany({
    include: { type: true, collection: true, tags: { include: { tag: true } } },
    orderBy: { createdAt: "desc" },
  })
  console.log(`\nItems (${items.length}):`)
  for (const item of items) {
    const tagNames = item.tags.map((t) => t.tag.name).join(", ")
    console.log(`  ${item.isPinned ? "📌" : "·"} [${item.type.name}] ${item.title}`)
    console.log(`    Collection: ${item.collection?.name ?? "none"} | Tags: ${tagNames}`)
  }

  console.log("\nAll checks passed!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
