<template>
  <div id="app">
    <div v-if="this.$route.path!=='/invite'&&this.$route.path!=='/editor'"><Header/></div>
    <router-view/>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #efefbb;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
}


</style>

<script>
  import Header from "@/components/Header";
  export default {
    name: 'App',
    components: {Header},
    created() {

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

