import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchPage } from './pages/SearchPage';
import { AdminRoute } from './AdminRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ManageChannelsPage } from './pages/admin/ManageChannelsPage';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';
import { ManageSchedulePage } from './pages/admin/ManageSchedulePage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="channels" element={<ManageChannelsPage />} />
          <Route path="users" element={<ManageUsersPage />} />
          <Route path="schedule" element={<ManageSchedulePage />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
