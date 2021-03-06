import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

const INITIAL_STATE = {};

const middleware = [ thunk ];

let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
  rootReducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(...middleware),
    // Redux store debugger. Used in Chrome.
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
} else {
  store = createStore(
  rootReducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(...middleware)
  )
);
}


export default store;
