const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const path = require('path');

const OUT_DIR = 'build/';
const smp = new SpeedMeasurePlugin();
const commonConfig = require('./webpack.common');
require('dotenv').config({ debug: true, override: true });

module.exports = smp.wrap(
  merge(commonConfig, {
    mode: 'development',
    entry: {
      index: './src/index.tsx', // the entry point of our app
    },
    output: {
      path: resolve(__dirname, OUT_DIR),
      filename: '[name].js',
    },
    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, './assets'),
        publicPath: '/assets',
      },
      compress: true,
      hot: true,
      port: 9000,
      historyApiFallback: true,
      client: {
        progress: true,
      },
    },
    module: {
      rules: [
        {
          test: [/\.jsx?$/, /\.tsx?$/],
          include: /node_modules\/react-dom/,
          use: ['react-hot-loader/webpack'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '[name].html',
        title: `Example App`,
        favicon: './src/assets/images/png/app.png',
      }),
    ],
  }),
);
