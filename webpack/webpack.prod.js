const WebpackObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUT_DIR = 'build';
const smp = new SpeedMeasurePlugin();
const commonConfig = require('./webpack.common');

module.exports = smp.wrap(
  merge(commonConfig, {
    mode: 'production',
    entry: {
      index: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, OUT_DIR),
      filename: '[name].js',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info'], // Delete console
            },
          },
        }),
      ],
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
      new WebpackObfuscator(
        {
          rotateStringArray: true,
        },
        [],
      ),
    ],
  }),
);
