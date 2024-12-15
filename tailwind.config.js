/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

export default {
  content: [ "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        'poppins' : ['Poppins']
    },
    colors: {
        border_color_primary: '#264EB6',
        border_color_gray: '#BBBBBB',
        font_color_primary: '#262626',
        font_color_gray: '#535353',
        font_color_link: '#007BD4',
        font_color_error: '#A52A2A',
    }
},

    screens: {
        '2xs': '390px',
        // => @media (min-width: 320px) { ... }
        
        'xs': '480px',
        // => @media (min-width: 480px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
  
  },
  plugins: [],
}

