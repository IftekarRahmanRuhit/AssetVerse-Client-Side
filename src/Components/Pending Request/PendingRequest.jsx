import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-1.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import "animate.css";

const PendingRequest = () => {
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
        <div className=" flex items-center justify-center min-h-screen text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      );
  }

  return (
    <div className=" mx-auto px-4 py-10 bg-[#212428] pb-16">
      <h2 className="text-2xl md:text-3xl text-[#9538E2] font-bold text-center mb-6 animate__animated animate__backInDown">Recent Pending Requests</h2>

      {pendingRequests.length === 0 ? (
        <div className="flex items-center justify-center  rounded-lg p-8 animate__animated animate__fadeInUp">
          <div className="w-1/2 mr-8">
            <img 
              src={img1} 
              alt="No Pending Requests" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-3xl text-[#9538E2] font-semibold mb-4">No Pending Requests</h3>
            <p className="text-gray-400 font-medium">
              Currently, there are no pending asset requests. As new requests come in, 
              they will appear here for your review.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto animate__animated animate__fadeInUp ">
          <table className="min-w-full bg-[#1B1D21] border border-gray-500 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-gray-800 font-bold uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-center ">Asset Name</th>
                <th className="py-3 px-4 text-center">Requester</th>
                <th className="py-3 px-4 text-center">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-400 text-sm font-light cursor-pointer">
              {pendingRequests.map((request) => (
                <tr key={request._id} className="border-b border-gray-500 hover:bg-[#212428]">
                  <td className="py-3 px-4 text-center text-gray-400 font-semibold whitespace-nowrap">{request.assetName}</td>
                  <td className="py-3 px-4 text-center text-gray-400 font-semibold whitespace-nowrap">{request.requesterName}</td>
                  <td className="py-3 px-4 text-center text-gray-400 font-semibold whitespace-nowrap">
                    {format(new Date(request.requestDate), 'PP')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-yellow-100 font-bold  text-yellow-600 py-1 px-3 rounded-full text-xs">
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link 
                      to="/allrequest" 
                     
                    >
                      <button className='btn btn-sm bg-[#9538E2] hover:bg-[#a65ce3] text-white border-none'>View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRequest;