import React, { useEffect, useRef, useState } from 'react';
import { ProductCarousel } from './ProductCarousel';
import { Product } from '../types';

const Products: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const womenProducts: Product[] = [
    {
      id: 1,
      name: "Silk Evening Gown",
      description: "Elegant silk gown with delicate embroidery",
      price: "$1,280",
      image: "https://images.pexels.com/photos/7760842/pexels-photo-7760842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Cashmere Sweater",
      description: "Luxurious cashmere in cream",
      price: "$450",
      image: "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Designer Handbag",
      description: "Hand-crafted leather with gold accents",
      price: "$980",
      image: "https://images.pexels.com/photos/5705489/pexels-photo-5705489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      name: "Tailored Blazer",
      description: "Perfect fit with premium materials",
      price: "$795",
      image: "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      name: "Statement Necklace",
      description: "Handcrafted with natural stones",
      price: "$325",
      image: "https://images.pexels.com/photos/10953357/pexels-photo-10953357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  const menProducts: Product[] = [
    {
      id: 6,
      name: "Italian Wool Suit",
      description: "Tailored perfection in charcoal",
      price: "$1,450",
      image: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 7,
      name: "Designer Watch",
      description: "Swiss craftsmanship with gold detailing",
      price: "$2,800",
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 8,
      name: "Leather Briefcase",
      description: "Full-grain leather with brass hardware",
      price: "$650",
      image: "https://images.pexels.com/photos/2996393/pexels-photo-2996393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 9,
      name: "Cashmere Overcoat",
      description: "Timeless style in camel",
      price: "$1,200",
      image: "https://images.pexels.com/photos/4925770/pexels-photo-4925770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 10,
      name: "Silk Tie",
      description: "Hand-finished with subtle pattern",
      price: "$180",
      image: "https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="products" ref={sectionRef} className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className={`text-center mb-16 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 ease-out`}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Our <span className="font-medium text-amber-700">Collection</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover our exquisite selection of handpicked pieces that embody elegance and refinement,
            meticulously crafted for those who appreciate the exceptional.
          </p>
        </div>
        
        <div 
          className={`mb-16 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 ease-out delay-300`}
        >
          <h3 className="text-2xl font-light text-center mb-8">
            Women's <span className="font-medium text-amber-700">Collection</span>
          </h3>
          <ProductCarousel products={womenProducts} />
        </div>
        
        <div 
          className={`${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 ease-out delay-500`}
        >
          <h3 className="text-2xl font-light text-center mb-8">
            Men's <span className="font-medium text-amber-700">Collection</span>
          </h3>
          <ProductCarousel products={menProducts} />
        </div>
      </div>
    </section>
  );
};

export default Products;