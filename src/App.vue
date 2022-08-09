<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  /*!*background: #efefbb;*!*/
  /*!*background: linear-gradient(to right, #d4d3dd, #efefbb);*!*/
}


</style>

<script>
  import Header from "@/components/Header";
  export default {
    name: 'App',
    components: {Header},
    created() {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
            Object.assign(
                {},
                this.$store.state,
                JSON.parse(sessionStorage.getItem('store'))
            )
        )
      }

      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // beforeunload事件在页面刷新时先触发
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    },
    mounted() {
      if (this.$store.state.warning) {
        this.$message.warning("请先登录！")
        this.$store.state.warning = false
      }
    }
  }
</script>

<style>

* {
  margin: 0px;
  padding: 0px;
}
</style>

