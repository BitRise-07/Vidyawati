/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      baloo: ["Baloo 2", "cursive"], // Headings
      poppins: ["Poppins", "sans-serif"], // Body & Buttons
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        // 🎨 Edubin theme colors
        "edubin-heading": "#6e44b9",
        edubin: {
          primary: "#ff773d", // Buttons, CTAs
          secondary: "#fcb247", // Hover / highlights
          heading: "#021e40", // Dark navy for titles
          subheading: "#07294d", // Deep navy
          purple: "#6e44b9", // Accent purple
          body: "#333333", // Body text
          muted: "#757575", // Secondary text
          border: "#eeeeee", // Borders & dividers
          bgLight1: "#f9f9f9", // Light background
          bgLight2: "#f8f8f8", // Alternate light background
          almostBlack: "#010101", // Strong black text
        },
        
      },
      maxWidth: {
        container: "1260px",
        containerTab: "650px",
      },
    },
  },
  plugins: [],
};
