import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev-сервер на 5173, прокси /api и /health на FastAPI (8000)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8000",
      "/health": "http://localhost:8000",
    },
  },
});
