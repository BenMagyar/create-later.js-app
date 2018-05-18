const ora = require('ora');
const execa = require('execa');
const messages = require('./messages');

/**
 * Installs packages using npm
 *
 * @param  {String} origin   Origin/reason for installation.
 * @param  {String} path     Project path.
 * @param  {Array}  packages Array of package names to install.
 * @param  {String} type     Install type (dev?).
 * @return {Promise}         Promise of the installation.
 */
function install(origin, path, packages, type = '') {
  return new Promise((resolve, reject) => {
    const spinner = ora('clock').start();
    spinner.text = messages.installing(origin, packages);
    execa('npm', ['install', `--save${type}`, ...packages], { cwd: path })
      .then(() => {
        spinner.stopAndPersist({
          symbol: '✅ ',
          text: messages.installingComplete(origin),
        });
      })
      .then(resolve)
      .catch(() => {
        spinner.stopAndPersist({
          symbol: '❌ ',
          text: messages.installingFailed(origin),
        });
      });
  });
}

module.exports = install;
