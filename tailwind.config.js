import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['selector', '[data-theme="dark"]'],
    important: '#app',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/primereact/**/*.{js,ts,jsx,tsx}',],
    theme: {
    	colors: 'false',
    	fontWeight: {
			fontWeightLight: 300,
			fontWeightRegular: 400,
			fontWeightMedium: 500,
			fontWeightBold: 700,
		},
    	screens: {
    		sm: '480px',
    		md: '768px',
    		lg: '976px',
    		xl: '1280px',
    		'2xl': '1536px',
    		'3xl': '1650px'
    	},
    	//borderRadius: 'false',
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
			boxShadow: {
				'card2': '0 0 22px rgba(0, 0, 0, 0.06)',
			},
    		colors: {
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
    			},
				'primary-50': 'rgb(var(--primary-50))',
				'primary-100': 'rgb(var(--primary-100))',
				'primary-200': 'rgb(var(--primary-200))',
				'primary-300': 'rgb(var(--primary-300))',
				'primary-400': 'rgb(var(--primary-400))',
				'primary-500': 'rgb(var(--primary-500))',
				'primary-600': 'rgb(var(--primary-600))',
				'primary-700': 'rgb(var(--primary-700))',
				'primary-800': 'rgb(var(--primary-800))',
				'primary-900': 'rgb(var(--primary-900))',
				'primary-950': 'rgb(var(--primary-950))',
				'surface-0': 'rgb(var(--surface-0))',
				'surface-50': 'rgb(var(--surface-50))',
				'surface-100': 'rgb(var(--surface-100))',
				'surface-200': 'rgb(var(--surface-200))',
				'surface-300': 'rgb(var(--surface-300))',
				'surface-400': 'rgb(var(--surface-400))',
				'surface-500': 'rgb(var(--surface-500))',
				'surface-600': 'rgb(var(--surface-600))',
				'surface-700': 'rgb(var(--surface-700))',
				'surface-800': 'rgb(var(--surface-800))',
				'surface-900': 'rgb(var(--surface-900))',
				'surface-950': 'rgb(var(--surface-950))'
    		}
    	}
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.y-center': {
					display: 'flex',
					alignItems: 'center',
				},
				'.x-center': {
					display: 'flex',
					justifyContent: 'center',
				},
				'.xy-center': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				},
				'.m-auto': {
					margin: 'auto',
				},
				'.mx-auto': {
					margin: 'auto 0',
				},
				'.my-auto': {
					margin: '0 auto',
				},
				'.text-2xs': {
					fontSize: '.60rem',
				}
            };

            addUtilities(newUtilities);
        }),
        tailwindcssAnimate
    ],
};
