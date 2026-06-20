"use client";
import { MENU_CATEGORIES, Lang, Allergen, ALLERGEN_LABELS } from "@/data/menu";

interface CategoryViewProps { slug: string; lang: Lang; }

function fmtPrice(p: number) { return p.toFixed(2).replace(".", ",") + " €"; }

function AllergenBadge({ allergen, lang }: { allergen: Allergen; lang: Lang }) {
  const label = ALLERGEN_LABELS[allergen];
  if (!label) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: "rgba(90,67,49,0.08)", border: "1px solid rgba(90,67,49,0.2)",
      borderRadius: 5, padding: "2px 7px",
      fontSize: "0.82rem", fontFamily: "'Jost', sans-serif",
      fontWeight: 500, color: "#5A4331", whiteSpace: "nowrap",
    }}>
      {label[lang]}
    </span>
  );
}

export default function CategoryView({ slug, lang }: CategoryViewProps) {
  const cat = MENU_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return null;
  const catName = lang === "it" ? cat.nameIT : lang === "en" ? cat.nameEN : cat.namePL;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 100px" }}>
      {/* Hero */}
      <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", height: 160, marginBottom: 24 }}>
        <img src={cat.image} alt={catName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(43,27,15,0.75) 0%, rgba(43,27,15,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", textShadow: "0 2px 10px rgba(0,0,0,0.5)", lineHeight: 1.15 }}>
            {catName}
          </h2>
        </div>
      </div>

      {/* Gruppi */}
      {cat.groups.map((group, gi) => {
        const groupName = lang === "it" ? group.name : lang === "en" ? group.nameEN : group.namePL;
        return (
          <div key={gi} style={{ marginBottom: 8 }}>
            {cat.groups.length > 1 && (
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1.65rem",
                fontWeight: 700, color: "#2B2B2B", marginBottom: 12,
                paddingBottom: 6, borderBottom: "1.5px solid rgba(90,67,49,0.15)",
              }}>
                {groupName}
              </h3>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {group.items.map((item, ii) => {
                const name = lang === "it" ? item.name : lang === "en" ? (item.nameEN || item.name) : (item.namePL || item.name);
                const desc = lang === "it" ? item.description : lang === "en" ? item.descriptionEN : item.descriptionPL;
                const allergens = item.allergens ?? [];
                return (
                  <div key={ii} style={{ padding: "16px 0", borderBottom: "1px solid rgba(90,67,49,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#2B2B2B", lineHeight: 1.25, marginBottom: desc ? 4 : 0 }}>
                          {name}
                        </p>
                        {desc && (
                          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", color: "#5A4331", lineHeight: 1.45, fontWeight: 300, marginBottom: allergens.length > 0 ? 8 : 0 }}>
                            {desc}
                          </p>
                        )}
                        {allergens.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: desc ? 0 : 4 }}>
                            {allergens.map((a) => <AllergenBadge key={a} allergen={a} lang={lang} />)}
                          </div>
                        )}
                      </div>
                      {item.price != null && (
                        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#2F7D4A", whiteSpace: "nowrap", paddingTop: 1 }}>
                          {fmtPrice(item.price)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Nota allergeni */}
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "#5A4331", marginTop: 32, lineHeight: 1.5, fontWeight: 300 }}>
        {lang === "it"
          ? "Gli allergeni indicati sono basati sugli ingredienti dichiarati. Per allergie gravi o intolleranze, si prega di informare il personale prima di ordinare."
          : lang === "en"
          ? "Allergens listed are based on declared ingredients. For severe allergies or intolerances, please inform staff before ordering."
          : "Podane alergeny opierają się na zadeklarowanych składnikach. W przypadku ciężkich alergii lub nietolerancji, prosimy poinformować personel przed zamówieniem."}
      </p>
    </div>
  );
}