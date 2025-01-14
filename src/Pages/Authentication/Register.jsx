
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile,signOutUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const terms = event.target.terms.checked;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (password.length < 6) {
      toast.error("Password should be 6 Characters");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should contain at least one uppercase letter, one lowercase letter, and one number. It must be at least 6 characters long."
      );
      return;
    }

    if (!terms) {
      toast.error("Please Accept Our Terms and Condition");
      return;
    }

    createUser(email, password, name)
      .then((result) => {
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            e.target.reset();
            signOutUser()
            navigate("/login");
          })
          .catch((error) => {
            toast.error("Update Failed");
          });
      })
      .catch((error) => {});
  };

  return (
    <div className="hero min-h-screen bg-[#191919] max-w-screen-2xl mx-auto">

      <div className="hero-content flex-col lg:flex-row-reverse w-full mt-32">
        <div className="card bg-gradient-to-r from-gray-950 via-gray-900 to-black w-full max-w-lg shrink-0 shadow-xl mb-16 mt-4">
          <form onSubmit={handleRegister} className="card-body">
            {/* <img className="w-12 h-12 mx-auto" src={register} alt="" /> */}
            <h1 className="text-3xl font-bold text-center text-[#ff3700d7] mt-3">
              Create an account
            </h1>
            <p className="text-center text-base-300 font-medium">
              Please fill in your details to create an account
            </p>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-base-300">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-base-300">
                  Photo
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-base-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                required
              />
            </div>
            <div className="form-control relative mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-base-300">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 bottom-4 text-[#ff3700d7]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-4 flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                name="terms"
                className="checkbox bg-gray-300"
                required
              />
              <span className="label-text font-semibold text-base-300">
                Accept Our Terms and Conditions
              </span>
            </div>
            <div className="form-control mt-6">
              <button className="btn border-none  bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  transition-all duration-300 font-semibold ">
                Register
              </button>
            </div>
            <p className="text-center mt-4 font-medium text-base-300">
              Already have an account? {""}
              <Link to="/login" className="text-[#ff3700d7] underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
