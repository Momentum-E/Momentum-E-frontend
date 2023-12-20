/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
require('tailwind-scrollbar')

module.exports = {
  darkMode:'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '0px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
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
      'gray': colors.gray,
      'blue': colors.blue,
      'neutral': colors.neutral,
      'slate': colors.slate,
    },
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dashboard-gradient': 'linear-gradient(157deg, #131315 0%, rgba(26, 31, 55, 0.00) 100%)',
        'dashboard-sidebar-image':"url('../assets/images/dashboard-need-help.png')",
        // 'background-lines-dots-structure': "url('../assets/images/background-connecting-lines-dots-structure.jpg')",
        // 'background-lines-dots': "url('../assets/images/background-connecting-lines-dots.jpg')",
        // 'background-flowing-cyber-dots': "url('../assets/images/background-flowing-cyber-dots.jpg')",
        // 'background-flowing-lines': "url('../assets/images/background-flowing-lines.jpg')",
        'background-globe': "url('../assets/images/background-globe.jpg')",
        // 'background-shallow-depth-field': "url('../assets/images/background-shallow-depth-field.jpg')",
        // 'background-halftone-dots-design': "url('../assets/images/banner-with-halftone-dots-design.jpg')",
        'logo_white_nocap':"url('../assets/logos/src/assets/logos/logos/logo_white_nocap.png')"
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
