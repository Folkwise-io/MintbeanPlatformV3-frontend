module.exports = {
  future: {
    // to ensure smooth transition to next semantic release
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        "mb-mint": "#02E0A8",
        "mb-blue": "#009be2",
      },
      maxHeight: {
        0: "0",
        25: "25%",
        50: "50%",
        75: "75%",
        full: "100%",
      },
      borderRadius: {
        xl: "3rem",
      },
    },
  },
  variants: {
    backgroundColor: ["active"],
  },
  plugins: [],
};
