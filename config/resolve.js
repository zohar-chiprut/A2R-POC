const path = require('path');

module.exports.getResolve = () => {
  return {
    alias: {
      "@app": path.resolve(__dirname, '..', 'src', 'app'),
      "@environments": path.resolve(__dirname, '..', 'src', 'environments'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // new '' for import without extension
    symlinks: false,
    cacheWithContext: false,
  };
};

/*
old resolve:

we don't use express, and
there were build errors not resolving scss so added
relevant aliases

alias: {
    app: 'C:\\dev\\Cms\\webpack5\\Cellcom.Digital.Cms\\src\\Spa.Frontend\\config\\src',
    'app.server': 'C:\\dev\\Cms\\webpack5\\Cellcom.Digital.Cms\\src\\Spa.Frontend\\config\\server',
    'app.express': 'C:\\dev\\Cms\\webpack5\\Cellcom.Digital.Cms\\src\\Spa.Frontend\\config\\express'
  },
  extensions: [ '.js', '.jsx', '.json', '.tsx', '.ts' ]
*/
