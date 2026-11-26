import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self' https://api.open-meteo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { environment: "jsdom" },
  preview: {
    headers: {
      "Content-Security-Policy": csp,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "same-origin",
    },
  },
});
