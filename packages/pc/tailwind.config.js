// import { getTailwindColors } from './src/style/index'
// const colors = getTailwindColors()
// console.log('colors', colors);

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    colors: {
      white: 'var(--jm-color-white)',
      black: 'var(--jm-color-black)',
      transparent: 'var(--jm-color-transparent)',
      primary: {
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
  }
}
