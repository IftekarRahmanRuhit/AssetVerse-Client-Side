import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";

const MainLayout = () => {
    return (
        <div>
            <div><Navbar></Navbar></div>
            <div><Outlet></Outlet></div>
            <div></div>
        </div>
    );
};

export default MainLayout;