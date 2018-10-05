import { applyMiddleware, createStore } from 'redux';
import devTools from 'remote-redux-devtools';
import reducer from '@Reducers';

function configureStore(initialState = {}) {
  const middlewares = [];
  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (__DEV__) {
    enhancers.push(devTools());
  }
  const store = createStore(
    reducer,
    initialState,
  );
  return store;
}

module.exports = configureStore;
