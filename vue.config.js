module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: 'TimeTracker'
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
