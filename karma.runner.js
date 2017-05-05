Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');
require('phantomjs-polyfill/bind-polyfill.js');

var appContext = require.context('./spec', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);