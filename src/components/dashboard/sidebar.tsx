"use client";

import Link from "next/link";
import {
  Code2,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link2,
  Star,
  Settings,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { ItemTypeWithCount } from "@/lib/db/items";
import type { CollectionWithMeta } from "@/lib/db/collections";

const TYPE_ICONS: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  "file-text": FileText,
  file: File,
  image: Image,
  link: Link2,
};

const TYPE_CIRCLE_COLORS: Record<string, string> = {
  snippet: "bg-blue-500",
  prompt: "bg-purple-500",
  command: "bg-green-500",
  note: "bg-yellow-500",
  file: "bg-slate-500",
  image: "bg-pink-500",
  url: "bg-orange-500",
};

interface SidebarContentProps {
  collapsed: boolean;
  itemTypes: ItemTypeWithCount[];
  collections: CollectionWithMeta[];
}

export function SidebarContent({ collapsed, itemTypes, collections }: SidebarContentProps) {
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections.filter((c) => !c.isFavorite).slice(0, 3);

  const userInitials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2.5 h-14 border-b border-sidebar-border shrink-0",
          collapsed ? "px-3 justify-center" : "px-4"
        )}
      >
        <div className="w-7 h-7 rounded bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm shrink-0">
          S
        </div>
        {!collapsed && (
          <span className="font-semibold text-base">DevStash</span>
        )}
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto py-3 space-y-5">
        {/* Types */}
        <div className="px-2">
          {!collapsed && (
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Types
              </span>
            </div>
          )}
          <nav className="space-y-0.5">
            {itemTypes.map((type) => {
              const Icon = TYPE_ICONS[type.icon ?? ""] ?? File;
              const href = `/items/${type.name.toLowerCase()}s`;

              return collapsed ? (
                <Tooltip key={type.id}>
                  <TooltipTrigger
                    render={<Link href={href} />}
                    className="w-full flex items-center justify-center rounded-md p-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {type.name} ({type.count})
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={type.id}
                  href={href}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground" />
                  <span className="flex-1">{type.name}</span>
                  {(type.name === "File" || type.name === "Image") && (
                    <Badge variant="outline" className="h-4 px-1 text-[10px] font-semibold text-muted-foreground border-muted-foreground/30">
                      PRO
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{type.count}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Collections — hidden in collapsed mode */}
        {!collapsed && (
          <div className="px-2">
            <button
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center justify-between w-full px-2 mb-1 hover:text-foreground transition-colors"
            >
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Collections
              </span>
              {collectionsOpen ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
            </button>

            {collectionsOpen && (
              <div className="space-y-3">
                {/* Favorites */}
                {favoriteCollections.length > 0 && (
                  <div>
                    <p className="px-2 mb-0.5 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                      Favorites
                    </p>
                    {favoriteCollections.map((col) => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.id}`}
                        className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      >
                        <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
                        <span className="flex-1 truncate">{col.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {col.itemCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Recents */}
                {recentCollections.length > 0 && (
                  <div>
                    <p className="px-2 mb-0.5 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                      Recent
                    </p>
                    {recentCollections.map((col) => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.id}`}
                        className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      >
                        <span
                          className={cn(
                            "w-2.5 h-2.5 rounded-full shrink-0",
                            TYPE_CIRCLE_COLORS[col.dominantTypeName] ?? "bg-zinc-500"
                          )}
                        />
                        <span className="flex-1 truncate">{col.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {col.itemCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* View all link */}
                <Link
                  href="/collections"
                  className="flex items-center px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all collections
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User avatar area */}
      <div className="border-t border-sidebar-border p-3 shrink-0">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger className="flex justify-center w-full">
              <Avatar className="h-7 w-7 cursor-pointer">
                <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              {mockUser.name}
              <br />
              {mockUser.email}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">
                {mockUser.name}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {mockUser.email}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
