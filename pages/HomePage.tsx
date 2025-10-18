// Fix: Provide full content for HomePage.tsx to resolve module errors.
import React, { useState, useEffect } from 'react';
import { useChannels } from '../hooks/useChannels';
import { CategoryTabs } from '../components/CategoryTabs';
import { ChannelCard } from '../components/ChannelCard';
import { SkeletonLoader } from '../components/home/SkeletonLoader';

export const HomePage: React.FC = () => {
  const { channels, categories, loading, error } = useChannels();
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const filteredChannels = channels.filter(channel => channel.categoryId === activeCategoryId);

  return (
    <div>
      <CategoryTabs
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredChannels.length > 0 ? (
              filteredChannels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} />
              ))
            ) : (
                <div className="col-span-full text-center py-16 bg-brand-surface rounded-lg">
                    <h2 className="text-xl font-semibold text-white">No Channels Found</h2>
                    <p className="text-brand-text-dim mt-2">
                        There are no channels available in this category.
                    </p>
                </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
