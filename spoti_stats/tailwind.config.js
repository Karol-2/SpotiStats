/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'serif': ['Georgia', 'Cambria', 'serif'],
    },
    colors: {
      "my-blue": "#0079FF",
      "my-red": " #E24480",
      "my-green": "#00DFA2",
      "my-dark":"#21262D",
      "my-darker":"#121519",
      "my-light":"#EDE9E9",

    },
    extend: {},
  },
  plugins: [],
}