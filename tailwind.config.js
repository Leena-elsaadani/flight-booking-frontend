/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        sky: {
          950: "#020617",
        },
        brand: {
          blue: "#0F4C81",
          light: "#E0F2FE",
          accent: "#F97316",
        },
      },
      boxShadow: {
        card: "0 18px 45px rgba(15,76,129,0.18)",
      },
    },
  },
  plugins: [],
};

