import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
 daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#008efe",
                   
          "secondary": "#00f8ff",
                   
          "accent": "#876100",
                   
          "neutral": "#252c1c",
                   
          "base-100": "#fffff8",
                   
          "info": "#00abd8",
                   
          "success": "#008e22",
                   
          "warning": "#ff7f00",
                   
          "error": "#da0028",
                   },
      },
    ],
  },
}
export default config
