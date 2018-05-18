const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const execa = require('execa');
const install = require('../../lib/install');

async function includeAsyncRedux(rootPath) {
  await install('async-redux 🕙', rootPath, ['redux-thunk']);
  // Just need to copy over the file!
  await fse.copy(
    path.resolve(__dirname, './files/resolveRoute.js'),
    path.resolve(rootPath, './src/resolveRoute.js'),
  );
}

module.exports = includeAsyncRedux;
