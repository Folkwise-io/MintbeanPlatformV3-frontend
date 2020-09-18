const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    // to ensure smooth transition to next semantic release
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    screens: {
      xs: "400px",
      ...screens,
    },
    extend: {
      maxHeight: {
        0: "0",
        25: "25%",
        50: "50%",
        75: "75%",
        full: "100%",
      },
      borderRadius: {
        xl: "3rem",
        "mb-xs": "1rem",
        "mb-sm": "1.75rem",
        "mb-md": "4rem",
        "mb-lg": "8rem",
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
      boxShadow: {
        "mb-outline": "0 0 0 3px #ffffff;",
        "mb-outline-green": "0 0 0 1rem #A3FEDF;",
      },
      inset: {
        "mb-1": "1rem",
        "mb-1n": "-1rem",
      },
    },
    fontFamily: {
      body: ["Montserrat", "sans-serif"],
    },
  },
  variants: {
    backgroundColor: ["active"],
  },
  plugins: [],
};
