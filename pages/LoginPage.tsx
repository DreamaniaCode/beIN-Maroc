import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // In this mock setup, any non-empty password is fine
    const success = login(email);

    if (success) {
      navigate(from, { replace: true });
    } else {
      setError(t('loginFailed'));
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-brand-surface shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center mb-6">{t('loginToYourAccount')}</h1>
          {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-brand-text-dim text-sm font-bold mb-2" htmlFor="email">
              {t('emailAddress')}
            </label>
            <input
              className="shadow appearance-none border border-slate-700 rounded w-full py-2 px-3 bg-slate-800 text-brand-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-brand-primary"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-brand-text-dim text-sm font-bold mb-2" htmlFor="password">
              {t('password')}
            </label>
            <input
              className="shadow appearance-none border border-slate-700 rounded w-full py-2 px-3 bg-slate-800 text-brand-text mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-brand-primary"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-brand-primary hover:bg-sky-400 text-brand-bg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              {t('login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
