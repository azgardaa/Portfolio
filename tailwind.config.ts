import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#212121',
        MGray: '#323232',
        teal: '#0D7377',
        LTeal: '#14FFEC',
      },
    },
  },
  plugins: [],
};
export default config;
