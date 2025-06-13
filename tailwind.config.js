
export default  {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add your source folders here
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        
        rumbo: {
            
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        
        rumbo: 'rumbo 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};