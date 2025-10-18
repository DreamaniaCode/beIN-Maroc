import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/ChannelCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const FavoritesPage: React.FC = () => {
  const { user, favorites, loading: authLoading } = useAuth();
  const { channels, loading: channelsLoading } = useChannels();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const favoriteChannels = channels.filter(c => favorites.includes(c.id));

  const renderContent = () => {
    if (authLoading || channelsLoading) {
      return <div className="text-center"><div className="loader inline-block"></div></div>;
    }
    
    if (!user) {
      return (
        <div className="text-center p-8 bg-brand-surface rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('loginToSeeFavorites')}</h2>
          <button onClick={() => navigate('/login')} className="px-6 py-2 bg-brand-primary text-brand-bg rounded-md font-semibold hover:bg-sky-400 transition-colors">
            {t('goToLogin')}
          </button>
        </div>
      );
    }
    
    if (favoriteChannels.length === 0) {
      return (
        <div className="text-center p-8 bg-brand-surface rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('noFavoritesMessage')}</h2>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {favoriteChannels.map(channel => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    );
  }

  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('myFavoriteChannels')}</h1>
        {renderContent()}
      </div>
    </main>
  );
};
