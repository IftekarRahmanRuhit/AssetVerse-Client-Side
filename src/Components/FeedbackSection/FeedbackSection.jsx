
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
        <div className="  px-4 py-8 bg-white pb-16">
            <h2 className="text-2xl md:text-3xl text-[#9538E2] font-bold  mb-8 text-center mt-5 ">
                Employee Asset Insights
            </h2>

            <div className="space-y-4 w-11/12 mx-auto cursor-pointer">
                {feedbackEntries.map((entry) => (
                    <div 
                        key={entry.id} 
                        className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300 border-l-4 border-[#9538E2]"
                    >
                        <div className="flex items-center mb-3">
                            <img 
                                src={entry.avatar} 
                                alt={entry.name} 
                                className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{entry.name}</h3>
                                <p className="text-sm text-gray-600">{entry.role}</p>
                            </div>
                            <span className={`ml-auto text-xs px-2 py-1 rounded-full 
                                ${entry.impact === 'Critical' ? 'bg-red-200 text-red-800' : 
                                  entry.impact === 'High Priority' ? 'bg-orange-200 text-orange-800' : 
                                  'bg-green-200 text-green-800'}`}>
                                {entry.impact}
                            </span>
                        </div>
                        <p className="text-gray-700">{entry.message}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <p className="text-gray-500 italic">
                    Your insights drive continuous workplace improvement.
                </p>
            </div>
        </div>
    );
};

export default FeedbackSection;