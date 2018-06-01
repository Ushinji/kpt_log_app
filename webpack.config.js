const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: '[name]-[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules:[
      {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      }
    ],
  },
  plugins: [
    new ManifestPlugin(),
  ],
};