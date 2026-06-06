import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14161a",
        graphite: "#242933",
        line: "#dfe3e8",
        panel: "#f7f8fa",
        brand: "#0f766e",
        signal: "#c2410c",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(20, 22, 26, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
