# create-later.js-app 🛠👋

Easily bootstrap a [later.js](https://github.com/BenMagyar/later.js) (universal
React / Redux / React-Router) and
[razzle](https://github.com/jaredpalmer/razzle) application.

## Getting Started

```bash
npx create-later.js-app <app-name>
cd <app-name> && npm start
```

## Inclusions `--include <inclusion>`

These options can be included using the `--include <name>` option. Multiple
inclusions can be included, not all may compose well.

### Provided Inclusions

* `async-redux` - Includes a small async action setup, with a
  pluggable `resolveRoute` function using
  [redux-thunk](https://github.com/reduxjs/redux-thunk).
* `styled-jsx` - Includes [styled-jsx](https://github.com/zeit/styled-jsx)
  setup.

## Presets `--preset <preset>`

Presets are intended to make grouped inclusions easier to use. In other words,
you don't need to figure out if these inclusions collide, and it should leave
you with a more complete application. They can be added using the `--preset <name>` option.

### Provided Presets

* `styled-with-redux` - [`async-redux`, `styled-jsx`].

## Inspiration

* [create-razzle-app](https://www.npmjs.com/package/create-razzle-app)
