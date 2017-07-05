import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Router from './components/main/Router';
import client from './graphql';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router />
  </ApolloProvider>
  , document.getElementById('app')
);
