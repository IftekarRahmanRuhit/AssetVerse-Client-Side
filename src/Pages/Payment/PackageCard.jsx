

const PackageCard = ({ pkg, isSelected, onSelect }) => (
  <div
    className={`p-6 rounded-lg border-2 transition-all ${
      isSelected ? 'border-[#9538E2] bg-blue-50' : 'border-gray-200 hover:border-[#9538E2]'
    }`}
    onClick={onSelect}
  >
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
        <p className="text-gray-600">{pkg.members} Team Members</p>
      </div>
      <div className="text-2xl font-bold text-[#9538E2] ">${pkg.price}</div>
    </div>
    <ul className="mt-4 space-y-2">
      {pkg.features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-600">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default PackageCard;