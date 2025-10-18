
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // In a real app, you'd validate password too.
    if (!auth.login(email)) {
      setError('Invalid email. Try "alex@example.com"');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-brand-surface shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Login to LiveStream TV</h2>
          {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-brand-text-dim text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-800 text-brand-text leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary"
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-brand-text-dim text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-800 text-brand-text mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <p className="text-xs text-brand-secondary">Any password will work for this demo.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-brand-primary hover:bg-sky-400 text-brand-bg font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
