import React from 'react';
import { FaChartLine, FaShieldAlt, FaUsers, FaRocket } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaChartLine size={32} className="text-[#9538E2]" />,
      title: "Advanced Analytics",
      description: "Comprehensive data analysis and reporting tools to help you make informed investment decisions and track performance."
    },
    {
      icon: <FaShieldAlt size={32} className="text-[#9538E2]" />,
      title: "Secure Platform",
      description: "Bank-level security measures to protect your assets and ensure the highest standards of data protection."
    },
    {
      icon: <FaRocket size={32} className="text-[#9538E2]" />,
      title: "Innovation First",
      description: "Cutting-edge technology and continuous innovation to provide you with the best asset management solutions."
    },
    {
      icon: <FaUsers size={32} className="text-[#9538E2]" />,
      title: "Expert Support",
      description: "Our team of experienced professionals provides dedicated support and guidance to help you achieve your investment objectives."
    }
  ];

  return (
    <div className="py-16 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main About Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#9538E2]">
              Welcome to AssetVerse
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed">
              AssetVerse is a leading asset management platform that combines innovative technology with financial expertise to deliver exceptional investment solutions. We empower organizations and individuals to manage, track, and optimize their assets with precision and confidence.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700 hover:border-purple-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 cursor-pointer transform hover:-translate-y-2"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-3xl"></div>
            <div className="relative z-10 text-center">
              <div className="inline-block p-3 mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#9538E2]">
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To revolutionize asset management through cutting-edge technology and exceptional service, enabling our clients to achieve their financial goals with confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;