
import { useContext, useRef, useState,  } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import google from "../../../public/google.png"
import {Helmet} from "react-helmet-async"


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
        navigate('/')
      
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
    <div className="hero min-h-screen bg-[#efedf0] relative max-w-screen-2xl mx-auto">
     <Helmet> <title>AssetVerse | Login</title> </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse w-full z-10 relative mt-32">
        <div className="card mt-4 bg-white w-full max-w-lg shrink-0 shadow-lg  mb-16 ">
          <form onSubmit={handleLogin} className="card-body">
          
            <h1 className="text-3xl font-bold text-center text-[#9538E2] ">
              Welcome Back
            </h1>
            <p className="text-center text-gray-700 font-medium ">
              Please enter your details to sign in
            </p>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700  ">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue="hr@gmail.com"
                ref={emailRef}
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 ">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                defaultValue="Hr123456"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-4 text-[#9538E2]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <div className="form-control mt-6">
              <button
                className="btn bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-semibold  "
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            <p className="text-center mt-4 font-medium text-gray-700">
              Don't have an account? {" "}
              <Link to="/register" className="text-[#9538E2] underline ">
                Register
              </Link>
            </p>
          </form>

          <div className="mb-5 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-ghost text-gray-700 border-gray-300 hover:border-[#9538E2]"
              disabled={loading}
            >
              <div className="flex justify-center items-center space-x-2">
                <img className="w-5 h-5" src={google} alt=" " />
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