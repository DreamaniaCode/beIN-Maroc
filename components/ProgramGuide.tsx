// FIX: Implemented the missing ProgramGuide component.
import React from 'react';
import { Channel } from '../types';
import { useEpg } from '../hooks/useEpg';
import { useTranslation } from 'react-i18next';

interface ProgramGuideProps {
  channel: Channel;
}

export const ProgramGuide: React.FC<ProgramGuideProps> = ({ channel }) => {
  const { programs, loading, error } = useEpg(channel.id);
  const { t } = useTranslation();

  return (
    <div className="bg-brand-surface p-4 rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-bold mb-4">{t('programGuide')}</h3>
      {loading && <div className="loader"></div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {programs.length > 0 ? (
            programs.map((program, index) => (
              <div key={index} className="text-sm">
                <p className="font-semibold text-brand-text">{program.title}</p>
                <p className="text-xs text-brand-text-dim">{program.startTime} - {program.endTime}</p>
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
