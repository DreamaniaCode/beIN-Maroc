
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const PublicLayout: React.FC = () => {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};
