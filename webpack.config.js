const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background/index.js',
    inject: './src/inject/index.js'
  },
  mode: "development",
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
        from: '_locales/**/*',
        to: '',
        context: 'src/'
      },
      {
        from: 'manifest.json',
        to: '',
        context: 'src/'
      }
    ], {
      debug: false
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};