
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import {Helmet} from "react-helmet-async"

const HrRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const { createUser, signInWithGoogle, updateUserProfile, setLoading } = useContext(AuthContext);
  const axiosPublic =useAxiosPublic()

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
      memberLimit:0,
      currentMembers:0
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
      console.error("Error saving HR data:", err);
      toast.error("Failed to register HR on one or more servers.");
    }
  };



  return (
    <div className="hero min-h-screen bg-[#efedf0] max-w-screen-2xl mx-auto">
       <Helmet> <title>AssetVerse | Join As HR</title> </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse w-full mt-32">
        <div className="card bg-white w-full max-w-lg shrink-0 shadow-xl mb-16 mt-4">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-3xl font-bold text-center text-[#9538E2] mt-3">
              Register HR
            </h1>
            <p className="text-center text-gray-700 font-medium">
              Fill in the details to register a new HR.
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
                  Company Name
                </span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Company Logo URL
                </span>
              </label>
              <input
                type="text"
                name="companyLogo"
                placeholder="Company Logo URL"
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
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Select a Package
                </span>
              </label>
              <select
                className="select select-bordered focus:outline-none focus:ring-2 focus:ring-[#9538E2]  text-black"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a package
                </option>
                <option value="5 Members for $5">5 Members for $5</option>
                <option value="10 Members for $8">10 Members for $8</option>
                <option value="20 Members for $15">20 Members for $15</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none font-semibold">
                Register
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default HrRegister;