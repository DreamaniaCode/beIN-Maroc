import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

interface FavoriteButtonProps {
  channelId: string;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ channelId }) => {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const { t } = useTranslation();
  const isFav = isFavorite(channelId);

  if (!user) {
    return null; // Don't show the button if the user is not logged in
  }

  return (
    <button
      onClick={() => toggleFavorite(channelId)}
      title={isFav ? t('favorited') : t('addToFavorites')}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors
        ${isFav ? 'bg-pink-600/20 text-pink-400' : 'bg-brand-surface hover:bg-slate-700 text-brand-text-dim'}
      `}
    >
      <HeartIcon filled={isFav} />
      <span className="hidden sm:inline">
        {isFav ? t('favorited') : t('addToFavorites')}
      </span>
    </button>
  );
};
