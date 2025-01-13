const path = require('path');

const devServer = {
  open: true,
  port: 9000,
  historyApiFallback: true,
  hot: true,
  liveReload: false,
  devMiddleware: {
    index: true,
    mimeTypes: {phtml: 'text/html'},
    publicPath: '/',
    writeToDisk: true,
  },
  static: {
    directory: path.resolve(__dirname, '../dist'),
  },
  // proxy: {
  //   headers: {
  //     'Access-Control-Allow-Origin': 'http://localhost:9000',
  //   },
  // },
  compress: false,
  client: {
    logging: 'error',
    overlay: true,
    progress: true,
    reconnect: true,
  },
};

exports.devServer = devServer;
