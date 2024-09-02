/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        height: {
            '5vh': '5vh',
            '93vh': '93vh'
        }
    },
  },
  plugins: [
  ],

}

