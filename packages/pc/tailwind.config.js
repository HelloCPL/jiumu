// import { getTailwindColors } from './src/style/index'
// const colors = getTailwindColors()
// console.log('colors', colors);

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // prefix: 'tw-',
  theme: {
    colors: {
      transparent: 'var(--jm-color-transparent)',
      white: {
        1: 'var(--jm-color-white-1)',
        2: 'var(--jm-color-white-2)',
        4: 'var(--jm-color-white-4)',
        6: 'var(--jm-color-white-6)',
        8: 'var(--jm-color-white-8)',
        DEFAULT: 'var(--jm-color-white)'
      },
      black: {
        1: 'var(--jm-color-black-1)',
        2: 'var(--jm-color-black-2)',
        4: 'var(--jm-color-black-4)',
        6: 'var(--jm-color-black-6)',
        8: 'var(--jm-color-black-8)',
        DEFAULT: 'var(--jm-color-black)'
      },
      primary: {
        1: 'var(--jm-color-primary-1)',
        2: 'var(--jm-color-primary-2)',
        4: 'var(--jm-color-primary-4)',
        6: 'var(--jm-color-primary-6)',
        8: 'var(--jm-color-primary-8)',
        50: 'var(--jm-color-primary-50)',
        100: 'var(--jm-color-primary-100)',
        200: 'var(--jm-color-primary-200)',
        300: 'var(--jm-color-primary-300)',
        400: 'var(--jm-color-primary-400)',
        500: 'var(--jm-color-primary-500)',
        600: 'var(--jm-color-primary-600)',
        DEFAULT: 'var(--jm-color-primary)'
      },
      success: {
        1: 'var(--jm-color-success-1)',
        2: 'var(--jm-color-success-2)',
        4: 'var(--jm-color-success-4)',
        6: 'var(--jm-color-success-6)',
        8: 'var(--jm-color-success-8)',
        50: 'var(--jm-color-success-50)',
        100: 'var(--jm-color-success-100)',
        200: 'var(--jm-color-success-200)',
        300: 'var(--jm-color-success-300)',
        400: 'var(--jm-color-success-400)',
        500: 'var(--jm-color-success-500)',
        600: 'var(--jm-color-success-600)',
        DEFAULT: 'var(--jm-color-success)'
      },
      warning: {
        1: 'var(--jm-color-warning-1)',
        2: 'var(--jm-color-warning-2)',
        4: 'var(--jm-color-warning-4)',
        6: 'var(--jm-color-warning-6)',
        8: 'var(--jm-color-warning-8)',
        50: 'var(--jm-color-warning-50)',
        100: 'var(--jm-color-warning-100)',
        200: 'var(--jm-color-warning-200)',
        300: 'var(--jm-color-warning-300)',
        400: 'var(--jm-color-warning-400)',
        500: 'var(--jm-color-warning-500)',
        600: 'var(--jm-color-warning-600)',
        DEFAULT: 'var(--jm-color-warning)'
      },
      danger: {
        1: 'var(--jm-color-danger-1)',
        2: 'var(--jm-color-danger-2)',
        4: 'var(--jm-color-danger-4)',
        6: 'var(--jm-color-danger-6)',
        8: 'var(--jm-color-danger-8)',
        50: 'var(--jm-color-danger-50)',
        100: 'var(--jm-color-danger-100)',
        200: 'var(--jm-color-danger-200)',
        300: 'var(--jm-color-danger-300)',
        400: 'var(--jm-color-danger-400)',
        500: 'var(--jm-color-danger-500)',
        600: 'var(--jm-color-danger-600)',
        DEFAULT: 'var(--jm-color-danger)'
      },
      info: {
        1: 'var(--jm-color-info-1)',
        2: 'var(--jm-color-info-2)',
        4: 'var(--jm-color-info-4)',
        6: 'var(--jm-color-info-6)',
        8: 'var(--jm-color-info-8)',
        50: 'var(--jm-color-info-50)',
        100: 'var(--jm-color-info-100)',
        200: 'var(--jm-color-info-200)',
        300: 'var(--jm-color-info-300)',
        400: 'var(--jm-color-info-400)',
        500: 'var(--jm-color-info-500)',
        600: 'var(--jm-color-info-600)',
        DEFAULT: 'var(--jm-color-info)'
      }
    },
    plugins: []
  },
  corePlugins: {
    preflight: false
  }
}
