var webpack = require('webpack');
var path = require('path');

var CLIENT_PATH = path.resolve(__dirname, 'src');
var APP_PATH = path.resolve(CLIENT_PATH, 'app');
var HOST = process.env.IP || 'localhost' + ':' + process.env.PORT || 8080;

var config = {
    entry: APP_PATH + '/index.js',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    output: {
        path: CLIENT_PATH,
        filename: 'bundle.js'
    },
    module : {
        loaders : [{
              test: /\.json$/,
              loader: 'json-loader'
            }, {
                test: /\.jsx$|\.js$/,
                include: APP_PATH,
                loaders: ['babel-loader']//, "eslint-loader"
            }, {
              test: /\.(graphql|gql)$/,
              loader: 'graphql-tag/loader'
            },
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: CLIENT_PATH
    },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/
    }
};

module.exports = config;
