module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          publicPath: '../images',
          name: '[name].[ext]',
        },
      },
    ],
  },
};
