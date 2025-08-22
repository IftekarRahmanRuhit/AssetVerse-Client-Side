

import React, { useState, useContext, useEffect, useMemo, useCallback, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Search, Filter, Package, Plus, X, AlertCircle, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCompanyInfo from '../../../Hooks/useCompanyInfo';
import {Helmet} from "react-helmet-async"

// Debounced search hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized asset card component
const AssetCard = memo(({ asset, onRequest, getStockStatusColor, getTypeColor }) => {
  const handleRequest = useCallback(() => {
    if (asset.status) {
      onRequest(asset);
    }
  }, [asset, onRequest]);

  return (
    <div 
      className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Asset Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={asset.image || 'https://via.placeholder.com/400x300/6B7280/FFFFFF?text=Asset'}
          alt={asset.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/6B7280/FFFFFF?text=Asset';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStockStatusColor(asset.status)}`}>
            {asset.status ? 'Available' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Asset Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-200 mb-3">
          {asset.productName}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(asset.productType)}`}>
              {asset.productType}
            </span>
          </div>
          
          {asset.description && (
            <p className="text-gray-400 text-sm line-clamp-2">
              {asset.description}
            </p>
          )}
        </div>

        {/* Request Button */}
        <button
          onClick={handleRequest}
          disabled={!asset.status}
          className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            asset.status
              ? 'bg-gradient-to-r from-[#9538E2] to-purple-600 text-white hover:from-purple-600 hover:to-[#9538E2] hover:shadow-lg hover:shadow-purple-900/30'
              : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
          }`}
        >
          {asset.status ? (
            <>
              <Plus className="w-4 h-4" />
              Request Asset
            </>
          ) : (
            <>
              <X className="w-4 h-4" />
              Out of Stock
            </>
          )}
        </button>
      </div>
    </div>
  );
});

AssetCard.displayName = 'AssetCard';

// Memoized stats card component
const StatsCard = memo(({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center`}>
        <Icon className="text-xl" />
      </div>
    </div>
  </div>
));

StatsCard.displayName = 'StatsCard';

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

  // Debounce search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets', debouncedSearchTerm, stockFilter, typeFilter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/assets?search=${debouncedSearchTerm}&stock=${stockFilter}&type=${typeFilter}`
      );
      return response.data;
    },
    staleTime: 30000, // Cache for 30 seconds
    cacheTime: 300000, // Keep in cache for 5 minutes
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, stockFilter, typeFilter]);

  // Memoized calculations
  const totalPages = useMemo(() => Math.ceil(assets.length / itemsPerPage), [assets.length, itemsPerPage]);
  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
  const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex, itemsPerPage]);
  const currentAssets = useMemo(() => assets.slice(startIndex, endIndex), [assets, startIndex, endIndex]);

  // Memoized stats
  const stats = useMemo(() => ({
    total: assets.length,
    available: assets.filter(a => a.status).length,
    outOfStock: assets.filter(a => !a.status).length,
    returnable: assets.filter(a => a.productType === 'Returnable').length,
  }), [assets]);

  // Memoized handlers
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePageClick = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleAssetRequest = useCallback((asset) => {
    setSelectedAsset(asset);
  }, []);

  const handleRequest = useCallback(async () => {
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
  }, [selectedAsset, user, additionalNotes, companyInfo, axiosSecure]);

  // Memoized utility functions
  const getStockStatusColor = useCallback((status) => {
    return status 
      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  }, []);

  const getTypeColor = useCallback((type) => {
    return type === 'Returnable' 
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
      : 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  }, []);

  // Memoized pagination numbers
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentPage === i 
              ? 'bg-gradient-to-r from-[#9538E2] to-purple-600 text-white shadow-lg shadow-purple-900/30' 
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }
    return numbers;
  }, [totalPages, currentPage, handlePageClick]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9538E2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading available assets...</p>
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
        <Helmet> <title>AssetVerse | Request Asset</title> </Helmet>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
              <Plus className="text-[#9538E2] text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Request Asset</h1>
              <p className="text-gray-400">Browse and request available assets</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Assets" 
              value={stats.total} 
              icon={Package} 
              colorClass="bg-gradient-to-r from-blue-500/20 to-blue-600/20"
            />
            <StatsCard 
              title="Available" 
              value={stats.available} 
              icon={CheckCircle} 
              colorClass="bg-gradient-to-r from-green-500/20 to-green-600/20"
            />
            <StatsCard 
              title="Out of Stock" 
              value={stats.outOfStock} 
              icon={AlertCircle} 
              colorClass="bg-gradient-to-r from-red-500/20 to-red-600/20"
            />
            <StatsCard 
              title="Returnable" 
              value={stats.returnable} 
              icon={RotateCcw} 
              colorClass="bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
            />
          </div>

          {/* Search and Filters */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200"
                />
              </div>
              
              {/* Stock Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">All Availability</option>
                  <option value="available">Available</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        {!companyInfo?.companyName ? (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-[#9538E2] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Company Affiliation Needed</h3>
            <p className="text-gray-400">You are currently not affiliated with any company. Please contact your HR department to get registered.</p>
          </div>
        ) : currentAssets.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-[#9538E2] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Assets Found</h3>
            <p className="text-gray-400">
              {searchTerm || stockFilter || typeFilter 
                ? 'No assets match your current filters. Try adjusting your search criteria.' 
                : 'No assets are currently available for request.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentAssets.map((asset) => (
                <AssetCard
                  key={asset._id}
                  asset={asset}
                  onRequest={handleAssetRequest}
                  getStockStatusColor={getStockStatusColor}
                  getTypeColor={getTypeColor}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                {pageNumbers}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Request Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Package className="text-[#9538E2] text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Request Asset</h3>
                  <p className="text-gray-400">{selectedAsset.productName}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(selectedAsset.productType)}`}>
                    {selectedAsset.productType}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStockStatusColor(selectedAsset.status)}`}>
                    {selectedAsset.status ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Additional notes (optional)..."
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200 resize-none"
                rows="4"
              />
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleRequest}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#9538E2] to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-[#9538E2] transition-all duration-200 font-medium"
                >
                  Submit Request
                </button>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="flex-1 px-4 py-3 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-all duration-200 font-medium"
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