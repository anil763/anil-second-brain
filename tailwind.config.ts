import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        slate: {
          css: {
            '--tw-prose-body': 'rgb(71 85 105 / 1)',
            '--tw-prose-headings': 'rgb(15 23 42 / 1)',
            '--tw-prose-links': 'rgb(37 99 235 / 1)',
            '--tw-prose-bold': 'rgb(15 23 42 / 1)',
            '--tw-prose-code': 'rgb(15 23 42 / 1)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
