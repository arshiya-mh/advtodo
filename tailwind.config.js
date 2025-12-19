/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["yekan", "sans-serif"],
        body: ["lale", "sans-serif"],
      },
    },
  },
  plugins: [],
};
