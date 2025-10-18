import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { ChannelsProvider } from './hooks/useChannels';
import './i18n'; // Initialize i18n

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div className="w-full h-screen flex justify-center items-center bg-brand-bg"><div className="loader"></div></div>}>
      <HashRouter>
        <AuthProvider>
          <ChannelsProvider>
            <App />
          </ChannelsProvider>
        </AuthProvider>
      </HashRouter>
    </Suspense>
  </React.StrictMode>
);
