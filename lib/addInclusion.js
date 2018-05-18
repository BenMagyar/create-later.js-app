const ora = require('ora');
const messages = require('./messages');

/**
 * Executes adding a specific inclusion
 *
 * @param  {String} rootPath  Root path of the newly-formed application.
 * @param  {String} inclusion Inclusion name.
 * @return {Promise}          Promise of adding the inclusion.
 */
async function addInclusion(rootPath, inclusion) {
  const spinner = ora('clock').start();
  spinner.text = messages.addingInclusion(inclusion);
  try {
    const inclusionModule = require(`../inclusions/${inclusion}`);
    await inclusionModule(rootPath)
    spinner.stopAndPersist({
      symbol: '✅ ',
      text: messages.addingInclusionComplete(inclusion),
    });
  } catch (e) {
    console.error(e);
    spinner.stopAndPersist({
      symbol: '❌ ',
      text: messages.addingInclusionFailed(inclusion),
    });
  }
}

module.exports = addInclusion;
