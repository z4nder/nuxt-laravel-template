/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fefaec",
          "100": "#fcf0c9",
          "200": "#f9dd85",
          "300": "#f7c952",
          "400": "#f4b42b",
          "500": "#ee9312",
          "600": "#d26f0d",
          "700": "#af4d0e",
          "800": "#8e3c12",
          "900": "#753212",
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
