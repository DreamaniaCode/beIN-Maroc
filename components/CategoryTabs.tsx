
import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategoryId, onSelectCategory }) => {
  return (
    <div className="border-b border-slate-700">
        <nav className="container mx-auto px-4 -mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {categories.map((category) => (
            <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`
                ${activeCategoryId === category.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-brand-text-dim hover:text-brand-text hover:border-brand-secondary'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-t-sm
                `}
            >
                {category.name}
            </button>
            ))}
        </nav>
    </div>
  );
};
