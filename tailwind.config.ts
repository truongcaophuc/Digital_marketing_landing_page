import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'marketing-primary': '#3b82f6',
        'marketing-secondary': '#8b5cf6',
        'marketing-accent': '#06b6d4',
        'marketing-success': '#10b981',
        'marketing-warning': '#f59e0b',
        'marketing-danger': '#ef4444',
        'marketing-dark': '#1e293b',
        'marketing-light': '#f8fafc',
      },
    },
  },
};

export default config;