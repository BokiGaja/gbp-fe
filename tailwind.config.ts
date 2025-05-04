import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-work-sans)', 'sans-serif'],
      },
      colors: {
        navy: '#000D2D',
      },
    },
  },
  plugins: [],
};

export default config;
