/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a1a',
        'bg-secondary': '#12122a',
        'bg-panel': 'rgba(20, 20, 40, 0.8)',
        'accent-1': '#6c5ce7',
        'accent-2': '#a29bfe',
        'accent-3': '#fd79a8',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255, 255, 255, 0.65)',
        'success': '#00b894',
        'warning': '#fab1a0',
      },
      fontFamily: {
        'main': ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
      animation: {
        'fade-slide-down': 'fadeSlideDown 0.8s ease-out',
        'fade-slide-up': 'fadeSlideUp 1s ease-out 0.3s both',
        'pulse-out': 'pulseOut 0.4s ease-out forwards',
        'rotate-glow': 'rotateGlow 6s linear infinite',
        'float': 'floatParticle 8s infinite ease-in-out',
      },
      keyframes: {
        fadeSlideDown: {
          'from': { opacity: '0', transform: 'translateY(-30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseOut: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
        rotateGlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        floatParticle: {
          '0%': { opacity: '0', transform: 'translateY(100vh) scale(0)' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.3' },
          '100%': { opacity: '0', transform: 'translateY(-20vh) scale(1)' },
        }
      },
      backgroundImage: {
        'radial-app': 'radial-gradient(ellipse at 50% 40%, #1a1a3e 0%, #0a0a1a 70%)',
        'glow-conic': 'conic-gradient(from 0deg, #6c5ce7, #fd79a8, #a29bfe, #6c5ce7)',
      }
    },
  },
  plugins: [],
}
