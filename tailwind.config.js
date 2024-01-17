/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend:{
      colors: {
        'dark-blue': '#161A30',
        'purple': '#31304D',
        'dark-purple': '#0c0914',
        'light-purple': '#1c213b',
        'stone': '#B6BBC4',
        'ivory': '#F0ECE5'
      },
      fontFamily: {
        sans: ['Ppobjectsans','Graphik', 'sans-serif'],
        serif: ['Georgia', 'Merriweather', 'serif'],
      },
      extend: {
        spacing: {
          '8xl': '96rem',
          '9xl': '128rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      }
    }
  },
}

