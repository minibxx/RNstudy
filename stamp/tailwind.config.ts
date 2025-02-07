import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      extend: {
        fontFamily: {
          hjb: ['HJB'],
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
