
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import img1 from '../../../public/NoDataImg-2.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';


const MostRequestedItems = ({ onNavigateToAllRequests }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: mostRequestedItems = [], isLoading } = useQuery({
    queryKey: ['mostRequestedItems', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/most-requested-items/${user?.email}`);
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 mb-20 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-6 md:mb-16">
          <div className="inline-block ">
            <h2 className="text-2xl md:text-3xl text-center font-bold text-[#9538E2] animate__animated animate__fadeInUp">
              Most Requested Items
            </h2>
          </div>
        </div>
        
        {mostRequestedItems.length === 0 ? (
          <div className="flex flex-col md:flex-row items-center justify-center rounded-2xl p-6 animate__animated animate__fadeInUp">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
              <img 
                src={img1} 
                alt="No data illustration" 
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl text-[#9538E2] font-semibold mb-3">No Top Requested Items</h3>
              <p className="text-gray-300 font-medium leading-relaxed">
                Currently, there are no standout requested assets. 
                As the HR manager, you can track asset requests to understand team needs.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeInUp">
            {mostRequestedItems.map((item) => (
              <div key={item._id} className="flex justify-center">
                <div className="w-full h-[280px] relative overflow-hidden group cursor-pointer rounded-2xl border border-gray-700 hover:border-purple-600/50 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-2">
                  {/* Asset Image */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col px-4">
                    <h1 className="text-[1.5rem] font-bold text-white text-center capitalize mb-2">
                      {item.productName}
                    </h1>
                    <p className="text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[0.9rem] mb-2 font-medium">
                      Type: {item.productType}
                      <br />
                      Requested: {item.requestCount} times
                    </p>
                    {onNavigateToAllRequests ? (
                      <button 
                        onClick={onNavigateToAllRequests}
                        className="z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-6 py-2 mt-3 rounded-xl text-[0.9rem] bg-gradient-to-r from-[#9538E2] to-purple-700 text-white hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 border-none font-semibold shadow-lg shadow-purple-900/25 hover:scale-105"
                      >
                        View Details
                      </button>
                    ) : (
                      <Link to='/allRequest'> 
                        <button className="z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-6 py-2 mt-3 rounded-xl text-[0.9rem] bg-gradient-to-r from-[#9538E2] to-purple-700 text-white hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 border-none font-semibold shadow-lg shadow-purple-900/25 hover:scale-105">
                          View Details
                        </button>
                      </Link>
                    )}
                  </div>

                  {/* Bottom Shadow Gradient */}
                  <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.8)] h-[100%] absolute bottom-0 left-0 right-0"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MostRequestedItems;