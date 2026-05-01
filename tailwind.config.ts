import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				'100': '#5341CD',
  				DEFAULT: '#6C5CE7'
  			},
  			red: '#FF7474',
  			error: '#ba1a1a',
  			green: '#00CEC9',
  			blue: '#56B8FF',
  			pink: '#FD79A8',
  			orange: '#F9AB72',
  			light: {
  				'100': '#474554',
  				'200': '#787586',
  				'300': '#E5E0ED',
  				'400': '#F0ECF8'
  			},
  			dark: {
  				'100': '#1C1B23',
  				'200': '#312F38'
  			},
  			surface: {
  				DEFAULT: '#FCF8FF',
  				dim: '#DCD8E4',
  				container: '#F0ECF8',
  				'container-high': '#EBE6F2',
  				'container-highest': '#E5E0ED',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'space-grotesk': ["var(--font-space-grotesk)"],
  			'inter': ["var(--font-inter)"],
  		},
  		boxShadow: {
  			'drop-1': '0px 10px 30px 0px rgba(108, 92, 231, 0.08)',
  			'drop-2': '0 8px 30px 0 rgba(108, 92, 231, 0.3)',
  			'drop-3': '0 8px 30px 0 rgba(108, 92, 231, 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
