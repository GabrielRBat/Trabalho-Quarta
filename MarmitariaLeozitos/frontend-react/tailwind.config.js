/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'leozitosbg': '#F6F3EA',
        //criar as cores aqui leo
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-in-out',
        'bounce-soft': 'bounce-soft 1s infinite',
        'ping-once': 'ping-once 1s cubic-bezier(0, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }, // menos agressivo
        },
        'ping-once': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        'slideDown': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slideUp': {
        '0%': { transform: 'translateY(0)', opacity: 1 },
        '100%': { transform: 'translateY(-100%)', opacity: 0 },
      },
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'cs': '1100px',
      'xl': '1100px', 
    }
  },
  plugins: [],
};
