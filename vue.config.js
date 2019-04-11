const nodeExternals = require('webpack-node-externals');

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    externals: [
      nodeExternals()
    ]
  },

  lintOnSave: true,

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
      files: [
        'src/**/*.vue'
      ]
    }
  }
};
