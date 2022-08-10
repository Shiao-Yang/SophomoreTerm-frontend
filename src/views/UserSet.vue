<template>
  <div class="userSet">
    <Header></Header>
    <div class="container">
      <div class="main-container">
        <h1>TEST</h1>
      </div>
      <div>
        <svg class="waves" viewBox="0 24 150 28"
        preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18
                  58-18 88-18 58 18 88 18 v44h-352z"></path>
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0"
            fill="rgba(255,255,255,0.7)"></use>
            <use xlink:href="#gentle-wave" x="48" y="3"
                 fill="rgba(255,255,255,0.5)"></use>
            <use xlink:href="#gentle-wave" x="48" y="5"
                 fill="rgba(255,255,255,0.3)"></use>
            <use xlink:href="#gentle-wave" x="48" y="7"
                 fill="#fff"></use>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "UserSet",
  components:{
    Header
  }
}
</script>

<style scoped>
* {
  margin: 0;
}
</style>
