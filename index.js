// .vuepress/theme/index.js
const path = require('path')
const glob = require("glob")
const files = glob
   .sync('./src/specs/*.json')//get all the *json schemas 
   .map(file => file.split('/').pop()) // remove the path and extract just the file name
   
module.exports = (themeConfig, { siteConfig }) => {
   themeConfig.commonSchemas = files
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