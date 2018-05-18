/* global applyMiddleware */
import { createStore, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

function createAsyncMiddlware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      async function actionPromise(/* pass some fetch client here */) {
        try {
          const result = await promise(/* pass some fetch client here */);
          next({ ...rest, type: SUCCESS });
        } catch (error) {
          next({ ...rest, type: FAILURE });
        }
      }
      return actionPromise();
    };
  };
}

export default function createFinalStore(initialState) {
  const middleware = [createAsyncMiddleware(), thunk];
  const rootReducer = require('./state');
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools()(applyMiddleware(...middleware)),
  );
  if (module.hot) {
    module.hot.accept('./state', () => store.replaceReducer('./state'));
  }
  return store;
}
