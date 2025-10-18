import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/ChannelCard';
import { useNavigate } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
    const { user, favorites } = useAuth();
    const { channels, loading, error } = useChannels();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Please Log In</h2>
                <p className="text-brand-text-dim mb-6">You need to be logged in to view your favorite channels.</p>
                <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 bg-brand-primary text-brand-bg font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors">
                    Go to Login
                </button>
            </div>
        );
    }
    
    const favoriteChannels = channels.filter(channel => favorites.includes(channel.id));

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">My Favorite Channels</h1>
            {loading ? (
                 <div className="text-center text-brand-text-dim py-10">Loading favorites...</div>
            ) : error ? (
                 <div className="text-center text-red-400 py-10">Error: Could not load channels.</div>
            ) : favoriteChannels.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {favoriteChannels.map(channel => (
                        <ChannelCard key={channel.id} channel={channel} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-brand-surface rounded-lg">
                    <h2 className="text-xl font-semibold text-white">No Favorites Yet</h2>
                    <p className="text-brand-text-dim mt-2">
                        Click the star icon on a channel to add it to your favorites.
                    </p>
                </div>
            )}
        </main>
    );
};