
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import img1 from '../../../public/NoDataImg-2.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';


const MostRequestedItems = () => {
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
    return <div className="text-center text-gray-300 py-8">Loading most requested items...</div>;
  }

  return (
    <div className=" rounded-lg p-6 mb-20 bg-[#1B1D21]">
      <h2 className="text-2xl md:text-3xl text-center font-bold text-[#9538E2] mb-6  md:mb-16 animate__animated animate__fadeInUp">Most Requested Items</h2>
      
      {mostRequestedItems.length === 0 ? (
        <div className="flex flex-col md:flex-row items-center justify-center rounded-lg p-6 animate__animated animate__fadeInUp">
          <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
            <img 
              src={img1} 
              alt="No data illustration" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl text-[#9538E2] font-semibold  mb-3">No Top Requested Items</h3>
            <p className="text-gray-400 font-medium">
              Currently, there are no standout requested assets. 
              As the HR manager, you can track asset requests to understand team needs.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeInUp">
          {mostRequestedItems.map((item) => (
            <div key={item._id} className="flex justify-center">
              <div className="w-full h-[280px] relative overflow-hidden group cursor-pointer rounded-md">
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
                  <p className="text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[0.9rem] mb-2 font-medium ">
                    Type: {item.productType}
                    <br />
                    Requested: {item.requestCount} times
                  </p>
                  <Link to='/allRequest'> <button
                    className="z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-6 py-2 mt-3 rounded-md text-[0.9rem] bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-semibold"
                  >
                    View Details
                  </button></Link>
                </div>

                {/* Bottom Shadow Gradient */}
                <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.8)] h-[100%] absolute bottom-0 left-0 right-0"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostRequestedItems;