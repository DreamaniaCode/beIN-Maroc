import React from 'react';
import { Program } from '../types';
import { useTranslation } from 'react-i18next';

interface ProgramGuideProps {
  programs: Program[];
  loading: boolean;
  error: string | null;
}

export const ProgramGuide: React.FC<ProgramGuideProps> = ({ programs, loading, error }) => {
  const { t } = useTranslation();

  const formatDisplayTime = (timeStr: string): string => {
      if (!timeStr || !timeStr.includes(':')) return '';
      const [hours, minutes] = timeStr.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="bg-brand-surface p-4 rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-bold mb-4">{t('programGuide')}</h3>
      {loading && <div className="loader"></div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {programs.length > 0 ? (
            programs.slice(0, 10).map((program, index) => (
              <div key={index} className="text-sm">
                <p className="font-semibold text-brand-text">{program.title}</p>
                <p className="text-xs text-brand-text-dim">{formatDisplayTime(program.startTime)} - {formatDisplayTime(program.endTime)}</p>
              </div>
            ))
          ) : (
            <p className="text-brand-text-dim">{t('noScheduleAvailable')}</p>
          )}
        </div>
      )}
    </div>
  );
};
