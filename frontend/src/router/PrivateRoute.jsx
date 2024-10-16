import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';




const PrivateRoute = ({isAuth,path}) => {
    return isAuth ? <Outlet /> : <Navigate to={path} />;
};

export default PrivateRoute;
