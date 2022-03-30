const path = require(`path`);

module.exports = function(env) {

  return {
    mode: `production`,
    context: path.join(__dirname, `./src`),
    entry: [`regenerator-runtime/runtime.js`, `./index.js`],
    output: {
      path: path.resolve(`dist`),
      filename: `index.js`,
      libraryTarget: 'commonjs2'
    },
    optimization: {
      minimize: false
    },
    performance: {
      hints: false
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [`babel-loader`]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            `style-loader`,
            `css-loader`,
            `sass-loader`
          ]
        },
        {
          test: /\.(tff|eot|svg|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: `file-loader`
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: `url-loader`,
            options: {
              limit: 10000,
              mimetype: `application/font-woff`
            }
          }]
        }
      ]
    },
    externals: {
      react: `react`
    }
  }
}
