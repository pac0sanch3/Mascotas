/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-main': "url('bg-login.svg')",
      },
      backgroundImage: {
        'name-main': "url('info-name.svg')"
      },
      fontFamily: {
        'montserrat-bold': ['Montserrat-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

