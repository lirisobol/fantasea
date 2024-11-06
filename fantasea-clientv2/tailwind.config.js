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
        },
        colors: {
            // table colors
            'very-high': '#AAF683', // green
            'high': '#60D394',      // lighter green
            'mid': '#dcdcdc',       // grey
            'low': '#FF9B85',       // orange
            'very-low': '#EE6055',  // red
        }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'bg-green-100', 'bg-red-100', 'bg-gray-100','bg-blue-100','bg-green-200',
    'bg-green-300','bg-green-400','bg-green-500','bg-red-100','bg-red-200',
    'bg-red-300','bg-red-400','bg-red-500',"bg-gray-200","bg-gray-600","bg-gray-400",
    'text-green-700', 'text-red-700', 'text-gray-700', 'text-blue-100','bg-green-700',
    'bg-gray-200','bg-teal-400','bg-teal-100','bg-emerald-400','bg-emerald-700','bg-emerald-600'
  ]

}

