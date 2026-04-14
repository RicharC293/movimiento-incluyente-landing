import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mi: {
          start:   '#A0359A',
          mid:     '#6B2C9A',
          end:     '#3D1066',
          dark:    '#1a0033',
          off:     '#f7f3fd',
          border:  '#e0d0ee',
          border2: '#cfc0e0',
          text:    '#1e0040',
          muted:   '#6a5080',
          pending: '#ece8e4',
          pborder: '#d4cdc6',
          ptext:   '#9a9089',
        },
      },
    },
  },
  plugins: [],
}
export default config
