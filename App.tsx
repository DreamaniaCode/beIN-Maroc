import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchPage } from './pages/SearchPage';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminRoute } from './AdminRoute';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ManageChannelsPage } from './pages/admin/ManageChannelsPage';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';
import { ManageSchedulePage } from './pages/admin/ManageSchedulePage';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="channel/:id" element={<ChannelPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="login" element={<LoginPage />} />
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
};

export default App;
