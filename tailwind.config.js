import { colors, radii, fonts } from './src/lib/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: colors.ink,
        ink2: colors.ink2,
        ink3: colors.ink3,
        hairline: colors.hairline,
        bone: colors.bone,
        'bone-dim': colors.boneDim,
        'bone-faint': colors.boneFaint,
        gold: colors.gold,
        'gold-bright': colors.goldBright,
        'gold-dim': colors.goldDim,
      },
      borderRadius: { sm: radii.sm, md: radii.md, lg: radii.lg, xl: radii.xl },
      fontFamily: {
        display: fonts.display.split(',').map((s) => s.trim().replace(/^'|'$/g, '')),
        body: fonts.body.split(',').map((s) => s.trim().replace(/^'|'$/g, '')),
      },
      letterSpacing: {
        label: '0.28em',
        tight2: '-0.02em',
      },
      maxWidth: { content: '1600px' },
      transitionTimingFunction: { cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
