/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    colors: {
      'baseColor': '#0496ff',
      'baseLight': '#4bb3fd',
      'baseDark': '#027bce',
      'baseDeepDark': '#00487c',
      'baseOpposite': '#3e6680',
    },
    extend: {},
  },
  plugins: [],
}

