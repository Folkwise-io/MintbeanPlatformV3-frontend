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
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "30vh": "30vh",
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        120: "30rem",
      },
      minHeight: {
        72: "18rem",
        84: "21rem",
        "50vh": "50vh",
        "30vh": "30vh",
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
        "28vw": "28vw",
        "20vw": "20vw",
      },
      colors: {
        black: "#0C0A0B",
        "mb-green-100": "#B2FFE4",
        "mb-green-200": "#02E0A8",
        "mb-green-300": "#3BC482",
        "mb-blue-100": "#00B1FF",
        "mb-blue-200": "#00A4DA",
        "mb-orange-100": "#F59336",
        "mb-purple-100": "#5C1FD6",
      },
      boxShadow: {
        "mb-outline": "0 0 0 3px #ffffff;",
        "mb-outline-lg": "0 0 0 6px #ffffff;",
        "mb-outline-green": "0 0 0 1rem #B2FFE4;",
        "mb-outline-darkgreen": "0 0 0 1rem #02E0A8;",
        "mb-outline-darkgreen-sm": "0 0 0 2px #3BC482;",
        "mb-drop": "-8px 12px 8px 0 rgba(0, 0, 0, 0.16)",
        "mb-drop-center": "0 12px 8px 0 rgba(0, 0, 0, 0.16)",
        "mb-drop-center-sm": "0 4px 6px 0 rgba(0, 0, 0, 0.16)",
      },
      inset: {
        "mb-1": "1rem",
        "mb-1n": "-1rem",
        "mb-3": "3rem",
      },
      minWidth: {
        "12rem": "12rem",
        lg: "32rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        120: "30rem",
      },
      backgroundImage: () => ({
        callToAction: "url(../assets/images/banners/robots-lg.png)",
      }),
      height: {
        50: "50%",
        65: "65%",
        35: "35%",
        customProject: "calc(100vh - 30rem)",
      },
    },
    fontFamily: {
      body: ["Montserrat", "sans-serif"],
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["active"]),
    textColor: ({ after }) => after(["group-hover", "focus-within"]),
  },
  plugins: [],
};
