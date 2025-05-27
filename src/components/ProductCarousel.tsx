import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Product } from '../types';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getVisibleProducts = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) return 4; // xl screens
    if (screenWidth >= 1024) return 3; // lg screens
    if (screenWidth >= 768) return 2;  // md screens
    return 1; // sm screens
  };

  const [visibleProducts, setVisibleProducts] = useState(getVisibleProducts());

  useEffect(() => {
    const handleResize = () => {
      setVisibleProducts(getVisibleProducts());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div 
        ref={carouselRef}
        className="overflow-hidden py-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex transition-transform duration-300 ease-out"
             style={{
               transform: `translateX(-${activeIndex * (100 / visibleProducts)}%)`,
               width: `${(products.length / visibleProducts) * 100}%`
             }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 transition-all duration-300 ${
                index === activeIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
              }`}
              style={{ flex: `0 0 ${100 / visibleProducts}%` }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative group overflow-hidden h-64">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full bg-gradient-to-t from-black to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-medium text-lg">{product.name}</h4>
                      <p className="text-sm text-gray-200">{product.description}</p>
                      <p className="text-amber-300 font-semibold mt-1">{product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md text-amber-700 hover:text-amber-900 transition-all z-10"
        aria-label="Previous product"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md text-amber-700 hover:text-amber-900 transition-all z-10"
        aria-label="Next product"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / visibleProducts) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index * visibleProducts)}
            className={`h-2 w-2 rounded-full mx-1 transition-all ${
              Math.floor(activeIndex / visibleProducts) === index 
                ? 'bg-amber-500 w-4' 
                : 'bg-amber-200 hover:bg-amber-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};