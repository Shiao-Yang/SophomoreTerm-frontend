<template>
  <div class="UmlView">
    <topology></topology>
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
}
</script>

<style scoped>
@import "topology-vue/topology-vue.css";
.UmlView{
  height: 100vh;
}
</style>
