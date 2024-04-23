import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const VITE_ENVNAME = process.env.VITE_BASE_URL || "default_value";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    "process.env.VITE_ENVNAME": JSON.stringify(VITE_ENVNAME),
  },
});
