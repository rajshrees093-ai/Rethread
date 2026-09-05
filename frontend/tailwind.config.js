/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E6ECE6',
          200: '#D0DCD1',
          300: '#B0C4B2',
          400: '#8DAA90',
          500: '#688E6D',
          600: '#527557',
          700: '#415D45',
          800: '#344A37',
          900: '#2A3C2D',
        },
        olive: {
          50: '#F6F7F5',
          100: '#E9EBE6',
          200: '#D5D9CF',
          300: '#BAC0B1',
          400: '#99A28E',
          500: '#7E8A72',
          600: '#646F59',
          700: '#4F5846',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          50: '#FFFDFB',
          100: '#FAF8F5',
          200: '#F3EFE7',
          300: '#EBE5DA',
        },
        pastel: {
          lavender: '#ECE8F4',
          peach: '#FCEEE6',
          blue: '#E6F0F7',
          yellow: '#FBF6E2',
        },
        forest: {
          dark: '#1C291E',
          charcoal: '#2D3A30',
          muted: '#526255',
          light: '#7B8C7E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(80, 100, 85, 0.06)',
        'glass-hover': '0 12px 40px 0 rgba(70, 95, 75, 0.12)',
        'glass-active': '0 4px 16px 0 rgba(80, 100, 85, 0.08)',
        'subtle': '0 2px 10px 0 rgba(0, 0, 0, 0.02)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
