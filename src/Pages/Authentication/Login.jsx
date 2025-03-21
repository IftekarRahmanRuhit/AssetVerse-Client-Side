
import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import google from "../../../public/google.png"

const Login = () => {
  const { signINUser, signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    signINUser(email, password)
      .then(() => {
        toast.success("Welcome Back!");
        e.target.reset();
        navigate('/');
      })
      .catch(() => {
        toast.error("Incorrect email or password. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => navigate(from, { replace: true }))
      .catch(() => toast.error("Unable to sign in with Google. Please try again."))
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
    <div className=" bg-[#212428]  relative overflow-hidden flex items-center justify-center mt-20 pt-10 pb-10 max-w-screen-2xl mx-auto">
      <Helmet>
        <title>AssetVerse | Login</title>
      </Helmet>

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#9538E2_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.15]"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left hidden lg:block">
              <div className="max-w-xl mx-auto lg:mx-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#9538E2]  mb-6">
                  Welcome to AssetVerse
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                Your trusted partner in asset management excellence.
                Optimize performance with precision and confidence.
                </p>
                <div className="hidden lg:block">
                  <div className="flex gap-4 items-center justify-start">
                    <div className="p-4 bg-[#212428] rounded-lg shadow-xl border border-[#9538e277] ">
                      <p className="text-2xl font-bold text-[#9538E2] mb-1">10K+</p>
                      <p className="text-sm text-gray-400">Active Users</p>
                    </div>
                    <div className="p-4 bg-[#212428] rounded-lg shadow-xl border border-[#9538e277] ">
                      <p className="text-2xl font-bold text-[#9538E2] mb-1">50M+</p>
                      <p className="text-sm text-gray-400">Assets Managed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 max-w-lg mx-auto">
              <div className="bg-[#1B1D21] rounded-2xl shadow-xl border border-[#9538e277]">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">Sign in to your account</h2>
                    <p className="text-gray-400">Access your secure asset management platform</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        defaultValue="hr@gmail.com"
                        ref={emailRef}
                        className="w-full px-4 py-3 rounded-lg   placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-[#1B1D21] text-gray-400 border border-gray-600  "
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-400">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={handleForgetPassword}
                          className="text-sm text-purple-600 hover:text-purple-700 transition duration-200"
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
                          className="w-full px-4 py-3 rounded-lg bg-[#1B1D21] text-gray-400 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition duration-200"
                        >
                          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center"
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
                      <div className="border-t border-gray-200 w-full"></div>
                      <div className="bg-[#1B1D21] px-4 text-sm text-gray-400">or</div>
                      <div className="border-t border-gray-200 w-full"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-[#212428]  hover:bg-[#1D2124] text-gray-400 font-medium py-3 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2"
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

                  <p className="text-center mt-8 text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-purple-600 hover:text-purple-700 font-medium transition duration-200"
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


