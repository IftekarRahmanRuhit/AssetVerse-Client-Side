
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
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
  const { user } = useAuth();
  const { companyInfo } = useCompanyInfo();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file); 
  };

  const { getRootProps, getInputProps } = useDropzone({
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
      
        


      // Send asset data to backend
      const response = await axiosSecure.post("/addAsset", assetData);

      if (response.data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Asset added successfully!",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#008C8C",
        });

        form.reset();
        setImage(null);
        setAssetType("Returnable"); 
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to add asset. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-[#212428] pb-20 max-w-screen-2xl mx-auto">
       <Helmet> <title>AssetVerse | AddAsset</title> </Helmet>
      <div>
        <div className="p-10">
          <p className="mt-28 text-4xl font-bold text-center mb-4 text-[#9538E2] animate__animated animate__backInDown">
            Add New Asset
          </p>
          <p className="font-medium text-gray-400 text-center animate__animated animate__backInDown">
            Manage your inventory by adding new assets here!
          </p>
        </div>
      </div>
      <div className="bg-[#1B1D21] p-8 max-w-4xl mx-auto rounded-lg shadow-xl animate__animated animate__fadeInUp border border-[#9538e277]">
        <h2 className="text-3xl font-bold text-center text-[#9538E2] mb-5">
          Add Asset
        </h2>
        <form onSubmit={handleAddAsset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              className="w-full px-3 py-2 input input-bordered rounded-md focus:outline-none focus:ring-1 focus:ring-[#9538E2]  bg-[#1B1D21] text-gray-400 border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Product Type
            </label>
            <select
              name="productType"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)} 
              className="w-full px-3 py-2 input input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2]  bg-[#1B1D21] text-gray-400 border border-gray-600 rounded-md"
              required
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Product Quantity
            </label>
            <input
              type="number"
              name="productQuantity"
              placeholder="Enter product quantity"
              className="w-full px-3 py-2 input input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2]  bg-[#1B1D21] text-gray-400 border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Product Image
            </label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 px-4 py-8 text-center rounded-md"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">
                Drag and drop files here, or click to select a file
              </p>
            </div>
            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-semibold py-2 rounded-md"
          >
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
