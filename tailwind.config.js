/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat"', '"Homemade Apple"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        poly: {
          orange: '#FF5722',
          glow: 'rgba(255, 87, 34, 0.4)',
          dark: '#0e0e11',
          surface: '#18181b',
        }
      },
      boxShadow: {
        'desk-card': '0 20px 40px -15px rgba(0, 0, 0, 0.35), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
        'desk-card-active': '0 25px 50px -12px rgba(255, 87, 34, 0.35), 0 0 0 2px #FF5722',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
