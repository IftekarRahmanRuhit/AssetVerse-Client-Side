
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaSort } from "react-icons/fa";
import { Package, Plus, Eye, Edit, Trash2, Search, Filter, ArrowUpDown, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {Helmet} from "react-helmet-async"

const AssetList = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets", user?.email, searchTerm, stockFilter, typeFilter, sortOption],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/assets/${user?.email}?search=${searchTerm}&stock=${stockFilter}&type=${typeFilter}&sort=${sortOption}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // Pagination calculations
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = assets.slice(startIndex, endIndex);

  // Calculate stats
  const totalAssets = assets.length;
  const lowStockAssets = assets.filter(asset => asset.productQuantity <= 5).length;
  const returnableAssets = assets.filter(asset => asset.productType === 'Returnable').length;
  const nonReturnableAssets = assets.filter(asset => asset.productType === 'Non-returnable').length;

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
          className={`mx-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentPage === i 
              ? "bg-gradient-to-r from-[#9538E2] to-purple-600 text-white shadow-lg shadow-purple-900/25" 
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/assets/${id}`);
      toast.success("Asset deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete asset.");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingAsset) return;
    
    const form = e.target;
    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;

    try {
      const updatedAsset = {
        ...editingAsset,
        productName,
        productType,
        productQuantity: parseInt(productQuantity),
      };

      const response = await axiosSecure.put(`/update-asset/${editingAsset._id}`, updatedAsset);
      
      if (response.data.modifiedCount > 0) {
        toast.success("Asset updated successfully!");
        refetch();
        setEditingAsset(null);
      } else {
        toast.warning("No changes made to the asset.");
      }
    } catch (err) {
      toast.error("Failed to update asset.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9538E2] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
            <Package className="text-[#9538E2] text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Asset Inventory</h2>
            <p className="text-gray-400 text-sm">Manage your company assets</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 text-[#9538E2] rounded-full text-sm font-medium border border-[#9538E2]/30">
            {assets.length} Assets
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Assets</p>
              <p className="text-2xl font-bold text-white">{totalAssets}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Package className="text-[#9538E2] text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Low Stock</p>
              <p className="text-2xl font-bold text-red-400">{lowStockAssets}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <AlertTriangle className="text-red-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Returnable</p>
              <p className="text-2xl font-bold text-blue-400">{returnableAssets}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <CheckCircle className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Non-Returnable</p>
              <p className="text-2xl font-bold text-green-400">{nonReturnableAssets}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="text-green-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200"
            />
          </div>

          {/* Stock Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white [&>option]:border-none"
            >
              <option value="">All Stock Levels</option>
              <option value="low">Low Stock (≤5)</option>
              <option value="medium">Medium Stock (6-15)</option>
              <option value="high">High Stock (&gt;15)</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white [&>option]:border-none"
            >
              <option value="">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white [&>option]:border-none"
            >
              <option value="">Sort By</option>
              <option value="name">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="quantity">Quantity Low-High</option>
              <option value="quantity-desc">Quantity High-Low</option>
              <option value="date">Date Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      {currentAssets.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-[#9538E2] text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Assets Found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAssets.map((asset) => (
            <div key={asset._id} className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              {/* Asset Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={asset.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={asset.productName}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    asset.productType === 'Returnable' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                      : 'bg-green-500/20 text-green-300 border border-green-500/40'
                  }`}>
                    {asset.productType}
                  </span>
                </div>
                
                {/* Stock Level Indicator */}
                <div className="absolute bottom-3 left-3">
                  <div className={`w-3 h-3 rounded-full ${
                    asset.productQuantity <= 5 ? 'bg-red-500 animate-pulse' : 
                    asset.productQuantity <= 10 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                </div>
              </div>

              {/* Asset Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#9538E2] transition-colors duration-200">
                  {asset.productName}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9538E2] rounded-full"></div>
                    <span className="text-gray-400 text-sm">Quantity:</span>
                    <span className={`font-semibold ${
                      asset.productQuantity <= 5 ? 'text-red-400' : 
                      asset.productQuantity <= 10 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {asset.productQuantity}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {new Date(asset.dateAdded).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-700/50">
                  <button 
                    onClick={() => handleEdit(asset)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 group/btn border border-blue-500/40 hover:border-blue-500/60 hover:shadow-md hover:shadow-blue-500/20 transform hover:scale-[1.02]"
                  >
                    <Edit className="text-xs group-hover/btn:scale-110 transition-transform duration-200" />
                    <span className="text-xs font-medium">Edit</span>
                  </button>
                  
                  <button 
                    onClick={() => confirmDelete(asset._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-300 hover:text-red-200 rounded-lg transition-all duration-300 group/btn border border-red-500/40 hover:border-red-500/60 hover:shadow-md hover:shadow-red-500/20 transform hover:scale-[1.02]"
                  >
                    <Trash2 className="text-xs group-hover/btn:scale-110 transition-transform duration-200" />
                    <span className="text-xs font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          
          {renderPageNumbers()}
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingAsset && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-black/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Edit className="text-[#9538E2] text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Edit Asset</h3>
                  <p className="text-gray-400 text-sm">Update asset information</p>
                </div>
              </div>
              <button
                onClick={() => setEditingAsset(null)}
                className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">Asset Name</label>
                <input
                  type="text"
                  name="productName"
                  defaultValue={editingAsset.productName}
                  required
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200"
                  placeholder="Enter asset name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">Asset Type</label>
                <select
                  name="productType"
                  defaultValue={editingAsset.productType}
                  required
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">Quantity</label>
                <input
                  type="number"
                  name="productQuantity"
                  defaultValue={editingAsset.productQuantity}
                  required
                  min="1"
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-200"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#9538E2] to-purple-600 hover:from-purple-600 hover:to-[#9538E2] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-900/25 hover:shadow-xl hover:shadow-purple-900/30"
                >
                  Update Asset
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAsset(null)}
                  className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 font-semibold py-4 px-6 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;