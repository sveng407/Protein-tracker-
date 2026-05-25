/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FFFDF5',
          100: '#FFF9E6',
          200: '#FFF0C2',
        },
        petal: {
          pink:   '#FF8FAB',
          purple: '#C084FC',
          coral:  '#FB923C',
          yellow: '#FFD166',
        },
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'sway': 'sway 3s ease-in-out infinite',
        'bloom-pulse': 'bloom-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%':  { transform: 'rotate(2deg)' },
        },
        'bloom-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
