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
      maxWidth: {
        "7xl": "96rem",
      },
      colors: {
        "mb-green-100": "#A3FEDF",
        "mb-green-200": "#02E0A8",
        "mb-blue-100": "#00B1FF",
        "mb-blue-200": "#00A4DA",
      },
      borderRadius: {
        "mb-sm": "1.75rem",
        "mb-md": "4rem",
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
