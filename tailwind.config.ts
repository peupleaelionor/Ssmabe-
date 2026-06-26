import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#0B0B0B",
        "vert-congo": "#0F3D32",
        cuivre: "#C76A2D",
        creme: "#F8F3EA",
        "blanc-chaud": "#FFFDF8",
        "gris-texte": "#6F6A63",
        // Extended palette
        "vert-light": "#1a5c4b",
        "vert-dark": "#082820",
        "cuivre-light": "#d98040",
        "cuivre-dark": "#a55520",
        "noir-light": "#1a1a1a",
        "noir-card": "#111111",
        "noir-border": "#222222",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "wave-1": "wave 1.2s ease-in-out infinite",
        "wave-2": "wave 1.2s ease-in-out 0.1s infinite",
        "wave-3": "wave 1.2s ease-in-out 0.2s infinite",
        "wave-4": "wave 1.2s ease-in-out 0.3s infinite",
        "wave-5": "wave 1.2s ease-in-out 0.4s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(15, 61, 50, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(15, 61, 50, 0.9)" },
        },
      },
      backgroundImage: {
        "gradient-noir":
          "linear-gradient(180deg, #0B0B0B 0%, #111111 100%)",
        "gradient-congo":
          "linear-gradient(135deg, #0F3D32 0%, #082820 100%)",
        "gradient-cuivre":
          "linear-gradient(135deg, #C76A2D 0%, #a55520 100%)",
        "gradient-hero":
          "linear-gradient(180deg, #0B0B0B 0%, #0F3D32 50%, #0B0B0B 100%)",
      },
      boxShadow: {
        "congo-glow": "0 0 20px rgba(15, 61, 50, 0.4)",
        "cuivre-glow": "0 0 20px rgba(199, 106, 45, 0.4)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
