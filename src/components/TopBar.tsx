"use client";
import { Lang } from "@/data/menu";
import LangToggle from "./LangToggle";

interface TopBarProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onBack?: () => void;
  onSearchOpen: () => void;
  title?: string;
}

export default function TopBar({ lang, onLangChange, onBack, onSearchOpen, title }: TopBarProps) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "#006630",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "13px 16px", maxWidth: 480, margin: "0 auto",
      }}>
        {/* Left: back o logo */}
        <div style={{ width: 48, display: "flex", alignItems: "center" }}>
          {onBack ? (
            <button onClick={onBack} aria-label="Indietro" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          ) : (
            /* Logo con bordo bianco per staccarlo dal verde */
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 3,
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}>
              <img src="/logo.webp" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          )}
        </div>

        {/* Center */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: title ? "1.2rem" : "1.3rem",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.03em",
          }}>
            {title || "Trattoria Rapisardi"}
          </span>
        </div>

        {/* Right: search + lang */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onSearchOpen} aria-label="Cerca" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <LangToggle lang={lang} onChange={onLangChange} />
        </div>
      </div>
    </header>
  );
}