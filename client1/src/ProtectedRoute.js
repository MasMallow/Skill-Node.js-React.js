import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token'); // ตรวจสอบ token ใน localStorage
    return (
        token ? <Element /> : <Navigate to="/" />
    );
};

export default ProtectedRoute;
