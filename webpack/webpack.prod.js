'use strict';

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({ test: /\.(js|css)$/i }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifest = {};
        files.forEach((file) => {
          manifest[file.name] = file.path;
        });
        return manifest;
      },
    }),
  ],
  performance: {
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js.gz');
    },
  },
});
