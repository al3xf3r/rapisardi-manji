"use client";
import { MenuCategory, Lang } from "@/data/menu";

interface HomeViewProps {
  lang: Lang;
  categories: MenuCategory[];
  onSelectCategory: (slug: string) => void;
}

const TITLE: Record<Lang, string> = { it: "Il nostro Menu", en: "Our Menu", pl: "Nasze Menu" };
const SUB: Record<Lang, string> = { it: "Trattoria Casalinga · Dal 1947", en: "Home-style Trattoria · Since 1947", pl: "Tradycyjna Trattoria · Od 1947" };

export default function HomeView({ lang, categories, onSelectCategory }: HomeViewProps) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2.4rem", fontWeight: 700,
          color: "#2B2B2B", lineHeight: 1.15, marginBottom: 6,
        }}>
          {TITLE[lang]}
        </h1>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: "0.82rem",
          color: "#5A4331", letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 400,
        }}>
          {SUB[lang]}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {categories.map((cat) => {
          const name = lang === "it" ? cat.nameIT : lang === "en" ? cat.nameEN : cat.namePL;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              style={{
                position: "relative", borderRadius: 16,
                overflow: "hidden", aspectRatio: "1 / 1",
                border: "none", cursor: "pointer",
                background: "#D4C9B6", padding: 0,
              }}
            >
              <img
                src={cat.image} alt={name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(43,27,15,0.82) 0%, rgba(43,27,15,0.3) 55%, transparent 100%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 12px" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem", fontWeight: 700,
                  color: "#FFFFFF", textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                  textAlign: "center", lineHeight: 1.2, display: "block",
                }}>
                  {name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}