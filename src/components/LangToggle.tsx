"use client";
import { Lang } from "@/data/menu";

const LANGS: Lang[] = ["it", "en", "pl"];

interface LangToggleProps {
  lang: Lang;
  onChange: (l: Lang) => void;
}

export default function LangToggle({ lang, onChange }: LangToggleProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.35)",
      borderRadius: 999,
      padding: 3,
      gap: 2,
    }}>
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => onChange(l)}
            style={{
              borderRadius: 999,
              border: "none",
              padding: "4px 9px",
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.07em",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              background: active ? "#FFFFFF" : "transparent",
              color: active ? "#006630" : "rgba(255,255,255,0.8)",
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}