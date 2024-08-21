/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				pulse: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" },
				},
				spin: {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},
			},
			animation: {
				fadeIn: "fadeIn .7s ease-in-out",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				spin: "spin 1s linear infinite",
			},
		},
	},
	plugins: [],
};
