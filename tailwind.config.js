/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#2563eb', // Match Tailwind blue-500
        secondary: '#f43f5e', // Match Tailwind pink-500
      },
    },
  },
  plugins: [],
};
