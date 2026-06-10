/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f766e",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f0fdfa",
          foreground: "#134e4a",
        },
        muted: {
          DEFAULT: "#f4f4f5",
          foreground: "#71717a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#e4e4e7",
        background: "#ffffff",
        foreground: "#09090b",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#09090b",
        },
      },
    },
  },
  plugins: [],
};
