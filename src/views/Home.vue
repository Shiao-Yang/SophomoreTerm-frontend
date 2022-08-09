<template>
  <div class="home">
    <Header/>
    <section>
      <div class="box">
        <h2 data-jarallax-element="0 -200">在线协作，高效编辑</h2>
        <div class="container">
          <div class="imgBx jarallax">
            <img class="jarallax-img" src="../assets/adminBgd.jpg">
          </div>
          <div class="content" data-jarallax-element="-200 0">
            <p>
              - 支持在线文档编辑<br/>
              - 支持文档团队多人编辑管理
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="box">
        <h2 data-jarallax-element="0 200">团队管理，协作无间</h2>
        <div class="container">
          <div class="imgBx jarallax">
            <img class="jarallax-img" src="../assets/adminBgd.jpg">
          </div>
          <div class="content" data-jarallax-element="-200 0">
            <p>
              - 支持团队管理，明确角色分工 <br/>
              - 支持团队协作，共同开发
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Home",
  components: {
    Header,
  },
  data(){
    return{
      panels:null
    }
  },
  created() {

  },
  mounted(){
    this.initializePictures()
  },
  methods:{
    initializePictures:function () {
      const tempThis = this;

      tempThis.panels=document.querySelectorAll('.panel')
      tempThis.panels.forEach(panel=>{
        panel .addEventListener('click',()=>{
          tempThis.removeActiveClasses()
          panel.classList.add('active')
        })
      })
    },
    removeActiveClasses:function () {
      const tempThis = this;
      tempThis.panels.forEach(panel=>{
        panel.classList.remove('active')
      })
    }
  },

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;

}

.home {
  background: #fff;
  padding-bottom: 50px;
  overflow: hidden;
}

.home:before {
  content: 'MoBook';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16em;
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 1px #555;
}

section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

section h2 {
  margin-left: 200px;
  font-size: 4em;
  color: #000;
  margin-bottom: 20px;
}

section .container {
  position: relative;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

section:nth-child(even) .container {
  flex-direction: row-reverse;
}

section .container .imgBx {
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
}

section .container .imgBx img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

section .container .content {
  position: absolute;
  right: 0;
  margin-top: 200px;
  margin-bottom: 40px;
  padding: 40px;
  background: #333;
  z-index: 1;
  max-width: 400px;
  color: #fff;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
  border-bottom: 6px solid #4ac7ff;
}

section:nth-child(even) .container .content {
  left: 0;
}

.jarallax {
  position: relative;
  z-index: 0;
}
.jarallax > .jarallax-img {
  position: absolute;
  object-fit: cover;
  font-family: 'object-fit: cover;';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
