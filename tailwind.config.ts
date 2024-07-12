import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#36BA98', 
        secondary: '#E9C46A', 
        accent: '#F4A261', 
        danger: '#E76F51',
        dangerPlus: '#8F4532'
      },
    },
  },
  plugins: [],
};
export default config;
