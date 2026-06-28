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
    .eq("client_id", "rapisardi")
    .single();

  if (error || !data) return [];
  return data.categories as MenuCategory[];
}

export default async function Home() {
  const categories = await getMenu();
  return <MenuApp initialCategories={categories} />;
}