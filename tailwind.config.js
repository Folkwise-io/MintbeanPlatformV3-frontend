module.exports = {
  future: {
    // to ensure smooth transition to next semantic release
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        mint: "#02ed9d",
      },
      colors: {
        "mb-mint": "#02ed9d",
        "mb-blue": "#009be2",
      },
    },
  },
  variants: {
    backgroundColor: ["active"],
  },
  plugins: [],
};
