const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const getOptimization = () => {
  const isBootstrap = (name) => /bootstrap/.test(name);
  const isCss = (name) => /\.(css|scss)$/.test(name);
  const isVendor = (name) => /node_modules/.test(name) || isBootstrap(name) ;

  const commonOptimization = {
    /**
     * usedExports:
     * Tells webpack to determine used exports for each module.
     * This depends on optimization.providedExports
     * Information collected by optimization.
     * usedExports is used by other optimizations or code generation
     *  i.e. exports are not generated for unused exports,
     * export names are mangled to single char identifiers
     * when all usages are compatible. Dead code elimination
     * in minimizers will benefit from this and can remove unused exports
     */
    usedExports: true,
    /**
     * providedExports:
     * Tells webpack to figure out which exports are provided by modules
     * to generate more efficient code for export * from ....
     * By default optimization.providedExports is enabled */
    providedExports: true,
  };
  const clientOptimization = {
    chunkIds: 'named',
    mergeDuplicateChunks: true,
    // runtimeChunk: 'single',

    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      /**
       * minSize
       * Minimum size, in bytes, for a chunk to be generated,
       * create a new chunk if its total number of bytes
       * is greater than or equal to this number
       */
      minSize: 20000,
      cacheGroups: {
        defaultVendors: false,
        lib: {
          name: 'lib',
          test: (module) => {
            const name = module.nameForCondition();
            return isVendor(name) && !isCss(name);
          },
          chunks: 'all',
          priority: -10,
          enforce: true,
        },
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          priority: -20,
          enforce: true,
        },
      },
    },
    minimize: false,
  };
  const productionOptimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // global_defs: {
            //   enableDebug: !removeConsoleLog, //force episerver debug to false , removeConsoleLog is true in production and qa2
            // },
            passes: 2, //number of times to run compress, leads to further compressed code
            toplevel: true, //drop unreferenced functions and/or variables  in the top level scope
            drop_console: false, //to discard calls to console.* functions, removeConsoleLog is true in production and qa2
          },
          mangle: true,
          format: {
            comments: false, //remove comments
          },
        },
        extractComments: true, //save in separate file comments
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            //https://cssnano.co/docs/what-are-optimisations/
            'default',
            {
              discardComments: {removeAll: true},
            },
          ],
        },
      }),
    ],
  };
  let optimization = { ...commonOptimization, ...clientOptimization, ...productionOptimization };

  return optimization;
};
exports.optimization = getOptimization();
