var path = require('path');
const merge = require('webpack-merge');

let baseConfig = {
  // Change to your "entry-point".
  entry: './src/index',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chrisapi.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
 
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

let targets = ['web', 'node'].map((target) => {
  let base = merge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, './dist/' + target),
    },
  });
  return base;
});

module.exports = targets;
