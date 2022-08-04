<template>
  <div>
    <div class="container">
      <div class="img img1">
        <div class="card">
          <p class="word">原型设计</p>
        </div>
      </div>
      <div class="img img2">
        <div class="card">
          <p class="word">绘制图</p>
        </div>
      </div>
      <div class="img img3">
        <div class="router" @click="turnToEditor">
          <div class="card">
            <p class="word">编辑文档</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  created() {
    //if (!this.$store.state.isLogin) {
    //  this.$store.state.warning = true
    //  this.$router.push('/')
    //}
  },
  data() {
    return {
      design: true,
      map: true,
      file: true,
    }
  },
  methods:{
    turnToEditor(){
      this.$router.push('/editor');
    },
  }
}
</script>

<style scoped>
  .container {
    position: absolute;
    text-align: center;
    left: 20%;
    top: 10%;
  }
  .img {
    width: 360px;
    height: 650px;
    display: inline-block;
    margin: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    transition: 2s;
  }
  .img:hover {
    background-position: bottom center;
  }
  .img1 {
    background-image: url("../assets/projectBgd1.jpg");
    position: absolute;

  }
  .img2 {
    background-image: url("../assets/projectBgd2.jpg");
    position: absolute;
    left: 400px;
  }
  .img3 {
    background-image: url("../assets/projectBgd3.jpg");
    position: absolute;
    left: 800px;
  }
  .card {
    margin: 0px;
    position: relative;
    width: 280px;
    height: 280px;
    background-color: rgb(240,240,240,0.9);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    left: 11%;
    top: 25%;
    cursor: pointer;
    transition: 0.5s;
  }
  .card:hover {
    transform: scale(1.1);
  }
  .word {
    position: relative;
    font-size: 40px;
    top: 35%;
  }
  .router {
    text-decoration: none;
    color: #000000;
  }
</style>