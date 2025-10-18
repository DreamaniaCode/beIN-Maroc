import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Tv, Users } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const navLinks = [
        { to: '/admin', text: t('dashboard'), icon: <Home size={20} /> },
        { to: '/admin/channels', text: t('channels'), icon: <Tv size={20} /> },
        { to: '/admin/users', text: t('users'), icon: <Users size={20} /> },
    ];
    
    const getLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        return `flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive ? 'bg-brand-primary text-white' : 'text-brand-text-dim hover:bg-slate-700 hover:text-brand-text'
        }`;
    }

    return (
        <div className="bg-brand-bg text-brand-text min-h-screen">
            <div className="flex">
                <aside className="w-64 bg-brand-surface h-screen sticky top-0 p-4 flex-col hidden lg:flex">
                    <div className="text-2xl font-bold text-white mb-8 text-center">
                        <span className="text-brand-primary">{t('appName')}</span> {t('admin')}
                    </div>
                    <nav className="flex flex-col space-y-2">
                        {navLinks.map(link => (
                            <NavLink key={link.to} to={link.to} className={getLinkClass(link.to)}>
                                {link.icon}
                                <span>{link.text}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
