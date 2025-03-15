import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Toaster } from "react-hot-toast";


const MainLayout = () => {
    return (
        <div className="bg-[#1B1D21]">
            <Toaster />
            <div><Navbar></Navbar></div>
            <div className="min-h-[calc(100vh-321px)]"><Outlet></Outlet></div>
            <div><Footer></Footer></div>
        </div>
    );
};

export default MainLayout;