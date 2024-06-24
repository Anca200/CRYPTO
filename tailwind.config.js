/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'gridcol': '0.5fr 2fr 1fr 1fr 1.5fr'
    },
   border: ['last'],
   animation: {
    "spinner": "rotate 2s infinite"
   },
   keyframes: {
   rotate: {
      '100%': { transform: 'rotate(360deg)' }
  }
  }
  
  }},
  plugins: [],
}