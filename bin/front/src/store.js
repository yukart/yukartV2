
import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';  
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export const store = createStore(
  reducer, applyMiddleware(thunk));
