const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getIgnore = () => {
  const plugins = [];
  const isTxt = (resource) => /\.txt$/.test(resource);
  const isImg = (resource) => /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/.test(resource);
  const isSvg = (resource) => /\.svg$/.test(resource);
  const isFont = (resource) => /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/.test(resource);
  const isScss = (resource) => /\.(s[ca]ss)$/.test(resource);
  const isCss = (resource) => /\.css$/.test(resource);
  const images = (resource) => isImg(resource) || isSvg(resource) || isFont(resource) || isScss(resource) || isCss(resource);
  const devDedCode = (resource) => isTxt(resource);
  const prdDedCode = (resource) =>
    devDedCode(resource) ;

    plugins.push(
      // ignorePlugin
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const ignore = devDedCode(resource);
          return ignore;
        },
      }),
    );

  return plugins;
};

const getClient = () => {
  const plugins = [];

  plugins.push(
    //html webpack plugin
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'..','src', 'index.html'),
      title: 'Golan-React',
      filename: 'index.html',
      // templateParameters: htmlParameters,
      cache: false, //emit the file every time
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  );

    plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: 'SourceMap/[file].map[query]',
        exclude: ['vendor.js'],
      }),
    );

  plugins.push(
    //Enable extraction of CSS
    new MiniCssExtractPlugin({
      filename: 'Styles/[name].[contenthash].css',
      chunkFilename: 'Styles/[id].[contenthash].css', // optimization chunkIds: 'named' so we'll get name when we'll split css
      ignoreOrder: true,
    }),
  );

  plugins.push(new webpack.HotModuleReplacementPlugin());
//  plugins.push(new ReactRefreshWebpackPlugin());


  //copy plugin
  // plugins.push(
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       {
  //         from: path.join(srcRoot, 'assetlinks.json'), //deeplink android
  //         to: path.join(deploymentPath, '.well-known', 'assetlinks.json'),
  //       },
  //       {
  //         from: path.join(srcRoot, 'apple-app-site-association.json'), //deeplink apple
  //         to: path.join(deploymentPath, '.well-known', 'apple-app-site-association.json'),
  //       },
  //       {
  //         from: path.join(srcRoot, 'favicon.ico'),
  //         to: path.join(deploymentPath, 'favicon.ico'),
  //       },
  //       {
  //         from: path.join(srcRoot, 'robots.txt'),
  //         to: path.resolve(deploymentPath, 'robots.txt'),
  //       },
  //       {
  //         from: path.join(srcRoot, 'web.config'),
  //         to: path.resolve(deploymentPath, 'web.config'),
  //       },
  //       {
  //         from: path.join(srcRoot, 'sitemap.xml'),
  //         to: path.resolve(deploymentPath, 'sitemap.xml'),
  //       },
  //       {
  //         from: path.join(srcRoot, './img/accessibility.png'),
  //         to: path.resolve(deploymentPath, 'assets', 'accessibility.png'),
  //       },
  //     ],
  //   }),
  // );

  return plugins;
};

const getCommon = () => {
  const plugins = [];

  // plugins.push(
  //   //Expose ENV variables
  //   new webpack.EnvironmentPlugin(envNeededForTheApp),
  // );

  plugins.push(
    //Embed jQuery globals
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  );

  // bundle analyser
  // const analyzeResultsPath = path.resolve(deploymentPath, 'Analyzer');
  // isAnalyze && console.log('ANALYZE activated');
  // isAnalyze &&
  //   plugins.push(
  //     new BundleAnalyzerPlugin({
  //       analyzerMode: 'static',
  //       reportFilename: path.join(analyzeResultsPath, `${model}_Analyzer.html`),
  //       generateStatsFile: false,
  //       statsFilename: path.join(analyzeResultsPath, `${model}_Stats.json`),
  //       logLevel: 'error',
  //       openAnalyzer: false,
  //     }),
  //   );

  return plugins;
};
exports.clientPlugins = [...getClient(), ...getCommon(), ...getIgnore()];
