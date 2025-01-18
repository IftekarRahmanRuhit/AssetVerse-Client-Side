
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const AssetList = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets", user?.email, searchTerm, stockFilter, typeFilter, sortOption],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/assets/${user?.email}?search=${searchTerm}&stock=${stockFilter}&type=${typeFilter}&sort=${sortOption}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // function for delete an asset 
  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/assets/${id}`);
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

  // function for update data 
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const form = e.target;

    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;
    const image = selectedProduct.image; 

    // Create the updated product object
    const updatedProduct = {
      ...selectedProduct, // Existing data
      productName,
      productType,
      productQuantity,
      image, 
    };

    try {
      
      const response = await axiosPublic.put(`/update-asset/${selectedProduct._id}`, updatedProduct);
      
      
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
    <div className="bg-[#191919] pb-28 max-w-screen-2xl mx-auto">
      <section className="container mx-auto pt-12 px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">Asset List</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="">All Stock Status</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="">Sort By</option>
            <option value="quantityAsc">Quantity (Lowest First)</option>
            <option value="quantityDesc">Quantity (Highest First)</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-gray-100 text-center">Loading assets...</p>
        ) : assets.length === 0 ? (
          <p className="text-gray-100 text-center">No assets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-black border border-gray-700 rounded-lg">
              <thead className="bg-black">
                <tr>
                  <th className="px-4 py-4 text-white text-center">Image</th>
                  <th className="px-4 py-4 text-white text-center">Product Name</th>
                  <th className="px-4 py-4 text-white text-center">Product Type</th>
                  <th className="px-4 py-4 text-white text-center">Quantity</th>
                  <th className="px-4 py-4 text-white text-center">Date Added</th>
                  <th className="px-4 py-4 text-white text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset._id} className="border-t border-gray-700 hover:bg-[#2C2C2C]">
                    <td className="px-4 py-2 text-center">
                      <img
                        src={asset.image}
                        alt={asset.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 text-gray-300 text-center">{asset.productName}</td>
                    <td className="px-4 py-2 text-gray-300 text-center">{asset.productType}</td>
                    <td className="px-4 py-2 text-gray-300 text-center">{asset.productQuantity}</td>
                    <td className="px-4 py-2 text-gray-300 text-center">
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
        )}

        {/* Modal for editing product */}
        {selectedProduct && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg bg-gradient-to-r from-gray-950 via-gray-900 to-black">
              <h2 className="text-2xl text-center text-gray-100 font-bold mb-4">
                Update Asset Details
              </h2>
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    defaultValue={selectedProduct.productName}
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                  />
                </div>

                {/* Product Type */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">Product Type</label>
                  <input
                    type="text"
                    name="productType"
                    defaultValue={selectedProduct.productType}
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                  />
                </div>

                {/* Product Quantity */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">Product Quantity</label>
                  <input
                    type="number"
                    name="productQuantity"
                    defaultValue={selectedProduct.productQuantity}
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">Image</label>
                  <div {...getRootProps()} className="border-dashed border-2 px-4 py-8 text-center rounded-md">
                    <input {...getInputProps()} />
                    <p className="text-gray-300 cursor-pointer">
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

                {/* Submit and Cancel buttons */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l py-2 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="w-full bg-gray-500 text-black py-2 rounded-md hover:bg-gray-400 mt-2"
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
