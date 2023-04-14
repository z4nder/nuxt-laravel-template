/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#325079",
          "100": "#28466f",
          "200": "#1e3c65",
          "300": "#14325b",
          "400": "#0a2851",
          "500": "#001e47",
          "600": "#00143d",
          "700": "#000a33",
          "800": "#000029",
          "900": "#00001f",
        },
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
