import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trattoria Rapisardi | Dal 1947",
  description: "Trattoria casalinga a Francavilla di Sicilia. Sapori autentici di Sicilia dal 1947.",
  openGraph: {
    title: "Trattoria Rapisardi",
    description: "Trattoria casalinga a Francavilla di Sicilia dal 1947.",
    images: ["/og-rapisardi.jpg"],
  },
};

const PRELOAD_IMAGES = [
  "/antipastirapisardi.webp",
  "/primirapisardi.webp",
  "/secondirapisardi.webp",
  "/bevanderapisardi.webp",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {PRELOAD_IMAGES.map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
