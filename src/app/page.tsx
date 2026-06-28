import { createClient } from "@supabase/supabase-js";
import MenuApp from "@/components/MenuApp";
import { MenuCategory } from "@/data/menu";

export const revalidate = 60;

async function getMenu(): Promise<MenuCategory[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from("manji_menus")
    .select("categories")
    .eq("client_id", "ccc71a10-169f-454e-9ec1-f3403ad54153")
    .single();

  console.log("[Rapisardi] data:", JSON.stringify(data));
  console.log("[Rapisardi] error:", JSON.stringify(error));

  if (error || !data) return [];
  return data.categories as MenuCategory[];
}

export default async function Home() {
  const categories = await getMenu();
  return <MenuApp initialCategories={categories} />;
}

