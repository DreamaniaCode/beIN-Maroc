import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'ar', name: 'AR' },
  ];

  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse bg-brand-surface rounded-full p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
            i18n.language.startsWith(lang.code)
              ? 'bg-brand-primary text-white'
              : 'text-brand-text-dim hover:bg-slate-700'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};
