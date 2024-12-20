import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Utils/Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();

    if(loading){
        return loading; 
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;