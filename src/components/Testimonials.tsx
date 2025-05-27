import React, { useEffect, useRef, useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "MNboutique has completely transformed my wardrobe. Their pieces are not just clothing, but investments in timeless style. The quality is unmatched.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Executive",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "I've been shopping at MNboutique for years, and their attention to detail continues to impress me. Their personalized service makes finding the perfect pieces effortless.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Roberts",
      role: "Lifestyle Blogger",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "As someone who values both aesthetics and quality, MNboutique consistently exceeds my expectations. Their collections are curated with an expert eye for style.",
      rating: 5
    },
    {
      id: 4,
      name: "David Williams",
      role: "Art Director",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "The level of craftsmanship in MNboutique's pieces is remarkable. Every item I've purchased has become a staple in my wardrobe, versatile and enduring.",
      rating: 4
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
    <section id="testimonials" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className={`text-center mb-16 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 ease-out`}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Client <span className="font-medium text-amber-700">Experiences</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover what our valued clients have to say about their journey with MNboutique and the 
            impact our carefully curated collections have made on their style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-amber-100 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } transition-all duration-1000 ease-out`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-amber-100"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < testimonial.rating 
                        ? 'text-amber-500' 
                        : 'text-gray-300'
                    }`}
                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;