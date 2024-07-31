import React from "react";
import { Navigate } from "react-router-dom";
import Team from '../pages/Pages/Team/Team';


//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";


// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import Team2 from "../pages/Pages/Team/Team2";


const authProtectedRoutes = [
  
  //Pages

  { path: "/pages-team", component: <Team /> },
  { path: "/pages-team2", component: <Team2 /> },


  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  
];

export { authProtectedRoutes, publicRoutes };