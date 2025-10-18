import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChannels } from '../hooks/useChannels';
import { VideoPlayer } from '../components/VideoPlayer';
import { ProgramGuide } from '../components/ProgramGuide';
import { LiveIndicator } from '../components/LiveIndicator';
import { FavoriteButton } from '../components/FavoriteButton';
import { useTranslation } from 'react-i18next';
import { EpgDisplay } from '../components/EpgDisplay';

export const ChannelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { channels, loading, error } = useChannels();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const channel = channels.find(c => c.id === id);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex-grow flex items-center justify-center text-red-400">{error}</div>;
  }
  
  if (!channel) {
    return (
      <div className="flex-grow flex items-center justify-center text-center">
        <div>
            <h1 className="text-4xl font-bold mb-4">{t('channelNotFound')}</h1>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-brand-primary text-brand-bg rounded-md font-semibold hover:bg-sky-400 transition-colors">
                {t('goHome')}
            </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <VideoPlayer src={channel.streamUrl} />
        
        <div className="mt-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <img src={channel.logo.replace('400x225', '150x84')} alt={`${channel.name} logo`} className="w-24 h-auto rounded-md bg-brand-surface" />
                    <div>
                        <h1 className="text-4xl font-bold">{channel.name}</h1>
                        <div className="mt-1">
                            <LiveIndicator isLive={channel.isLive} />
                        </div>
                    </div>
                </div>
                <div>
                    <FavoriteButton channelId={channel.id} />
                </div>
            </div>
            
            <p className="text-brand-text-dim max-w-3xl mb-8">
                {channel.description}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <EpgDisplay channelId={channel.id} />
                </div>
                <div className="lg:col-span-1">
                    <ProgramGuide channel={channel} />
                </div>
            </div>
        </div>
      </div>
    </main>
  );
};
