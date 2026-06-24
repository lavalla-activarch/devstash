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
  FolderOpen,
} from "lucide-react";
import { mockUser, mockItemTypes, mockCollections, mockTypeCounts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const TYPE_ICONS: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  "file-text": FileText,
  file: File,
  image: Image,
  link: Link2,
};

interface SidebarContentProps {
  collapsed: boolean;
}

export function SidebarContent({ collapsed }: SidebarContentProps) {
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const recentCollections = mockCollections
    .filter((c) => !c.isFavorite)
    .slice(0, 3);

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
            {mockItemTypes.map((type) => {
              const Icon = TYPE_ICONS[type.icon] ?? File;
              const count = mockTypeCounts[type.id];
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
                    {type.name} ({count})
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
                  <span className="text-xs text-muted-foreground">{count}</span>
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

                {/* Recent */}
                <div>
                  <p className="px-2 mb-0.5 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                    All Collections
                  </p>
                  {recentCollections.map((col) => (
                    <Link
                      key={col.id}
                      href={`/collections/${col.id}`}
                      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                      <FolderOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="flex-1 truncate">{col.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {col.itemCount}
                      </span>
                    </Link>
                  ))}
                </div>
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
