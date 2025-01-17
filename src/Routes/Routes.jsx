import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
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



export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
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
            {
                path:'/assetList',
                element:<PrivateRoute><AssetList></AssetList></PrivateRoute>
            },
            {
                path:'/addAsset',
                element:<PrivateRoute><AddAsset></AddAsset></PrivateRoute>
            },
            {
                path:'/AllRequest',
                element:<PrivateRoute><AllRequests></AllRequests></PrivateRoute>
            },
            {
                path:'/myEmployeeList',
                element:<PrivateRoute><MyEmployees></MyEmployees></PrivateRoute>
            },
            {
                path:'/addEmployee',
                element:<PrivateRoute><AddEmployee></AddEmployee></PrivateRoute>
            }

       

       
        ]
      },



 ]);