import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const fallbackSiteUrl = "https://mein-vermieterrechtsschutz24.de";
const canonicalSiteUrl = (process.env.SITE_URL || fallbackSiteUrl).replace(/\/$/, "");
const siteRoutes = ["", "impressum", "erstinformation", "datenschutz"];

export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-metadata",
      transformIndexHtml(html: string) {
        return html.replaceAll(fallbackSiteUrl, canonicalSiteUrl);
      },
      generateBundle() {
        const urls = siteRoutes
          .map((route) => `  <url><loc>${canonicalSiteUrl}/${route}</loc></url>`)
          .join("\n");
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: `User-agent: *\nAllow: /\nSitemap: ${canonicalSiteUrl}/sitemap.xml\n`,
        });
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve("index.html"),
        impressum: resolve("impressum/index.html"),
        erstinformation: resolve("erstinformation/index.html"),
        datenschutz: resolve("datenschutz/index.html"),
      },
    },
  },
  server: {
    watch: process.env.CODEX_SANDBOX === "seatbelt"
      ? { useFsEvents: false, usePolling: true }
      : undefined,
  },
});
