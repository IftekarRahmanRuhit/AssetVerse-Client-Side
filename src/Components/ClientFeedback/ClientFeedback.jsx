
import React, { useState, useEffect } from 'react';
import { BsArrowLeft, BsArrowRight, BsStarFill } from 'react-icons/bs';


const ClientFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Financial Director",
      company: "Tech Innovations Ltd",
      image: "https://i.ibb.co.com/wJ18SX7/client-3.jpg",
      rating: 5,
      feedback: "AssetVerse has transformed how we manage our company's assets. The platform's intuitive interface and comprehensive features have saved us countless hours and improved our efficiency by 40%."
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      company: "Global Solutions Corp",
      image: "https://i.ibb.co.com/NT05Q0W/client-1.jpg",
      rating: 5,
      feedback: "The level of detail and control AssetVerse provides is outstanding. We've been able to track and optimize our asset utilization like never before. Their customer support is equally impressive."
    },
    {
      name: "Emily Rodriguez",
      position: "Asset Manager",
      company: "Investment Partners",
      image: "https://i.ibb.co.com/njVhdzL/client-4.png",
      rating: 5,
      feedback: "Since implementing AssetVerse, we've seen a 30% reduction in asset-related errors and significant improvement in our reporting accuracy. It's an indispensable tool for our operations."
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-10 sm:py-16 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block ">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#9538E2] mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-300">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons - Hidden on mobile */}
          <button 
            onClick={handlePrevious}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 sm:-translate-x-12 bg-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all z-10 border border-gray-600"
          >
            <BsArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-300" />
          </button>

          <button 
            onClick={handleNext}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 sm:translate-x-12 bg-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all z-10 border border-gray-600"
          >
            <BsArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-300" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 relative border border-gray-700">
            {/* Mobile Navigation - Swipe Area */}
            <div 
              className="absolute inset-y-0 left-0 right-0 sm:hidden z-10"
              onClick={handleNext}
            />

            <div className="flex flex-col items-center text-center">
              <img 
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 sm:mb-4 ring-2 ring-purple-500/50"
              />
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <BsStarFill key={i} className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
                ))}
              </div>

              {/* Feedback Text */}
              <p className="text-gray-300 font-medium text-base sm:text-lg mb-4 sm:mb-6 italic leading-relaxed">
                "{testimonials[currentIndex].feedback}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm sm:text-base text-gray-400">
                  {testimonials[currentIndex].position}
                </p>
                <p className="text-sm sm:text-base text-[#9538E2] font-medium">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#9538E2] w-6 sm:w-8 shadow-lg shadow-purple-900/50' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFeedback;