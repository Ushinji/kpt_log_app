import React from 'react';
import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Count from './components/Count';
import ProjectList from './components/ProjectList';

const history = createBrowserHistory();
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(routerMiddleware(history), thunk)
);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/hoge" component={Count} />
        <Route path="/projects" component={ProjectList} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
