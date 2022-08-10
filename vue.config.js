const  webpack = require('webpack')
const publicPath = './'
//↑添加
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //添加↓
  devServer: {
    proxy: {
      "/api": {
        target: "http://43.138.26.134/",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
  publicPath,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  }
  //添加↑
})


