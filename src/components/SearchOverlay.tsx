"use client";
import { useState, useEffect, useRef } from "react";
import { MENU_CATEGORIES, Lang } from "@/data/menu";

interface SearchResult {
  itemName: string;
  description?: string;
  price?: number | null;
  categorySlug: string;
  categoryName: string;
}

interface SearchOverlayProps {
  lang: Lang;
  onClose: () => void;
  onSelectCategory: (slug: string) => void;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: "rgba(47,125,74,0.2)", color: "#2B2B2B", borderRadius: 3, padding: "0 1px" }}>
            {part}
          </mark>
        ) : part
      )}
    </>
  );
}

function fmtPrice(p: number) { return p.toFixed(2).replace(".", ",") + " €"; }

const PLACEHOLDER: Record<Lang, string> = { it: "Cerca nel menu...", en: "Search the menu...", pl: "Szukaj w menu..." };
const CLOSE_LABEL: Record<Lang, string> = { it: "Chiudi", en: "Close", pl: "Zamknij" };
const NO_RESULTS: Record<Lang, string> = { it: "Nessun risultato trovato.", en: "No results found.", pl: "Brak wyników." };

export default function SearchOverlay({ lang, onClose, onSelectCategory }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const results: SearchResult[] = [];
  if (query.trim().length >= 2) {
    const q = query.toLowerCase();
    MENU_CATEGORIES.forEach((cat) => {
      const catName = lang === "it" ? cat.nameIT : lang === "en" ? cat.nameEN : cat.namePL;
      cat.groups.forEach((group) => {
        group.items.forEach((item) => {
          const name = lang === "it" ? item.name : lang === "en" ? (item.nameEN || item.name) : (item.namePL || item.name);
          const desc = lang === "it" ? item.description : lang === "en" ? item.descriptionEN : item.descriptionPL;
          if (name.toLowerCase().includes(q) || (desc && desc.toLowerCase().includes(q))) {
            results.push({ itemName: name, description: desc, price: item.price, categorySlug: cat.slug, categoryName: catName });
          }
        });
      });
    });
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(245,240,230,0.97)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid rgba(90,67,49,0.1)", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "rgba(90,67,49,0.07)", borderRadius: 12, padding: "8px 14px" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5A4331" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={PLACEHOLDER[lang]}
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", color: "#2B2B2B" }}
          />
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "#2F7D4A", fontWeight: 500, padding: "4px 8px" }}>
          {CLOSE_LABEL[lang]}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {query.trim().length >= 2 && results.length === 0 && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", color: "#5A4331", textAlign: "center", marginTop: 40 }}>
              {NO_RESULTS[lang]}
            </p>
          )}
          {results.map((r, i) => (
            <button key={i} onClick={() => { onSelectCategory(r.categorySlug); onClose(); }}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "12px 0", borderBottom: "1px solid rgba(90,67,49,0.08)", display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#2B2B2B", marginBottom: 2 }}>
                    {highlight(r.itemName, query)}
                  </p>
                  {r.description && (
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "#5A4331", fontWeight: 300, marginBottom: 3 }}>
                      {highlight(r.description, query)}
                    </p>
                  )}
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "#2F7D4A", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {r.categoryName}
                  </span>
                </div>
                {r.price != null && (
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#2F7D4A", whiteSpace: "nowrap" }}>
                    {fmtPrice(r.price)}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
