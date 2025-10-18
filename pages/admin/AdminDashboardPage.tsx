import React from 'react';
import { useChannels } from '../../hooks/useChannels';
import { users } from '../../data/mockData'; // In a real app, this would come from a hook/API
import { useTranslation } from 'react-i18next';
import { Tv, Signal, Users } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-brand-surface p-6 rounded-lg flex items-center space-x-4 rtl:space-x-reverse">
        <div className="bg-brand-primary p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-brand-text-dim">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export const AdminDashboardPage: React.FC = () => {
    const { channels, loading } = useChannels();
    const { t } = useTranslation();

    const liveChannelsCount = channels.filter(c => c.isLive).length;
    const totalUsersCount = users.length;
    
    if (loading) {
        return <div className="loader"></div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{t('dashboard')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title={t('totalChannels')} value={channels.length} icon={<Tv size={24} />} />
                <StatCard title={t('liveNow')} value={liveChannelsCount} icon={<Signal size={24} />} />
                <StatCard title={t('registeredUsers')} value={totalUsersCount} icon={<Users size={24} />} />
            </div>

            {/* In a real dashboard, you would add more components here */}
            {/* For example: charts, recent activity, etc. */}
        </div>
    );
};
