

import { useQuery } from '@tanstack/react-query';
import useCompanyInfo from '../../../Hooks/useCompanyInfo';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {Helmet} from "react-helmet-async"

const MyTeam = () => {
    const { companyInfo } = useCompanyInfo();
    const axiosSecure = useAxiosSecure();

    const { data: employees = [] } = useQuery({
        queryKey: ['myTeam', companyInfo?.companyName],
        queryFn: async () => {
            if (!companyInfo?.companyName) {
                return [];
            }
            const response = await axiosSecure.get(
                `/myTeam?companyName=${companyInfo.companyName}`
            );
            return response.data;
        },
        enabled: !!companyInfo?.companyName,
    });

    return (

        <div className='bg-[#212428]  px-4 py-10'>

        <div className="max-w-7xl mx-auto p-8 ">
             <Helmet> <title>AssetVerse | My Team</title> </Helmet>
            <h2 className="text-3xl font-bold mb-8 mt-24 text-[#9538E8]">My Team Members</h2>
            
            <div className="overflow-x-auto animate__animated animate__fadeInUp">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gray-400">
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
                        </tr>
                    </thead>
                    <tbody className="bg-[#1B1D21] border border-gray-500 divide-y divide-gray-500   cursor-pointer">
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-center items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={employee.employeePhotoURL}
                                                alt={employee.employeeName}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-400">
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
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {employee.memberType}
                                    </span>
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

export default MyTeam;