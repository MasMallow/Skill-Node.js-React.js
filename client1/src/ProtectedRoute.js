import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        console.log('useEffect called');
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/check-auth`,
                    { withCredentials: true }
                );
                console.log("Response Data:", response.data);
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (err) {
                console.error('Authentication check failed:', err);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>loading...</div>;
    }

    console.log("isAuthenticated:", isAuthenticated);

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;