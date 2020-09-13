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
    },
    fontFamily: {
      display: ["Raleway", "sans-serif"],
      body: ["Montserrat", "sans-serif"]
    },
  },
  variants: {},
  plugins: [],
};
