// Fix: Provide full content for AdminDashboardPage.tsx to resolve module errors.
import React from 'react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <p className="mt-4 text-brand-text-dim">Welcome to the admin dashboard. Select an option from the sidebar to get started.</p>
    </div>
  );
};
