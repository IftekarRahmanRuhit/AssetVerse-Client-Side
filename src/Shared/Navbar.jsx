import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { LuLogIn, LuLogOut, LuUser, LuSettings, LuMenu, LuX } from "react-icons/lu";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../Hooks/useRole";
import useCompanyInfo from "../Hooks/useCompanyInfo";
import logo from "../../public/logo.png";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [role] = useRole();
  const { companyInfo } = useCompanyInfo();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign out successful");
        navigate('/');
        setIsUserMenuOpen(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
              isActive
                ? "text-white bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative z-10">Home</span>
          {({ isActive }) => isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#9538E2]/10 to-purple-600/10 rounded-xl animate-pulse"></div>
          )}
        </NavLink>
      </li>

      {!user || !(role === "employee" || role === "hr") ? (
        <>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Join as Employee</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hrRegister"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Join as HR Manager</span>
            </NavLink>
          </li>
        </>
      ) : null}

      {user && (role === "employee" || role === "hr") && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                isActive
                  ? "text-white bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 border border-[#9538E2]/30 shadow-lg shadow-[#9538E2]/10"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative z-10">Dashboard</span>
          </NavLink>
        </li>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center text-[#9538E2]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl shadow-black/20' 
        : 'bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg border-b border-gray-700/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group hover:bg-gray-800/50 p-2 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                className="h-10 w-10 lg:h-12 lg:w-12 object-cover rounded-xl ring-2 ring-[#9538E2]/50 group-hover:ring-[#9538E2] transition-all duration-300 shadow-lg"
                src={companyInfo?.companyLogo || logo}
                alt={companyInfo?.companyName || "AssetVerse Logo"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#9538E2] to-purple-600 bg-clip-text text-transparent">
                {companyInfo?.companyName || "ASSETVERSE"}
              </span>
              <span className="text-xs text-gray-400 hidden sm:block">Asset Management System</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <ul className="flex items-center space-x-2">
              {links}
            </ul>
          </div>

          {/* User Menu / Login Button */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-800/50 p-2 rounded-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl ring-2 ring-[#9538E2]/50 group-hover:ring-[#9538E2] overflow-hidden transition-all duration-300 shadow-lg">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <FaUserCircle className="text-white text-lg" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-white font-medium text-sm">{user?.displayName}</span>
                    <span className="text-gray-400 text-xs capitalize">{role || 'User'}</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-3 z-50 animate-in slide-in-from-top-2 duration-300">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl ring-2 ring-[#9538E2]/50 overflow-hidden">
                            {user?.photoURL ? (
                              <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                <FaUserCircle className="text-white text-xl" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold">{user?.displayName}</p>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500 capitalize">{role || 'User'}</span>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="">
                     <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
                        >
                          <LuLogOut className="text-lg group-hover:text-red-300 transition-colors duration-300" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-900/25 flex items-center space-x-2 group"
              >
                <LuLogIn className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:bg-gray-800/50 p-2 rounded-xl transition-all duration-300 group"
            >
              {isMenuOpen ? (
                <LuX className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <LuMenu className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-t border-gray-700/50 py-4 animate-in slide-in-from-top-2 duration-300">
            <ul className="space-y-2 px-4">
              {links}
            </ul>
            
            {/* Mobile User Info */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-700/50 px-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-xl">
                  <div className="w-10 h-10 rounded-xl ring-2 ring-[#9538E2]/50 overflow-hidden">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <FaUserCircle className="text-white text-lg" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{user?.displayName}</p>
                    <p className="text-gray-400 text-xs capitalize">{role || 'User'}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-300"
                  >
                    <LuLogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
