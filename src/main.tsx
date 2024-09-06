import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Auth0Provider } from '@auth0/auth0-react';
import { getConfig } from './config.ts';
import history from './utils/history.ts';
import { Provider } from 'react-redux';
import store, { persistor } from './store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utils/helper.ts';

const config = getConfig();

const onRedirectCallback = (appState: { returnTo?: string } | undefined) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Auth0Provider {...providerConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Auth0Provider>
    </PersistGate>
  </Provider>,
);
