import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sofortrechtsschutz.de"),
  title: "ARAG Vermieterrechtsschutz",
  description: "Immobilien-Rechtsschutz für Vermieter mit ARAG Sofortschutz, Anwaltshotline und starken Leistungen.",
  icons: { icon: "/arag-wordmark.jpg", shortcut: "/arag-wordmark.jpg" },
  openGraph: {
    title: "ARAG Vermieterrechtsschutz",
    description: "Immobilien-Rechtsschutz für Vermieter – bereits ab 6,90 € pro Monat.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Immobilien-Rechtsschutz für Vermieter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARAG Vermieterrechtsschutz",
    description: "Immobilien-Rechtsschutz für Vermieter – bereits ab 6,90 € pro Monat.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
