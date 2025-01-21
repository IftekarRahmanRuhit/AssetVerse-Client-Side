import React from 'react';
import { useNavigate } from 'react-router-dom';
// import img1 from "../../../public/bannerImg1.jpeg"
// import img2 from "../../../public/bannerImg2.jpeg"
// Simple SVG arrow icons
const ChevronLeft = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const Banner = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Streamline Your HR Management",
      subtitle: "Efficient Asset Management Solutions for HR Professionals",
      buttonText: "Join as HR Manager",
      handleClick: () => navigate('/hrRegister'),
      imgSrc: "/public/bannerImg1.jpg"
    },
    {
      id: 2,
      title: "Manage Your Assets Effectively",
      subtitle: "Simple and Intuitive Asset Tracking for Employees",
      buttonText: "Join as Employee",
      handleClick: () => navigate('/register'),
      imgSrc: "/public/bannerImg2.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative "
          >
            {/* Placeholder image - replace src with your actual image path */}
            <img
              src={slide.imgSrc}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Content Overlay */}
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
                  className="btn btn-primary btn-lg"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="btn btn-circle btn-ghost absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="btn btn-circle btn-ghost absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
      >
        <ChevronRight />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;