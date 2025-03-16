
import useAuth from "../../Hooks/useAuth";
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet-async";

const Profile = () => {
    const { user } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Update feature coming soon');
    };

    return (
        <div className="bg-[#212428] py-10  max-w-screen-2xl mx-auto">
            <Helmet> 
                <title>AssetVerse | Profile</title> 
            </Helmet>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">User Profile</h1>
                    <div className="w-24 h-1 bg-purple-600 rounded-full"></div>
                </div>

                <div className="bg-[#1B1D21] rounded-2xl shadow-xl overflow-hidden animate__animated animate__fadeInUp border border-[#9538e277]">
                    <div className="grid md:grid-cols-3 gap-8 p-8">
                        {/* Profile Image Section */}
                        <div className="md:col-span-1 flex flex-col items-center space-y-6">
                            <div className="relative group">
                                <img 
                                    src={user?.photoURL || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'} 
                                    alt="Profile" 
                                    className="w-48 h-48 rounded-full object-cover border-4 border-[#9538e277] shadow-lg transform transition duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-full bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#9538E2]">{user?.displayName}</h2>
                                <p className="text-gray-400 mt-1">{user?.email}</p>
                            </div>
                        </div>

                        {/* Profile Form Section */}
                        <div className="md:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 ">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={user?.displayName}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-600  focus:ring-1 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] bg-[#1B1D21] text-gray-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user?.email}
                                            readOnly
                                            className="w-full px-4 py-3 rounded-lg border border-gray-600 cursor-not-allowed focus:ring-1 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] bg-[#1B1D21] text-gray-300"
                                        />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:ring-1 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] bg-[#1B1D21] text-gray-300"
                                            placeholder="+880-00000000"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Position
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:ring-1 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] bg-[#1B1D21] text-gray-300 "
                                            placeholder="Your position"
                                        />
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-purple-600 font-bold text-xl">12</div>
                                        <div className="text-sm text-gray-600">Total Assets</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-purple-600 font-bold text-xl">3</div>
                                        <div className="text-sm text-gray-600">Active Requests</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-purple-600 font-bold text-xl">2025</div>
                                        <div className="text-sm text-gray-600">Member Since</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-purple-600 font-bold text-xl">85%</div>
                                        <div className="text-sm text-gray-600">Activity</div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;



