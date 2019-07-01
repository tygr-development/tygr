const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        includePaths: ['src/styles', 'node_modules'],
        data: `@import 'variables';\n`
      }
    }
  },
  configureWebpack: {
    plugins: [
      new ManifestPlugin({
        fileName: 'files.json'
      }),
    ]
  },
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        args[0]['process.env'].API_BASE_URL = JSON.stringify(process.env.API_BASE_URL)
        return args
      })
  }
}
