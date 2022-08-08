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
  //添加↑
})


