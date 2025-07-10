import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'nachtblau': '#2E3B55',
        'royalgold': '#D69D58',
        'softgold': '#F5D082',
        'offwhite': '#FDFCFB',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #2E3B55, #D69D58)',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)'],
        display: ['var(--font-cinzel)'],
        opensans: ['Open Sans', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
    fill: theme => ({
      ...theme('colors')
    }),
  },
  plugins: [],
};
export default config;
