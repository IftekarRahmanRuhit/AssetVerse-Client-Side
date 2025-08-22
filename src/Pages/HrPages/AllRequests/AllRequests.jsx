
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Search, Filter, Clock, User, Package, CheckCircle, XCircle, AlertCircle, TrendingUp, FileText, Users, BarChart3, RefreshCw, Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from "react-helmet-async";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const { user } = useAuth();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: allRequests = [], refetch, isLoading } = useQuery({
    queryKey: ['assetRequests', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/allAssetRequest/${user?.email}`);
      console.log('AllRequests data:', response.data);
      return response.data;
    },
    enabled: !!user?.email
  });

  // Client-side filtering and searching
  const filteredRequests = useMemo(() => {
    let filtered = allRequests;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requesterEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.assetType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(request => 
        request.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Date filter
    if (dateFilter) {
      const today = new Date();
      const filterDate = new Date(today);
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(request => 
            new Date(request.requestDate) >= filterDate
          );
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(request => 
            new Date(request.requestDate) >= filterDate
          );
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(request => 
            new Date(request.requestDate) >= filterDate
          );
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [allRequests, searchTerm, statusFilter, dateFilter]);

  // Calculate stats from filtered data
  const totalRequests = filteredRequests.length;
  const pendingRequests = filteredRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = filteredRequests.filter(req => req.status === 'approved').length;
  const rejectedRequests = filteredRequests.filter(req => req.status === 'rejected').length;
  const approvalRate = totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0;

  // Pagination calculations
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter]);

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
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentPage === i 
              ? 'bg-gradient-to-r from-[#9538E2] to-purple-600 text-white shadow-lg shadow-purple-900/25' 
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
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

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/40 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Pending
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/40 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#9538E2] mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>AssetVerse | All Requests</title>
      </Helmet>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Requests</p>
              <p className="text-xl font-bold text-white">{totalRequests}</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <FileText className="text-[#9538E2] text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl p-4 hover:shadow-lg hover:shadow-yellow-900/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Pending</p>
              <p className="text-xl font-bold text-yellow-400">{pendingRequests}</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <AlertCircle className="text-yellow-500 text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl p-4 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Approved</p>
              <p className="text-xl font-bold text-green-400">{approvedRequests}</p>
              <p className="text-xs text-gray-500 mt-1">Successfully processed</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <CheckCircle className="text-green-500 text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl p-4 hover:shadow-lg hover:shadow-red-900/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Rejected</p>
              <p className="text-xl font-bold text-red-400">{rejectedRequests}</p>
              <p className="text-xs text-gray-500 mt-1">Declined requests</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <XCircle className="text-red-500 text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 backdrop-blur-xl border border-gray-600/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#9538E2]" />
            Filter & Search
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-200 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-3 py-2 bg-[#9538E2]/20 hover:bg-[#9538E2]/30 text-[#9538E2] hover:text-white rounded-lg transition-all duration-200 text-sm border border-[#9538E2]/30"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, asset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || statusFilter || dateFilter) && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-[#9538E2]/20 text-[#9538E2] rounded-md text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            {statusFilter && (
              <span className="px-2 py-1 bg-[#9538E2]/20 text-[#9538E2] rounded-md text-xs">
                Status: {statusFilter}
              </span>
            )}
            {dateFilter && (
              <span className="px-2 py-1 bg-[#9538E2]/20 text-[#9538E2] rounded-md text-xs">
                Date: {dateFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Approval Rate */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 backdrop-blur-xl border border-gray-600/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-[#9538E2] text-lg" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Approval Rate</p>
              <p className="text-sm text-gray-400">Overall request approval percentage</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#9538E2]">{approvalRate}%</p>
            <p className="text-sm text-gray-400">{approvedRequests} of {totalRequests} requests</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#9538E2] to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${approvalRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Enhanced Requests List */}
      {currentRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-[#9538E2] text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Requests Found</h3>
          <p className="text-gray-400 text-sm mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#9538E2]/20 hover:bg-[#9538E2]/30 text-[#9538E2] rounded-lg transition-all duration-200 text-sm border border-[#9538E2]/30"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {currentRequests.map((request) => (
            <div key={request._id} className="group bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-6">
                {/* Request Info */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Enhanced Asset Image */}
                  <div className="w-16 h-16 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-600/30">
                    {request.assetImage && 
                     request.assetImage !== 'null' && 
                     request.assetImage !== '' && 
                     request.assetImage !== 'undefined' &&
                     request.assetImage.startsWith('http') ? (
                      <img
                        src={request.assetImage}
                        alt={request.assetName}
                        className="w-12 h-12 object-cover rounded-lg group-hover:scale-110 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-12 h-12 flex items-center justify-center text-[#9538E2] text-lg font-bold" 
                      style={{ 
                        display: (request.assetImage && 
                                  request.assetImage !== 'null' && 
                                  request.assetImage !== '' && 
                                  request.assetImage !== 'undefined' &&
                                  request.assetImage.startsWith('http')) ? 'none' : 'flex' 
                      }}
                    >
                      {request.assetName ? request.assetName.charAt(0).toUpperCase() : 'A'}
                    </div>
                  </div>

                  {/* Enhanced Request Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate group-hover:text-[#9538E2] transition-colors duration-200">
                        {request.assetName}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#9538E2]" />
                        <span className="font-medium text-white">{request.requesterName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#9538E2]" />
                        <span className="font-medium">{request.assetType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#9538E2]" />
                        <span className="font-medium">{format(new Date(request.requestDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#9538E2]" />
                        <span className="font-medium">#{request._id.slice(-6)}</span>
                      </div>
                    </div>

                    {request.reason && (
                      <p className="text-sm text-gray-400 mt-3 p-3 bg-gray-800/30 rounded-lg border-l-4 border-[#9538E2]/50">
                        <span className="font-medium text-gray-300">Reason:</span> {request.reason}
                      </p>
                    )}
                  </div>
                </div>

                {/* Enhanced Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-lg transition-all duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  
                {(request.status === 'pending' || request.status === 'Pending') && (
                    <>
                    <button
                      onClick={() => handleStatusChange(request._id, 'approved')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 text-green-300 hover:text-green-200 rounded-lg transition-all duration-300 border border-green-500/40 hover:border-green-500/60 hover:shadow-md hover:shadow-green-500/20 transform hover:scale-105 text-sm font-medium"
                    >
                        <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    
                    <button
                      onClick={() => handleStatusChange(request._id, 'rejected')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-300 hover:text-red-200 rounded-lg transition-all duration-300 border border-red-500/40 hover:border-red-500/60 hover:shadow-md hover:shadow-red-500/20 transform hover:scale-105 text-sm font-medium"
                    >
                        <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    </>
                  )}
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredRequests.length)} of {filteredRequests.length} results
          </div>
          
          <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm flex items-center gap-2"
          >
            Previous
          </button>
          
          {renderPageNumbers()}
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm flex items-center gap-2"
          >
            Next
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRequests;