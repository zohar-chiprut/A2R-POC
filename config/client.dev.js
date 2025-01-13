const path = require('path');
const {ignoreWarnings} = require('./ignore.warnings');
const {getResolve} = require('./resolve');
const {optimization} = require('./optimization');
const {clientPlugins} = require('./plugins');
const {clientRules} = require('./rules');
const {devServer} = require('./devServer');
const DEVELOPMENT = 'development';

module.exports = () => {
  const fileName = `Scripts/dev.[name][contenthash].js`;

  const clientDev = {
    mode: DEVELOPMENT,
    target: ['web', 'browserslist'],
    stats: 'normal',
    ignoreWarnings: ignoreWarnings,
    cache: true,
    entry: {
      app: path.join(__dirname,'..','src', 'main.ts'),
    },
    output: {
      clean: {
        // keep(asset) {
        //   return  asset.includes('index.html');
        // },
      },
      chunkFilename: fileName,
      filename: fileName,
      assetModuleFilename: 'Assets/[path][name][ext][query]', // deployment assets include same path as in development project ,
      path: path.resolve(__dirname, '..', 'dist'),
      publicPath: '/',
      pathinfo: false,
    },
    resolve: getResolve(),
    optimization: optimization,
    /**
     * devtool
     * -------
     * source-map - (in production) “Slow” builds (but mini-css-extract-plugin support it, “pretty fast” rebuilds. The best quality.
     * eval-source-map -“Super fast”
     * 'inline-source-map' -> the setup in Sprint_12
     * when analyze activated, disable source-map.
     * webpack issue #2145 recommends inline-module-source-map as it's a good compromise
     * between speed and quality while working reliably in Chrome and Firefox browsers
     */
    devtool: false, // using webpack.SourceMapDevToolPlugin in clientPlugins
    module: {
      rules: clientRules,
    },
    plugins: clientPlugins,
    watchOptions: {
      aggregateTimeout: 200,
      ignored: '**/node_modules',
      followSymlinks: false,
    },
  };
  clientDev.devServer = devServer
  return clientDev;
};
