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
      className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer bg-gray-900/80 backdrop-blur-xl border border-gray-700 hover:border-purple-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 transform hover:-translate-y-2"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Mouse follow effect */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none blur-[80px]"
          style={{
            background: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, rgba(149, 56, 226, 0.15), transparent)`,
          }}
        />
      )}

      {pkg.popular && (
        <div className="absolute top-6 right-6 z-10">
          <span className="bg-gradient-to-r from-[#9538E2] to-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-purple-900/50">
            Popular
          </span>
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-[#9538E2] mb-3">
          {pkg.name}
        </h3>
        <div className="text-4xl font-bold text-white mb-2">
          {pkg.price}
          <span className="text-base font-medium text-gray-400">/month</span>
        </div>
        <p className="text-gray-300 font-medium mb-8 leading-relaxed">
          {pkg.description}
        </p>

        <div className="space-y-4 mb-8">
          {pkg.features.map((feature, idx) => (
            <div key={idx} className="flex items-center group/item">
              <div className="p-1 bg-gradient-to-r from-[#9538E2] to-purple-700 rounded-full mr-3 group-hover/item:scale-110 transition-transform duration-300">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-300 font-medium group-hover/item:text-white transition-colors duration-300">{feature}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onButtonClick}
          className="w-full bg-gradient-to-r from-[#9538E2] to-purple-700 text-white hover:from-purple-700 hover:to-[#9538E2] hover:scale-105 border-none font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg shadow-purple-900/50"
        >
          Get Started
        </button>
      </div>
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
    <div className="py-16 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block  mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#9538E2]">
              Choose Your Plan
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
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