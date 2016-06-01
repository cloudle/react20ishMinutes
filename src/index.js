import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

let rootEl, Application = <AppContainer>
  <App />
</AppContainer>;

function runApplication () {
  rootEl = document.getElementById('root');
  render(Application, rootEl);
}

if (window.cordova) document.addEventListener('deviceready', runApplication, false);
else runApplication();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default,
      NextApplication = <AppContainer>
        <App />
      </AppContainer>;

    render(NextApplication, rootEl);
  });
}