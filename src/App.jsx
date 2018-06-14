import React from 'react';
import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import thunk from 'redux-thunk';
import { hot } from 'react-hot-loader';

import reducers from './reducers';
import Count from './components/pages/Count';
import ProjectList from './components/pages/ProjectList';

const history = createBrowserHistory();

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducers = require('./reducers').default; // eslint-disable-line global-require
    store.replaceReducer(combineReducers(nextReducers));
  });
}

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact from="/" to="/dashboad" />
        <Route exact path="/dashboad" component={Count} />
        <Route exact path="/projects" component={ProjectList} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
