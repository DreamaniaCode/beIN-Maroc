import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChannels } from '../hooks/useChannels';
import { VideoPlayer } from '../components/VideoPlayer';
import { ProgramGuide } from '../components/ProgramGuide';
import { useAuth } from '../hooks/useAuth';
import { FavoriteButton } from '../components/FavoriteButton';

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export const ChannelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isFavorite, toggleFavorite } = useAuth();
  const { channels, loading, error } = useChannels();
  
  const channel = channels.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
     return <div className="text-center text-brand-text-dim py-10">Loading channel...</div>;
  }
  
  if (error) {
     return <div className="text-center text-red-400 py-10">Error loading channel data.</div>;
  }

  if (!channel) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Channel not found</h2>
        <p className="text-brand-text-dim mb-6">The channel you are looking for does not exist.</p>
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 bg-brand-primary text-brand-bg font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors">
            <ArrowLeftIcon />
            Back to All Channels
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
         <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-sky-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded">
            <ArrowLeftIcon />
            Back to Channels
        </button>
        {user && (
            <FavoriteButton
                isFavorite={isFavorite(channel.id)}
                onClick={() => toggleFavorite(channel.id)}
            />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer src={channel.streamUrl} />
        </div>
        <div>
          <ProgramGuide channel={channel} />
        </div>
      </div>
    </div>
  );
};
