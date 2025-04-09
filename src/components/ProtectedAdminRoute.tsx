import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import type { ReactElement } from 'react';


const ProtectedAdminRoute = ({ children }: { children: ReactElement }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
