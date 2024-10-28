import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
    // Instructions:
    // - Check if the user is authenticated.
    // - If the user is not authenticated, redirect them to the login page.
    // - If the user is authenticated, render the child components using <Outlet />.

    if(!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;