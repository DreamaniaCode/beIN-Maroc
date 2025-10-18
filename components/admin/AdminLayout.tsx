// Fix: Provide full content for AdminLayout.tsx to resolve module errors.
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-brand-text-dim hover:bg-brand-surface hover:text-brand-text transition-colors";
  const activeNavLinkClasses = "bg-slate-700 text-brand-text";

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-brand-surface p-4 flex flex-col">
        <h2 className="text-white text-xl font-bold mb-6 px-3">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Dashboard</NavLink>
          <NavLink to="/admin/channels" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Manage Channels</NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Manage Users</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-brand-bg">
        <Outlet />
      </main>
    </div>
  );
};
