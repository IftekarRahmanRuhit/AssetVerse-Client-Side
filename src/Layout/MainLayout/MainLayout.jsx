import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <div><Navbar></Navbar></div>
            <div className="min-h-[calc(100vh-433px)]"><Outlet></Outlet></div>
            <div><Footer></Footer></div>
        </div>
    );
};

export default MainLayout;