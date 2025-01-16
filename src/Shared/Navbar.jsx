import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../Hooks/useRole";


const Navbar = () => {
  const { user, signOutUser, loading, setLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [role, isLoading] = useRole();

 console.log(user)

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign out successful");
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
            isActive
              ? "text-[#FF3600] font-semibold underline"
              : "text-base-200 hover:text-[#FF3600] font-semibold transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>

      {!user || !(role === "employee" || role === "hr")? (
<>
<li>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? "text-[#FF3600] font-semibold underline"
            : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
            ? "text-[#FF3600] font-semibold underline"
            : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
        }
      >
        Join as HR Manager
      </NavLink>
    </li>

</>
    
  ) : null}


      {user && role ==="employee" &&(
        <>
          <li>
            <NavLink
              to="/myAssets"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
              }
            >
              Profile
            </NavLink>
          </li>

        </>
      )}



{user && role ==="hr" &&(
        <>
          <li>
            <NavLink
              to="/assetList"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
                  ? "text-[#FF3600] font-semibold underline"
                  : "text-base-200  hover:text-[#FF3600] font-semibold transition-all duration-200"
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
          <div className="text-center text-[#FF3600]">
          <span className="loading loading-bars loading-lg "></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div
        className={`w-full mx-auto bg-black md:p-2 max-w-screen-2xl fixed top-0 z-50`}
      >
        <div className="navbar w-full md:w-11/12 mx-auto pt-4 pb-4 ">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <button
                className="btn btn-ghost lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
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
              className="btn btn-ghost text-2xl text-[#FF3600] font-bold flex justify-center items-center"
            >
              <p className="text-lg md:text-2xl">
                ASSET<span className="text-base-200">VERSE</span>{" "}
              </p>
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
                          className="btn bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none btn-block w-full mt-3"
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
                  className="btn btn-sm md:btn-md font-bold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none"
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
