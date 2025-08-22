import { FaCheck, FaUsers } from "react-icons/fa";

const PackageCard = ({ pkg, isSelected, onSelect }) => (
  <div
    className={`p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 group ${
      isSelected 
        ? 'border-[#9538E2] bg-gray-800/80 shadow-2xl shadow-purple-900/25' 
        : 'border-gray-700 hover:border-purple-600/50 hover:shadow-xl hover:shadow-purple-900/20'
    }`}
    onClick={onSelect}
  >
    <div className="flex justify-between items-center mb-4">
      <div>
        <h4 className="text-lg font-semibold text-white">{pkg.name}</h4>
        <div className="flex items-center space-x-2 text-gray-300 mt-1">
          <FaUsers className="text-[#9538E2]" />
          <span className="text-sm">{pkg.members} Team Members</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-[#9538E2]">${pkg.price}</div>
        <div className="text-gray-400 text-sm">per month</div>
      </div>
    </div>
    
    <ul className="space-y-3 mb-4">
      {pkg.features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
          <div className="w-5 h-5 bg-gradient-to-r from-[#9538E2] to-purple-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <FaCheck className="text-white text-xs" />
          </div>
          <span className="text-sm font-medium">{feature}</span>
        </li>
      ))}
    </ul>

    {/* Selection Indicator */}
    <div className={`text-center py-3 rounded-xl transition-all duration-300 ${
      isSelected 
        ? 'bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 border border-[#9538E2]/30' 
        : 'bg-gray-800/50 group-hover:bg-gray-700/50 border border-gray-700'
    }`}>
      <span className={`font-semibold text-sm ${
        isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'
      }`}>
        {isSelected ? 'Selected Package' : 'Select This Package'}
      </span>
    </div>
  </div>
);

export default PackageCard;