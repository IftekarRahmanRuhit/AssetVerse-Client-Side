
import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      title: "Streamline Your HR Management",
      subtitle: "Efficient Asset Management Solutions for HR Professionals",
      buttonText: "Join as HR Manager",
      handleClick: () => navigate('/hrRegister'),
      imgSrc: "https://i.ibb.co.com/s9p7QM2C/hr-specialist.webp"
    },
    {
      id: 2,
      title: "Manage Your Assets Effectively",
      subtitle: "Simple and Intuitive Asset Tracking for Employees",
      buttonText: "Join as Employee",
      handleClick: () => navigate('/register'),
      imgSrc: "https://i.ibb.co.com/tbsbMrj/Banner-Img2.jpg"
    }
  ];

  useEffect(() => {
    if (!isAnimating) {
      const timer = setInterval(() => {
        handleNextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAnimating]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection('right');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection('left');
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const getSlideStyles = (index) => {
    if (index === currentSlide) {
      return {
        transform: 'rotateY(0deg)',
        transition: 'transform 1s ease',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        zIndex: 1,
      };
    } else if (
      (direction === 'right' && index === (currentSlide - 1 + slides.length) % slides.length) ||
      (direction === 'left' && index === (currentSlide + 1) % slides.length)
    ) {
      return {
        transform: `rotateY(${direction === 'right' ? '-90deg' : '90deg'})`,
        transition: 'transform 1s ease',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        zIndex: 0,
      };
    }
    return {
      transform: `rotateY(${direction === 'right' ? '90deg' : '-90deg'})`,
      transition: 'transform 1s ease',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      zIndex: 0,
    };
  };

  return (
    <div className="relative overflow-hidden perspective w-full">
      <div className="relative h-[500px] md:h-[600px]">
        <div className="relative h-full" style={{ perspective: '1000px' }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute top-0 left-0 w-full h-full"
              style={getSlideStyles(index)}
            >
              <img
                src={slide.imgSrc}
                alt={slide.title}
                className="w-full h-full object-fill md:object-fill "
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8">
                    {slide.subtitle}
                  </p>
                  <button 
                    onClick={slide.handleClick}
                    className="btn bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l transition-all duration-300 border-none btn-lg"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevSlide}
          disabled={isAnimating}
          className="btn btn-circle btn-ghost hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        >
          <MdChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={handleNextSlide}
          disabled={isAnimating}
          className="btn btn-circle btn-ghost hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        >
          <MdChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setDirection(index > currentSlide ? 'right' : 'left');
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 1000);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              disabled={isAnimating}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;