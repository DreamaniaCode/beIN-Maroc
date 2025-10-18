import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Channel } from '../../types';
import { LiveIndicator } from '../LiveIndicator';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeroChannelProps {
  channel: Channel;
}

export const HeroChannel: React.FC<HeroChannelProps> = ({ channel }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative w-full aspect-video md:aspect-[2.4/1] bg-brand-surface rounded-lg overflow-hidden group">
      <img
        src={channel.logo.replace('400x225', '1280x720')}
        alt={`${channel.name} hero banner`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

      <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full md:w-2/3 lg:w-1/2">
        <div className="mb-2">
          <LiveIndicator isLive={channel.isLive} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{channel.name}</h1>
        <p className="text-lg md:text-xl font-semibold mb-4 drop-shadow-md">{channel.currentProgram.title}</p>
        <p className="hidden md:block text-sm text-gray-300 mb-6 max-w-xl line-clamp-2">
          {channel.description}
        </p>
        <button
          onClick={() => navigate(`/channel/${channel.id}`)}
          className="flex items-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-400 transition-all transform group-hover:scale-105"
        >
          <Play size={20} />
          <span>{t('watchNow')}</span>
        </button>
      </div>
    </div>
  );
};
