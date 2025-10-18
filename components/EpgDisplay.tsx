import React from 'react';
import { Program } from '../types';
import { useTranslation } from 'react-i18next';

interface EpgDisplayProps {
  programs: Program[];
  loading: boolean;
  error: string | null;
}

export const EpgDisplay: React.FC<EpgDisplayProps> = ({ programs, loading, error }) => {
    const { t } = useTranslation();

    const formatDisplayTime = (timeStr: string): string => {
        if (!timeStr || !timeStr.includes(':')) return '';
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit' });
    };

    const renderContent = () => {
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
            <div className="space-y-4 max-h-[96vh] overflow-y-auto">
                {programs.map((program, index) => (
                    <div key={index} className="flex justify-between items-start p-4 rounded-md bg-slate-800">
                        <div>
                            <p className="font-semibold text-brand-text">{program.title}</p>
                            <p className="text-sm text-brand-text-dim">{formatDisplayTime(program.startTime)} - {formatDisplayTime(program.endTime)}</p>
                            <p className="text-sm text-brand-text-dim mt-2">{program.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t('fullSchedule')}</h2>
            {renderContent()}
        </div>
    );
};
