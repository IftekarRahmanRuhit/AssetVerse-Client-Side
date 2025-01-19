import useAuth from "../../Hooks/useAuth";


const Profile = () => {
    const {user} = useAuth()
    return (
        <div>
            This is Profile Page
        </div>
    );
};

export default Profile;