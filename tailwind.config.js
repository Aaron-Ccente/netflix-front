/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Habilita el modo dark usando la clase 'dark' en el HTML
  theme: {
    extend: {
      keyframes: {
        animeDefaultPassword: {
          '0%': { width: '0%' },
          '100%': { width: '25%' },
        },
        animeLowPassword: {
          '0%': { width: '0%' },
          '100%': { width: '50%' },
        },
        animeMediumPassword: {
          '0%': { width: '0%' },
          '100%': { width: '75%' },
        },
        animeHighPassword: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },
      animation: {
        'fill-animeLowPassword': 'animeLowPassword 1s ease-out forwards',
        'fill-animeDefaultPassword': 'animeDefaultPassword 1s ease-out forwards',
        'fill-animeMediumPassword': 'animeMediumPassword 1s ease-out forwards',
        'fill-animeHighPassword': 'animeHighPassword 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}

