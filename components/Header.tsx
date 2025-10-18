import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Tv, Search, User, LogOut, Star, LayoutDashboard, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-brand-primary text-white";
  const inactiveLinkClass = "text-brand-text-dim hover:bg-slate-700 hover:text-brand-text";

  return (
    <header className="bg-brand-surface sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo & Nav */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <Tv className="text-brand-primary" />
              <span>{t('appName')}</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                {t('home')}
              </NavLink>
              {user && (
                <NavLink 
                  to="/favorites" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star size={16}/>
                    {t('myFavorites')}
                  </div>
                </NavLink>
              )}
            </nav>
          </div>

          {/* Center Section: Search Bar */}
          <div className="flex-1 px-4 lg:px-12 hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
              />
            </form>
          </div>

          {/* Right Section: Auth & Language */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageSwitcher />
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <span className="hidden lg:inline text-sm font-medium">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg py-1 z-50">
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center w-full px-4 py-2 text-sm text-brand-text-dim hover:bg-slate-600"
                      >
                        <LayoutDashboard size={16} className="mr-2" />
                        {t('adminDashboard')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-brand-text-dim hover:bg-slate-600"
                    >
                      <LogOut size={16} className="mr-2" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold bg-brand-surface hover:bg-slate-700 text-brand-text-dim transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{t('login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};