import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const canonicalSiteUrl = (process.env.SITE_URL || "https://vermieterrechtsschutz24.de").replace(/\/$/, "");

export default defineConfig({
  plugins: [
    react(),
    {
      name: "canonical-site-url",
      transformIndexHtml(html: string) {
        return html.replaceAll("https://vermieterrechtsschutz24.de", canonicalSiteUrl);
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
