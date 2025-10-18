// Fix: Provide full content for ChannelCarousel.tsx to resolve module errors.
import React from 'react';
import { Channel } from '../../types';
import { ChannelCard } from '../ChannelCard';

interface ChannelCarouselProps {
  title: string;
  channels: Channel[];
}

export const ChannelCarousel: React.FC<ChannelCarouselProps> = ({ title, channels }) => {
  if (channels.length === 0) {
    return null;
  }
  
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {channels.map(channel => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
};
