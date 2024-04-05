/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Pretendard-Regular', 'sans-serif'],
    },
    colors: {
      gray: {
        100: 'var(--grsc-100)',
        200: 'var(--grsc-200)',
        300: 'var(--grsc-300)',
        400: 'var(--grsc-400)',
        500: 'var(--grsc-500)',
        600: 'var(--grsc-600)',
        700: 'var(--grsc-700)',
        800: 'var(--grsc-800)',
        900: 'var(--grsc-900)',
      },
      blue: {
        100: 'var(--smtc-info-light)',
        200: 'var(--smtc-info-sub)',
        500: 'var(--smtc-info)',
      },
    },
  },
  plugins: [],
};
