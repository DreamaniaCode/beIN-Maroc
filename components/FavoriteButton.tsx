
import React from 'react';

interface FavoriteButtonProps {
    isFavorite: boolean;
    onClick: () => void;
}

const StarIcon = ({ isFavorite }: { isFavorite: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 transition-colors ${isFavorite ? 'text-yellow-400' : 'text-brand-secondary'}`}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
    return (
        <button
            onClick={onClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="flex items-center gap-2 bg-brand-surface hover:bg-slate-700 border border-slate-600 text-brand-text font-bold py-2 px-4 rounded-lg transition-colors"
        >
            <StarIcon isFavorite={isFavorite} />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
    );
};
