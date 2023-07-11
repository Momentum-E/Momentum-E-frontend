/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
require('tailwind-scrollbar')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'white': {
        100: '#ffffff',
        200: '#C1C3C0',
      },
      'black': colors.black,
      'me-green': {
        100: '#83952B',
        200: '#C6DE41',
        300: '#060E02',
      },
      'red':colors.red,
      'green':colors.green,
      gray: colors.gray,
      transparent: 'transparent',
    },
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dashboard-gradient': 'linear-gradient(157deg, #131315 0%, rgba(26, 31, 55, 0.00) 100%)',
        'dashboard-sidebar-image':"url('../assets/images/dashboard-need-help.png')",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        7: 'repeat(7, minmax(0, 1fr))',

        // // Complex site-specific row configuration
        // 'layout': '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [],
};
