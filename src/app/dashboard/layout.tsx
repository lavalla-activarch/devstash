import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getRecentCollections } from "@/lib/db/collections";

const DEMO_USER_EMAIL = "demo@devstash.io";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [itemTypes, collections] = await Promise.all([
    getItemTypesWithCounts(DEMO_USER_EMAIL),
    getRecentCollections(DEMO_USER_EMAIL),
  ]);

  return (
    <DashboardLayout itemTypes={itemTypes} collections={collections}>
      {children}
    </DashboardLayout>
  );
}
