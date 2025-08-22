
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Search, Filter, Download, RotateCcw, X, Package, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
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
  const itemsPerPage = 6;

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['myAssetRequests', searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myAssetRequest/${user?.email}?search=${searchTerm}&status=${statusFilter}&type=${typeFilter}`
      );
      return response.data;
    }
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

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
          className={`mx-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === i 
              ? 'bg-gradient-to-r from-[#9538E2] to-purple-600 text-white shadow-lg shadow-purple-900/30' 
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700'
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'returned':
        return <RotateCcw className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'returned':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type) => {
    return type === 'Returnable' 
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
      : 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9538E2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <Helmet> <title>AssetVerse | My Assets</title> </Helmet>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
              <Package className="text-[#9538E2] text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Assets</h1>
              <p className="text-gray-400">Manage and track your assigned assets</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Total Assets</p>
                  <p className="text-2xl font-bold text-white">{requests.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Package className="text-blue-500 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'pending').length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="text-yellow-500 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Approved</p>
                  <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'approved').length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-green-500 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Returned</p>
                  <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'returned').length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                  <RotateCcw className="text-blue-500 text-xl" />
                </div>
              </div>
            </div>
          </div>

                     {/* Search and Filters */}
           <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
             <div className="flex flex-col lg:flex-row gap-4">
               {/* Search */}
               <div className="flex-1 relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                 <input
                   type="text"
                   placeholder="Search by asset name..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-300"
                 />
               </div>
               
               {/* Status Filter */}
               <div className="relative">
                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                 <select
                   value={statusFilter}
                   onChange={(e) => setStatusFilter(e.target.value)}
                   className="pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-300 appearance-none cursor-pointer"
                 >
                   <option value="all">All Status</option>
                   <option value="pending">Pending</option>
                   <option value="approved">Approved</option>
                   <option value="returned">Returned</option>
                   <option value="cancelled">Cancelled</option>
                 </select>
               </div>

               {/* Type Filter */}
               <div className="relative">
                 <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                 <select
                   value={typeFilter}
                   onChange={(e) => setTypeFilter(e.target.value)}
                   className="pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-300 appearance-none cursor-pointer"
                 >
                   <option value="all">All Types</option>
                   <option value="Returnable">Returnable</option>
                   <option value="Non-returnable">Non-returnable</option>
                 </select>
               </div>
             </div>
             
             
           </div>
        </div>

        {/* Assets Grid */}
        {currentRequests.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-[#9538E2] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Assets Found</h3>
            <p className="text-gray-400">You haven't requested any assets yet or no assets match your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentRequests.map((request) => (
              <div 
                key={request._id}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Asset Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                      <Package className="text-[#9538E2] text-lg" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {request.assetName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(request.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asset Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(request.assetType)}`}>
                      {request.assetType}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Requested: {format(new Date(request.requestDate), 'MMM dd, yyyy')}</span>
                  </div>
                  
                  {request.approvalDate && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Approved: {format(new Date(request.approvalDate), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-300 font-medium"
                    >
                      Cancel Request
                    </button>
                  )}
                  
                  {request.status === 'approved' && (
                    <>
                      <PDFDownloadLink
                        document={<AssetPDF request={request} />}
                        fileName={`asset-${request._id}.pdf`}
                        className="flex-1"
                      >
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-[#9538E2] to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-[#9538E2] transition-all duration-300 font-medium flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                      </PDFDownloadLink>
                      
                      {request.assetType === 'Returnable' && (
                        <button
                          onClick={() => handleReturn(request._id)}
                          className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-300 font-medium flex items-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Return
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssets;