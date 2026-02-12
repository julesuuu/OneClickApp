/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        // We are defining a custom "primary" color for your system
        primary: {
          light: '#60a5fa',
          DEFAULT: '#1d4ed8', // This is the main blue
          dark: '#1e3a8a',
        },
        // A nice background gray
        surface: '#f8fafc',
      },
      borderRadius: {
        // You can define custom "curviness" for your cards
        'oneclick': '1.5rem',
      }
    },
  },
  plugins: [],
}