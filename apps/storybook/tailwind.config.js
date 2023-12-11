const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // presets: [require('@agenda/config/tailwind.config.js')],
  content: [
    path.join(path.dirname(require.resolve('@agenda/ui')), '**/*.{vue,js,ts,jsx,tsx}'),
  ]
}

