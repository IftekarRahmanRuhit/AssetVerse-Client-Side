import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import google from "../../../public/google.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    signOutUser,
    setLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = () => {
    setLoading(true);

    signInWithGoogle()
      .then((result) => {
        if (!result.user) {
          toast.error("Google sign-in failed.");
          return;
        }

        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          companyName: null,
        };

        Promise.all([
          axiosPublic.post("/employee", userInfo),
          axiosPublic.post("/employee-register", userInfo),
        ])
          .then(([res1, res2]) => {
            if (res1.data.insertedId && res2.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Google sign-in successful and user registered.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            } else {
              toast.error("Failed to save user data.");
            }
          })
          .catch((err) => {
            toast.error("Failed to save user data to the server.");
          });
      })
      .catch((error) => {
        toast.error("Unable to sign in with Google. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const dob = e.target.dob.value;
    const photoURL = e.target.photoURL.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            const employeeInfo = {
              name,
              email,
              dob,
              photoURL,
              companyName: null,
            };

            Promise.all([
              axiosPublic.post("/employee", employeeInfo),
              axiosPublic.post("/employee-register", employeeInfo),
            ])
              .then(([res1, res2]) => {
                if (res1.data.insertedId && res2.data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Employee registered successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  toast.error(
                    "Failed to save user data to one or more servers."
                  );
                }
              })
              .catch((err) => {
                toast.error(
                  "Failed to register employee on one or more servers."
                );
              });

            signOutUser();
            navigate("/login");
          })
          .catch(() => {
            toast.error("Failed to update profile.");
          });
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed.");
      });
  };

  return (
    <div className=" flex flex-col bg-[#212428] max-w-screen-2xl mx-auto">
      <Helmet>
        <title>AssetVerse | Join As Employee</title>
      </Helmet>
      
      {/* Header with logo/brand */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-[#9538E2]">AssetVerse</h1>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          {/* Card header with illustration */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-purple-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#9538E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-300">Create an employee account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Join the AssetVerse platform to manage company resources efficiently
            </p>
          </div>
          
          {/* Main card */}
          <div className="bg-[#1B1D21] shadow-lg rounded-lg overflow-hidden border border-[#9538e277]">
            <div className="px-6 py-8">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm bg-[#1B1D21] text-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-400">
                      Date of Birth
                    </label>
                    <div className="mt-1">
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm bg-[#1B1D21] text-gray-300"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email address"
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm bg-[#1B1D21] text-gray-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm pr-10 bg-[#1B1D21] text-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Must be at least 6 characters with uppercase, lowercase, and number
                  </p>
                </div>
                
                <div>
                  <label htmlFor="photoURL" className="block text-sm font-medium text-gray-400">
                    Photo URL
                  </label>
                  <div className="mt-1">
                    <input
                      id="photoURL"
                      name="photoURL"
                      type="text"
                      required
                      placeholder="https://example.com/your-photo.jpg"
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm bg-[#1B1D21] text-gray-300"
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9538E2] hover:bg-[#802fd0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9538E2] transition duration-150"
                  >
                    Register
                  </button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1B1D21] text-gray-300 ">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-[#212428] text-sm font-medium text-gray-400 hover:bg-[#1D2124] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                  >
                    <img
                      className="h-5 w-5 mr-2"
                      src={google}
                      alt="Google logo"
                    />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-[#1B1D21] border-t border-gray-600 sm:px-10 text-center">
              <p className="text-xs text-gray-400">
                By signing up, you agree to our{" "}
                <a href="#" className="font-medium text-[#9538E2] hover:text-[#802fd0]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-[#9538E2] hover:text-[#802fd0]">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#9538E2] hover:text-[#802fd0]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
  

    </div>
  );
};

export default Register;