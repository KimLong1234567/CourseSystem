// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/admin/Login" />
  );
};

export default PrivateRoute;
