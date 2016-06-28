const path = require('path');

module.exports = {
  entry: './src/entry.dist.js',
  output: {
    filename: 'bundle.dist.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },

  externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }]
};
