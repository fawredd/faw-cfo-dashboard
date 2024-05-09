import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0000ff",
          secondary: "#00dd00",
          accent: "#00c2ff",
          neutral: "#1d1a15",
          "base-100": "#302929",
          info: "#00c4ff",
          success: "#009451",
          warning: "#b88900",
          error: "#f12748",
        },
      },
    ],
  },
};
export default config;
