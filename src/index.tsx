import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from './store/store';
import persistStore from 'redux-persist/es/persistStore';

const mock = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('../src/mocks/workers');
  worker.start();
};

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
mock().then(() => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  );
});
