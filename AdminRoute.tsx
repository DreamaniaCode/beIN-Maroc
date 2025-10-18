import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-brand-bg">
        <div className="loader"></div>
      </div>
    );
  }

  if (user && user.isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
