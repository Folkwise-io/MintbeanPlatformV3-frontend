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
    },
  },
  variants: {
    backgroundColor: ["active"],
  },
  plugins: [],
};
