/* global applyMiddleware */
import { createStore, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './state';

export default function createFinalStore(initialState) {
  return createStore(rootReducer, initialState, devToolsEnhancer());
}
