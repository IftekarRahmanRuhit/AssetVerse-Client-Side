import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useRole from "../../Hooks/useRole";
import { Helmet } from "react-helmet-async";

// Icons
import { GoHome, GoProjectSymlink, GoSidebarCollapse } from "react-icons/go";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { FiBarChart, FiPieChart } from "react-icons/fi";
import { 
  Users, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  MessageSquare,
  FileText,
  Plus,
  Eye,
  List,
  UserPlus,
  UserCheck,
  Menu,
  X,
  LogOut
} from 'lucide-react';

// Components
import MyPendingRequest from "../../Components/My Pending Request/MyPendingRequest";
import MyMonthlyRequest from "../../Components/My Monthly Request/MyMonthlyRequest";
import PendingRequest from "../../Components/Pending Request/PendingRequest";
import MostRequestedItems from "../../Components/MostRequestedItems/MostRequestedItems";
import LimitedItems from "../../Components/LimitedItems/LimitedItems";
import Chart from "../../Components/Chart/Chart";
import FeedbackSection from "../../Components/FeedbackSection/FeedbackSection";
import Events from "../../Components/Events/Events";
import PricingPackages from "../../Components/PricingPackages/PricingPackages";
import AssetList from "../../Pages/HrPages/AssetList/AssetList";
import AddAsset from "../../Pages/HrPages/AddAsset/AddAsset";
import AllRequests from "../../Pages/HrPages/AllRequests/AllRequests";
import MyEmployees from "../../Pages/HrPages/MyEmployees/MyEmployees";
import AddEmployee from "../../Pages/HrPages/AddEmployee/AddEmployee";
import Profile from "../../Pages/Profile/Profile";
import MyAssets from "../../Pages/EmployeePages/MyAssets/MyAssets";
import MyTeam from "../../Pages/EmployeePages/MyTeam/MyTeam";
import RequestAnAsset from "../../Pages/EmployeePages/RequestAnAsset/RequestAnAsset";

// Wrapper components for navigation
const PendingRequestWrapper = ({ onNavigateToAllRequests }) => {
  return <PendingRequest onViewAll={onNavigateToAllRequests} />;
};

const MyPendingRequestWrapper = ({ onNavigateToAllRequests, onNavigateToMyAssets }) => {
  return <MyPendingRequest onViewAll={onNavigateToMyAssets} />;
};

const LimitedItemsWrapper = ({ onNavigateToAssetList }) => {
  return <LimitedItems onViewAssetList={onNavigateToAssetList} />;
};

