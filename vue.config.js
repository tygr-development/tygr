const SurgeSPAWebpackPlugin = require('./webpack-plugins/surge-spa-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new SurgeSPAWebpackPlugin()
    ]
  }
}
