var path = require('path');
const merge = require('webpack-merge');

let baseConfig = {
  // Change to your "entry-point".
  entry: './src/index',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  resolve: {
    extensions: ['.js', '.json'],
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
