/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',   // blue-500
          dark: '#1d4ed8',    // blue-700
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        background: {
          light: '#f0f9ff',
          dark: '#18181b',
        },
        accent: {
          purple: '#a78bfa',
          sky: '#38bdf8',
        },
        danger: '#ef4444',
        success: '#22c55e',
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px 0 rgba(59,130,246,0.10)',
        input: '0 1px 2px 0 rgba(0,0,0,0.01)',
      },
    },
  },
  plugins: [],
  // Ensure Tailwind processes these files
  includeFiles: ['./src/index.css', './src/tailwind-test.css']
};