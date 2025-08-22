
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import img1 from "../../../public/NoDataImg-2.png";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const COLORS = ['#9538E2', '#FF8042'];

const Chart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['returnable-items', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/chart/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Categorize items
    const returnableItems = items.filter(item => item.productType === 'Returnable');
    const nonReturnableItems = items.filter(item => item.productType === 'Non-Returnable');

    const pieData = [
        { 
            name: 'Returnable', 
            value: returnableItems.reduce((sum, item) => sum + (item.requestCount || 0), 0),
            color: COLORS[0]
        },
        { 
            name: 'Non-Returnable', 
            value: nonReturnableItems.reduce((sum, item) => sum + (item.requestCount || 0), 0),
            color: COLORS[1]
        }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <div className="text-center text-[#9538E2]">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="relative">
                {/* Dark background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center p-6 relative z-10">
                    <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
                        <img
                            src={img1}
                            alt="No data illustration"
                            className="max-w-full h-auto object-contain"
                        />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-3xl text-[#9538E2] font-semibold mb-3">
                            No Items Available
                        </h3>
                        <p className="text-gray-300 font-medium leading-relaxed">
                            There are currently no items in the system. Add some items to see the breakdown.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Dark background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 pb-16 border border-gray-700 relative z-10">
                <div className="text-center mb-6">
                    <div className="inline-block ">
                        <h2 className="text-2xl md:text-3xl text-[#9538E2] font-bold mt-10 mb-6">
                            Returnable vs Non-Returnable Items
                        </h2>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f3f4f6'
                            }}
                        />
                        <Legend 
                            layout="horizontal" 
                            verticalAlign="bottom" 
                            align="center"
                            wrapperStyle={{
                                color: '#f3f4f6',
                                fontSize: '14px'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;