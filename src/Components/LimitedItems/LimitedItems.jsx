import React from "react";
import { useQuery } from "@tanstack/react-query";
import img1 from "../../../public/NoDataImg-1.png";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const LimitedItems = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: limitedStockItems = [], isLoading } = useQuery({
    queryKey: ["limitedStockItems", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/limited-stock-items/${user?.email}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center min-h-screen text-center text-[#9538E2]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#efedf0]  p-10 pb-16">
      <h2 className="text-2xl md:text-3xl text-[#9538E2]  text-center font-bold  mt-5 mb-16">
        Limited Stock Items
      </h2>

      {limitedStockItems.length === 0 ? (
        <div className="flex flex-col md:flex-row items-center justify-center rounded-lg p-6">
          <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
            <img
              src={img1}
              alt="No data illustration"
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl text-[#9538E2] font-semibold  mb-3">
              No Low Stock Items
            </h3>
            <p className="text-gray-800 font-medium">
              Great job! All assets are currently well-stocked. Continue
              monitoring inventory levels to maintain optimal resources.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {limitedStockItems.map((item) => (
            <div key={item._id} className="flex justify-center">
              <div className="w-full h-[280px] relative overflow-hidden group cursor-pointer rounded-md">
                {/* Asset Image */}
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"
                />

                {/* Content Overlay */}
                <div className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col px-4">
                  <h1 className="text-[1.5rem] font-bold text-white text-center capitalize mb-2">
                    {item.productName}
                  </h1>
                  <p className="text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[0.9rem] mb-2 font-medium">
                    Quantity Left: {item.productQuantity}
                    <br />
                    Type: {item.productType}
                  </p>
                  <Link to="/assetList">
                   
                    <button className="z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-6 py-2 mt-3 rounded-md text-[0.9rem] bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-semibold">
                      Restock Soon
                    </button>
                  </Link>
                </div>

                {/* Bottom Shadow Gradient */}
                <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.8)] h-[100%] absolute bottom-0 left-0 right-0"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LimitedItems;
