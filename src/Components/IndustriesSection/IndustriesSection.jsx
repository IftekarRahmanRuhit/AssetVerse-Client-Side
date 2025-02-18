import React from 'react';
import { FaLaptopCode, FaHospital, FaIndustry, FaGraduationCap, FaLandmark, FaShoppingCart } from 'react-icons/fa';

const IndustriesSection = () => {
  const industries = [
    {
      title: 'IT & Tech',
      description: 'Streamline your IT asset management with comprehensive tracking and maintenance solutions.',
      icon: FaLaptopCode,
      color: 'text-blue-600'
    },
    {
      title: 'Healthcare',
      description: 'Manage medical equipment and resources efficiently while ensuring compliance with regulations.',
      icon: FaHospital,
      color: 'text-red-600'
    },
    {
      title: 'Manufacturing',
      description: 'Keep track of machinery, equipment, and production assets to optimize operations.',
      icon: FaIndustry,
      color: 'text-yellow-600'
    },
    {
      title: 'Education',
      description: 'Monitor and maintain educational resources, devices, and facilities effectively.',
      icon: FaGraduationCap,
      color: 'text-green-600'
    },
    {
      title: 'Government & Public Sector',
      description: 'Ensure transparent and efficient management of public assets and resources.',
      icon: FaLandmark,
      color: 'text-purple-600'
    },
    {
      title: 'Retail & E-commerce',
      description: 'Track inventory, manage store assets, and optimize your retail operations seamlessly.',
      icon: FaShoppingCart,
      color: 'text-pink-600'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-100/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#9538E2] mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our asset management solutions are tailored to meet the unique needs of various industries,
            providing specialized features for different sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-full bg-opacity-10 flex items-center justify-center mb-4 ${industry.color.replace('text', 'bg')}`}>
                <industry.icon className={`w-7 h-7 ${industry.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {industry.title}
              </h3>
              <p className="text-gray-600">
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