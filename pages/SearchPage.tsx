import React, { useState, useMemo } from 'react';
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/ChannelCard';
import { Channel } from '../types';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-text-dim"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

export const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const { channels, loading, error } = useChannels();

    const filteredChannels = useMemo(() => {
        if (!query || loading || error) {
            return [];
        }
        const lowerCaseQuery = query.toLowerCase();
        return channels.filter(channel => 
            channel.name.toLowerCase().includes(lowerCaseQuery) ||
            channel.currentProgram.title.toLowerCase().includes(lowerCaseQuery) ||
            channel.nextProgram.title.toLowerCase().includes(lowerCaseQuery)
        );
    }, [query, channels, loading, error]);

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Search Channels</h1>
            
            <div className="relative mb-8">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search by channel name or program..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 pl-10 text-brand-text ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
            </div>
            
            {loading && query && <p className="text-brand-text-dim text-center py-10">Searching...</p>}
            {error && <p className="text-red-400 text-center py-10">Could not perform search due to an error.</p>}

            {query && !loading && !error && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Found {filteredChannels.length} result{filteredChannels.length !== 1 && 's'} for "{query}"
                    </h2>
                    {filteredChannels.length > 0 ? (
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {filteredChannels.map(channel => (
                                <ChannelCard key={channel.id} channel={channel} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-brand-text-dim text-center py-10">No channels found.</p>
                    )}
                </div>
            )}

             {!query && (
                <div className="text-center py-16 bg-brand-surface rounded-lg">
                    <h2 className="text-xl font-semibold text-white">Search for Live TV</h2>
                    <p className="text-brand-text-dim mt-2">
                        Find your favorite channels and shows in an instant.
                    </p>
                </div>
            )}
        </main>
    );
};
