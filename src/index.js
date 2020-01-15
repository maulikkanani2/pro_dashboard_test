import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import 'babel-polyfill';

import App from './App';

const getConfig = () => {
  return new Promise((resolve) => {
    fetch('/config.json').then((response) => {
      resolve(response.json());
    });
  });
};

getConfig().then((config) => {
  window.config = config;

  Raven
    .config(`https://${window.config.logging.key}@sentry.io/${window.config.logging.project}`, {
      shouldSendCallback: data => window.config.logging.enabled
    })
    .install();

  ReactDOM.render(<App />, document.querySelector('#root'));
});

