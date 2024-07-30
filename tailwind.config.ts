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
        primary: '#03224C', 
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
