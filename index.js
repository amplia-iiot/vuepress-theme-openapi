// .vuepress/theme/index.js
const path = require('path')

module.exports = (themeConfig, { siteConfig } ) => {
   console.log(siteConfig.configureWebpack);
   const configureWebpack = siteConfig.configureWebpack
   siteConfig.configureWebpack = (config) => {
      config.module.rules.push({
         test: /\.yaml$/,
         use: 'js-yaml-loader',
      })
      if (configureWebpack)
         return configureWebpack(config)
   }
   return {
      alias () {
         return { '@specs': path.resolve('./src/specs') }
      },
      rules () {
         return [{
            test: /\.yaml$/,
            use: 'js-yaml-loader',
         }]
      },
      extend: '@vuepress/theme-default'
   }
}
