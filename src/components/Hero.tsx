import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="min-h-screen pt-24 flex items-center bg-gradient-to-br from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div 
          className={`flex flex-col md:flex-row items-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 ease-out`}
        >
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
              Elevate Your <span className="font-medium text-amber-700">Style</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Discover curated fashion that embodies elegance, quality, and timeless sophistication.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('products');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-sm hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Collection
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200 to-amber-100 opacity-30 rounded-lg transform -rotate-6"></div>
              <img 
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Elegant fashion" 
                className="relative rounded-lg shadow-lg w-full h-auto object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;