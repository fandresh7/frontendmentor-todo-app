/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['Josefin Sans', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      backgroundImage: {
        'desktop-dark': "url('/images/bg-desktop-dark.jpg')",
        'desktop-light': "url('/images/bg-desktop-light.jpg')",
        'mobile-dark': "url('/images/bg-mobile-dark.jpg')",
        'mobile-light': "url('/images/bg-mobile-light.jpg')",
        'todo-gradient': 'linear-gradient(to bottom, #e0c3fc, #ffffff)',
      },
    },
  },
  plugins: [],
}
