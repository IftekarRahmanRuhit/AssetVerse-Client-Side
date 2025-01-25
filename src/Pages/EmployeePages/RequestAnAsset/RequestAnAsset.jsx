

import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCompanyInfo from '../../../Hooks/useCompanyInfo';
import {Helmet} from "react-helmet-async"

const RequestAnAsset = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const { companyInfo } = useCompanyInfo();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets', searchTerm, stockFilter, typeFilter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/assets?search=${searchTerm}&stock=${stockFilter}&type=${typeFilter}`
      );
      return response.data;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = assets.slice(startIndex, endIndex);

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
            currentPage === i ? "bg-[#9538E2] text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleRequest = async () => {
    if (!selectedAsset) return;

    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      requestDate: new Date(),
      requesterEmail: user?.email,
      requesterName: user?.displayName,
      additionalNotes: additionalNotes,
      HrEmail: selectedAsset.email
    };

    if (!companyInfo?.companyName) {
      return toast.error('Company information is missing. Please reach out to your HR for assistance.');
    }

    try {
      await axiosSecure.post('/asset-requests', requestData);
      toast.success('Asset request submitted successfully!');
      setSelectedAsset(null);
      setAdditionalNotes('');
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <div className="bg-[#efedf0] min-h-screen pb-28">
       <Helmet> <title>AssetVerse | Request for an asset</title> </Helmet>
      <div className="container mx-auto pt-12 px-4">
        <h2 className="text-3xl font-bold  text-[#9538E2] mb-6 mt-24">Request an Asset</h2>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 text-black font-semibold focus:outline-none focus:border-[#9538E2]"
          />
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="p-2 rounded border border-gray-300 text-black font-semibold focus:outline-none focus:border-[#9538E2]"
          >
            <option value="">All Availability</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded border border-gray-300 text-black font-semibold focus:outline-none focus:border-[#9538E2]"
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>

        {/* Assets List */}
        {isLoading ? (
          <div className=" flex items-center justify-center min-h-screen text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentAssets.map((asset) => (
                <div key={asset._id} className="flex justify-center">
                  <div className="w-full h-[280px] relative overflow-hidden group cursor-pointer rounded-md">
                    {/* Asset Image */}
                    <img
                      src={asset.image}
                      alt={asset.productName}
                      className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"
                    />
                    
                    {/* Content Overlay */}
                    <div className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col px-4">
                      <h1 className="text-[1.5rem] font-bold text-white text-center capitalize mb-2">
                        {asset.productName}
                      </h1>
                      <p className="text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[0.9rem] mb-2 font-medium">
                        Type: {asset.productType}
                        <br />
                        Status: {asset.status ? 'Available' : 'Out of Stock'}
                      </p>
                      <button
                        onClick={() => asset.status && setSelectedAsset(asset)}
                        disabled={!asset.status}
                        className={`z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-6 py-2 mt-3 rounded-md text-[0.9rem] transition-all duration-1000 ${
                          asset.status
                            ? 'bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-bold'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {asset.status ? 'Request Asset' : 'Out of Stock'}
                      </button>
                    </div>

                    {/* Bottom Shadow Gradient */}
                    <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.8)] h-[100%] absolute bottom-0 left-0 right-0"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="mx-1 px-4 py-2 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="mx-1 px-4 py-2 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Request Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">
                Request {selectedAsset.productName}
              </h3>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Additional notes..."
                className="w-full p-2 rounded bg-gray-700 text-white mb-4"
                rows="4"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleRequest}
                  className="flex-1 bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none py-2 rounded-lg "
                >
                  Submit Request
                </button>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestAnAsset;