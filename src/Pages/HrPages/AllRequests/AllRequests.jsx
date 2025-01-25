
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import {Helmet} from "react-helmet-async"

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['assetRequests', searchTerm, user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/allAssetRequest/${user?.email}?search=${searchTerm}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  // Pagination calculations
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i 
              ? 'bg-[#9538E2] text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/asset-request-status/${id}`, { status });
      toast.success(`Request ${status} successfully`);
      refetch();
    } catch (error) {
      toast.error('Failed to update request status');
    }
  };

  return (
    <section className='container px-4 mx-auto my-12'>
       <Helmet> <title>AssetVerse | All Requests</title> </Helmet>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-36'>
        <div className='flex text-center items-center gap-x-3'>
          <h2 className='text-2xl font-medium text-[#9538E2]'>Asset Requests</h2>
          <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full'>
            {requests.length} Requests
          </span>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 p-2 rounded text-black bg-gray-200 border border-gray-300 focus:outline-none focus:border-[#9538E2]"
        />
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-300'>
                  <tr>
                    <th className='py-3.5 px-4 text-sm font-bold text-center text-gray-800 '>
                      Asset Name
                    </th>
                    <th className='py-3.5 px-4 text-sm font-bold text-center text-gray-800 '>
                      Type
                    </th>
                    <th className='py-3.5 px-4 text-sm font-bold text-center text-gray-800 '>
                      Requester
                    </th>
                    <th className='px-4 py-3.5 text-sm font-bold text-center text-gray-800 '>
                      Request Date
                    </th>
                    <th className='px-4 py-3.5 text-sm font-bold text-center text-gray-800 '>
                      Note
                    </th>
                    <th className='px-4 py-3.5 text-sm font-bold text-center text-gray-800 '>
                      Status
                    </th>
                    <th className='px-4 py-3.5 text-sm font-bold text-center text-gray-800 '>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentRequests.map((request) => (
                    <tr key={request._id}>
                      <td className='px-4 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap'>
                        {request.assetName}
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap'>
                        <span className={`px-3 py-1 rounded-full text-xs
                          ${request.assetType === 'Returnable' 
                            ? 'bg-blue-100/60 text-blue-500' 
                            : 'bg-green-100/60 text-green-500'}`}>
                          {request.assetType}
                        </span>
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap'>
                        <div>
                          <p>{request.requesterName}</p>
                          <p className="text-xs text-gray-400">{request.requesterEmail}</p>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap'>
                        {format(new Date(request.requestDate), 'PP')}
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-center text-gray-800 max-w-xs truncate'>
                        {request.additionalNotes}
                      </td>
                      <td className='px-4 py-4 text-sm text-center whitespace-nowrap'>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2
                          ${request.status === 'pending' ? 'bg-yellow-100/60 text-yellow-500' :
                            request.status === 'approved' ? 'bg-green-100/60 text-green-500' :
                            request.status === 'returned' ? 'bg-blue-100/60 text-blue-500' :
                            'bg-red-100/60 text-red-500'}`}>
                          <span className='h-1.5 w-1.5 rounded-full bg-current'></span>
                          <h2 className='text-sm font-normal capitalize'>{request.status}</h2>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-4 '>
                          <button
                            disabled={request.status !== 'pending'}
                            onClick={() => handleStatusChange(request._id, 'approved')}
                            className='disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 transition-colors duration-200 hover:text-green-500 focus:outline-none'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m4.5 12.75 6 6 9-13.5'
                              />
                            </svg>
                          </button>

                          <button
                            disabled={request.status !== 'pending'}
                            onClick={() => handleStatusChange(request._id, 'rejected')}
                            className='disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 transition-colors duration-200 hover:text-red-500 focus:outline-none'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center mt-6 gap-2'>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className='px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className='px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AllRequests;