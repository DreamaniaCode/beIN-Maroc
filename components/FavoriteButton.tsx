import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export const FavoriteButton: React.FC<{ channelId: string }> = ({ channelId }) => {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  const isFav = isFavorite(channelId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card navigation
    toggleFavorite(channelId);
  };

  return (
    <button
      onClick={handleClick}
      title={isFav ? t('unfavorite') : t('addToFavorites')}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors
        ${isFav ? 'bg-pink-600/20 text-pink-400' : 'bg-brand-surface hover:bg-slate-700 text-brand-text-dim'}
      `}
    >
      <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
      <span className="hidden sm:inline">
        {isFav ? t('favorited') : t('addToFavorites')}
      </span>
    </button>
  );
};
