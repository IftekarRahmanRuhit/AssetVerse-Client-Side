
import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      id: 1,
      title: "AssetVerse - Smart Asset Management",
      subtitle: "Streamline your company's asset tracking with our comprehensive HR management platform. Track, manage, and optimize your business assets efficiently.",
      buttonText: "Join as HR Manager",
      handleClick: () => navigate('/hrRegister'),
      imgSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Track Your Assets Seamlessly",
      subtitle: "Employees can easily request, track, and manage their assigned assets. Simple interface for better productivity and accountability.",
      buttonText: "Join as Employee",
      handleClick: () => navigate('/register'),
      imgSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 3,
      title: "Complete Asset Lifecycle Management",
      subtitle: "From procurement to retirement, manage every aspect of your company's assets. Real-time tracking, maintenance alerts, and detailed reporting.",
      buttonText: "Get Started Today",
      handleClick: () => navigate('/register'),
      imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full -mt-16">
      {/* Main Banner Container */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={slides[currentSlide].imgSrc}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/45"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-5xl mx-auto">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
            
            {/* CTA Button */}
            <button 
              onClick={slides[currentSlide].handleClick}
              className="bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-900/50"
            >
              {slides[currentSlide].buttonText}
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-gray-600"
        >
          <MdChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-gray-600"
        >
          <MdChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;