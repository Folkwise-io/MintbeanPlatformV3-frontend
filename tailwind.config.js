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
    backgroundColor: ["active"],
  },
  plugins: [],
};
