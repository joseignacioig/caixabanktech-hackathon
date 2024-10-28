import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute({ isAuthenticated }) {
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PublicRoute;