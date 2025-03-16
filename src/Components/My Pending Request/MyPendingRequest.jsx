
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-1.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useCompanyInfo from '../../Hooks/useCompanyInfo';

const MyPendingRequest = () => {
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
        <div className=" flex items-center justify-center min-h-screen text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      );
  }

  return (

    <div className='px-4 py-10 bg-[#212428] '>

    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#9538E2] text-center mb-6">My Pending Requests</h2>

      {companyInfo?.companyName === null ? (
        <div className="flex items-center justify-center  rounded-lg p-8">
          <div className="w-1/2 mr-8">
            <img 
              src={img1} 
              alt="No Company Affiliation" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-2xl text-[#9538E2] font-bold mb-4">Company Affiliation Needed</h3>
            <p className="text-gray-400 font-medium">
              You are currently not affiliated with any company. 
              Please contact your HR department to get registered 
              and start submitting asset requests.
            </p>
          </div>
        </div>
      ) : pendingRequests.length === 0 ? (
        <div className="flex items-center justify-center  rounded-lg p-8">
          <div className="w-1/2 mr-8">
            <img 
              src={img1} 
              alt="No Pending Requests" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-2xl text-[#9538E2] font-bold mb-4">No Pending Requests</h3>
            <p className="text-gray-400 font-medium">
              You currently have no pending asset requests. Submit a new request 
              when you need an asset for your work.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-500 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-gray-800 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-center">Asset Name</th>
                <th className="py-3 px-4 text-center">Type</th>
                <th className="py-3 px-4 text-center">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-400 text-sm font-semibold text-center ">
              {pendingRequests.map((request) => (
                <tr key={request._id} className="bg-[#1B1D21] border-b border-gray-500 hover:bg-[#212428]">
                  <td className="py-3 px-4 whitespace-nowrap">{request.assetName}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs
                      ${request.assetType === 'Returnable' 
                        ? 'bg-blue-100 text-blue-500' 
                        : 'bg-green-100 text-green-500'}`}>
                      {request.assetType}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {format(new Date(request.requestDate), 'PP')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link 
                      to="/myAssets" 
                      className="btn btn-sm text-white hover:bg-purple-600 bg-purple-500  transition duration-300 border-none"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    

  );
};

export default MyPendingRequest