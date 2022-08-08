<template>
  <div>
    <Header></Header>
    <side-navigation></side-navigation>
    <div class="container">
      <div class="img img1" @click="toDesign">
        <div class="card">
          <p class="word" style="color: black">原型设计</p>
        </div>
      </div>
      <div class="img img2">
        <a href="https://www.umletino.com/umletino.html" style="text-decoration: none;color: black">
        <div class="card">
          <p class="word">绘制图</p>
        </div>
        </a>
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
import sideNavigation from "@/components/SideNavigation";
import Header from "@/components/Header";
export default {
  name: "Project",
  components: {
    Header,
    sideNavigation,
  },
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
    toDesign() {
      this.$router.push('/designList')
    },
    //turnToUML() {
    //  this.$router.push('https://www.umletino.com/umletino.html')
    //}

  }
}
</script>

<style scoped>
  .container {
    position: absolute;
    text-align: center;
    width: 79%;
    height: 85%;
    left: 240px;
    top: 60px;
  }
  .img {
    position: absolute;
    width: 30%;
    height: 100%;
    display: inline-block;
    margin: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    transition: 2s;
    border-radius: 20px;
  }
  .img:hover {
    background-position: bottom center;
  }
  .img1 {
    background-image: url("../assets/projectBgd1.jpg");
    left: 0%;

  }
  .img2 {
    background-image: url("../assets/projectBgd2.jpg");
    left: 33%;
  }
  .img3 {
    background-image: url("../assets/projectBgd3.jpg");
    left: 66%;
  }
  .card {
    margin: 0px;
    position: absolute;
    width: 78%;
    height: 40%;
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
