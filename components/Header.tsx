import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TVIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-primary">
        <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/>
        <polyline points="17 2 12 7 7 2"/>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);


export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-brand-text-dim hover:bg-brand-surface hover:text-brand-text transition-colors";
  const activeNavLinkClasses = "bg-slate-700 text-brand-text";

  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
                 <button onClick={() => navigate('/')} className="flex items-center gap-3 flex-shrink-0">
                    <TVIcon />
                    <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">LiveStream TV</h1>
                </button>
                <nav className="hidden md:flex items-baseline space-x-4">
                    <button onClick={() => navigate('/')} className={location.pathname === '/' ? `${navLinkClasses} ${activeNavLinkClasses}`: navLinkClasses}>Channels</button>
                    <button onClick={() => navigate('/favorites')} className={location.pathname === '/favorites' ? `${navLinkClasses} ${activeNavLinkClasses}`: navLinkClasses}>Favorites</button>
                    <button onClick={() => navigate('/search')} className={location.pathname === '/search' ? `${navLinkClasses} ${activeNavLinkClasses}`: navLinkClasses}>Search</button>
                </nav>
            </div>
            <div className="flex items-center gap-4">
               {user ? (
                   <>
                    <div className="flex items-center gap-2 text-sm">
                        <UserIcon/>
                        <span className="hidden sm:inline font-medium">{user.name}</span>
                    </div>
                    <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium bg-brand-secondary/50 hover:bg-brand-secondary/80 transition-colors">Logout</button>
                   </>
               ) : (
                    <button onClick={() => navigate('/login')} className="px-3 py-2 rounded-md text-sm font-medium bg-brand-primary text-brand-bg hover:bg-sky-400 transition-colors">Login</button>
               )}
            </div>
        </div>
      </div>
    </header>
  );
};