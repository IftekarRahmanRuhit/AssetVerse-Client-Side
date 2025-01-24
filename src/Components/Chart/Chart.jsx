
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import img1 from "../../../public/NoDataImg-1.png";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const COLORS = ['#0088FE', '#FF8042'];

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
        return <div>Loading...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col md:flex-row items-center justify-center bg-gray-800 rounded-lg p-6">
                <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
                    <img
                        src={img1}
                        alt="No data illustration"
                        className="max-w-full h-auto object-contain"
                    />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">
                        No Items Available
                    </h3>
                    <p className="text-gray-400">
                        There are currently no items in the system. Add some items to see the breakdown.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
                Returnable vs Non-Returnable Items
            </h2>
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
                    <Tooltip />
                    <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;