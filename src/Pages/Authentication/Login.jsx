
import { useContext, useRef, useState,  } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";



const Login = () => {
  const { signINUser, signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation()
  const from = location?.state || '/'

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
        navigate(from, { replace: true })
      
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
    <div className="hero min-h-screen bg-[#191919] relative max-w-screen-2xl mx-auto">

      <div className="hero-content flex-col lg:flex-row-reverse w-full z-10 relative mt-32">
        <div className="card mt-4 bg-gradient-to-r from-gray-950 via-gray-900 to-black w-full max-w-lg shrink-0 shadow-lg  mb-16 ">
          <form onSubmit={handleLogin} className="card-body">
          
            <h1 className="text-3xl font-bold text-center text-[#ff3700d7] ">
              Welcome Back
            </h1>
            <p className="text-center text-base-300 font-medium ">
              Please enter your details to sign in
            </p>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-base-300  ">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                ref={emailRef}
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-lg font-semibold text-base-300 ">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-12 text-[#ff3700d7]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  className="label-text-alt link link-hover text-base-300 text-sm font-medium "
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                className="btn border-none bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  transition-all duration-300 font-semibold  "
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            <p className="text-center mt-4 font-medium text-base-300">
              Don't have an account? {" "}
              <Link to="/register" className="text-[#ff3700d7] underline ">
                Register
              </Link>
            </p>
          </form>

          <div className="mb-5 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-ghost text-gray-300 border-gray-300 hover:border-gray-600"
              disabled={loading}
            >
              <div className="flex justify-center items-center space-x-2">
                {/* <img className="w-5 h-5" src={google} alt=" " /> */}
                <p className="font-bold">{loading ? "Loading..." : "Sign In with Google"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;