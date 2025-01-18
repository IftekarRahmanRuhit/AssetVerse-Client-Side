
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import AssetPDF from "../../../Components/AssetPDF/AssetPDF";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['myAssetRequests', searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myAssetRequest/${user?.email}?search=${searchTerm}&status=${statusFilter}&type=${typeFilter}`
      );
      return response.data;
    }
  });

  const handleCancel = async (id) => {
    try {
      await axiosSecure.patch(`/asset-request-status/${id}`, { status: 'cancelled' });
      toast.success('Request cancelled successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to cancel request');
    }
  };

  const handleReturn = async (id) => {
    try {
      await axiosSecure.patch(`/return-asset/${id}`);
      toast.success('Asset returned successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to return asset');
    }
  };

  return (
    <section className='container px-4 mx-auto my-12'>
      <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center justify-between gap-4 mb-6'>
        {/* Search and Filters */}
        <div className='flex flex-col md:flex-row gap-4'>
          <input
            type="text"
            placeholder="Search by asset name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-40 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-40 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Asset Name</th>
              <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Type</th>
              <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Request Date</th>
              <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Approval Date</th>
              <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Status</th>
              <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className='px-4 py-4 text-sm text-gray-500'>{request.assetName}</td>
                <td className='px-4 py-4 text-sm text-gray-500'>
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${request.assetType === 'Returnable' 
                      ? 'bg-blue-100/60 text-blue-500' 
                      : 'bg-green-100/60 text-green-500'}`}>
                    {request.assetType}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-gray-500'>
                  {format(new Date(request.requestDate), 'PP')}
                </td>
                <td className='px-4 py-4 text-sm text-gray-500'>
                  {request.approvalDate ? format(new Date(request.approvalDate), 'PP') : '-'}
                </td>
                <td className='px-4 py-4 text-sm'>
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${request.status === 'pending' ? 'bg-yellow-100/60 text-yellow-500' :
                      request.status === 'approved' ? 'bg-green-100/60 text-green-500' :
                      request.status === 'returned' ? 'bg-blue-100/60 text-blue-500' :
                      'bg-red-100/60 text-red-500'}`}>
                    {request.status}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm'>
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-100 rounded-md"
                    >
                      Cancel
                    </button>
                  )}
                  
                  {request.status === 'approved' && (
                    <div className="flex gap-2">
                      <PDFDownloadLink
                        document={<AssetPDF request={request} />}
                        fileName={`asset-${request._id}.pdf`}
                        className="px-3 py-1 text-blue-500 hover:bg-blue-100 rounded-md"
                      >
                        Print
                      </PDFDownloadLink>
                      
                      {request.assetType === 'Returnable' && request.status === 'approved' && (
                        <button
                          onClick={() => handleReturn(request._id)}
                          className="px-3 py-1 text-green-500 hover:bg-green-100 rounded-md"
                        >
                          Return
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyAssets;