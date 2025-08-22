import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, UserX, Mail, Calendar, Trash2, UserCheck } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyEmployees = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch, isLoading } = useQuery({
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
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9538E2] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading employees...</p>
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
            <Users className="text-[#9538E2] text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">My Team Members</h2>
            <p className="text-gray-400 text-sm">Manage your company employees</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 text-[#9538E2] rounded-full text-sm font-medium border border-[#9538E2]/30">
            {employees.length} Members
          </span>
        </div>
      </div>

      {/* Employees Grid */}
      {employees.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-[#9538E2] text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Team Members</h3>
          <p className="text-gray-400">Add employees to your team to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
            <div key={employee._id} className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1">
              {/* Employee Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#9538E2]/30"
                    src={employee.employeePhotoURL || "https://via.placeholder.com/64?text=User"}
                          alt={employee.employeeName}
                        />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <UserCheck className="w-3 h-3 text-white" />
                  </div>
                      </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#9538E2] transition-colors duration-200">
                          {employee.employeeName}
                  </h3>
                  <p className="text-sm text-gray-400 capitalize">
                    {employee.memberType || 'Employee'}
                  </p>
                        </div>
                      </div>

              {/* Employee Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{employee.employeeEmail}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    Joined: {new Date(employee.joinedDate || Date.now()).toLocaleDateString()}
                  </span>
                    </div>
                    </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-700/50">
                    <button
                      onClick={() => handleRemoveEmployee(employee._id)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500/50 group/btn"
                    >
                  <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Remove</span>
                    </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Stats */}
      {employees.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="text-[#9538E2] text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{employees.length}</h3>
              <p className="text-gray-400 text-sm">Total Members</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <UserCheck className="text-green-500 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{employees.filter(emp => emp.memberType === 'employee').length}</h3>
              <p className="text-gray-400 text-sm">Active Employees</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="text-blue-500 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {employees.filter(emp => {
                  const joinDate = new Date(emp.joinedDate || Date.now());
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return joinDate >= thirtyDaysAgo;
                }).length}
              </h3>
              <p className="text-gray-400 text-sm">New This Month</p>
            </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MyEmployees;

