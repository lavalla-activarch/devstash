import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border">
        <h2 className="p-6 text-lg font-semibold">Sidebar</h2>
      </aside>

      {/* Right pane: topbar + main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-14 items-center gap-3 border-b border-border px-4">
          <Input
            placeholder="Search items..."
            className="max-w-xs"
            readOnly
          />
          <div className="ml-auto">
            <Button>New Item</Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
