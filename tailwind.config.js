/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        112: "28rem",
        128: "32rem",
      },
      width: {
        112: "28rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
  important: true,
};
