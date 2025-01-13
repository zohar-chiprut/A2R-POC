const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const useMiniCssExtractPlugin = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    esModule: true,
    publicPath: '/',
  },
  /**
   * Source maps works only for
   * source-map/nosources-source-map/hidden-nosources-source-map/hidden-source-map
   * values because CSS only supports source maps with the sourceMappingURL comment
   *  (i.e. //# sourceMappingURL=style.css.map).
   * If you need set devtool to another value you can enable
   *  source maps generation for extracted CSS using
   * sourceMap: true for css-loader (this is what we did)
   */
};
const useCssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    esModule: true,
    // modules: {
    //   namedExport: true, // although recommended it actually cause errors as undefined property
    // },
  },
};

const Rules = {
  scss: [
    useMiniCssExtractPlugin,
    useCssLoader,
    {
      loader: 'postcss-loader', // Run post css actions
      options: {
        sourceMap: true,
        plugins: function () {
          // post css plugins, can be exported to postcss.config.js
          return [require('precss'), require('autoprefixer')];
        },
      },
    },
    {
      loader: 'resolve-url-loader',
      options: {
        removeCR: true,
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        // resolve-url need a sourceMap
        sourceMap: true,
        // sassOptions: {
        //   includePaths: [srcRoot,bootstrapNodeModules, videoReactNodeModules, fortawesomeNodeModules],
        // },
      },
    },
  ],
};

const getClient = () => {
  const config = [];
  config.push(
      // js|jsx
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
    );
  config.push(
    //ts|tsx
    {
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      options: {
        allowTsInNodeModules: true,
        transpileOnly: true,
      },
    },
  );
  config.push(
    //source-map
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    },
  );
  config.push(
    //assets
    {
      test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
      type: 'asset/resource',
    },
  );
  config.push(
    //scss
    {
      test: /\.s[ac]ss$/i,
      // fortawesome might be needed although I didn't find where it is been used or imported.
      // So I decided to search on all source code just to be sure.
      // include: [srcRoot, swiperNodeModules, srcRoot, bootstrapNodeModules, videoReactNodeModules, fortawesomeNodeModules],
      sideEffects: true,
      use: Rules.scss,
    },
  );
  config.push(
    //css
    {
      test: /\.css$/i,
      sideEffects: true,
      // include: [
      //   path.resolve(projectRoot, 'node_modules', 'react-datepicker', 'dist'),
      //   path.resolve(projectRoot, 'node_modules', 'animate.css', 'dist'),
      // ],
      use: [useMiniCssExtractPlugin, useCssLoader],
    },
  );
  return config;
};

exports.clientRules = getClient();
