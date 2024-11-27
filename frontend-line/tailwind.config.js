/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue700": "#012B49",
        "blue600": "#00537D",
        "blue500": "#00689D",
        "blue400": "#007DBC",
        "blue300": "#3D9ACC",
        "blue100": "#BEDEEF",
        "blue50": "#E7F3F9",
        "red300": "#FF6260",
        "Bg100": "#F9F9F9",
        "blue111": "#1E3A8A"
      }
    },
  },
  plugins: [],
}

