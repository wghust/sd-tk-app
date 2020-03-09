var path = require('path');
// var webpack = require('webpack');
var fs = require('fs');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin')
// var VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader')
var vpsPath = path.resolve(__dirname, '../');

// package.json
var pg = fs.readFileSync(vpsPath + '/package.json');
var pjInfo = JSON.parse(pg);

var paths = {
  src: vpsPath + '/src/',
  dist: vpsPath + '/dist/' + pjInfo.version + '/'
};

var publicPath = '../../';

// 打包到线上，用这个地址
// var publicPath = '/journey/dist/' + pjInfo.version + '/';

module.exports = {
  mode: 'production',
  entry: {
    'business/index/index': paths.src + 'business/index/app.js'
  },
  output: {
    path: paths.dist,
    publicPath: publicPath,
    chunkFilename: 'chunks/[name].chunk.js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.styl'],
    modules: [
      path.join(__dirname, '../src'),
      'node_modules'
    ],
    alias: {
      'components': paths.src + 'components'
    }
  },
  stats: {
    entrypoints: false
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: true,
          sourceMap: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
    // minimizer: [
    //   new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true // set to true if you want JS source maps
    //   }),
    //   new OptimizeCSSAssetsPlugin({})
    // ]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [
        'vue-loader'
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 150000,
        name: 'images/[name].[ext]?[hash]'
      }
    }, {
      test: /\.(woff|ttf)$/,
      loader: 'url-loader',
      options: {
        limit: 1500,
        name: 'fonts/[name].[ext]?[hash]'
      }
    }, {
      test: /\.css?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.styl(us)?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
      ]
    }]
  },
  devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#eval-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin()
  ]
}