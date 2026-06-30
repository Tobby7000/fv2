/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0A0908",
        charcoal: "#14110F",
        charcoal2: "#1C1815",
        brown: "#3B2415",
        gold: "#C9A24B",
        goldBright: "#E0BD6E",
        cream: "#F2E9DC",
        creamDim: "#C9BFAE",
        rust: "#8B3A1A",
        hairline: "rgba(201,162,75,0.25)",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        display: ["'Marcellus'", "serif"],
        sans: ["'Jost'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
