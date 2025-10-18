import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useChannels } from '../hooks/useChannels';
import { useAuth } from '../hooks/useAuth';
import { HeroChannel } from '../components/home/HeroChannel';
import { ChannelCarousel } from '../components/home/ChannelCarousel';
import { SkeletonLoader } from '../components/home/SkeletonLoader';
import { Channel } from '../types';

export const HomePage: React.FC = () => {
  const { channels, categories, loading, error } = useChannels();
  const { user, favorites } = useAuth();
  const { t } = useTranslation();

  const liveChannels = useMemo(() => channels.filter(c => c.isLive), [channels]);
  const favoriteChannels = useMemo(() => channels.filter(c => favorites.includes(c.id)), [channels, favorites]);
  
  const channelsByCategory = useMemo(() => {
    return categories.map(category => ({
      ...category,
      channels: channels.filter(channel => channel.categoryIds.includes(category.id))
    }));
  }, [channels, categories]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><SkeletonLoader /></div>;
  }
  
  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-400">{error}</div>;
  }

  const heroChannel: Channel | undefined = liveChannels.length > 0 ? liveChannels[0] : channels[0];

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        {heroChannel && <HeroChannel channel={heroChannel} />}
        
        {user && favoriteChannels.length > 0 && (
          <ChannelCarousel title={t('myFavorites')} channels={favoriteChannels} />
        )}

        {liveChannels.length > 0 && (
            <ChannelCarousel title={t('liveChannels')} channels={liveChannels} />
        )}

        {channelsByCategory.map(categoryData => (
          <ChannelCarousel 
            key={categoryData.id} 
            title={categoryData.name} // Assuming category names are universal or would be translated if they were keys
            channels={categoryData.channels}
          />
        ))}
      </div>
    </main>
  );
};
