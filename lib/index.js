const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const pEachSeries = require('p-each-series');
const copy = require('./copy');
const install = require('./install');
const messages = require('./messages');
const addInclusion = require('./addInclusion');
const presets = require('../inclusions/presets');

/**
 * Creates the later.js app!
 *
 * @param {String}    project    Project name.
 * @param {Array}     inclusions Inclusion names.
 * @param {String}    preset     Preset name.
 * @returns {Promise}
 */
async function createLaterApp(project, inclusions, preset) {
  if (!project) {
    console.log(messages.noName());
    process.exit(1);
  }

  if (fs.existsSync(project)) {
    console.log(messages.exists(project));
    process.exit(1);
  }

  if (preset && !(preset in presets)) {
    console.log(messages.badPreset(preset));
    process.exit(1);
  }

  if (inclusions.length > 0) {
    inclusions.forEach(inclusion => {
      let inclusionModuleTest;
      try {
        inclusionModuleTest = require(`../inclusions/${inclusion}`);
      } catch (e) {
        console.log(messages.badInclusion(inclusion));
        process.exit(1);
      }
    });
  }

  const base = path.resolve(__dirname, '../base');
  const destination = path.join(process.cwd(), project);

  await copy(base, destination, project);

  // replace the <my-later-app> with the project name
  const packageJson = path.resolve(destination, './package.json');
  const packageJsonContent = await fs.readFile(packageJson, 'utf-8');
  await fs.writeFile(
    packageJson,
    packageJsonContent.replace('<my-later-app>', project),
  );

  // production
  await install('later.js 👋', destination, [
    'react',
    'react-dom',
    'react-helmet',
    'react-router-dom',
    'react-router-config',
    'redux',
    'react-redux',
    'later.js',
  ]);
  // development
  await install(
    'razzle ✨ + dev tools 🛠',
    destination,
    [
      'razzle',
      'redux-devtools-extension',
      'jest',
      'enzyme',
      'enzyme-adapter-react-16',
    ],
    '-dev',
  );

  if (preset) {
    console.log(messages.usePreset(preset));
    inclusions = [...inclusions, ...presets[preset]];
  }

  if (inclusions.length) {
    await pEachSeries(inclusions, addInclusion.bind(this, destination));
  }

  console.log(messages.installationComplete(project));
}

module.exports = createLaterApp;
