const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  mode: 'development',
  entry: {
    main: './index.js',
    analytic: './analytics.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@models': path.resolve(__dirname, './src/models'),
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack $_GET!',
      template: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/assets/favicon.ico'),
        to: path.resolve(__dirname, './dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 4200,
    hot: true,
  }
};