const Dashboard = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, isLoading] = useRole();
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser();
    navigate('/login');
  };

  const handleNavigateToAllRequests = () => {
    setActiveSection('all-requests');
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToAssetList = () => {
    setActiveSection('asset-list');
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToMyAssets = () => {
    setActiveSection('my-assets');
    setIsMobileMenuOpen(false);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-4">
            {/* Main Content */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                  Recent Activity
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                {role === "employee" ? 
                  <MyPendingRequestWrapper onNavigateToAllRequests={handleNavigateToAllRequests} onNavigateToMyAssets={handleNavigateToMyAssets} /> : 
                  <PendingRequestWrapper onNavigateToAllRequests={handleNavigateToAllRequests} />
                }
              </div>
            </div>
          </div>
        );

      case 'pending-requests':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                {role === "employee" ? "My Pending Requests" : "Pending Requests"}
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              {role === "employee" ? <MyPendingRequest onViewAll={handleNavigateToMyAssets} /> : <PendingRequest />}
            </div>
          </div>
        );

      case 'monthly-requests':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Monthly Requests
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <MyMonthlyRequest />
            </div>
          </div>
        );

      case 'most-requested':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Most Requested Items
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <MostRequestedItems onNavigateToAllRequests={handleNavigateToAllRequests} />
            </div>
          </div>
        );

      case 'limited-items':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Limited Stock Items
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <LimitedItemsWrapper onNavigateToAssetList={handleNavigateToAssetList} />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Asset Analytics
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <Chart />
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Upcoming Events
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <Events />
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Employee Feedback
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <FeedbackSection />
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Pricing Packages
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <PricingPackages />
            </div>
          </div>
        );

      // HR Management Sections
      case 'asset-list':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <List className="text-[#9538E2] text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">Asset List</h2>
                    <p className="text-gray-400 text-sm hidden sm:block">Manage company assets</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9538E2] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">Live Updates</span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <AssetList />
            </div>
          </div>
        );

      case 'add-asset':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Add Asset
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <AddAsset />
            </div>
          </div>
        );

      case 'all-requests':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <FileText className="text-[#9538E2] text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">All Requests</h2>
                    <p className="text-gray-400 text-sm hidden sm:block">Manage employee asset requests</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9538E2] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">Live Updates</span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <AllRequests />
            </div>
          </div>
        );

      case 'my-employees':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                My Employees
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <MyEmployees />
            </div>
          </div>
        );

      case 'add-employee':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Add Employee
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <AddEmployee />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                Profile
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <Profile />
            </div>
          </div>
        );

      // Employee Management Sections
      case 'my-assets':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <Package className="text-[#9538E2] text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">My Assets</h2>
                    <p className="text-gray-400 text-sm hidden sm:block">View and manage your assigned assets</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9538E2] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">Live Updates</span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <MyAssets />
            </div>
          </div>
        );

      case 'my-team':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <Users className="text-[#9538E2] text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">My Team</h2>
                    <p className="text-gray-400 text-sm hidden sm:block">View your team members and colleagues</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9538E2] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">Team Info</span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <MyTeam />
            </div>
          </div>
        );

      case 'request-asset':
        return (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <Plus className="text-[#9538E2] text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">Request Asset</h2>
                    <p className="text-gray-400 text-sm hidden sm:block">Submit new asset requests</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9538E2] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">Available Assets</span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <RequestAnAsset />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sidebarItems = role === "employee" ? [
    { id: 'overview', label: 'Overview', icon: GoHome },
    { id: 'pending-requests', label: 'My Pending Requests', icon: AlertTriangle },
    { id: 'monthly-requests', label: 'Monthly Requests', icon: TrendingUp },
    { id: 'my-assets', label: 'My Assets', icon: Package },
    { id: 'my-team', label: 'My Team', icon: Users },
    { id: 'request-asset', label: 'Request Asset', icon: Plus },
    { id: 'events', label: 'Events', icon: CiCalendar },
  ] : [
    { id: 'overview', label: 'Overview', icon: GoHome },
    { id: 'most-requested', label: 'Most Requested Items', icon: Package },
    { id: 'limited-items', label: 'Limited Items', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart },
    { id: 'pricing', label: 'Pricing Packages', icon: FiPieChart },
    { id: 'events', label: 'Events', icon: CiCalendar },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  const hrManagementItems = [
    { id: 'asset-list', label: 'Asset List', icon: List },
    { id: 'add-asset', label: 'Add Asset', icon: Plus },
    { id: 'all-requests', label: 'All Requests', icon: FileText },
    { id: 'my-employees', label: 'My Employees', icon: Users },
    { id: 'add-employee', label: 'Add Employee', icon: UserPlus },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const employeeManagementItems = [
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const signOutItem = { id: 'signout', label: 'Sign Out', icon: LogOut };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Helmet>
        <title>AssetVerse | Dashboard</title>
      </Helmet>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <aside className={`fixed lg:relative bg-gray-900/95 backdrop-blur-xl border-r border-gray-700 transition-all duration-300 ease-in-out h-full z-50 lg:z-auto ${
          isCollapse ? 'w-64' : 'w-16'
        } ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`p-4 sm:p-6 border-b border-gray-700 ${isCollapse ? 'px-6 sm:px-8' : 'px-3'} transition-all duration-300 ease-in-out`}>
              <div className="flex items-center justify-between">
                {isCollapse ? (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold text-white">AssetVerse</h1>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCollapse(!isCollapse)}
                    className={`p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 ${!isCollapse && 'mx-auto'} hidden lg:block`}
                  >
                    <GoSidebarCollapse className={`text-gray-400 hover:text-white transition-all duration-300 ${!isCollapse && 'rotate-180'}`} />
                  </button>
                  
                  {/* Mobile close button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200"
                  >
                    <X className="text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto">
              <div className={`mt-6 sm:mt-8 ${isCollapse ? "px-4 sm:px-6" : "px-3"} transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col gap-1 sm:gap-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center w-full p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 relative group ${
                          activeSection === item.id 
                            ? 'bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 text-[#9538E2] border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                        onClick={() => handleSectionChange(item.id)}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <Icon className={`text-lg sm:text-xl transition-all duration-200 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                          {isCollapse && <span className="text-sm font-medium">{item.label}</span>}
                        </div>
                        
                        {/* Tooltip for collapsed state - hidden on mobile */}
                        {!isCollapse && (
                          <div className="absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500 hidden lg:block">
                            <p className="text-sm bg-gray-800 text-gray-300 rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-gray-700">
                              {item.label}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* HR Management Section */}
              {role === "hr" && (
                <>
                  <div className={`${isCollapse ? "px-4 sm:px-6" : "px-3"} mt-8 sm:mt-10 border-t border-gray-700/50 transition-all duration-300 ease-in-out`}>
                    <div className="mt-6">
                      {isCollapse && (
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-3">
                          HR Management
                        </h3>
                      )}
                      <div className="flex flex-col gap-1 sm:gap-2">
                        {hrManagementItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              className={`flex items-center w-full p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 relative group ${
                                activeSection === item.id 
                                  ? 'bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 text-[#9538E2] border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10' 
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                              }`}
                              onClick={() => handleSectionChange(item.id)}
                            >
                              <div className="flex items-center gap-3 sm:gap-4">
                                <Icon className={`text-lg sm:text-xl transition-all duration-200 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                                {isCollapse && <span className="text-sm font-medium">{item.label}</span>}
                              </div>
                              
                              {/* Tooltip for collapsed state - hidden on mobile */}
                              {!isCollapse && (
                                <div className="absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500 hidden lg:block">
                                  <p className="text-sm bg-gray-800 text-gray-300 rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-gray-700">
                                    {item.label}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Sign Out Button */}
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <div
                            className="flex items-center w-full p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 relative group text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={handleLogout}
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              <LogOut className="text-lg sm:text-xl transition-all duration-200 group-hover:scale-105" />
                              {isCollapse && <span className="text-sm font-medium">Sign Out</span>}
                            </div>
                            
                            {/* Tooltip for collapsed state - hidden on mobile */}
                            {!isCollapse && (
                              <div className="absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500 hidden lg:block">
                                <p className="text-sm bg-gray-800 text-red-300 rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-gray-700">
                                  Sign Out
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-6 sm:h-8"></div>
                  </div>
                </>
              )}

              {/* Employee Management Section */}
              {role === "employee" && (
                <>
                  <div className={`${isCollapse ? "px-4 sm:px-6" : "px-3"} mt-8 sm:mt-10 border-t border-gray-700/50 transition-all duration-300 ease-in-out`}>
                    <div className="mt-6">
                      {isCollapse && (
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-3">
                          Account
                        </h3>
                      )}
                      <div className="flex flex-col gap-1 sm:gap-2">
                        {employeeManagementItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              className={`flex items-center w-full p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 relative group ${
                                activeSection === item.id 
                                  ? 'bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 text-[#9538E2] border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10' 
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                              }`}
                              onClick={() => handleSectionChange(item.id)}
                            >
                              <div className="flex items-center gap-3 sm:gap-4">
                                <Icon className={`text-lg sm:text-xl transition-all duration-200 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                                {isCollapse && <span className="text-sm font-medium">{item.label}</span>}
                              </div>
                              
                              {/* Tooltip for collapsed state - hidden on mobile */}
                              {!isCollapse && (
                                <div className="absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500 hidden lg:block">
                                  <p className="text-sm bg-gray-800 text-gray-300 rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-gray-700">
                                    {item.label}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Sign Out Button */}
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <div
                            className="flex items-center w-full p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 relative group text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={handleLogout}
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              <LogOut className="text-lg sm:text-xl transition-all duration-200 group-hover:scale-105" />
                              {isCollapse && <span className="text-sm font-medium">Sign Out</span>}
                            </div>
                            
                            {/* Tooltip for collapsed state - hidden on mobile */}
                            {!isCollapse && (
                              <div className="absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500 hidden lg:block">
                                <p className="text-sm bg-gray-800 text-red-300 rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-gray-700">
                                  Sign Out
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-6 sm:h-8"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-950/50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-gray-900/80 backdrop-blur-xl border-b border-gray-700 p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200"
                >
                  <Menu className="text-gray-400 hover:text-white" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className="text-lg font-bold text-white">AssetVerse</h1>
              </div>
              
              {/* User dropdown for mobile */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-full flex items-center justify-center">
                  <span className="text-[#9538E2] font-semibold text-sm">
                    {user?.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-16">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8 sm:mb-12">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-8 sm:h-10 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full"></div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {[...sidebarItems, ...hrManagementItems, ...employeeManagementItems].find(item => item.id === activeSection)?.label || 'Dashboard'}
                  </h1>
                </div>
                {activeSection === 'overview' && (
                  <div className="ml-4 sm:ml-6">
                    <p className="text-gray-300 text-lg sm:text-xl font-medium">
                      Welcome back, {user?.displayName || 'User'}! 
                    </p>
                    <p className="text-gray-400 text-base sm:text-lg mt-1">
                      Here's what's happening with your assets today.
                    </p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="ml-0 sm:ml-4 lg:ml-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
