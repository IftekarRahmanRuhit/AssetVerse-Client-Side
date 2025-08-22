
import { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import google from "../../../public/google.png"
import useRole from "../../Hooks/useRole";

const Login = () => {
  const { signINUser, signInWithGoogle, loading, setLoading, user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const [role, roleLoading] = useRole();
  const isLoggingInRef = useRef(false);

  // Handle role-based redirection
  useEffect(() => {
    // Only redirect if user exists, role is loaded, we're not in a loading state,
    // we're on the login page, and the user is actively logging in
    if (user && role && !roleLoading && window.location.pathname === '/login' && isLoggingInRef.current) {
      if (role === "hr" || role === "employee") {
        navigate('/dashboard');
        toast.success("Welcome to Dashboard!");
      } else {
        navigate('/');
        toast.success("Welcome Back!");
      }
      // Reset the flag after successful redirection
      isLoggingInRef.current = false;
    }
  }, [user, role, roleLoading, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    isLoggingInRef.current = true; // Set flag to indicate user is logging in
    signINUser(email, password)
      .then(() => {
        e.target.reset();
        // The redirection will be handled by useEffect when role is loaded
      })
      .catch(() => {
        toast.error("Incorrect email or password. Please try again.");
        setLoading(false);
        isLoggingInRef.current = false; // Reset flag on error
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    isLoggingInRef.current = true; // Set flag to indicate user is logging in
    signInWithGoogle()
      .then(() => {
        // The redirection will be handled by useEffect when role is loaded
      })
      .catch(() => {
        toast.error("Unable to sign in with Google. Please try again.");
        isLoggingInRef.current = false; // Reset flag on error
      })
      .finally(() => setLoading(false));
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please provide a valid email address");
    } else {
      navigate("/forgetpassword", { state: { email } });
    }
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center mt-16 pt-10 pb-10 max-w-screen-2xl mx-auto">
      <Helmet>
        <title>AssetVerse | Login</title>
      </Helmet>

      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left hidden lg:block">
              <div className="max-w-xl mx-auto lg:mx-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#9538E2] mb-6">
                  Welcome to AssetVerse
                </h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Your trusted partner in asset management excellence.
                Optimize performance with precision and confidence.
                </p>
                <div className="hidden lg:block">
                  <div className="flex gap-4 items-center justify-start">
                    <div className="p-4 bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 hover:border-purple-600/50 transition-all duration-300">
                      <p className="text-2xl font-bold text-[#9538E2] mb-1">10K+</p>
                      <p className="text-sm text-gray-400">Active Users</p>
                    </div>
                    <div className="p-4 bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 hover:border-purple-600/50 transition-all duration-300">
                      <p className="text-2xl font-bold text-[#9538E2] mb-1">50M+</p>
                      <p className="text-sm text-gray-400">Assets Managed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 max-w-lg mx-auto">
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Sign in to your account</h2>
                    <p className="text-gray-300">Access your secure asset management platform</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        defaultValue="hr@gmail.com"
                        ref={emailRef}
                        className="w-full px-4 py-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-gray-800 text-gray-300 border border-gray-700"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={handleForgetPassword}
                          className="text-sm text-purple-400 hover:text-purple-300 transition duration-200"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          defaultValue="Hr123456"
                          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-300 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition duration-200"
                        >
                          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] text-white font-medium py-3 rounded-xl shadow-lg shadow-purple-900/25 hover:scale-105 transition-all duration-200 flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        "Sign in"
                      )}
                    </button>

                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-gray-700 w-full"></div>
                      <div className="bg-gray-900/80 px-4 text-sm text-gray-400">or</div>
                      <div className="border-t border-gray-700 w-full"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
                      disabled={loading}
                    >
                      <img
                        src={google}
                        alt="Google"
                        className="w-5 h-5"
                      />
                      <span>Continue with Google</span>
                    </button>
                  </form>

                  <p className="text-center mt-8 text-gray-300">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-purple-400 hover:text-purple-300 font-medium transition duration-200"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


