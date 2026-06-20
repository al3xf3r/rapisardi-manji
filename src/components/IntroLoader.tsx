"use client";
import { useEffect, useState } from "react";

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"pre" | "enter" | "hold" | "exit">("pre");

  useEffect(() => {
    // MenuApp decide se mostrare il loader — qui partiamo subito
    const t0 = setTimeout(() => setPhase("enter"), 80);
    const t1 = setTimeout(() => setPhase("hold"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 2600);
    const t3 = setTimeout(() => onDone(), 3350);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const isExit = phase === "exit";
  const isActive = phase === "enter" || phase === "hold";

  return (
    <>
      <style>{`
        @keyframes rapi-arrive {
          0%   { transform: scale(0) rotate(-180deg); opacity: 0; filter: blur(8px); }
          60%  { transform: scale(1.15) rotate(8deg); opacity: 1; filter: blur(0); }
          80%  { transform: scale(0.95) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes rapi-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes rapi-exit {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes rapi-text {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes rapi-line {
          0%   { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes rapi-ring {
          0%   { transform: scale(0.7); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 50,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "#F5F0E6",
          opacity: isExit ? 0 : 1,
          transition: isExit ? "opacity 0.75s ease" : "none",
          pointerEvents: isExit ? "none" : "all",
          overflow: "hidden",
        }}
      >
        {[1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute",
            width: i * 200, height: i * 200,
            borderRadius: "50%",
            border: "1px solid rgba(90,67,49,0.12)",
            animation: isActive ? `rapi-ring ${2.8 + i * 0.4}s ease-out ${i * 0.25}s infinite` : "none",
            opacity: 0,
          }} />
        ))}

        <div style={{ position: "relative" }}>
          <img
            src="/logo.webp"
            alt="Trattoria Rapisardi"
            style={{
              width: 130, height: 130, objectFit: "contain",
              animation: isActive
                ? "rapi-arrive 0.9s cubic-bezier(0.34,1.4,0.64,1) forwards, rapi-float 3s ease-in-out 1.2s infinite"
                : isExit ? "rapi-exit 0.6s ease forwards" : "none",
              opacity: phase === "pre" ? 0 : undefined,
            }}
          />
        </div>

        <div style={{
          marginTop: 24, textAlign: "center",
          animation: isActive ? "rapi-text 0.6s ease 0.8s both" : "none",
          opacity: phase === "pre" || phase === "enter" ? 0 : undefined,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, #5A4331)", transformOrigin: "right", animation: isActive ? "rapi-line 0.5s ease 1s both" : "none" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2F7D4A" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#B4323A" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2F7D4A" }} />
            <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, #5A4331)", transformOrigin: "left", animation: isActive ? "rapi-line 0.5s ease 1s both" : "none" }} />
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem", fontWeight: 700,
            color: "#2B2B2B", letterSpacing: "0.03em",
            lineHeight: 1.1,
          }}>
            Rapisardi
          </h1>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.65rem", color: "#5A4331",
            letterSpacing: "0.22em", textTransform: "uppercase",
            marginTop: 6, fontWeight: 400,
          }}>
            Trattoria Casalinga  ·  Dal 1947
          </p>
        </div>
      </div>
    </>
  );
}