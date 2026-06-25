import {
  Code2,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link2,
  Star,
  Pin,
} from "lucide-react";

const TYPE_CONFIG: Record<string, { Icon: React.ElementType; color: string }> =
  {
    snippet: { Icon: Code2, color: "bg-blue-500" },
    prompt: { Icon: Sparkles, color: "bg-purple-500" },
    command: { Icon: Terminal, color: "bg-green-500" },
    note: { Icon: FileText, color: "bg-yellow-500" },
    file: { Icon: File, color: "bg-slate-500" },
    image: { Icon: Image, color: "bg-pink-500" },
    link: { Icon: Link2, color: "bg-orange-500" },
  };

interface Item {
  id: string;
  title: string;
  description?: string | null;
  typeName: string;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
  createdAt: string;
}

export function ItemCard({ item }: { item: Item }) {
  const { Icon, color } = TYPE_CONFIG[item.typeName] ?? TYPE_CONFIG.file;

  const date = new Date(item.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 hover:bg-accent/30 transition-colors">
      <div className={`${color} rounded-md p-2 shrink-0 mt-0.5`}>
        <Icon className="h-4 w-4 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-medium text-sm truncate">{item.title}</h3>
            {item.isFavorite && (
              <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
            )}
            {item.isPinned && (
              <Pin className="h-3.5 w-3.5 shrink-0 fill-muted-foreground text-muted-foreground" />
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{date}</span>
        </div>

        {item.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {item.description}
          </p>
        )}

        {item.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
