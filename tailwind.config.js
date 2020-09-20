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
      borderWidth: {
        10: "10px",
      },
      maxWidth: {
        "7xl": "96rem",
      },
      colors: {
        black: "#0C0A0B",
        "mb-green-100": "#B2FFE4",
        "mb-green-200": "#02E0A8",
        "mb-blue-100": "#00B1FF",
        "mb-blue-200": "#00A4DA",
      },
      boxShadow: {
        "mb-outline": "0 0 0 3px #ffffff;",
        "mb-outline-lg": "0 0 0 6px #ffffff;",
        "mb-outline-green": "0 0 0 1rem #B2FFE4;",
        "mb-outline-darkgreen": "0 0 0 1rem #02E0A8;",
        "mb-drop": "-8px 12px 8px 0 rgba(0, 0, 0, 0.16)",
      },
      inset: {
        "mb-1": "1rem",
        "mb-1n": "-1rem",
        "mb-3": "3rem",
      },
      minWidth: {
        "12rem": "12rem",
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
