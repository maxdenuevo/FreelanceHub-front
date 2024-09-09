import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Rutaprotegida({ canActivate, redirectPath = '/login' }) {
    if (!canActivate) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}

export default Rutaprotegida;