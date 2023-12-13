const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(path.dirname(require.resolve('@agenda/ui')), '**/*.{vue,js,ts,jsx,tsx}'),
  ]
}

