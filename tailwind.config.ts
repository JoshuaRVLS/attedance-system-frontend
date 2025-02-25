import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#222831',
        primary: '#393E46',
        secondary: '#00ADB5'
      },
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        montserrat: 'Montserrat, serif'
      }
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
