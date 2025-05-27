import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className={`flex flex-col lg:flex-row items-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000 ease-out`}
        >
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-light mb-6 inline-block relative">
              About <span className="font-medium text-amber-700">MNboutique</span>
              <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200"></span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Founded with a passion for elegance and sophistication, MNboutique has established itself as a premier destination for discerning fashion enthusiasts. 
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We meticulously curate our collections to reflect the perfect balance of contemporary trends and timeless classics, ensuring each piece resonates with uncompromising quality and exclusive design.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At MNboutique, we believe that true style transcends seasons, making a statement that is uniquely yours while standing the test of time.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-tl-3xl rounded-br-3xl">
                <img 
                  src="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Boutique interior" 
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-tr-3xl rounded-bl-3xl mt-8">
                <img 
                  src="https://images.pexels.com/photos/5705478/pexels-photo-5705478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Fashion details" 
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;