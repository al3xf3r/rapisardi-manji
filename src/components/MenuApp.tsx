"use client";
import { useState, useEffect } from "react";
import { Lang, MENU_CATEGORIES, MenuCategory } from "@/data/menu";
import IntroLoader from "./IntroLoader";
import TopBar from "./TopBar";
import HomeView from "./HomeView";
import CategoryView from "./CategoryView";
import SearchOverlay from "./SearchOverlay";
import Footer from "./Footer";

const SESSION_KEY = "rapisardi_seen";

export default function MenuApp() {
  const [lang, setLang] = useState<Lang>("it");
  const [activeCat, setActiveCat] = useState<MenuCategory | null>(null);
  // null = non ancora letto sessionStorage
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    setShowIntro(seen ? false : true);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowIntro(false);
  };

  useEffect(() => {
    const onPop = () => { if (activeCat) setActiveCat(null); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [activeCat]);

  const openCategory = (slug: string) => {
    const cat = MENU_CATEGORIES.find((c) => c.slug === slug) ?? null;
    if (!cat) return;
    window.history.pushState({ slug }, "");
    setActiveCat(cat);
    window.scrollTo(0, 0);
  };

  const goHome = () => { setActiveCat(null); window.scrollTo(0, 0); };

  const catName = activeCat
    ? (lang === "it" ? activeCat.nameIT : lang === "en" ? activeCat.nameEN : activeCat.namePL)
    : undefined;

  // Finché non abbiamo letto sessionStorage, mostriamo solo
  // uno schermo del colore di sfondo — nessun flash bianco
  if (showIntro === null) {
    return <div style={{ position: "fixed", inset: 0, background: "#F5F0E6" }} />;
  }

  return (
    <>
      {showIntro === true && <IntroLoader onDone={handleIntroComplete} />}

      <div style={{
        opacity: showIntro === false ? 1 : 0,
        transition: showIntro === false ? "opacity 0.4s ease" : "none",
        pointerEvents: showIntro === false ? "auto" : "none",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}>
        {searchOpen && (
          <SearchOverlay lang={lang} onClose={() => setSearchOpen(false)}
            onSelectCategory={(slug) => { setSearchOpen(false); openCategory(slug); }} />
        )}
        <TopBar lang={lang} onLangChange={setLang}
          onBack={activeCat ? goHome : undefined}
          onSearchOpen={() => setSearchOpen(true)}
          title={catName} />
        <main style={{ flex: 1 }}>
          {activeCat
            ? <CategoryView slug={activeCat.slug} lang={lang} />
            : <HomeView lang={lang} onSelectCategory={openCategory} />}
        </main>
        <Footer lang={lang} />
      </div>
    </>
  );
}