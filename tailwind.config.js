import tailwindMotion from 'tailwindcss-motion'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        rombo: "rombo 2s infinite ease-in-out",
      },
      keyframes: {
        rombo: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(45deg) scale(1.2)" },
        },
      },
    },
  },
  plugins: [
    tailwindMotion
  ],
}