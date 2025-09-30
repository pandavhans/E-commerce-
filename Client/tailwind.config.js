/** @type {import('tailwindcss').Config} */
import desiyui from 'daisyui'
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    desiyui
  ],
}

