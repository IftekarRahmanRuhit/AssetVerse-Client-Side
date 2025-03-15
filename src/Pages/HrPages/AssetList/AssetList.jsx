
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
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
              ? "bg-[#9538E2] text-white" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
        Swal.fire("Deleted!", "The asset has been deleted.", "success");
      }
    });
  };

  const handleDrop = async (acceptedFiles) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", acceptedFiles[0]);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = response.data.data.url;

      setSelectedProduct({ ...selectedProduct, image: imageUrl });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const form = e.target;

    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;
    const image = selectedProduct.image;

    const updatedProduct = {
      ...selectedProduct,
      productName,
      productType,
      productQuantity,
      image,
    };

    try {
      const response = await axiosSecure.put(`/update-asset/${selectedProduct._id}`, updatedProduct);
      
      if (response.data.modifiedCount > 0) {
        toast.success("Asset updated successfully!");
        refetch();
        setSelectedProduct(null);
      } else {
        toast.warning("No changes made to the asset.");
      }
    } catch (err) {
      toast.error("Failed to update asset.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <div className="bg-[#212428]  pb-28 max-w-screen-2xl mx-auto ">
       <Helmet> <title>AssetVerse | AssetList</title> </Helmet>
      <section className="container mx-auto pt-12 px-4">
        <h2 className="text-3xl font-bold text-[#9538E2] mb-6 mt-28">Asset List</h2>

        <div className="flex flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded bg-gray-400 text-black font-semibold placeholder-gray-800 "
          />
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="p-2 rounded bg-gray-400 text-black font-semibold"
          >
            <option value="">All Stock Status</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded bg-gray-400 text-black font-semibold"
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded bg-gray-400 text-black font-semibold"
          >
            <option value="">Sort By</option>
            <option value="quantityAsc">Quantity (Lowest First)</option>
            <option value="quantityDesc">Quantity (Highest First)</option>
          </select>
        </div>

        {isLoading ? (
          <div className=" flex items-center justify-center min-h-screen text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
        ) : assets.length === 0 ? (
          <p className="text-gray-100 text-center">No assets found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-[#1B1D21] border border-gray-500 rounded-lg">
                <thead className="bg-gray-400 text-gray-800">
                  <tr>
                    <th className="px-4 py-4  text-center">Product Image</th>
                    <th className="px-4 py-4  text-center">Product Name</th>
                    <th className="px-4 py-4  text-center">Product Type</th>
                    <th className="px-4 py-4  text-center">Quantity</th>
                    <th className="px-4 py-4  text-center">Date Added</th>
                    <th className="px-4 py-4  text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAssets.map((asset) => (
                    <tr key={asset._id} className="border-t border-gray-500 hover:bg-[#212428] ">
                      <td className="px-4 py-2 text-center">
                        <img
                          src={asset.image}
                          alt={asset.productName}
                          className="w-16 h-16 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-400 font-semibold text-center">{asset.productName}</td>
                      <td className="px-4 py-2 text-gray-400 font-semibold text-center">{asset.productType}</td>
                      <td className="px-4 py-2 text-gray-400 font-semibold text-center">{asset.productQuantity}</td>
                      <td className="px-4 py-2 text-gray-400 font-semibold text-center">
                        {new Date(asset.dateAdded).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-blue-400 hover:text-blue-600"
                          onClick={() => setSelectedProduct(asset)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-600 ml-4"
                          onClick={() => confirmDelete(asset._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-6 gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal for editing product */}
        {selectedProduct && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg bg-[#1B1D21]">
              <h2 className="text-2xl text-center text-[#9538E2] font-bold mb-4">
                Update Asset Details
              </h2>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-400 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    defaultValue={selectedProduct.productName}
                    className="w-full p-2 rounded-md input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  bg-[#1B1D21] text-gray-400 border border-gray-600 "
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-400 mb-2">Product Type</label>
                  <input
                    type="text"
                    name="productType"
                    defaultValue={selectedProduct.productType}
                    className="w-full p-2 input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  bg-[#1B1D21] text-gray-400 border border-gray-600 "
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-400 mb-2">Product Quantity</label>
                  <input
                    type="number"
                    name="productQuantity"
                    defaultValue={selectedProduct.productQuantity}
                    className="w-full p-2 input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  bg-[#1B1D21] text-gray-400 border border-gray-600 "
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-400 mb-2">Image</label>
                  <div {...getRootProps()} className="border-dashed border-2 px-4 py-8 text-center rounded-md">
                    <input {...getInputProps()} />
                    <p className="text-gray-400 cursor-pointer">
                      Drag and drop files here, or click to select a file
                    </p>
                  </div>
                  {selectedProduct.image && (
                    <div className="mt-4">
                      <img
                        src={selectedProduct.image}
                        alt="Selected preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l transition-all duration-300 border-none font-semibold py-2 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-400 mt-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AssetList;