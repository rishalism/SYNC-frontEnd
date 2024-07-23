import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/');
        }
    }, [navigate]);

    return <Outlet />;
}

export default AuthHandler;
