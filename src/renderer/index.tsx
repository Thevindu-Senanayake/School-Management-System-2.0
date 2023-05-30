import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import App from './App';

import { store } from './redux/app/store';

import AlertTemplate from './react-alert-template';

import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);

console.log(window.electron.APIBASEURI);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
