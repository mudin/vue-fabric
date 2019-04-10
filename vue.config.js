const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  lintOnSave: true,
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,

  chainWebpack: (config) => {
    config.plugin('stylelint').use('stylelint-webpack-plugin');
    // const types = ['vue'];
    // eslint-disable-next-line no-use-before-define
    // types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    // config.module
    //   .rule('vue')
    //   .test(/\.vue$/)
    //   .use('iview-loader')
    //   .loader('iview-loader')
    //   .options({
    //     prefix: false,
    //   });
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
      files: [
        'src/**/*.vue'
      ]
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locale'
    }
  }
};

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/custom/variables.less')
      ]
    });
}
