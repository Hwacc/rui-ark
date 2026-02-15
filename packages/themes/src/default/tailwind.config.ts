import type { Config } from 'tailwindcss'

export default {
  content: [
    './crafts/**/*.{ts}',
    '../vue/core/src/**/*.{vue,ts,tsx}',
  ],
} satisfies Config
