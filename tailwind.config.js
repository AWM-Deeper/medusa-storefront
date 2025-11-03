/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        gray: {
          50: '#f9f9f9',
          100: '#eeeeee',
          200: '#e5e5e5',
          400: '#9d9d9d',
          500: '#808080',
          700: '#383838',
          900: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
