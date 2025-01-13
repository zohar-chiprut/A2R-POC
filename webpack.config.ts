// const util = require('util'); // used for console.log with inspect
const clientDev = require('./config/client.dev');
const clientPrd = require('./config/client.prod');
const mode = 'development'
module.exports = () => {
  console.log(`[33m
    Webpack is Running ...
    -----------------------
    [0m`);
  let webpack = clientDev();
console.log('[webpack]: ', webpack);
  // console.log('[webpack]: ', util.inspect(webpack, {showHidden: false, depth: null, colors: true}));
  return webpack;
};
