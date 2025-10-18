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
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 carousel-scrollbar">
        {channels.map(channel => (
          <div key={channel.id} className="flex-shrink-0 w-64 sm:w-72">
            <ChannelCard channel={channel} />
          </div>
        ))}
        <div className="flex-shrink-0 w-1"></div>
      </div>
    </div>
  );
};
