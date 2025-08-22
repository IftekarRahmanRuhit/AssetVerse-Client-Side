
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-1.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useCompanyInfo from '../../Hooks/useCompanyInfo';

const MyPendingRequest = ({ onViewAll }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { companyInfo } = useCompanyInfo();

  const { data: pendingRequests = [], isLoading } = useQuery({
    queryKey: ['employeePendingRequests', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-pending-request/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email
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
    <div className='px-4 py-10 relative'>
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-block p-2 ">
            <h2 className="text-2xl font-bold text-[#9538E2]">My Pending Requests</h2>
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
              <h3 className="text-2xl text-[#9538E2] font-bold mb-4">Company Affiliation Needed</h3>
              <p className="text-gray-300 font-medium leading-relaxed">
                You are currently not affiliated with any company. 
                Please contact your HR department to get registered 
                and start submitting asset requests.
              </p>
            </div>
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl p-8">
            <div className="w-1/2 mr-8">
              <img 
                src={img1} 
                alt="No Pending Requests" 
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl text-[#9538E2] font-bold mb-4">No Pending Requests</h3>
              <p className="text-gray-300 font-medium leading-relaxed">
                You currently have no pending asset requests. Submit a new request 
                when you need an asset for your work.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800/50 text-white uppercase text-sm leading-normal">
                    <th className="py-4 px-4 text-center">Asset Name</th>
                    <th className="py-4 px-4 text-center">Type</th>
                    <th className="py-4 px-4 text-center">Date</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 text-sm font-semibold text-center">
                  {pendingRequests.map((request) => (
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
                        <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-1 px-3 rounded-full text-xs font-medium shadow-lg shadow-yellow-900/25">
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={onViewAll}
                          className="px-4 py-2 text-white hover:scale-105 bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 border-none shadow-lg shadow-purple-900/25 rounded-lg font-medium text-sm"
                        >
                          View Assets
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPendingRequest;