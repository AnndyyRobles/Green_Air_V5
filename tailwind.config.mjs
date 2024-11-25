/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'app-black': '#0B0B0F',
        'app-dark': '#141419',
        'app-card': '#1C1C24',
        'app-green': '#4ade80',
        'app-blue': '#60a5fa',
        'app-text': '#e2e3e7',
      },
    },
  },
  plugins: [],
}