import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'book-orange': '#FF4E20'
      },
      dropShadow: {
        'special': '10px 10px 5px rgba(0, 0, 0, 0.20)',
        'orange': '0px 0px 25px rgba(254, 78, 32, 0.15)',
        'orange-sm': '0px 0px 5px rgba(254, 78, 32, 0.25)',
      }
    },
  },
  plugins: [],
}
export default config
