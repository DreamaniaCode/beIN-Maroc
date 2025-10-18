// Fix: Provide full content for SkeletonLoader.tsx to resolve module errors.
import React from 'react';

export const SkeletonLoader: React.FC = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="bg-brand-surface rounded-lg">
                   <div className="w-full h-40 bg-slate-700 animate-pulse rounded-t-lg"></div>
                   <div className="p-4">
                       <div className="h-4 bg-slate-700 animate-pulse rounded w-3/4 mb-2"></div>
                       <div className="h-3 bg-slate-700 animate-pulse rounded w-1/2"></div>
                   </div>
               </div>
             ))}
        </div>
    );
};
