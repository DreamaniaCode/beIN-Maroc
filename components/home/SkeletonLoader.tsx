import React from 'react';

const SkeletonCard = () => (
    <div className="flex-shrink-0 w-64 sm:w-72">
        <div className="bg-brand-surface rounded-lg">
            <div className="w-full h-40 bg-slate-700 animate-pulse rounded-t-lg"></div>
            <div className="p-4">
                <div className="h-4 bg-slate-700 animate-pulse rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-700 animate-pulse rounded w-1/2"></div>
            </div>
        </div>
    </div>
);

const SkeletonCarousel = () => (
    <div className="mb-10">
        <div className="h-8 bg-slate-700 animate-pulse rounded w-1/4 mb-4"></div>
        <div className="flex space-x-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    </div>
);

export const SkeletonLoader: React.FC = () => {
    return (
        <div>
            {/* Hero Skeleton */}
            <div className="aspect-16/7 w-full bg-brand-surface animate-pulse rounded-lg mb-12"></div>
            
            {/* Carousels Skeleton */}
            <SkeletonCarousel />
            <SkeletonCarousel />
        </div>
    );
};
