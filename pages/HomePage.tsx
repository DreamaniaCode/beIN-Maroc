import React, { useState, useMemo } from 'react';
import { useChannels } from '../hooks/useChannels';
import { CategoryTabs } from '../components/CategoryTabs';
import { ChannelCard } from '../components/ChannelCard';
import { HeroChannel } from '../components/home/HeroChannel';
import { ChannelCarousel } from '../components/home/ChannelCarousel';
import { SkeletonLoader } from '../components/home/SkeletonLoader';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { channels, categories, loading, error } = useChannels();
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const { t } = useTranslation();

  const featuredChannel = useMemo(() => {
    if (channels.length === 0) return null;
    return channels.find(c => c.isLive) || channels[0];
  }, [channels]);

  const filteredChannels = useMemo(() => {
    if (activeCategoryId === 'all') {
      return channels;
    }
    return channels.filter(channel => channel.categoryIds.includes(activeCategoryId));
  }, [channels, activeCategoryId]);
  
  const liveChannels = useMemo(() => channels.filter(c => c.isLive), [channels]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div className="flex-grow flex items-center justify-center text-red-400">{error}</div>;
  }
  
  const allCategories = [{ id: 'all', name: t('allChannels') }, ...categories];

  return (
    <>
      {featuredChannel && (
         <div className="mb-8">
            <HeroChannel channel={featuredChannel} />
         </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <ChannelCarousel title={t('liveNow')} channels={liveChannels} />

        <div className="sticky top-16 bg-brand-bg z-30 py-4">
            <CategoryTabs categories={allCategories} activeCategoryId={activeCategoryId} onSelectCategory={setActiveCategoryId} />
        </div>
        
        <div className="mt-6">
          {filteredChannels.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredChannels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">{t('noChannelsFound')}</h2>
              <p className="text-brand-text-dim mt-2">{t('tryDifferentCategory')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
