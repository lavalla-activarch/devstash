import Link from "next/link";
import { Star, MoreHorizontal } from "lucide-react";

interface Collection {
  id: string;
  name: string;
  description?: string | null;
  isFavorite: boolean;
  itemCount: number;
}

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="block rounded-lg border border-border bg-card p-4 hover:bg-accent/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-medium text-sm leading-snug">{collection.name}</h3>
        <div className="flex items-center gap-1 shrink-0">
          {collection.isFavorite && (
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          )}
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        {collection.itemCount} items
      </p>
      {collection.description && (
        <p className="text-xs text-muted-foreground/70 line-clamp-2">
          {collection.description}
        </p>
      )}
    </Link>
  );
}
