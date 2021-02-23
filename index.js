// .vuepress/theme/index.js
const glob = require("glob")
const files = glob
   .sync('./src/.vuepress/public/specs/*.json')//get all the *json schemas 
   .map(file => file.split('/').pop()) // remove the path and extract just the file name
module.exports = (themeConfig) => {
   themeConfig.commonSchemas = files
   return {
      extend: '@vuepress/theme-default'
   }
}