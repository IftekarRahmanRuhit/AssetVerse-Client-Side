import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const AnimatedPricingCard = ({ pkg, onButtonClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative overflow-hidden rounded-lg p-6 cursor-pointer bg-[#212428]  border border-[#9538e277] "
    >
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-[#9538E2] text-white text-sm font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-[#9538E2] mb-2">
          {pkg.name}
        </h3>
        <div className="text-4xl font-bold text-gray-300 mb-4">
          {pkg.price}
          <span className="text-base font-medium text-gray-400">/month</span>
        </div>
        <p className="text-gray-400 font-medium mb-6">
          {pkg.description}
        </p>

        <div className="space-y-4 mb-6">
          {pkg.features.map((feature, idx) => (
            <div key={idx} className="flex items-center">
              <Check className="h-5 w-5 text-[#9538E2] mr-2" />
              <span className="text-gray-400 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onButtonClick}
          className="w-full bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l   border-none font-semibold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#9538E2] focus:ring-offset-2"
        >
          Get Started
        </button>
      </div>

      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none blur-[50px]"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(149, 56, 226, 0.3), transparent)`,
          }}
        />
      )}
    </div>
  );
};

const PricingPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Starter",
      price: "$5",
      description: "Perfect for small teams",
      features: [
        "Maximum 5 employees",
        "Basic asset tracking",
        "Email support",
        "Basic reporting",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$8",
      description: "Ideal for growing businesses",
      features: [
        "Maximum 10 employees",
        "Advanced asset tracking",
        "Priority email support",
        "Advanced reporting",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$15",
      description: "For larger organizations",
      features: [
        "Maximum 20 employees",
        "Complete asset management",
        "24/7 phone support",
        "Custom reporting",
        "Advanced API features"
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-[#1B1D21] py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#9538E2]">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg  text-gray-400">
            Select the perfect package for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <AnimatedPricingCard 
              key={index} 
              pkg={pkg} 
              onButtonClick={() => navigate('/payment')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPackages;