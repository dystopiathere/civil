import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "vite-build-marker",
      closeBundle() {
        if (process.argv.includes("--watch") || process.argv.includes("-w")) {
          const markerPath = path.resolve(__dirname, "./.vite-build-done");
          fs.writeFileSync(markerPath, Date.now().toString(), "utf-8");
        }
      },
    },
  ],
  base: "./",
  resolve: {
    alias: {
      "~": path.resolve("src"),
    },
  },
});
