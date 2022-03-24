const homeHandler = require('./home');
const staticFile = require('./static-files');
const catHandler = require('./cat');

module.exports = [homeHandler, staticFile, catHandler];