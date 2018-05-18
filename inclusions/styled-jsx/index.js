const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const execa = require('execa');
const install = require('../../lib/install');

async function includeStyledJsx(rootPath) {
  // Update babelrc file this really should check for the existing file first
  // and update it if it does exist.
  await install('styled-jsx', rootPath, ['styled-jsx']);
  await fse.copy(
    path.resolve(__dirname, './files/babelrc'),
    path.resolve(rootPath, './.babelrc'),
  );
  // Call out to addStyledJsx code-mod for the rest
  const binPath = path.resolve('./node_modules/.bin');

  return execa(path.resolve(binPath, './jscodeshift'), [
    '-t',
    path.resolve(__dirname, './codemod.js'),
    path.resolve(rootPath, './src/server.js'),
  ]);
}

module.exports = includeStyledJsx;
