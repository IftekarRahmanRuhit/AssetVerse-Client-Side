
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet-async"
import google from "../../../public/google.png"

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
  const axiosPublic =useAxiosPublic()

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
          photoURL:result.user.photoURL,
          companyName: null
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
            console.error("Error sending data to server:", err);
            toast.error("Failed to save user data to the server.");
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
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
        updateUserProfile({ displayName: name , photoURL:photoURL })
          .then(() => {
            const employeeInfo = { name, email, dob, photoURL, companyName: null }; 

        
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
                  toast.error("Failed to save user data to one or more servers.");
                }
              })
              .catch((err) => {
                console.error("Error saving employee data:", err);
                toast.error("Failed to register employee on one or more servers.");
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
    <div className="hero min-h-screen bg-[#efedf0] max-w-screen-2xl mx-auto">
       <Helmet> <title>AssetVerse | Join As Employee</title> </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse w-full mt-32">
        <div className="card bg-white w-full max-w-lg shrink-0 shadow-xl mb-16 mt-4">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-3xl font-bold text-center text-[#9538E2] mt-3">
              Register Employee
            </h1>
            <p className="text-center text-gray-700 font-medium">
              Fill in the details to register a new employee.
            </p>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Date of Birth
                </span>
              </label>
              <input
                type="date"
                name="dob"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
            </div>
            <div className="form-control relative mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 bottom-4 text-[#9538E2]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Photo URL Input */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter Photo URL"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn  bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-semibold">
                Register
              </button>
            </div>
            <p className="text-center mt-4 font-medium text-grey-700">
              Already have an account?{" "}
              <Link to="/login" className="text-[#9538E2] underline">
                Login
              </Link>
            </p>
          </form>
          <div className="mb-5 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-ghost text-gray-300 border-gray-300 hover:border-gray-600"
            >
              <div className="flex justify-center items-center space-x-2">
                <img className="w-5 h-5" src={google} alt=" " />
                <p className="font-bold text-gray-700">Sign In with Google</p>
              </div>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
