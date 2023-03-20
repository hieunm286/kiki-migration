/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: '#477efa',
          main: '#4B64F5'
        },
        grey: {
          0: '#FFFFFF',
          100: '#FCFCFD',
          200: '#F4F5F6',
          300: '#E6E8EC',
          400: '#B1B5C3',
          500: '#777E90',
          600: '#353945',
          700: '#23262F',
          800: '#141416',
          900: '#161C24',
        }
      }
    },
  },
  plugins: [],
}
