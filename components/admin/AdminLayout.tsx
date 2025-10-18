import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Tv, Users, CalendarClock, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AdminLayout: React.FC = () => {
  const { t } = useTranslation();

  const navLinkClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors";
  const activeLinkClass = "bg-brand-primary text-white";
  const inactiveLinkClass = "text-brand-text-dim hover:bg-slate-700 hover:text-brand-text";

  const getLinkClass = ({ isActive }: { isActive: boolean }) => `${navLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface flex-shrink-0 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold px-4 mb-6">{t('adminPanel')}</h2>
          <nav className="space-y-2">
            <NavLink to="/admin" end className={getLinkClass}>
              <LayoutDashboard size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
              {t('dashboard')}
            </NavLink>
            <NavLink to="/admin/channels" className={getLinkClass}>
              <Tv size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
              {t('manageChannels')}
            </NavLink>
            <NavLink to="/admin/users" className={getLinkClass}>
              <Users size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
              {t('manageUsers')}
            </NavLink>
            <NavLink to="/admin/schedule" className={getLinkClass}>
              <CalendarClock size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
              {t('manageSchedule')}
            </NavLink>
          </nav>
        </div>
        <div>
          <NavLink to="/" className={getLinkClass}>
            <Home size={20} className="mr-3 rtl:mr-0 rtl:ml-3" />
            {t('backToSite')}
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
