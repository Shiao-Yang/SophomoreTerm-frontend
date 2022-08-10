<template>
  <div class="UmlView">
    <topology></topology>
  </div>
</template>

<script>
import  topology from "topology-vue";

export default {
  name: "UmlView",
  components:{
    topology,
  },
}
</script>

<style scoped>
@import "topology-vue/topology-vue.css";
.UmlView{
  height: 100vh;
}
</style>
