module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require(`@tailwindcss/forms`)
  ],
}