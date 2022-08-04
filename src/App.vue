<template>
  <div id="app">
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
    <div v-if="this.$route.path!=='/invite'"><Header/></div>
    <router-view/>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

