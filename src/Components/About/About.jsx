import React from 'react';
import { BiBuildingHouse } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { MdSecurity } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <BiBuildingHouse size={32} className="text-[#9538E2]" />,
      title: "Comprehensive Asset Management",
      description: "AssetVerse provides state-of-the-art solutions for managing diverse portfolios, from real estate to financial instruments, all in one unified platform."
    },
    {
      icon: <BsGraphUp size={32} className="text-[#9538E2]" />,
      title: "Data-Driven Insights",
      description: "Leverage advanced analytics and real-time reporting to make informed decisions about your assets and optimize your investment strategy."
    },
    {
      icon: <MdSecurity size={32} className="text-[#9538E2]" />,
      title: "Secure & Reliable",
      description: "Your assets are protected by industry-leading security protocols, ensuring safe and confidential management of your valuable investments."
    },
    {
      icon: <FaUsers size={32} className="text-[#9538E2]" />,
      title: "Expert Support",
      description: "Our team of experienced professionals provides dedicated support and guidance to help you achieve your investment objectives."
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-[#9538E2] mb-4">
            Welcome to AssetVerse
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg  text-gray-800">
              AssetVerse is a leading asset management platform that combines innovative technology with financial expertise to deliver exceptional investment solutions. We empower organizations and individuals to manage, track, and optimize their assets with precision and confidence.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center bg-purple-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-[#9538E2]  mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            To revolutionize asset management through cutting-edge technology and exceptional service, enabling our clients to achieve their financial goals with confidence and peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;