import { hydrate } from 'later.js';
import routes from './routes';
import createStore from './createStore';
import resolveRoute from './resolveRoute';

hydrate({
  routes,
  createStore,
  resolveRoute,
});

if (module.hot) {
  module.hot.accept();
}
