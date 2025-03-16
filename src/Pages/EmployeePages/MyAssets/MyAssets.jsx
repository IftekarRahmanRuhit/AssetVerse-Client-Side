
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import AssetPDF from "../../../Components/AssetPDF/AssetPDF";
import {Helmet} from "react-helmet-async"

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['myAssetRequests', searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myAssetRequest/${user?.email}?search=${searchTerm}&status=${statusFilter}&type=${typeFilter}`
      );
      return response.data;
    }
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

  const handleCancel = async (id) => {
    try {
      await axiosSecure.patch(`/assetRequestStatus/${id}`, { status: 'cancelled' });
      toast.success('Request cancelled successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to cancel request');
    }
  };

  const handleReturn = async (id) => {
    try {
      await axiosSecure.patch(`/return-asset/${id}`, { status: 'returned' });
      toast.success('Asset returned successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to return asset');
    }
  };

  return (
   
    <div className='bg-[#212428]  px-4 py-10'>

    <div>

    <section className='container px-4 mx-auto my-12'>
       <Helmet> <title>AssetVerse | My Assets</title> </Helmet>
       
      <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center justify-between gap-4 mb-8 mt-32'>
      <h2 className='text-2xl font-bold text-[#9538E2]'>My Assets</h2>
        {/* Search and Filters */}
        <div className='flex flex-col md:flex-row gap-4'>
          <input
            type="text"
            placeholder="Search by asset name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 p-2  rounded border border-gray-400 text-black font-semibold focus:outline-none focus:border-[#9538E2] bg-gray-400 placeholder:text-black"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-40 p-2  rounded border border-gray-400 text-black font-semibold focus:outline-none focus:border-[#9538E2] bg-gray-400"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-40 p-2  rounded border border-gray-400 text-black font-semibold focus:outline-none focus:border-[#9538E2] bg-gray-400"
          >
            <option value="all">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto animate__animated animate__fadeInUp'>
        <table className='min-w-full divide-y divide-gray-500 border border-gray-500'>
          <thead className='bg-gray-400 '>
            <tr>
              <th className='px-4 py-3.5 text-sm font-semibold text-center text-gray-800'>Asset Name</th>
              <th className='px-4 py-3.5 text-sm font-semibold text-center text-gray-800'>Type</th>
              <th className='px-4 py-3.5 text-sm font-semibold text-center text-gray-800'>Request Date</th>
              <th className='px-4 py-3.5 text-sm font-semibold text-center text-gray-800'>Approval Date</th>
              <th className='px-4 py-3.5 text-sm font-semibold text-center text-gray-800'>Status</th>
              <th className='px-4 py-3.5 text-sm font-semibold text-center text-gray-800'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-[#1B1D21] border border-gray-500 divide-y divide-gray-500'>
            {currentRequests.map((request) => (
              <tr key={request._id}>
                <td className='px-4 py-4 text-sm text-center font-medium text-gray-400'>{request.assetName}</td>
                <td className='px-4 py-4 text-sm text-center font-medium text-gray-400'>
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${request.assetType === 'Returnable' 
                      ? 'bg-blue-100 text-blue-500' 
                      : 'bg-green-100 text-green-500'}`}>
                    {request.assetType}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-center font-medium text-gray-400'>
                  {format(new Date(request.requestDate), 'PP')}
                </td>
                <td className='px-4 py-4 text-sm text-center font-medium text-gray-400'>
                  {request.approvalDate ? format(new Date(request.approvalDate), 'PP') : '-'}
                </td>
                <td className='px-4 py-4 text-sm text-center'>
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-500' :
                      request.status === 'approved' ? 'bg-green-100 text-green-500' :
                      request.status === 'returned' ? 'bg-blue-100 text-blue-500' :
                      'bg-red-100 text-red-500'}`}>
                    {request.status}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-center'>
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-100 rounded-md "
                    >
                      Cancel
                    </button>
                  )}
                  
                  {request.status === 'approved' && (
                    <div className="flex gap-2 justify-center items-center text-center ">
                      <PDFDownloadLink
                        document={<AssetPDF request={request} />}
                        fileName={`asset-${request._id}.pdf`}
                        className="px-3 py-1 text-center "
                      >
                        <button className='btn btn-sm bg-purple-700 text-white '>Print</button>
                      </PDFDownloadLink>
                      
                      {request.assetType === 'Returnable' && request.status === 'approved' && (
                        <button
                          onClick={() => handleReturn(request._id)}
                          className="px-3 py-1 btn btn-sm  text-center text-green-500 hover:bg-green-100 rounded-md"
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
    </div>
    </div>

  );
};

export default MyAssets;