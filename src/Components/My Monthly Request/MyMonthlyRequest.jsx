import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-1.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useCompanyInfo from '../../Hooks/useCompanyInfo';

const MyMonthlyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { companyInfo } = useCompanyInfo();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">My Monthly Requests</h2>

      {companyInfo?.companyName === null ? (
        <div className="flex items-center justify-center bg-yellow-50 rounded-lg p-8">
          <div className="w-1/2 mr-8">
            <img 
              src={img1} 
              alt="No Company Affiliation" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-4">Company Affiliation Needed</h3>
            <p className="text-gray-600">
              You are currently not affiliated with any company. 
              Please contact your HR department to get registered 
              and start submitting asset requests.
            </p>
          </div>
        </div>
      ) : monthlyRequests.length === 0 ? (
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="w-1/2 mr-8">
            <img 
              src={img1} 
              alt="No Monthly Requests" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-4">No Monthly Requests</h3>
            <p className="text-gray-600">
              You have not made any asset requests this month. 
              Submit a new request when you need an asset for your work.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Asset Name</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {currentRequests.map((request) => (
                  <tr key={request._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap">{request.assetName}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs
                        ${request.assetType === 'Returnable' 
                          ? 'bg-blue-100/60 text-blue-500' 
                          : 'bg-green-100/60 text-green-500'}`}>
                        {request.assetType}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {format(new Date(request.requestDate), 'PP')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`py-1 px-3 rounded-full text-xs
                        ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          request.status === 'approved' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'}`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
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
  );
};

export default MyMonthlyRequest;