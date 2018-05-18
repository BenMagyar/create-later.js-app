const chalk = require('chalk');

module.exports.exists = project =>
  chalk`It looks like {yellow project} already exists!`;

module.exports.noName = () =>
  'We need a project-name first. Dont be afraid to ask for ' +
  chalk`{bold --help'}`;

module.exports.badPreset = preset =>
  chalk`There is no preset named {yellow.bold ${preset}}!`;

module.exports.usePreset = preset =>
  chalk`✅ Using the inclusions of the {blue.bold ${preset}} preset`;

module.exports.badInclusion = inclusion =>
  chalk`There is no inclusion named {yellow.bold ${inclusion}}!`;

module.exports.copying = project => chalk`Creating {green.bold ${project}}...`;

module.exports.copyingComplete = project =>
  chalk`Created {green.bold ${project}}`;

module.exports.copyingFailed = project =>
  chalk`Failed to create {red.bold ${project}}`;

module.exports.ohno = () =>
  chalk`{red.bold Oh-no!} Something went wrong. Try again.`;

module.exports.installing = (origin, packages) =>
  chalk`Installing packages for {blue.bold ${origin}}:\r\n` +
  chalk`{blue \t${packages.join('\r\n\t')}}`;

module.exports.installingComplete = origin =>
  chalk`Installed packages for {blue.bold ${origin}}`;

module.exports.installingFailed = (origin, packages) =>
  chalk`Installing packages for {red.bold ${origin}} failed:\r\n` +
  chalk`{yellow ${packages.join('\t\r\n')}}`;

module.exports.addingInclusion = inclusion =>
  chalk`Installing inclusion {blue.bold ${inclusion}}...`;

module.exports.addingInclusionComplete = inclusion =>
  chalk`Installed inclusion {blue.bold ${inclusion}}`;

module.exports.addingInclusionFailed = inclusion =>
  chalk`Installing inclusion {red.bold ${inclusion}} failed.`;

module.exports.installationComplete = project =>
  chalk`✅ Installation is complete! {green.bold 'cd ${project} && npm start'} to get started!`;
