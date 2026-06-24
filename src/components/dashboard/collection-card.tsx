import Link from "next/link";
import { Star, MoreHorizontal, Code2, Sparkles, Terminal, FileText, File, Image, Link2 } from "lucide-react";
import type { ElementType } from "react";

const TYPE_ICONS: Record<string, ElementType> = {
  snippet: Code2,
  prompt:  Sparkles,
  command: Terminal,
  note:    FileText,
  file:    File,
  image:   Image,
  link:    Link2,
};

const TYPE_ICON_COLORS: Record<string, string> = {
  snippet: "text-blue-500",
  prompt:  "text-purple-500",
  command: "text-green-500",
  note:    "text-yellow-500",
  file:    "text-slate-500",
  image:   "text-pink-500",
  link:    "text-orange-500",
};

interface Collection {
  id: string;
  name: string;
  description?: string | null;
  isFavorite: boolean;
  itemCount: number;
  borderColor?: string;
  typeNames?: string[];
}

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className={`block rounded-lg border border-border border-l-4 ${collection.borderColor ?? "border-l-zinc-600"} bg-card p-4 hover:bg-accent/30 transition-colors`}
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
        {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
      </p>
      {collection.description && (
        <p className="text-xs text-muted-foreground/70 line-clamp-2">
          {collection.description}
        </p>
      )}
      {collection.typeNames && collection.typeNames.length > 0 && (
        <div className="flex gap-1.5 mt-3">
          {collection.typeNames.map((typeName) => {
            const Icon = TYPE_ICONS[typeName];
            const color = TYPE_ICON_COLORS[typeName] ?? "text-muted-foreground";
            if (!Icon) return null;
            return <Icon key={typeName} className={`h-3.5 w-3.5 ${color}`} />;
          })}
        </div>
      )}
    </Link>
  );
}
