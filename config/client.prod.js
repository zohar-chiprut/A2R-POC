const {merge} = require('webpack-merge');
const clientDev = require('./client.dev');

const PRODUCTION = 'production';

module.exports = () => {
  const fileName = `Scripts/[name].[contenthash].js`;
  const changeForProduction = {
    mode: PRODUCTION,
    output: {
      clean: false,
      chunkFilename: fileName,
      filename: fileName,
      assetModuleFilename: 'Assets/[name].[contenthash][ext][query]', // [ext]='.png'
      publicPath: '/',
    },
    stats: {
      preset: 'normal',
      errorDetails: true,
      optimizationBailout: true,
      reasons: true,
      reasonsSpace: 1000,
      modulesSpace: 15,
      assetsSpace: 15,
    },
    performance: {
      maxAssetSize: 5000000, //max assets/images size
      maxEntrypointSize: 10000000, //max bundle size. Sprint_14: 8.68MiB TotalBundle * 1,048,576bytes =~ 9000000
      hints: 'warning',
      assetFilter: function (assetFilename) {
        return !assetFilename.endsWith('.jpg') && !assetFilename.endsWith('.png') && !assetFilename.endsWith('.map');
      },
    },
  };

  const clientPrd = merge(clientDev(), changeForProduction);

  return clientPrd;
};
