import type { Config } from "tailwindcss";
import ordellaPreset from "@ordella/ui/tailwind";

const config: Config = {
  presets: [ordellaPreset as Config],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
