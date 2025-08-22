

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Mail, User, Search, Building, UserCheck, UserX } from 'lucide-react';
import useCompanyInfo from '../../../Hooks/useCompanyInfo';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {Helmet} from "react-helmet-async"

const MyTeam = () => {
    const { companyInfo } = useCompanyInfo();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: employees = [], isLoading } = useQuery({
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

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee =>
        employee.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.memberType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getMemberTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'hr':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'employee':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'manager':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'admin':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getMemberTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'hr':
                return <UserCheck className="w-4 h-4 text-purple-400" />;
            case 'employee':
                return <User className="w-4 h-4 text-blue-400" />;
            case 'manager':
                return <Users className="w-4 h-4 text-green-400" />;
            case 'admin':
                return <UserX className="w-4 h-4 text-red-400" />;
            default:
                return <User className="w-4 h-4 text-gray-400" />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#9538E2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading your team...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 p-6">
                <Helmet> <title>AssetVerse | My Team</title> </Helmet>
                
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                            <Users className="text-[#9538E2] text-xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">My Team</h1>
                            <p className="text-gray-400">View your team members and colleagues</p>
                        </div>
                    </div>

                    {/* Company Info */}
                    {companyInfo?.companyName && (
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                                    <Building className="text-blue-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{companyInfo.companyName}</h3>
                                    <p className="text-gray-400">Your company team</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Total Members</p>
                                    <p className="text-2xl font-bold text-white">{employees.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                                    <Users className="text-blue-500 text-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">HR Members</p>
                                    <p className="text-2xl font-bold text-white">{employees.filter(e => e.memberType?.toLowerCase() === 'hr').length}</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                                    <UserCheck className="text-purple-500 text-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Employees</p>
                                    <p className="text-2xl font-bold text-white">{employees.filter(e => e.memberType?.toLowerCase() === 'employee').length}</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                                    <User className="text-green-500 text-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Managers</p>
                                    <p className="text-2xl font-bold text-white">{employees.filter(e => e.memberType?.toLowerCase() === 'manager').length}</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                                    <Users className="text-yellow-500 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search team members by name, email, or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#9538E2] focus:ring-2 focus:ring-[#9538E2]/20 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Team Members Grid */}
                {!companyInfo?.companyName ? (
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Building className="text-[#9538E2] text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Company Affiliation Needed</h3>
                        <p className="text-gray-400">You are currently not affiliated with any company. Please contact your HR department to get registered.</p>
                    </div>
                ) : filteredEmployees.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="text-[#9538E2] text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Team Members Found</h3>
                        <p className="text-gray-400">
                            {searchTerm ? `No team members match "${searchTerm}". Try a different search term.` : 'No team members found in your company.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEmployees.map((employee) => (
                            <div 
                                key={employee._id}
                                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Member Avatar and Info */}
                                <div className="text-center mb-4">
                                    <div className="relative mx-auto mb-4">
                                        <div className="w-20 h-20 mx-auto">
                                            <img
                                                className="w-20 h-20 rounded-full object-cover border-4 border-gray-700 group-hover:border-purple-600/50 transition-all duration-300"
                                                src={employee.employeePhotoURL || 'https://via.placeholder.com/80x80/6B7280/FFFFFF?text=?'}
                                                alt={employee.employeeName}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/80x80/6B7280/FFFFFF?text=?';
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full flex items-center justify-center">
                                            {getMemberTypeIcon(employee.memberType)}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 mb-1">
                                        {employee.employeeName}
                                    </h3>
                                    
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMemberTypeColor(employee.memberType)}`}>
                                            {employee.memberType}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-sm truncate">{employee.employeeEmail}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTeam;