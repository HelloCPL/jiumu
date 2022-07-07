// import { getTailwindColors } from './src/style/index'
// const colors = getTailwindColors()
// console.log('colors', colors);

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      primary: {
        50: '#ecf5ff',
        100: '#d9ecff',
        200: '#c6e2ff',
        300: '#a0cfff',
        400: '#79BBFF',
        500: '#409EFF',
        DEFAULT: '#409EFF',
        600: '#337ECC'
      },
      red: {},
      extend: {}
    },
    plugins: []
  }
}
