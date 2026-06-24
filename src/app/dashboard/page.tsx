import Link from "next/link";
import { Package, Layers, Heart, Bookmark, Pin } from "lucide-react";
import { mockItems, mockTypeCounts } from "@/lib/mock-data";
import { getRecentCollections } from "@/lib/db/collections";
import { StatCard } from "@/components/dashboard/stat-card";
import { CollectionCard } from "@/components/dashboard/collection-card";
import { ItemCard } from "@/components/dashboard/item-card";

const totalItems = Object.values(mockTypeCounts).reduce((a, b) => a + b, 0);
const favoriteItemsCount = mockItems.filter((i) => i.isFavorite).length;

const pinnedItems = mockItems.filter((i) => i.isPinned);
const recentItems = [...mockItems]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 10);

// TODO: replace with session user once auth is implemented
const DEMO_USER_EMAIL = "demo@devstash.io";

export default async function DashboardPage() {
  const collections = await getRecentCollections(DEMO_USER_EMAIL);
  const recentCollections = collections.slice(0, 6);
  const favoriteCollectionsCount = collections.filter((c) => c.isFavorite).length;

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Your developer knowledge hub
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Items" value={totalItems} />
        <StatCard icon={Layers} label="Collections" value={collections.length} />
        <StatCard icon={Heart} label="Favorite Items" value={favoriteItemsCount} />
        <StatCard icon={Bookmark} label="Fav Collections" value={favoriteCollectionsCount} />
      </div>

      {/* Collections */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Collections</h2>
          <Link
            href="/collections"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentCollections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>

      {/* Pinned */}
      {pinnedItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Pin className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Pinned</h2>
          </div>
          <div className="space-y-2">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Items */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Recent Items</h2>
          <Link
            href="/items"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
