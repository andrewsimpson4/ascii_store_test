const path = require('path');
const appDirectory = __dirname;
module.exports = {
  entry: "./src/index.js",
  output: {
      path: appDirectory,
      filename: "faces.bundle.js"
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              include: [
              path.resolve(appDirectory, 'src'),
              path.resolve(appDirectory, 'node_modules/react-native-animatable'),
              ],
            exclude: /node_modules\/react-native-web\//,
              loader: 'babel-loader',
              query: {
                  presets: ['react-native', 'babel-preset-es2016']
              }
          }
      ]
  },
  resolve: {
      alias: {
          "react-native": "react-native-web"
      },
      extensions: [ '.web.js', '.js' ]    
   }
};