import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#edf9f1",
          100: "#d1f1db",
          200: "#a5e3b5",
          300: "#6dcf84",
          400: "#3caf56",
          500: "#2f8d46",
          600: "#25713a",
          700: "#1f5a31",
          800: "#1c472a",
          900: "#163a22"
        },
        soil: {
          50: "#f7f3ec",
          100: "#ece2d2",
          200: "#dcc6a8",
          300: "#c8a374",
          400: "#b07d47",
          500: "#8d5f31",
          600: "#704a28",
          700: "#5a3c23",
          800: "#49321f",
          900: "#3c2b1d"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(18, 52, 33, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
