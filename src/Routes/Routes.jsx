import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import HrRegister from "../Pages/Authentication/HrRegister";
import MyAssets from "../Pages/EmployeePages/MyAssets/MyAssets";
import MyTeam from "../Pages/EmployeePages/MyTeam/MyTeam";
import RequestAnAsset from "../Pages/EmployeePages/RequestAnAsset/RequestAnAsset";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "../Routes/PrivateRoute";
import AssetList from "../Pages/HrPages/AssetList/AssetList";
import AddAsset from "../Pages/HrPages/AddAsset/AddAsset";
import AllRequests from "../Pages/HrPages/AllRequests/AllRequests";
import MyEmployees from "../Pages/HrPages/MyEmployees/MyEmployees"
import AddEmployee from "../Pages/HrPages/AddEmployee/AddEmployee"
import HrRoute from "./HrRoute";
import PaymentPage from "../Pages/Payment/PaymentPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



export const routes = createBrowserRouter([
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
    },
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/hrRegister',
                element:<HrRegister></HrRegister>
            },
            {
                path:'/myAssets',
                element:<PrivateRoute><MyAssets></MyAssets></PrivateRoute>
            },
            {
                path:'/myTeam',
                element:<PrivateRoute><MyTeam></MyTeam></PrivateRoute>
            },
            {
                path:'/assetRequest',
                element:<PrivateRoute><RequestAnAsset></RequestAnAsset></PrivateRoute>
            },
            {
                path:'/profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>
            },

            // hr routes 
            {
                path:'/assetList',
                element:<HrRoute><AssetList></AssetList></HrRoute>
            },
            {
                path:'/addAsset',
                element:<HrRoute><PrivateRoute><AddAsset></AddAsset></PrivateRoute></HrRoute>
            },
            {
                path:'/AllRequest',
                element:<HrRoute><PrivateRoute><AllRequests></AllRequests></PrivateRoute></HrRoute>
            },
            {
                path:'/myEmployeeList',
                element:<HrRoute><PrivateRoute><MyEmployees></MyEmployees></PrivateRoute></HrRoute>
            },
            {
                path:'/addEmployee',
                element:<HrRoute><PrivateRoute><AddEmployee></AddEmployee></PrivateRoute></HrRoute>
            },
            {
                path:'/payment',
                element:<HrRoute><PrivateRoute><PaymentPage></PaymentPage></PrivateRoute></HrRoute>
                
            }

       

       
        ]
      },



 ]);