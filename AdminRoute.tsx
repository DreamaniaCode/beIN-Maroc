
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While checking the user's auth status from localStorage, 
  // it's important to show a loading state to prevent a flash of the login page.
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-brand-bg">
        <div className="loader"></div>
      </div>
    );
  }

  // If loading is finished and the user is logged in and is an admin, 
  // render the nested admin routes via the <Outlet /> component.
  if (user && user.isAdmin) {
    return <Outlet />;
  }

  // If the user is not an admin or not logged in, redirect them to the login page.
  // We pass the current location in the state so we can redirect them back to the
  // page they were trying to access after they log in.
  return <Navigate to="/login" state={{ from: location }} replace />;
};
