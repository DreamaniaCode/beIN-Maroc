import React from 'react';
import { users } from '../../data/mockData';
import { useTranslation } from 'react-i18next';

export const ManageUsersPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{t('manageUsers')}</h1>
            
            <div className="bg-brand-surface rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-brand-text-dim">
                    <thead className="text-xs text-brand-text uppercase bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('name')}</th>
                            <th scope="col" className="px-6 py-3">{t('email')}</th>
                            <th scope="col" className="px-6 py-3">{t('role')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{user.name}</th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        user.isAdmin ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                        {user.isAdmin ? t('admin') : t('user')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
