
import React, { useState } from 'react';
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet-async";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit3, 
  Camera,
  CheckCircle,
  Clock,
  Activity,
  Award,
  Settings,
  Bell,
  Lock
} from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [role] = useRole();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.displayName || '',
        phone: '',
        position: role === 'hr' ? 'HR Manager' : 'Employee',
        department: '',
        location: '',
        bio: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            fullName: user?.displayName || '',
            phone: '',
            position: role === 'hr' ? 'HR Manager' : 'Employee',
            department: '',
            location: '',
            bio: ''
        });
        setIsEditing(false);
    };

    const profileCompletion = 75; // Calculate based on filled fields
    const memberSince = '2024';
    const totalAssets = 12;
    const activeRequests = 3;
    const activityScore = 85;

    const recentActivity = [
        { id: 1, action: 'Requested new laptop', time: '2 hours ago', status: 'pending' },
        { id: 2, action: 'Updated profile information', time: '1 day ago', status: 'completed' },
        { id: 3, action: 'Returned office chair', time: '3 days ago', status: 'completed' },
        { id: 4, action: 'Requested monitor', time: '1 week ago', status: 'approved' }
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
            <Helmet> 
                <title>AssetVerse | Profile</title> 
            </Helmet>
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 p-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                                <p className="text-gray-400">Manage your account information and preferences</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300">
                                    <Bell className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300">
                                    <Settings className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                                {/* Profile Image */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative group mb-4">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl">
                                            <img 
                                                src={user?.photoURL || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-700">
                                            <Camera className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-white mb-1">{user?.displayName}</h2>
                                    <p className="text-gray-400 text-sm mb-2">{user?.email}</p>
                                    <div className="flex items-center gap-2 text-purple-400 text-sm">
                                        <Shield className="w-4 h-4" />
                                        <span className="capitalize">{role}</span>
                                    </div>
                                </div>

                                {/* Profile Completion */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">Profile Completion</span>
                                        <span className="text-sm text-purple-400 font-medium">{profileCompletion}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${profileCompletion}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                                <Activity className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-sm text-gray-300">Total Assets</span>
                                        </div>
                                        <span className="text-white font-semibold">{totalAssets}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                                <Clock className="w-4 h-4 text-yellow-400" />
                                            </div>
                                            <span className="text-sm text-gray-300">Active Requests</span>
                                        </div>
                                        <span className="text-white font-semibold">{activeRequests}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-500/20 rounded-lg">
                                                <Award className="w-4 h-4 text-green-400" />
                                            </div>
                                            <span className="text-sm text-gray-300">Activity Score</span>
                                        </div>
                                        <span className="text-white font-semibold">{activityScore}%</span>
                                    </div>
                                </div>

                                {/* Member Since */}
                                <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                                    <Calendar className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400">Member since</p>
                                    <p className="text-white font-semibold">{memberSince}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form & Activity */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Form */}
                            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Personal Information</h3>
                                    <button 
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        {isEditing ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:outline-none focus:ring-purple-500/50 focus:border-purple-500 bg-gray-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={user?.email}
                                                readOnly
                                                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-400 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:outline-none focus:ring-purple-500/50 focus:border-purple-500 bg-gray-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="+880-00000000"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                <Award className="w-4 h-4" />
                                                Position
                                            </label>
                                            <input
                                                type="text"
                                                name="position"
                                                value={formData.position}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:outline-none focus:ring-purple-500/50 focus:border-purple-500 bg-gray-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Your position"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Department
                                            </label>
                                            <input
                                                type="text"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:outline-none focus:ring-purple-500/50 focus:border-purple-500 bg-gray-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Your department"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:outline-none focus:ring-purple-500/50 focus:border-purple-500 bg-gray-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Your location"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:outline-none focus:ring-purple-500/50 focus:border-purple-500 bg-gray-800 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    {isEditing && (
                                        <div className="flex gap-4 pt-4">
                                            <button 
                                                type="submit" 
                                                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/25"
                                            >
                                                Save Changes
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={handleCancel}
                                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300">
                                            <div className={`p-2 rounded-lg ${
                                                activity.status === 'completed' ? 'bg-green-500/20' :
                                                activity.status === 'pending' ? 'bg-yellow-500/20' :
                                                'bg-blue-500/20'
                                            }`}>
                                                <CheckCircle className={`w-4 h-4 ${
                                                    activity.status === 'completed' ? 'text-green-400' :
                                                    activity.status === 'pending' ? 'text-yellow-400' :
                                                    'text-blue-400'
                                                }`} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white font-medium">{activity.action}</p>
                                                <p className="text-gray-400 text-sm">{activity.time}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {activity.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;



