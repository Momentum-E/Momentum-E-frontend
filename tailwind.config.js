/** @type {import('tailwindcss').Config} */
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
      'black': '#000000',
      'me-green': {
        100: '#83952B',
        200: '#C6DE41',
      },
      'red-500':'#FF0000',
      'gray': {
        '700': 'rgb(55 65 81)'
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
