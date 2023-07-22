var path = require('path');
const merge = require('webpack-merge');

let baseConfig = {
  // Change to your "entry-point".
  entry: './src/index.js',
  mode: 'production',
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
      library: 'ChRISAPI',
      libraryTarget: 'umd',
      filename: target === 'node' ? 'chrisapi-server.js' : 'chrisapi-client.js',
      path: path.resolve(__dirname, './dist'),
    },
  });
  return base;
});

module.exports = targets;
