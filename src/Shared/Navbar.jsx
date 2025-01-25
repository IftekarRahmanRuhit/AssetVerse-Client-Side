import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../Hooks/useRole";
import useCompanyInfo from "../Hooks/useCompanyInfo";
import logo from "../../public/logo.png";

const Navbar = () => {
  const { user, signOutUser, loading, setLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, isLoading] = useRole();
  const { companyInfo } = useCompanyInfo();
  const navigate = useNavigate()

  console.log(user);
  console.log(companyInfo);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign out successful");
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">home</li>
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#9538E2] font-semibold underline"
              : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
          }
        >
          Home
        </NavLink>
      </li>

      {!user || !(role === "employee" || role === "hr") ? (
        <>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hrRegister"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      ) : null}

      {user && role === "employee" && (
        <>
          <li>
            <NavLink
              to="/myAssets"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myTeam"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assetRequest"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Request for an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Profile
            </NavLink>
          </li>
        </>
      )}

      {user && role === "hr" && (
        <>
          <li>
            <NavLink
              to="/assetList"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addAsset"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Add Asset
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allRequest"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              All Requests
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/myEmployeeList"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              My Employees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addEmployee"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Add Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9538E2#9538E2] font-semibold underline"
                  : "text-gray-900 font-semibold before:w-0 hover:before:w-full before:bg-[#9538E2] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#9538E2] transition-all duration-300 before:left-0 cursor-pointer capitalize"
              }
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-base-100 w-full">
          <div className="text-center text-[#9538E2]">
            <span className="loading loading-bars loading-lg "></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className={`w-full mx-auto 
     bg-gradient-to-r from-[#f5f0fc] via-[#e6dbf7] to-[#d8c6f2]
         md:p-2 md:max-w-screen-2xl mx-auto fixed top-0 z-50 `}>
        <div className="navbar  md:w-11/12 mx-auto pt-4 pb-4 ">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <button
                className="btn btn-ghost lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <ul className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  {links}
                </ul>
              )}
            </div>

            <Link
              to="/"
              className="btn btn-ghost text-2xl text-[#9538E2] font-bold flex justify-center items-center"
            >
              <div className="flex justify-center items-center">
                {/* Display company logo if available, otherwise fallback to default logo */}
                <img
                  className="h-10 w-10 md:mr-2 object-cover rounded-full"
                  src={companyInfo?.companyLogo || logo}
                  alt={companyInfo?.companyName || "Default Logo"}
                />
                <p className="text-lg md:text-2xl">
                  {/* Display company name if available, otherwise fallback to default branding */}
                  {companyInfo?.companyName || (
                    <>
                      ASSET<span className="text-black">VERSE</span>
                    </>
                  )}
                </p>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal space-x-8">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex="0"
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      className="w-10 rounded-full"
                      title={user?.displayName || "User"}
                    >
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="" />
                      ) : (
                        <p className="text-2xl">
                          <FaUserCircle />
                        </p>
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex="0"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <div className="card-body p-2 w-full">
                      <span className="text-gray-800 font-bold text-xl text-center block">
                        {user?.displayName}
                      </span>
                      <span className="text-gray-800 font-bold block overflow-hidden text-ellipsis whitespace-nowrap max-w-full text-center">
                        {user?.email}
                      </span>
                      <div className="card-actions">
                        <button
                          onClick={handleSignOut}
                          className="btn bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none btn-block w-full mt-3"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <Link
                  className="btn btn-sm md:btn-md font-bold bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none"
                  to="/login"
                >
                  <LuLogIn className="mr-1" /> Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
