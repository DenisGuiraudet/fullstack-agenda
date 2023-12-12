const path = require('path');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    path.join(path.dirname(require.resolve('@agenda/ui')), '**/*.{vue,js,ts,jsx,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

