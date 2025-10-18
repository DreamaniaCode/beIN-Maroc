import React, { useState, useMemo } from 'react';
import { categories } from '../data/mockData'; // Categories are static, so we keep this
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/ChannelCard';
import { CategoryTabs } from '../components/CategoryTabs';

export const HomePage: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const { channels, loading, error } = useChannels();

  const filteredChannels = useMemo(() => {
    if (activeCategoryId === 'all') {
      return channels;
    }
    return channels.filter(channel => channel.categoryIds.includes(activeCategoryId));
  }, [activeCategoryId, channels]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-brand-text-dim py-10">Loading channels...</div>;
    }
    if (error) {
      return <div className="text-center text-red-400 py-10">Error: Could not load channels. {error}</div>;
    }
    if (filteredChannels.length === 0) {
        return <div className="text-center text-brand-text-dim py-10">No channels found in this category.</div>
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredChannels.map(channel => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    );
  };

  return (
    <main>
      <CategoryTabs 
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </main>
  );
};
