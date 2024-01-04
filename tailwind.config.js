/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "clock-gradient": "linear-gradient(315deg, #2E325A 0%, #0E112A 100%)",
      },
      boxShadow: {
        "clock-shadow":
          "50px 50px 100px 0px #121530, -50px -50px 100px 0px #272C5A",
      },
    },
    colors: {
      accent: "hsl(var(--color-accent) / <alpha-value>)",
      // accent1: "hsla(0, 91%, 71%, 1)",
      // accent2: "hsla(182, 91%, 71%, 1)",
      // accent3: "hsla(284, 89%, 74%, 1)",

      white: "hsla(0, 0%, 100%, 1)",
      grey: "hsla(229, 52%, 96%, 1)",
      grayishBlue: "hsla(227, 100%, 92%, 1)",
      blue: "hsla(235, 35%, 18%, 1)",
      darkBlue: "hsla(234, 39%, 14%, 1)",
      black: "hsla(0, 0%, 0%, 1)",
    },
  },
  plugins: [],
};
