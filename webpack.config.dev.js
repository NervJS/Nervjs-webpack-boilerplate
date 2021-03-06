const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolveApp = relativePath => path.join(__dirname, relativePath);

const babelLoader = require.resolve('babel-loader');
const fileLoader = require.resolve('file-loader');
const styleLoader = require.resolve('style-loader');
const cssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    sourceMap: true
  }
};
const sassLoader = {
  loader: require.resolve('sass-loader'),
  options: {
    sourceMap: true
  }
};
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: false,
  template: resolveApp('./src/page/index.html'),
  favicon: resolveApp('./src/assets/favicon.png')
});

module.exports = {
  mode: 'development',
  entry: {
    index: resolveApp('./src/page/index.js'),
    'es5-polyfill': 'es5-polyfill'
  },
  output: {
    path: resolveApp('./dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      react: 'nervjs',
      'react-dom': 'nervjs'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/i,
        exclude: /node_modules/,
        loader: babelLoader
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: fileLoader
      },
      {
        test: /\.s?css$/,
        use: [styleLoader, cssLoader, sassLoader]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
