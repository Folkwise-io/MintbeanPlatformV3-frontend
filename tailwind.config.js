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
      width: {
        l: "22rem",
        m: "18rem",
      },
      colors: {
        mint: "#02ed9d",
      },
    },
  },
  variants: { backgroundColor: ["hover", "active"] },
  plugins: [],
};
