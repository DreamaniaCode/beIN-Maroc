import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchPage } from './pages/SearchPage';
import { AdminRoute } from './AdminRoute';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ManageChannelsPage } from './pages/admin/ManageChannelsPage';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // This effect ensures that the lang and dir attributes on the <html> tag
    // are updated whenever the language changes. This is crucial for CSS
    // and accessibility.
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="channels" element={<ManageChannelsPage />} />
        <Route path="users" element={<ManageUsersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
