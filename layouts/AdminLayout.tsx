// FIX: Implemented the missing AdminLayout component.
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Tv, Users, CalendarClock, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: '/admin', text: t('dashboard'), icon: LayoutDashboard, end: true },
    { to: '/admin/channels', text: t('manageChannels'), icon: Tv },
    { to: '/admin/users', text: t('manageUsers'), icon: Users },
    { to: '/admin/schedule', text: t('manageSchedule'), icon: CalendarClock },
  ];

  const getLinkClass = (path: string, isEnd: boolean = false) => {
    const isActive = isEnd ? location.pathname === path : location.pathname.startsWith(path);
    const baseClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full text-left";
    const activeClasses = "bg-brand-primary text-white";
    const inactiveClasses = "text-brand-text-dim hover:bg-slate-700 hover:text-brand-text";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface flex-shrink-0 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold px-4 mb-6">{t('adminPanel')}</h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <button key={link.to} onClick={() => navigate(link.to)} className={getLinkClass(link.to, link.end)}>
                <link.icon size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
                {link.text}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <button onClick={() => navigate('/')} className={getLinkClass('/')}>
            <Home size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
            {t('backToSite')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
