module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'sm': '310px',
      // => @media (min-width: 640px) { ... }
  
      'md': '425px',
      // => @media (min-width: 768px) { ... }
  
      'lg': '540px',
      // => @media (min-width: 1024px) { ... }
  
      'xl': '640px',
      // => @media (min-width: 1280px) { ... }
  
      '2xl': '772px',
      // => @media (min-width: 1536px) { ... }
  
      '3xl': '1000px'  
    }
  }
}