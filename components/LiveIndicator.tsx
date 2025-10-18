import React from 'react';

interface LiveIndicatorProps {
  isLive: boolean;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isLive }) => {
  if (!isLive) {
    return (
       <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-500 text-white text-xs font-semibold">
        OFFLINE
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-semibold">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      LIVE
    </div>
  );
};
