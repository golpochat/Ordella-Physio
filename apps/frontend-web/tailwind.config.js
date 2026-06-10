/** @type {import('tailwindcss').Config} */
const ordellaPreset = require("@ordella/ui/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [ordellaPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};
