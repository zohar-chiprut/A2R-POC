import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { AngularWebpackPlugin } from '@ngtools/webpack';
import linkerPlugin from '@angular/compiler-cli/linker/babel';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  target: ['web', 'browserslist'],
  stats: 'normal',
  ignoreWarnings: [],
  cache: true,
  entry: {
    app: path.resolve(__dirname, 'src/main.ts')
  },
  output: {
    clean: {},
    chunkFilename: 'Scripts/dev.[name][contenthash].js',
    filename: 'Scripts/dev.[name][contenthash].js',
    assetModuleFilename: 'Assets/[path][name][ext][query]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    pathinfo: false
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src','app'),
      '@environments': path.resolve(__dirname, 'src','environments')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    symlinks: false,
    cacheWithContext: false
  },
  optimization: {
    usedExports: true,
    providedExports: true,
    chunkIds: 'named',
    mergeDuplicateChunks: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.[cm]?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            compact: false,
            plugins: [linkerPlugin]
          }
        }
      },
      // Add other rules as needed
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'SourceMap/[file].map[query]',
      moduleFilenameTemplate: 'webpack://[namespace]/[resourcePath]',
      fallbackModuleFilenameTemplate: 'webpack://[namespace]/[resourcePath]?[hash]'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new ProvidePlugin({
    //   // Add any global variables you need
    // }),
    // new IgnorePlugin({
    //   resourceRegExp: /^\.\/locale$/,
    //   contextRegExp: /moment$/
    // })
  ],
  watchOptions: {
    aggregateTimeout: 200,
    ignored: '**/node_modules',
    followSymlinks: false
  },
  devServer: {
    open: true,
    port: 9000,
    historyApiFallback: true,
    // hot: true,
    liveReload: false,
    devMiddleware: {
      index: true,
      mimeTypes: { 'text/html': ['phtml'] },
      publicPath: '/',
      writeToDisk: true
    },
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    compress: false,
    client: {
      logging: 'error',
      overlay: true,
      progress: true,
      reconnect: true
    }
  }
};
