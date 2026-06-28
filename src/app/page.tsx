import { createClient } from "@supabase/supabase-js";
import MenuApp from "@/components/MenuApp";
import { MenuCategory } from "@/data/menu";

export const revalidate = 60;

const CLIENT_ID = "ccc71a10-169f-454e-9ec1-f3403ad54153";

const STATIC_IMAGES: Record<string, string> = {
  "antipasti-contorni": "/antipastirapisardi.webp",
  "primi": "/primirapisardi.webp",
  "secondi": "/secondirapisardi.webp",
  "bevande": "/bevanderapisardi.webp",
};

async function getMenu(): Promise<MenuCategory[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("manji_menus")
    .select("menu_data")
    .eq("client_id", CLIENT_ID)
    .single();

  if (error || !data?.menu_data?.categories) return [];

  const categories = data.menu_data.categories as any[];

  return categories.map((cat: any) => ({
    slug: cat.id ?? cat.slug,
    nameIT: cat.name?.it ?? cat.nameIT ?? cat.name ?? "",
    nameEN: cat.name?.en ?? cat.nameEN ?? "",
    namePL: cat.name?.pl ?? cat.namePL ?? "",
    image: STATIC_IMAGES[cat.id ?? cat.slug] ?? cat.image ?? "",
    groups: (cat.groups ?? [{ name: cat.name?.it ?? "", items: cat.items ?? [] }]).map((g: any) => ({
      name: g.name?.it ?? g.name ?? "",
      nameEN: g.name?.en ?? g.nameEN ?? "",
      namePL: g.name?.pl ?? g.namePL ?? "",
      items: (g.items ?? []).map((item: any) => ({
        name: item.name?.it ?? item.name ?? "",
        nameEN: item.name?.en ?? item.nameEN ?? "",
        namePL: item.name?.pl ?? item.namePL ?? "",
        description: item.desc?.it ?? item.description ?? "",
        descriptionEN: item.desc?.en ?? item.descriptionEN ?? "",
        price: item.price != null ? parseFloat(item.price) : null,
        available: item.available !== false,
        allergens: item.allergens ?? [],
      })),
    })),
  }));
}

export default async function Home() {
  const categories = await getMenu();
  return <MenuApp initialCategories={categories} />;
}