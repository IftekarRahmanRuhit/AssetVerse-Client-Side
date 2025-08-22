
const FeedbackSection = () => {
    const feedbackEntries = [
        {
            id: 1,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Michael Rodriguez",
            role: "Senior Software Engineer",
            message: "Propose implementing a centralized asset tracking system for better inventory management.",
            impact: "High Priority"
        },
        {
            id: 2,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            name: "Elena Petrova",
            role: "Design Team Lead",
            message: "Recommend upgrading design workstations with high-resolution monitors.",
            impact: "Medium Priority"
        },
        {
            id: 3,
            avatar: "https://randomuser.me/api/portraits/men/55.jpg",
            name: "David Kim",
            role: "IT Infrastructure Manager",
            message: "Suggest implementing a proactive maintenance schedule for office equipment.",
            impact: "Critical"
        }
    ];

    return (
        <div className="px-4 py-8 pb-16 relative">
            {/* Dark background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-block p-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-full mb-6">
                        <h2 className="text-2xl md:text-3xl text-[#9538E2] font-bold mb-8 text-center mt-5">
                            Employee Asset Insights
                        </h2>
                    </div>
                </div>

                <div className="space-y-4 w-11/12 mx-auto cursor-pointer">
                    {feedbackEntries.map((entry) => (
                        <div 
                            key={entry.id} 
                            className="group bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-1 border border-gray-700 hover:border-purple-600/50 border-l-4 border-l-[#9538E2]"
                        >
                            <div className="flex items-center mb-3">
                                <img 
                                    src={entry.avatar} 
                                    alt={entry.name} 
                                    className="w-12 h-12 rounded-full mr-4 object-cover ring-2 ring-purple-500/50 group-hover:ring-purple-500 transition-all duration-300"
                                />
                                <div>
                                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">{entry.name}</h3>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{entry.role}</p>
                                </div>
                                <span className={`ml-auto text-xs px-3 py-1 rounded-full font-medium shadow-lg
                                    ${entry.impact === 'Critical' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-900/25' : 
                                      entry.impact === 'High Priority' ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-orange-900/25' : 
                                      'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-green-900/25'}`}>
                                    {entry.impact}
                                </span>
                            </div>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">{entry.message}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 italic">
                        Your insights drive continuous workplace improvement.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackSection;