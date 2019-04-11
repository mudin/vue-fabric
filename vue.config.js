let externals = [];

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  const nodeExternals = require('webpack-node-externals');
  externals = [
    nodeExternals()
  ];
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    externals
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
