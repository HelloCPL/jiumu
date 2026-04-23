// import { getTailwindColors } from './src/style/index'
// const colors = getTailwindColors()
// console.log('colors', colors);

function getTailwindColors(theme, nums) {
  nums = nums || [1, 2, 3, 4, 5, 6, 7, 8, 9, 50, 100, 200, 300, 400, 500, 600]
  const obj = {}
  nums.forEach((num) => {
    obj[num] = `var(--jm-color-${theme}-${num})`
  })
  return obj
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // prefix: 'tw-',
  theme: {
    colors: {
      transparent: 'var(--jm-color-transparent)',
      info: {
        ...getTailwindColors('info'),
        DEFAULT: 'var(--jm-color-info)'
      },
      primary: {
        ...getTailwindColors('primary'),
        DEFAULT: 'var(--jm-color-primary)'
      },
      success: {
        ...getTailwindColors('success'),
        DEFAULT: 'var(--jm-color-success)'
      },
      warning: {
        ...getTailwindColors('warning'),
        DEFAULT: 'var(--jm-color-warning)'
      },
      danger: {
        ...getTailwindColors('danger'),
        DEFAULT: 'var(--jm-color-danger)'
      },
      purple: {
        ...getTailwindColors('purple'),
        DEFAULT: 'var(--jm-color-purple)'
      },
      white: {
        ...getTailwindColors('white', [1, 2, 3, 4, 5, 6, 7, 8, 9]),
        DEFAULT: 'var(--jm-color-white)'
      },
      black: {
        ...getTailwindColors('black', [1, 2, 3, 4, 5, 6, 7, 8, 9]),
        DEFAULT: 'var(--jm-color-black)'
      },
      basic: {
        white: 'var(--jm-color-basic-white)',
        black: 'var(--jm-color-basic-black)',
        transparent: 'var(--jm-color-basic-transparent)'
      }
    },
    plugins: []
  },
  corePlugins: {
    preflight: false
  }
}
