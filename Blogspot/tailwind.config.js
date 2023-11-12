/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      colors : {
      'cove' : '#130f40',
      'sapphire' : '#0c2461',
      'forestBlue' : '#0a3d62'
    },
    },
  },
  plugins: [],
}

