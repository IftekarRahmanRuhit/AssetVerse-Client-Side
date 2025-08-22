import React from 'react';
import { FaLaptopCode, FaHospital, FaIndustry, FaGraduationCap, FaLandmark, FaShoppingCart } from 'react-icons/fa';

const IndustriesSection = () => {
  const industries = [
    {
      title: 'IT & Tech',
      description: 'Streamline your IT asset management with comprehensive tracking and maintenance solutions.',
      icon: FaLaptopCode,
      color: 'text-blue-400'
    },
    {
      title: 'Healthcare',
      description: 'Manage medical equipment and resources efficiently while ensuring compliance with regulations.',
      icon: FaHospital,
      color: 'text-red-400'
    },
    {
      title: 'Manufacturing',
      description: 'Keep track of machinery, equipment, and production assets to optimize operations.',
      icon: FaIndustry,
      color: 'text-yellow-400'
    },
    {
      title: 'Education',
      description: 'Monitor and maintain educational resources, devices, and facilities effectively.',
      icon: FaGraduationCap,
      color: 'text-green-400'
    },
    {
      title: 'Government & Public Sector',
      description: 'Ensure transparent and efficient management of public assets and resources.',
      icon: FaLandmark,
      color: 'text-purple-400'
    },
    {
      title: 'Retail & E-commerce',
      description: 'Track inventory, manage store assets, and optimize your retail operations seamlessly.',
      icon: FaShoppingCart,
      color: 'text-pink-400'
    }
  ];

  return (
    <section className="py-16 px-4 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h2 className="text-3xl  md:text-4xl font-bold text-[#9538E2] ">
              Industries We Serve
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our asset management solutions are tailored to meet the unique needs of various industries,
            providing specialized features for different sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 hover:border-purple-600/50 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <industry.icon className={`w-7 h-7 ${industry.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                {industry.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;