// Fix: Provide full content for App.tsx to resolve module errors.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchPage } from './pages/SearchPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-brand-bg text-brand-text min-h-screen flex flex-col">
          <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/channel/:id" element={<ChannelPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
