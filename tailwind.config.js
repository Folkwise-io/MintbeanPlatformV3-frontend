module.exports = {
  future: {
    // to ensure smooth transition to next semantic release
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      minWidth: {
        xl: "22rem",
        l: "18rem",
      },
      colors: {
        "mb-mint": "#02ed9d",
        "mb-blue": "#009be2",
      },
    },
  },
  variants: {},
  plugins: [],
};
