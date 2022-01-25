'use strict';

const ExemploAdapter = require('./lib/exemplo-adapter');
const manifest = require('./manifest.json');

module.exports = (addonManager, _, errorCallback) => {
  new ExemploAdapter(addonManager);
};
