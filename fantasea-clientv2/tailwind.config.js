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
    // require('daisyui'),
  ],
//   daisyui: {
//     themes: false,
//     darkTheme: "dark",
//     base: true,
//     styled: true,
//     utils: true,
//     prefix:"",
//     logs: true,
//     themeRoot: ":root",
//   }
}

