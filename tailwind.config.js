/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush:    { DEFAULT: '#FFB7C5', light: '#FFE4EC', dark: '#E8849A' },
        lavender: { DEFAULT: '#C4A8FF', light: '#EDE4FF', dark: '#9B7BE0' },
        mint:     { DEFAULT: '#A8EED4', light: '#DFFAF0', dark: '#6DC9A8' },
        peach:    { DEFAULT: '#FFD4A8', light: '#FFF0DE', dark: '#E0A870' },
        buttercup:{ DEFAULT: '#FFE4A0', light: '#FFF8DC', dark: '#D4B860' },
        kawaii:   { bg: '#FFF5FA', card: '#FFFFFF' },
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      boxShadow: {
        'kawaii':    '0 4px 24px rgba(255,183,197,0.3)',
        'kawaii-lg': '0 8px 40px rgba(196,168,255,0.25)',
        'lavender':  '0 4px 20px rgba(196,168,255,0.3)',
      },
      animation: {
        'float':        'float 4s ease-in-out infinite',
        'wiggle':       'wiggle 0.5s ease-in-out',
        'bloom-pulse':  'bloom-pulse 2s ease-in-out infinite',
        'sparkle':      'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        wiggle:      { '0%,100%': { transform: 'rotate(0deg)' }, '25%': { transform: 'rotate(-6deg)' }, '75%': { transform: 'rotate(6deg)' } },
        'bloom-pulse':{ '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.06)' } },
        sparkle:     { '0%,100%': { opacity: '0.4', transform: 'scale(0.8)' }, '50%': { opacity: '1', transform: 'scale(1.2)' } },
      },
    },
  },
  plugins: [],
}
