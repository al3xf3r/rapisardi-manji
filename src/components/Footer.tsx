"use client";
import { useState } from "react";
import { Lang } from "@/data/menu";

const DAYS_IT = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
const DAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAYS_PL = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

const HOURS = [
  { day: 0, slots: ["12:00 - 16:00"] },
  { day: 1, closed: true },
  { day: 2, slots: ["12:00 - 16:00", "20:00 - 22:00"] },
  { day: 3, slots: ["12:00 - 16:00", "20:00 - 22:00"] },
  { day: 4, slots: ["12:00 - 16:00", "20:00 - 22:00"] },
  { day: 5, slots: ["12:00 - 16:00", "20:00 - 22:00"] },
  { day: 6, slots: ["12:00 - 16:00", "20:00 - 22:00"] },
];

const CLOSED: Record<Lang, string> = { it: "Chiuso", en: "Closed", pl: "Zamknięte" };
const TODAY: Record<Lang, string> = { it: "oggi", en: "today", pl: "dziś" };
const HOURS_LABEL: Record<Lang, string> = { it: "Orari di apertura", en: "Opening hours", pl: "Godziny otwarcia" };
const CALL: Record<Lang, string> = { it: "Chiama", en: "Call", pl: "Zadzwoń" };
const DIRECTIONS: Record<Lang, string> = { it: "Indicazioni", en: "Directions", pl: "Wskazówki" };
const MENU_CTA: Record<Lang, string> = { it: "Crea il tuo menu digitale", en: "Create your digital menu", pl: "Stwórz swoje cyfrowe menu" };
const MENU_SUB: Record<Lang, string> = { it: "Vuoi un menu digitale per il tuo locale?", en: "Want a digital menu for your venue?", pl: "Chcesz cyfrowe menu dla swojego lokalu?" };
const DEV: Record<Lang, string> = { it: "Sviluppato da", en: "Developed by", pl: "Stworzone przez" };

export default function Footer({ lang }: { lang: Lang }) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const today = new Date().getDay();
  const DAYS = lang === "it" ? DAYS_IT : lang === "en" ? DAYS_EN : DAYS_PL;

  return (
    <footer style={{ background: "#A8001E", color: "#F5F0E6", padding: "40px 20px 32px" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {/* Nome */}
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 700, color: "#F5F0E6", lineHeight: 1.1 }}>
            Rapisardi
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,230,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 6 }}>
            {lang === "it" ? "Trattoria Casalinga  ·  Dal 1947" : lang === "en" ? "Trattoria Casalinga  ·  Since 1947" : "Trattoria Casalinga  ·  Od 1947"}
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(245,240,230,0.12)", margin: "20px 0" }} />

        {/* Indirizzo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,230,0.9)", lineHeight: 1.6 }}>
            Via Roma 63<br />Francavilla di Sicilia (ME)
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24 }}>
          {[
            { href: "tel:+393394042902", label: CALL[lang], icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8001E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg> },
            { href: "https://maps.app.goo.gl/7hver2c3nPZBUFwy9?g_st=ac", label: DIRECTIONS[lang], icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8001E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> },
          ].map((btn) => (
            <a key={btn.href} href={btn.href} target={btn.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F5F0E6", color: "#A8001E", borderRadius: 10, padding: "12px 22px", fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
              {btn.icon}{btn.label}
            </a>
          ))}
        </div>

        {/* Social */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
          <a href="https://www.instagram.com/trattoria_rapisardi.1947?igsh=MWhlcmZ1YXV3MnNneA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(245,240,230,0.7)", display: "flex" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Orari */}
        <div style={{ marginBottom: 24 }}>
          <button onClick={() => setHoursOpen(!hoursOpen)}
            style={{ width: "100%", background: "rgba(245,240,230,0.07)", border: "1px solid rgba(245,240,230,0.12)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", color: "#F5F0E6", fontFamily: "'Jost', sans-serif", fontSize: "1rem", fontWeight: 600 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,230,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {HOURS_LABEL[lang]}
            </span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,230,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: hoursOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {hoursOpen && (
            <div style={{ marginTop: 6, background: "rgba(245,240,230,0.05)", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(245,240,230,0.08)" }}>
              {HOURS.map((h) => {
                const isToday = h.day === today;
                return (
                  <div key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", background: isToday ? "rgba(245,240,230,0.08)" : "transparent", borderBottom: "1px solid rgba(245,240,230,0.05)" }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", color: isToday ? "#F5F0E6" : "rgba(245,240,230,0.8)", fontWeight: isToday ? 700 : 400 }}>
                      {DAYS[h.day]}
                      {isToday && <span style={{ marginLeft: 6, fontSize: "0.65rem", background: "rgba(245,240,230,0.15)", borderRadius: 4, padding: "1px 5px", verticalAlign: "middle" }}>{TODAY[lang]}</span>}
                    </span>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", color: h.closed ? "rgba(245,240,230,0.45)" : (isToday ? "#F5F0E6" : "rgba(245,240,230,0.8)"), fontWeight: isToday ? 600 : 400 }}>
                      {h.closed ? CLOSED[lang] : h.slots?.join(" · ")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA manji */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,230,0.6)", marginBottom: 8 }}>{MENU_SUB[lang]}</p>
          <a href="https://manji.hash42.xyz" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "rgba(245,240,230,0.1)", border: "1px solid rgba(245,240,230,0.2)", color: "#F5F0E6", borderRadius: 10, padding: "9px 20px", fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>
            {MENU_CTA[lang]}
          </a>
        </div>

        {/* Credit */}
        <div style={{ textAlign: "center", borderTop: "1px solid rgba(245,240,230,0.08)", paddingTop: 16 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,230,0.45)" }}>
            {DEV[lang]}{" "}
            <a href="https://hash42.xyz" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,230,0.5)", textDecoration: "none", fontWeight: 500 }}>Hash42</a>
          </p>
        </div>
      </div>
    </footer>
  );
}