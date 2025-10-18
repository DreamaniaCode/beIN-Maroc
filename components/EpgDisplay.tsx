import React from 'react';
import { useEpg } from '../hooks/useEpg';
import { useTranslation } from 'react-i18next';

interface EpgDisplayProps {
  channelId: string;
}

export const EpgDisplay: React.FC<EpgDisplayProps> = ({ channelId }) => {
    const { programs, loading, error } = useEpg(channelId);
    const { t } = useTranslation();

    if (loading) {
        return <div className="text-center p-4"><div className="loader inline-block"></div></div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-400">{error}</div>;
    }

    if (programs.length === 0) {
        return <div className="text-center p-4 text-brand-text-dim">{t('noEpgData')}</div>
    }
    
    return (
        <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t('fullSchedule')}</h2>
            <div className="space-y-4">
                {programs.map((program, index) => (
                    <div key={index} className="flex justify-between items-start p-4 rounded-md bg-slate-800">
                        <div>
                            <p className="font-semibold text-brand-text">{program.title}</p>
                            <p className="text-sm text-brand-text-dim">{program.startTime} - {program.endTime}</p>
                            <p className="text-sm text-brand-text-dim mt-2">{program.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
