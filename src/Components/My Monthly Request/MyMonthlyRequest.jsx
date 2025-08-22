import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-2.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useCompanyInfo from '../../Hooks/useCompanyInfo';

const MyMonthlyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { companyInfo } = useCompanyInfo();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: monthlyRequests = [], isLoading } = useQuery({
    queryKey: ['employeeMonthlyRequests', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-monthly-request/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  // Pagination calculations
  const totalPages = Math.ceil(monthlyRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = monthlyRequests.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return(
      <div className="flex items-center justify-center p-6">
        <div className="text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4 py-10 relative'>
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-block p-2 ">
            <h2 className="text-2xl font-bold text-[#9538E2]">My Monthly Requests</h2>
          </div>
        </div>

        {companyInfo?.companyName === null ? (
          <div className="flex items-center justify-center rounded-2xl p-8">
            <div className="w-1/2 mr-8">
              <img 
                src={img1} 
                alt="No Company Affiliation" 
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl font-bold text-[#9538E2] mb-4">Company Affiliation Needed</h3>
              <p className="text-gray-300 font-medium leading-relaxed">
                You are currently not affiliated with any company. 
                Please contact your HR department to get registered 
                and start submitting asset requests.
              </p>
            </div>
          </div>
        ) : monthlyRequests.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl p-8">
            <div className="w-1/2 mr-8">
              <img 
                src={img1} 
                alt="No Monthly Requests" 
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-[#9538E2] mb-4">No Monthly Requests</h3>
              <p className="text-gray-300 font-medium leading-relaxed">
                You have not made any asset requests this month. 
                Submit a new request when you need an asset for your work.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-6">
              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-800/50 text-white uppercase text-sm leading-normal">
                      <th className="py-4 px-4 text-center">Asset Name</th>
                      <th className="py-4 px-4 text-center">Type</th>
                      <th className="py-4 px-4 text-center">Date</th>
                      <th className="py-4 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-sm font-semibold text-center">
                    {currentRequests.map((request) => (
                      <tr key={request._id} className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors duration-300">
                        <td className="py-4 px-4 whitespace-nowrap">{request.assetName}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg
                            ${request.assetType === 'Returnable' 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-900/25' 
                              : 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-green-900/25'}`}>
                            {request.assetType}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {format(new Date(request.requestDate), 'PP')}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`py-1 px-3 rounded-full text-xs font-medium shadow-lg
                            ${request.status === 'pending' ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-yellow-900/25' :
                              request.status === 'approved' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-green-900/25' :
                              'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-900/25'}`}>
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      currentPage === index + 1 
                        ? 'bg-gradient-to-r from-[#9538E2] to-purple-700 text-white shadow-lg shadow-purple-900/25' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyMonthlyRequest;