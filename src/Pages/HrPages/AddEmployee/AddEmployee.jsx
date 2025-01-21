
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCompanyInfo from '../../../Hooks/useCompanyInfo';
import {Helmet} from "react-helmet-async"

const AddEmployee = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { companyInfo } = useCompanyInfo();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ['employeesWithoutCompany'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employees-without-company');
      return res.data;
    }
  });

  // Mutation for adding employees
  const { mutate: addEmployees } = useMutation({
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

  return (
    <div className="container mx-auto px-4 py-8">
       <Helmet> <title>AssetVerse | Add Employee</title> </Helmet>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add Employees</h2>
        <div className="text-right flex items-center gap-4">
          <p className="text-sm text-gray-600">
            Member Limit: {companyInfo.currentMembers}/{companyInfo.memberLimit}
          </p>
          <a
            href="/payment"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
          >
            Increase Limit
          </a>
        </div>
      </div>

      {selectedEmployees.length > 0 && (
        <button
          onClick={handleAddSelected}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Selected Members to Team ({selectedEmployees.length})
        </button>
      )}

      {availableEmployees.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No employees available to add
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {availableEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.some(e => e._id === employee._id)}
                      onChange={() => handleSelectEmployee(employee)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={employee.photoURL}
                      alt={employee.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSingleAdd(employee)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Add to Team
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;