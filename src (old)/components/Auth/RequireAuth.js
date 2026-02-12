import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import UseAuth from "../Hooks/UseAuth";

const RequireAuth = () => {
    const { auth } = UseAuth();
    const location = useLocation();
    return (

        auth?.userEmail
            ? <>
                <Navbar />
                <Outlet />
            </>

            : <Navigate to="/landing" state={{ from: location }} replace />

    );
}
export default RequireAuth;