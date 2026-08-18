/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdca8',
          300: '#ffc270',
          400: '#ff9d33',
          500: '#f97e0c',
          600: '#ea6104',
          700: '#c24505',
          800: '#9a360c',
          900: '#7c2e0e',
          950: '#431405',
        },
        navy: {
          50: '#f0f4f9',
          100: '#dde6f2',
          200: '#c1d3e7',
          300: '#97b8d7',
          400: '#6797c3',
          500: '#467cb0',
          600: '#346394',
          700: '#2b4f77',
          800: '#274363',
          900: '#1e334c',
          950: '#0f1c2d',
        },
        sand: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8dfd1',
          300: '#d7c7b2',
          400: '#c3aa8f',
          500: '#b29173',
          600: '#a47e62',
          700: '#896551',
          800: '#705345',
          900: '#5c453b',
          950: '#31231e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: theme('colors.slate.700'),
            lineHeight: '1.8',
            h1: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '700',
              color: theme('colors.slate.900'),
            },
            h2: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '700',
              color: theme('colors.slate.900'),
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
              color: theme('colors.slate.900'),
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            blockquote: {
              borderLeftColor: theme('colors.brand.500'),
              backgroundColor: theme('colors.brand.50'),
              padding: '1rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'italic',
              color: theme('colors.slate.800'),
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: '600',
            },
            img: {
              borderRadius: '0.75rem',
              boxShadow: theme('boxShadow.lg'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.300'),
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.slate.100') },
            strong: { color: theme('colors.slate.100') },
            blockquote: {
              borderLeftColor: theme('colors.brand.400'),
              backgroundColor: theme('colors.slate.800/60'),
              color: theme('colors.slate.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
