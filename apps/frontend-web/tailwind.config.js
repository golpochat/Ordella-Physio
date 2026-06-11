/** @type {import('tailwindcss').Config} */
let ordellaPreset = {};
try {
  ordellaPreset = require("@ordella/ui/tailwind");
  if (ordellaPreset?.default) {
    ordellaPreset = ordellaPreset.default;
  }
} catch {
  // Preset is TypeScript; Next/jiti loads it at build time. Semantic tokens below are the fallback.
}

/** Semantic colors from @ordella/ui — inlined so dev PostCSS always resolves shadcn utilities. */
const semanticColors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...(ordellaPreset?.theme ? { presets: [ordellaPreset] } : {}),
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ...semanticColors,
        brand: {
          primary: "var(--brand-primary)",
          "primary-light": "var(--brand-primary-light)",
          "primary-soft": "var(--brand-primary-soft)",
          dark: "var(--brand-dark)",
          gray: "var(--brand-gray)",
          light: "var(--brand-light)",
        },
      },
      spacing: {
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "brand-xs": "var(--space-xs)",
        "brand-sm": "var(--space-sm)",
        "brand-md": "var(--space-md)",
        "brand-lg": "var(--space-lg)",
        "brand-xl": "var(--space-xl)",
        "brand-2xl": "var(--space-2xl)",
        "brand-3xl": "var(--space-3xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        brand: {
          sm: "var(--radius-sm)",
          md: "var(--radius-md)",
          lg: "var(--radius-lg)",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        "brand-soft": "var(--shadow-soft)",
        "brand-medium": "var(--shadow-medium)",
      },
      fontSize: {
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        normal: "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
      },
      transitionDuration: {
        brand: "200ms",
      },
    },
  },
};
