/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'register-background': "url('/assets/register_bg_2.png')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

