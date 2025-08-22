import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-1.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import "animate.css";

const PendingRequest = ({ onViewAll }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: pendingRequests = [], isLoading } = useQuery({
    queryKey: ['hrPendingRequests', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/hr-pending-request/${user?.email}`);
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
    <div className="mx-auto px-4 py-10 pb-16 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="inline-block mb-6">
            <h2 className="text-2xl md:text-3xl text-[#9538E2] font-bold animate__animated animate__backInDown">
              Recent Pending Requests
            </h2>
          </div>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl p-8 animate__animated animate__fadeInUp">
            <div className="w-1/2 mr-8">
              <img 
                src={img1} 
                alt="No Pending Requests" 
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-3xl text-[#9538E2] font-semibold mb-4">No Pending Requests</h3>
              <p className="text-gray-300 font-medium leading-relaxed">
                Currently, there are no pending asset requests. As new requests come in, 
                they will appear here for your review.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto animate__animated animate__fadeInUp">
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800/50 text-white font-bold uppercase text-sm leading-normal">
                    <th className="py-4 px-4 text-center">Asset Name</th>
                    <th className="py-4 px-4 text-center">Requester</th>
                    <th className="py-4 px-4 text-center">Date</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 text-sm font-light cursor-pointer">
                  {pendingRequests.map((request) => (
                    <tr key={request._id} className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors duration-300">
                      <td className="py-4 px-4 text-center font-semibold whitespace-nowrap">{request.assetName}</td>
                      <td className="py-4 px-4 text-center font-semibold whitespace-nowrap">{request.requesterName}</td>
                      <td className="py-4 px-4 text-center font-semibold whitespace-nowrap">
                        {format(new Date(request.requestDate), 'PP')}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 font-bold text-white py-1 px-3 rounded-full text-xs shadow-lg shadow-yellow-900/25">
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={onViewAll}
                          className='btn btn-sm bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] text-white border-none hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-900/25'
                        >
                          View
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

export default PendingRequest;