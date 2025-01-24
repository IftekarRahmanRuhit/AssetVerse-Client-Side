import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import img1 from '../../../public/NoDataImg-1.png';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Recent Pending Requests</h2>

      {pendingRequests.length === 0 ? (
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="w-1/2 mr-8">
            <img 
              src={img1} 
              alt="No Pending Requests" 
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-3xl font-semibold mb-4">No Pending Requests</h3>
            <p className="text-gray-600">
              Currently, there are no pending asset requests. As new requests come in, 
              they will appear here for your review.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Asset Name</th>
                <th className="py-3 px-4 text-left">Requester</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {pendingRequests.map((request) => (
                <tr key={request._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">{request.assetName}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{request.requesterName}</td>
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
                      to="/allrequest" 
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
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
  );
};

export default PendingRequest;