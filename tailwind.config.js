/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        medium: ["Arial"],
        semibold: ["Arial"],
        bold: ["Arial"],
      },
      colors: {
        mautim: "#bf06ac",
        mauxanhtroi: "#2374e1",
      },
      transitionProperty: {
        height: "height",
        width: "width",
        opacity: "opacity",
        colors: "color, background-color, border-color",
      },
      screens: {
        sm: "375px", // Mobile iPhoneX
        md: "767px", // Tablet
        lg: "1024px", // Desktop
        xl: "1280px", // Large desktop
      },
    },
  },
  variants: {},
  plugins: [],
};

// module.exports = {
//   mode: "jit",
//   content: [
//     "./app/**/*.{js,jsx}",
//     "./pages/**/*.{js,jsx}",
//     "./components/**/*.{js,jsx}",

//     // Or if using `src` directory:
//     "./src/**/*.{js,jsx}",
//     "./node_modules/tw-elements/dist/js/**/*.js",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         medium: ["roboto_regular"],
//         semibold: ["roboto_medium"],
//         bold: ["roboto_bold"],
//       },
//       colors: {
//         mautim: "#bf06ac",
//       },
//     },
//   },
//   plugins: [require("tw-elements/dist/plugin")],
// };
