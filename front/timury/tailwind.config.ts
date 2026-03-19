import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jost)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
}

export default config