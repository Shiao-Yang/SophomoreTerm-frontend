<template>
  <div class="UmlView">
    <topology :configs="topologyConfigs" :user="user"></topology>
    <remote-link href="//at.alicdn.com/t/font_1331132_g7tv7fmj6c9.css"></remote-link>
    <remote-link href="//at.alicdn.com/t/font_2030495_3ziztwjjab6.css"></remote-link>
    <remote-link href="//at.alicdn.com/t/font_1331132_5lvbai88wkb.css"></remote-link>
    <remote-js src="http://topology.le5le.com/js/canvas2svg.js"></remote-js>
    <remote-js src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></remote-js>
    <remote-js src="https://cdn.bootcss.com/jszip/3.2.2/jszip.min.js"></remote-js>
    <remote-js src="https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js"></remote-js>
  </div>
</template>

<script>
import  topology from "topology-vue";

export default {
  name: "UmlView",
  components:{
    topology,
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: {
        src: { type: String, required: true },
      },
    },
    'remote-link':{
      render(createElement) {
        return createElement('link', {attrs: {rel:"stylesheet", property:"stylesheet", href: this.href}});
      },
      props: {
        href: {type: String, required: true},
      }
    }
  },
  data: function () {
    return {
      topologyConfigs: {
        // logo: {
        //   img: "http://43.138.26.134/api/media/avatars/default.png",
        //   router: "/",
        //   target: "_blank",
        // },
        logo: null,
        menus: {
          back: {
            icon: "t-icon t-angle-left",
          },
          login: true,
          left: [
            {
              name: "文件(自定义菜单1)",
              children: [
                { name: "新建文件", keyboard: "Ctrl+N", action: "open" },
                { name: "打开文件", keyboard: "Ctrl+O", action: "loadNew" },
                { name: "导入文件", keyboard: "Ctrl+I", action: "load" },
                {},
                { name: "保存", keyboard: "Ctrl+S", action: "save" },
                { name: "另存为", keyboard: "Ctrl+Shift+I", action: "saveAs" },
                { name: "下载JSON文件", action: "downloadJson" },
                { name: "下载zip打包文件", action: "downloadZip" },
                {},
                { name: "导出为HTML", action: "downloadHtml" },
                {},
                { name: "下载为PNG", action: "downloadPng" },
                { name: "下载为SVG", action: "downloadSvg" },
              ],
            },
            {
              name: "编辑(自定义菜单2)",
              children: [
                { name: "撤销", keyboard: "Ctrl+Z", action: "undo" },
                { name: "恢复  ", keyboard: "Ctrl+Shift+Z", action: "redo" },
                {},
                { name: "剪切  ", keyboard: "Ctrl+X", action: "cut" },
                { name: "复制  ", keyboard: "Ctrl+C", action: "copy" },
                { name: "粘贴  ", keyboard: "Ctrl+V", action: "paste" },
              ],
            },
            {
              name: "我的菜单3",
              router: "/page",
            },
          ],
          middle: [],
        },
        loginUrl: "http://43.138.26.134/login&register",
        signupUrl: "http://43.138.26.134/login&register",
        userMenus: [
          { name: "个人中心", router: "/userView" },
          {},
          {},
          { name: "退出", action: "logout" },
        ],
      },
      user: this.$store.state.userInfo,
    };
  },
}

</script>

<style scoped>
@import "topology-vue/topology-vue.css";
.UmlView{
  height: 100vh;
}
</style>
