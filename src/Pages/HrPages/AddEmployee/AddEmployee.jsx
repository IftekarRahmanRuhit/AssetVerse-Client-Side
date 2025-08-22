
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, UserPlus, Search, CheckCircle, AlertCircle, Plus, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCompanyInfo from '../../../Hooks/useCompanyInfo';
import {Helmet} from "react-helmet-async"

const AddEmployee = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { companyInfo } = useCompanyInfo();

  const { data: employees = [], refetch, isLoading } = useQuery({
    queryKey: ['employeesWithoutCompany'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employees-without-company');
      return res.data;
    }
  });

  // Mutation for adding employees
  const { mutate: addEmployees, isPending } = useMutation({
    mutationFn: async (selectedEmployees) => {
      const employeeData = selectedEmployees.map(employee => ({
        employeeName: employee.name,
        employeeEmail: employee.email,
        employeePhotoURL: employee.photoURL,
        companyHrEmail: companyInfo.email,
        companyHrName: companyInfo.name,
        companyName: companyInfo.companyName,
        companyLogo: companyInfo.companyLogo,
        memberType: "employee"
      }));

      const response = await axiosSecure.post('/add-employees', { employees: employeeData });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Employees added successfully!');
      setSelectedEmployees([]);
     
      queryClient.invalidateQueries(['employeesWithoutCompany']);
      queryClient.invalidateQueries(['companyInfo']);
   
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add employees');
    }
  });

  const handleSelectEmployee = (employee) => {
    if (selectedEmployees.find(e => e._id === employee._id)) {
      setSelectedEmployees(prev => prev.filter(e => e._id !== employee._id));
    } else {
      const remainingLimit = companyInfo.memberLimit - companyInfo.currentMembers;
      if (selectedEmployees.length >= remainingLimit) {
        toast.error('Member limit reached. Please upgrade your plan.');
        return;
      }
      setSelectedEmployees(prev => [...prev, employee]);
    }
  };

  const handleAddSelected = () => {
    if (selectedEmployees.length === 0) {
      toast.error('Please select employees to add');
      return;
    }

    const remainingLimit = companyInfo.memberLimit - companyInfo.currentMembers;
    if (selectedEmployees.length > remainingLimit) {
      toast.error('Selected employees exceed your member limit');
      return;
    }

    addEmployees(selectedEmployees);
  };

  const handleSingleAdd = (employee) => {
    const remainingLimit = companyInfo.memberLimit - companyInfo.currentMembers;
    if (remainingLimit <= 0) {
      toast.error('Member limit reached. Please upgrade your plan.');
      return;
    }
    addEmployees([employee]);
  };

  // Filtering any employees that have already been added to a team
  const availableEmployees = employees.filter(employee => 
    !employee.companyName && !employee.CompanyName
  );

  // Filter employees based on search term
  const filteredEmployees = availableEmployees.filter(employee =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9538E2] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading available employees...</p>
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
            <UserPlus className="text-[#9538E2] text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Add Employees</h2>
            <p className="text-gray-400 text-sm">Add employees to your team</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 text-[#9538E2] rounded-full text-sm font-medium border border-[#9538E2]/30">
            {availableEmployees.length} Available
          </span>
        </div>
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
              Adding to: <span className="text-[#9538E2] font-medium">{companyInfo?.companyName || 'Your Company'}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Member Limit</p>
            <p className="text-lg font-bold text-white">
              {companyInfo?.currentMembers || 0} / {companyInfo?.memberLimit || 0}
            </p>
            <p className="text-xs text-gray-500">
              {companyInfo?.memberLimit - (companyInfo?.currentMembers || 0)} spots remaining
            </p>
          </div>
        </div>
      </div>

      {/* Search and Selection */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
              type="text"
              placeholder="Search employees by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-1 focus:ring-[#9538E2]/20 transition-all duration-200"
            />
          </div>

          {/* Selected Employees */}
          {selectedEmployees.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Selected Employees ({selectedEmployees.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedEmployees.map((employee) => (
                  <div key={employee._id} className="flex items-center gap-2 px-3 py-2 bg-[#9538E2]/20 border border-[#9538E2]/30 rounded-lg">
                    <img
                      src={employee.photoURL || "https://via.placeholder.com/24?text=U"}
                      alt={employee.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-white">{employee.name}</span>
                    <button
                      onClick={() => handleSelectEmployee(employee)}
                      className="text-[#9538E2] hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddSelected}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#9538E2] to-purple-600 hover:from-purple-600 hover:to-[#9538E2] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-900/25"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Employees...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="text-lg" />
                    <span>Add Selected Employees</span>
                  </div>
                )}
              </button>
        </div>
      )}
    </div>
    </div>

      {/* Available Employees */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="text-[#9538E2]" />
          Available Employees
        </h3>

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-[#9538E2] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Available Employees</h3>
            <p className="text-gray-400">All employees are already assigned to companies</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((employee) => (
              <div key={employee._id} className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={employee.photoURL || "https://via.placeholder.com/48?text=U"}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#9538E2]/30"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{employee.name}</h4>
                    <p className="text-xs text-gray-400">{employee.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelectEmployee(employee)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedEmployees.find(e => e._id === employee._id)
                        ? 'bg-[#9538E2] text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                    }`}
                  >
                    {selectedEmployees.find(e => e._id === employee._id) ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Select
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSingleAdd(employee)}
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-lg transition-all duration-200 border border-green-500/30 hover:border-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;