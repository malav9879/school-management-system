import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RequireAuth;
