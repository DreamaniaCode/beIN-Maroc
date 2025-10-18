import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Tv, Users, Calendar, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout: React.FC = () => {
    const { t } = useTranslation();
    const { logout } = useAuth();

    const navLinks = [
        { to: '/admin', text: t('dashboard'), icon: <Home size={20} />, end: true },
        { to: '/admin/channels', text: t('channels'), icon: <Tv size={20} />, end: false },
        { to: '/admin/users', text: t('users'), icon: <Users size={20} />, end: false },
        { to: '/admin/schedule', text: t('schedule'), icon: <Calendar size={20} />, end: false },
    ];

    const linkClasses = "flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg font-medium transition-colors";
    const activeLinkClasses = "bg-brand-primary text-white";
    const inactiveLinkClasses = "text-brand-text-dim hover:bg-slate-700 hover:text-brand-text";

    return (
        <div className="bg-brand-bg text-brand-text min-h-screen">
            <div className="flex">
                <aside className="w-64 bg-brand-surface h-screen sticky top-0 p-4 flex-col hidden lg:flex">
                    <div className="text-2xl font-bold text-white mb-8 text-center">
                        <span className="text-brand-primary">{t('appName')}</span> {t('admin')}
                    </div>
                    <nav className="flex flex-col space-y-2 flex-grow">
                        {navLinks.map(link => (
                            <NavLink 
                                key={link.to} 
                                to={link.to} 
                                end={link.end}
                                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                            >
                                {link.icon}
                                <span>{link.text}</span>
                            </NavLink>
                        ))}
                    </nav>
                     <div className="space-y-2 border-t border-slate-700 pt-4 mt-4">
                        <Link to="/" className={`${linkClasses} ${inactiveLinkClasses}`}>
                            <ArrowLeft size={20} />
                            <span>{t('backToSite')}</span>
                        </Link>
                         <button onClick={logout} className={`w-full ${linkClasses} ${inactiveLinkClasses}`}>
                            <LogOut size={20} />
                            <span>{t('logout')}</span>
                        </button>
                     </div>
                </aside>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Mobile/Tablet Header */}
                    <div className="lg:hidden mb-4 p-2 bg-brand-surface rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-bold text-white">
                                <span className="text-brand-primary">{t('appName')}</span> {t('admin')}
                            </div>
                            <div>
                                <Link to="/" title={t('backToSite')} className="p-2 rounded-full text-brand-text-dim hover:bg-slate-700"><ArrowLeft size={20} /></Link>
                                <button onClick={logout} title={t('logout')} className="p-2 rounded-full text-brand-text-dim hover:bg-slate-700"><LogOut size={20} /></button>
                            </div>
                        </div>
                         <nav className="flex items-center space-x-2 mt-2 overflow-x-auto pb-2">
                            {navLinks.map(link => (
                                <NavLink 
                                    key={link.to} 
                                    to={link.to} 
                                    end={link.end}
                                    className={({ isActive }) => `flex-shrink-0 px-3 py-2 text-sm rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                                >
                                    {link.text}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
