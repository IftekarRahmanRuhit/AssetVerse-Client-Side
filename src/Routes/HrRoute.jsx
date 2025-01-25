import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useHr from "../Hooks/useHr";


const HrRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isHr, isHrLoading] = useHr();
    const location = useLocation();
    
    if (loading || isHrLoading) {
        return  (      <div className=" flex items-center justify-center min-h-screen text-center text-[#9538E2]">
            <span className="loading loading-bars loading-lg"></span>
          </div>)
    }
    
    if (user && isHr) {
        return children;
    }
    
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default HrRoute;