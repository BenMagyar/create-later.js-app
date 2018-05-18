const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const messages = require('./messages');

/**
 * Copies template files into the destination path
 *
 * @param  {String}  origin       Template origin files.
 * @param  {String}  destination  Destination project path.
 * @param  {String}  project      Project name.
 * @return {Promise}              Promise of the copy action.
 */
function copy(origin, destination, project) {
  return new Promise((resolve, reject) => {
    const spinner = ora('clock').start();
    spinner.text = messages.copying(project);
    fs.copy(origin, destination)
      .then(() =>
        fs.move(
          path.resolve(destination, './gitignore'),
          path.resolve(destination, './.gitignore')
        )
      )
      .then(() => {
        spinner.stopAndPersist({
          symbol: '✅ ',
          text: messages.copyingComplete(project),
        });
      })
      .then(resolve)
      .catch(err => {
        spinner.stopAndPersist({
          symbol: '❌ ',
          text: messages.copyingFailed(project),
        });
        console.error(err);
        console.log(messages.ohno());
        reject(err);
      });

  });
}

module.exports = copy;
