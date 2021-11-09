module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        twitter: '#1DA1F2',
        'twitter-gray': '#536471',
        theme: '#ecf0f9',
        'card-gray': '#606770',
        'card-dark-gray': '#1d2129',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
