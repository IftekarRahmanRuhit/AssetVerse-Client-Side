import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyEmployees = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["myEmployees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myEmployees/${user?.email}`);
      return res.data;
    },
  });

  const handleRemoveEmployee = async (employeeId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove them!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/removeEmployee/${employeeId}/${user?.email}`
        );
        if (res.data.success) {
          Swal.fire(
            "Removed!",
            "Employee has been removed from your team.",
            "success"
          );
          refetch();
        }
      }
    } catch (error) {
      Swal.fire("Error", "Failed to remove employee", "error");
    }
  };

  return (
    <div className="bg-[#212428] ">
      <div className="max-w-7xl mx-auto p-8  ">
        <Helmet>
        
          <title>AssetVerse | My Employees</title>{" "}
        </Helmet>
        <h2 className="text-3xl mt-24 font-bold mb-8 animate__animated animate__fadeInUp text-[#9538E2]">
          My Team Members
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg animate__animated animate__fadeInUp">
            <thead className="bg-gray-400 ">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1B1D21] border border-gray-500  divide-y divide-gray-500 ">
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex text-center items-center justify-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 mx-auto rounded-full object-cover"
                          src={employee.employeePhotoURL}
                          alt={employee.employeeName}
                        />
                      </div>
                      <div className="ml-4 text-center">
                        <div className="text-sm text-center font-medium text-gray-400">
                          {employee.employeeName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-400">
                      {employee.employeeEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.memberType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button
                      onClick={() => handleRemoveEmployee(employee._id)}
                      className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEmployees;
