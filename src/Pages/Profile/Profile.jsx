
import useAuth from "../../Hooks/useAuth";
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet-async"
const Profile = () => {
    const { user } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Update feature coming soon')
        
    };

    return (
        <div className="min-h-screen bg-base-200 py-8">
             <Helmet> <title>AssetVerse | Profile</title> </Helmet>
            <div className="max-w-md mx-auto bg-base-100 rounded-lg shadow-xl">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold text-center mx-auto mb-5">My Profile</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img 
                                            src={user?.photoURL} 
                                            alt="Profile" 
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Full Name Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={user?.displayName}
                                  
                                    placeholder="Enter your full name"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Email Input (Read-only) */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user?.email}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>

                            {/* Update Button */}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;