import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChannels } from '../hooks/useChannels';
import { VideoPlayer } from '../components/VideoPlayer';
import { ProgramGuide } from '../components/ProgramGuide';
import { FavoriteButton } from '../components/FavoriteButton';
import { useTranslation } from 'react-i18next';
import { LiveIndicator } from '../components/LiveIndicator';
import { ArrowLeft } from 'lucide-react';

export const ChannelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { channels, loading } = useChannels();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const channel = channels.find(c => c.id === id);

  if (loading) {
    return <div className="flex-grow flex justify-center items-center"><div className="loader"></div></div>;
  }

  if (!channel) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">{t('channelNotFound')}</h1>
        <p className="text-brand-text-dim mb-6">{t('channelNotFoundMessage')}</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-brand-primary text-brand-bg rounded-md font-semibold hover:bg-sky-400 transition-colors"
        >
          {t('goHome')}
        </button>
      </div>
    );
  }

  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-text-dim hover:text-brand-text transition-colors">
            <ArrowLeft size={20} />
            {t('back')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer src={channel.streamUrl} />
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold">{channel.name}</h1>
                  {channel.description && <p className="mt-2 text-brand-text-dim">{channel.description}</p>}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <LiveIndicator isLive={channel.isLive} />
                  <FavoriteButton channelId={channel.id} />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <ProgramGuide channel={channel} />
          </div>
        </div>
      </div>
    </main>
  );
};
