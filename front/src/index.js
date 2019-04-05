import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import FilmView from './components/Home/Film/FilmView.js';
import MusiqueView from './components/Home/Musique/MusiqueView.js';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/api" component={App} />
        <Route path="/api/film" component={FilmView} />
        <Route path="/api/musique" component={MusiqueView} />

      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
