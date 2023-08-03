'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../app'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      API: path.resolve(__dirname, '../app/api/'),
      Actions: path.resolve(__dirname, '../app/redux/actions/'),
      Contexts: path.resolve(__dirname, '../app/contexts/'),
      Components: path.resolve(__dirname, '../app/components/'),
      Containers: path.resolve(__dirname, '../app/containers/'),
      Utils: path.resolve(__dirname, '../app/utils/'),
      Helpers: path.resolve(__dirname, '../app/helpers/'),
    },
  },
  devServer: {
    open: true,
    static: path.resolve(__dirname, '../public'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
