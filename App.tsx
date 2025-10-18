import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchPage } from './pages/SearchPage';
import { AuthProvider } from './hooks/useAuth';
import { ChannelsProvider } from './hooks/useChannels';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChannelsProvider>
        <HashRouter>
          <div className="min-h-screen flex flex-col bg-brand-bg">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/channel/:id" element={<ChannelPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </HashRouter>
      </ChannelsProvider>
    </AuthProvider>
  );
};

export default App;
