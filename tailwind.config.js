/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#F2F0EB",
        muted: "#8B8B93",
        faint: "#5A5A61",
        line: "rgba(255,255,255,0.10)",
        violet: {
          DEFAULT: "#6D5DF6",
          soft: "#A79BFF",
        },
        amber: {
          DEFAULT: "#E4B363",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "1240px",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-18px,0) scale(1.06)" },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
