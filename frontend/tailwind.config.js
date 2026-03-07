/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a08',
        surface: '#111110',
        card: '#161614',
        gold: {
          DEFAULT: '#9b6dff',   // was #c9a96e
          light: '#c4a0ff',     // was #e4c896
        },
        muted: '#6E78C7',
        accent: '#9b6dff',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      // backgroundImage: {
      //   'hero': "url('https://res.cloudinary.com/dtbwolk88/image/upload/v1772800662/wt7_bg_main_hocouu.jpg')",
      // },
      animation: {
        ticker: 'ticker 35s linear infinite',
        fadeUp: 'fadeUp 0.8s ease both',
        scrollPulse: 'scrollPulse 2s ease infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%':      { opacity: '0.4', transform: 'scaleY(0.7)' },
        },
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
