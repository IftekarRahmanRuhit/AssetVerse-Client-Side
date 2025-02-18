
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const HrRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const companyName = e.target.companyName.value;
    const companyLogo = e.target.companyLogo.value;
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

    if (!selectedPackage) {
      toast.error("Please select a package.");
      return;
    }

    const hrInfo = {
      name,
      companyName,
      companyLogo,
      email,
      dob,
      packageType: selectedPackage,
      photoURL,
      memberLimit: 0,
      currentMembers: 0
    };

    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });

      const [res1, res2] = await Promise.all([
        axiosPublic.post("/hr", hrInfo),
        axiosPublic.post("/hr-register", hrInfo),
      ]);

      if (res1.data.insertedId && res2.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "HR registered successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/payment");
      } else {
        toast.error("Failed to save HR data to one or more servers.");
      }
    } catch (err) {
      toast.error("Failed to register HR on one or more servers.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#efedf0] max-w-screen-2xl mx-auto">
      <Helmet>
        <title>AssetVerse | Join As HR</title>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Register as HR Manager</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create an HR account to manage assets and team members
            </p>
          </div>

          {/* Main card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-[#9538E2]">
            <div className="px-6 py-8">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        placeholder="Acme Corp"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <div className="mt-1">
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="hr@yourcompany.com"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">
                    Company Logo URL
                  </label>
                  <div className="mt-1">
                    <input
                      id="companyLogo"
                      name="companyLogo"
                      type="text"
                      required
                      placeholder="https://example.com/logo.png"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                    Your Photo URL
                  </label>
                  <div className="mt-1">
                    <input
                      id="photoURL"
                      name="photoURL"
                      type="text"
                      required
                      placeholder="https://example.com/photo.jpg"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Must be at least 6 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-gray-700">
                    Select a Package
                  </label>
                  <div className="mt-1">
                    <select
                      id="package"
                      name="package"
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9538E2] focus:border-[#9538E2] sm:text-sm"
                    >
                      <option value="" disabled>Select a package</option>
                      <option value="5 Members for $5">5 Members for $5</option>
                      <option value="10 Members for $8">10 Members for $8</option>
                      <option value="20 Members for $15">20 Members for $15</option>
                    </select>
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
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sm:px-10 text-center">
              <p className="text-xs text-gray-600">
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
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-[#9538E2] hover:text-[#802fd0]">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;