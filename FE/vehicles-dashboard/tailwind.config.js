/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '11px',
      },
      colors: {
        'free-now-red': '#ca0928',
      },
      borderColor: {
        DEFAULT: '#efefef',
      },
      // extend theme for branding
    },
  },
  plugins: [],
};
