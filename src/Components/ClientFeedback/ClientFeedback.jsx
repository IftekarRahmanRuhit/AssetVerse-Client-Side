import React, { useState, useEffect } from 'react';
import { BsArrowLeft, BsArrowRight, BsStarFill } from 'react-icons/bs';

const ClientFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Financial Director",
      company: "Tech Innovations Ltd",
      image: "/public/client-3.jpg",
      rating: 5,
      feedback: "AssetVerse has transformed how we manage our company's assets. The platform's intuitive interface and comprehensive features have saved us countless hours and improved our efficiency by 40%."
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      company: "Global Solutions Corp",
      image: "/public/client-1.jpg",
      rating: 5,
      feedback: "The level of detail and control AssetVerse provides is outstanding. We've been able to track and optimize our asset utilization like never before. Their customer support is equally impressive."
    },
    {
      name: "Emily Rodriguez",
      position: "Asset Manager",
      company: "Investment Partners",
      image: "/public/client-4.png",
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
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all z-10"
          >
            <BsArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all z-10"
          >
            <BsArrowRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <img 
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <BsStarFill key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>

              {/* Feedback Text */}
              <p className="text-gray-600 text-lg mb-6 italic">
                "{testimonials[currentIndex].feedback}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].position}
                </p>
                <p className="text-blue-600 font-medium">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
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