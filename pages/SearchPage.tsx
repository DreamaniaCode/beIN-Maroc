import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/ChannelCard';
import { useTranslation } from 'react-i18next';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { channels } = useChannels();
  const { t } = useTranslation();
  
  const query = searchParams.get('q') || '';

  const filteredChannels = useMemo(() => {
    if (!query) return [];
    const lowercasedQuery = query.toLowerCase();
    return channels.filter(channel =>
      channel.name.toLowerCase().includes(lowercasedQuery) ||
      channel.currentProgram.title.toLowerCase().includes(lowercasedQuery) ||
      channel.description?.toLowerCase().includes(lowercasedQuery)
    );
  }, [query, channels]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">{t('searchChannels')}</h1>
      <p className="text-brand-text-dim mb-8">
        {query ? t('foundResults', { count: filteredChannels.length }) : t('searchForChannels')}
      </p>

      {query && filteredChannels.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredChannels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
      
      {query && filteredChannels.length === 0 && (
         <div className="text-center p-8 bg-brand-surface rounded-lg">
            <h2 className="text-2xl font-semibold">{t('noResultsFound', { query })}</h2>
         </div>
      )}
    </div>
  );
};
