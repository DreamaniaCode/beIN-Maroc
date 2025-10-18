import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-brand-primary text-white' : 'text-brand-text-dim hover:bg-slate-700 hover:text-brand-text'
    }`;

  return (
    <header className="bg-brand-bg/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-2xl font-bold text-white">
              <span className="text-brand-primary">{t('appName')}</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <NavLink to="/" className={navLinkClass}>{t('home')}</NavLink>
              <NavLink to="/favorites" className={navLinkClass}>{t('favorites')}</NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="search"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-brand-surface border border-slate-700 rounded-full py-1.5 ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <div className="absolute inset-y-0 ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </form>

            <LanguageSwitcher />

            <div className="relative">
              {user ? (
                <div className="group">
                  <button className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-full hover:bg-brand-surface">
                     <UserIcon />
                     <span className="hidden lg:inline text-sm font-medium">{user.name}</span>
                  </button>
                  <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-brand-surface rounded-md shadow-lg py-1 hidden group-hover:block ring-1 ring-black ring-opacity-5">
                    {user.isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-brand-text hover:bg-slate-700">{t('adminDashboard')}</Link>}
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-slate-700">{t('logout')}</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-brand-primary text-brand-bg rounded-md text-sm font-semibold hover:bg-sky-400 transition-colors">
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
