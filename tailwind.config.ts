import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        roamora: {
          bg: "#F7F3EB",
          text: "#242722",
          green: "#34483C",
          "green-hover": "#2B3C32",
          "green-light": "#E9EFEA",
          terracotta: "#D76A45",
          "terracotta-hover": "#C25835",
          "terracotta-light": "#FCEEE8",
          gold: "#E7B86A",
          "gold-light": "#FAF3E3",
          card: "#FFFEFA",
          border: "#DCD9D0",
          "border-dark": "#B8B3A4",
          muted: "#6B7264",
          sand: "#ECE8DD",
          accent: "#2A3B30",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(36, 39, 34, 0.05)",
        card: "0 4px 16px -2px rgba(36, 39, 34, 0.06)",
        drawer: "0 20px 40px -15px rgba(36, 39, 34, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
