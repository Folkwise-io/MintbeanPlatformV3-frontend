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
        "mb-green-100": "#A3FEDF",
        "mb-green-200": "#02E0A8",
        "mb-blue-100": "#00B1FF",
        "mb-blue-200": "#00A4DA",
      },
    },
    fontFamily: {
      body: ["Montserrat", "sans-serif"],
    },
  },
  variants: {
    backgroundColor: ["responsive", "odd", "hover", "focus"],
  },
  plugins: [],
};
