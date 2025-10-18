// Fix: Provide full content for AdminRoute.tsx to resolve module errors.
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const AdminRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !user.isAdmin) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they
    // log in, which is a nicer user experience than dropping them off on the
    // home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
