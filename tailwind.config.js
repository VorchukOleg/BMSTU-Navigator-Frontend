/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
