import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import Layout from './Layout';
import Counter from './Counter';
import Messenger from './Messenger';

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <Layout>
        <Messenger />
      </Layout>
    </Provider>;
  }
}