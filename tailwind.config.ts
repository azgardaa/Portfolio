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
      width: {
        '20p': '20%',
        '40p': '40%',
        '60p': '60%',
        '80p': '80%',
        '100p': '100%',
      },
      height: {
        '20p': '20%',
        '40p': '40%',
        '60p': '60%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      },
      colors: {
        primary: '#27374D', 
        secondary: '#526D82', 
        accent: '#9DB2BF', 
        danger: '#DDE6ED',
        dangerPlus: '#DDE6ED'
      },
    },
  },
  plugins: [],
};
export default config;
