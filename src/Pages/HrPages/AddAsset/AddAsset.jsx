
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Plus, Upload, Package, Users, Calendar, Image as ImageIcon } from "lucide-react";
import Swal from "sweetalert2";
import "animate.css";
import useAuth from "../../../Hooks/useAuth";
import useCompanyInfo from "../../../Hooks/useCompanyInfo";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet-async"

const AddAsset = () => {
  const [image, setImage] = useState(null);
  const [assetType, setAssetType] = useState("Returnable");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { companyInfo } = useCompanyInfo();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file); 
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  // Function to upload image to ImgBB
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        return data.data.url; 
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to upload image. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#d33",
      });
      throw error; 
    }
  };

  // Handle form submission
  const handleAddAsset = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const form = event.target;
    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      const assetData = {
        email: user?.email,
        addedBy: user?.displayName,
        companyName: companyInfo?.companyName,
        companyLogo: companyInfo?.companyLogo,
        productName,
        productType,
        productQuantity: parseInt(productQuantity),
        image: imageUrl,
        dateAdded: new Date(),
        status: true,
      };

      if (companyInfo.memberLimit === 0) {
        return (toast.error("Please purchase a package"), navigate('/payment'));
      }

      const response = await axiosSecure.post("/add-asset", assetData);

      if (response.data.insertedId) {
        toast.success("Asset added successfully!");
        form.reset();
        setImage(null);
      }
    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error("Failed to add asset. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
          <Plus className="text-[#9538E2] text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Add New Asset</h2>
          <p className="text-gray-400 text-sm">Add a new asset to your inventory</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
        <form onSubmit={handleAddAsset} className="space-y-6">
          {/* Asset Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asset Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Package className="text-[#9538E2] text-sm" />
                Asset Name
              </label>
              <input
                type="text"
                name="productName"
                required
                placeholder="Enter asset name..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200"
              />
            </div>

            {/* Asset Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Package className="text-[#9538E2] text-sm" />
                Asset Type
              </label>
              <select
                name="productType"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Users className="text-[#9538E2] text-sm" />
                Quantity
              </label>
              <input
                type="number"
                name="productQuantity"
                required
                min="1"
                placeholder="Enter quantity..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200"
              />
            </div>

            {/* Date Added */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Calendar className="text-[#9538E2] text-sm" />
                Date Added
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                disabled
                className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/30 rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <ImageIcon className="text-[#9538E2] text-sm" />
              Asset Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? "border-[#9538E2] bg-[#9538E2]/10"
                  : "border-gray-700/50 hover:border-[#9538E2]/50 hover:bg-gray-800/30"
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="text-[#9538E2] text-xl" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">or click to select a file</p>
                </div>
                {image && (
                  <div className="mt-4">
                    <p className="text-green-400 text-sm font-medium">✓ {image.name} selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#9538E2] to-purple-600 hover:from-purple-600 hover:to-[#9538E2] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-900/25"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding Asset...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Plus className="text-lg" />
                  <span>Add Asset</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Company Info Card */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
            <Users className="text-[#9538E2] text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Company Information</h3>
            <p className="text-gray-400 text-sm">
              Adding asset to: <span className="text-[#9538E2] font-medium">{companyInfo?.companyName || 'Your Company'}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Member Limit</p>
            <p className="text-lg font-bold text-white">
              {companyInfo?.currentMembers || 0} / {companyInfo?.memberLimit || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
