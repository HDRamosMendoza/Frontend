// Dependencies
import webpack from 'webpack';
import path from 'path';
//    import ChunksPlugin from 'webpack-split-chunks';

// Environment
// const isDevelopment = process.env.NODE_ENV !== 'production';

// Paths
const PATHS = {
  index: path.join(__dirname, 'src/index'),
  build: path.join(__dirname, '/dist'),
  src: path.join(__dirname, 'src')
};

// Webpack config
export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    PATHS.index
  ],
  output : {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'],
      include: PATHS.src
    },{
      test:/(\.css)$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  }
};

/*
//  Para debbugind
const getDevtool = () => 'cheap-module-eval-source-map';
//Para que este escuhando nuestros cambios.
const getEntry = () => {
  const entry = [PATHS.index];

  if (isDevelopment) {
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  return entry;
};

const getOutput = () => ({
  path: PATHS.build,
  publicPath: '/',
  filename: '[name].bundle.js'
});
const getPlugins = () => {
  const plugins = [
    new ChunksPlugin({
      to: 'vendor',
      test: /node_modules/
    })
  ];

  if (isDevelopment) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  } else {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })
    );
  }

  return plugins;
};
const getLoaders = () => ({
  loaders: [
    {
      test: /\.js?$/,
      loaders: ['babel-loader'],
      include: PATHS.src
    },
    {
      test: /(\.css)$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }
  ]
});

export default {
  devtool: getDevtool(),
  entry: getEntry(),
  output: getOutput(),
  plugins: getPlugins(),
  module: getLoaders()
};
*/

// Web pack Config
//export default