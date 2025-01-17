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
            }

       

       
        ]
      },



 ]);