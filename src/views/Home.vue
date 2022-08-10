<template>
  <div class="home">
    <Header/>
    <div class="home-content">
      <div class="title-box">
        <h1 class="title-tag">
          <span>协作设计</span>
          <br>
          在线产品设计平台
        </h1>
        <p class="description">
          墨书 · 协作共享，创造可能
        </p>
        <div class="btn" v-if="!this.$store.state.isLogin">
          <router-link to="/login&register">
            现在开始
          </router-link>
        </div>
      </div>
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
            <div class="btn">
              <router-link to="/login&register">

              </router-link>
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

      <section style="padding-bottom: 40px">
        <div class="box">
          <h2 data-jarallax-element="0 -200">多项功能，一站集成</h2>
          <div class="container">
            <div class="imgBx jarallax">
              <img class="jarallax-img" src="../assets/adminBgd.jpg">
            </div>
            <div class="content" data-jarallax-element="-200 0">
              <p>
                - 支持在线文档、UML图编辑、原型设计等多项功能<br/>
                - 在线一站式管理项目文件
              </p>
            </div>
          </div>
        </div>
      </section>
      <remote-js src="http://43.138.26.134/api/media/documents/jarallax.js"></remote-js>
      <remote-js src="http://43.138.26.134/api/media/documents/jarallax-element.js"></remote-js>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Home",
  components: {
    Header,
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: {
        src: { type: String, required: true },
      },
    },
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
  background: linear-gradient(90deg,transparent,rgba(68,138,255,.05));;
  padding-bottom: 50px;
  overflow: hidden;
}

/*.home .home-content:before{*/
/*  content: 'MoBook';*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  transform: translate(-50%, -50%);*/
/*  font-size: 16em;*/
/*  font-weight: 700;*/
/*  color: transparent;*/
/*  -webkit-text-stroke: 1px #555;*/
/*}*/

section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: 80px auto;
}

section h2 {
  margin-left: 200px;
  font-size: 4em;
  font-weight: 700;
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
  border-radius: 10px;
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

.title-box{
  background: linear-gradient(200deg,transparent,rgba(100,150,255,.05));;
  padding: 96px 32px 50px 32px;

  position: relative;
  justify-content: center;
  align-items: center;
}

.title-box .title-tag{
  font-size: 64px;
  letter-spacing: -.5px;
  font-weight: 900;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-box p.description{
  max-width: 960px;
  font-size: 18px;
  text-align: center;
  margin: 24px auto 48px;
}

.title-box .btn{
  align-items: center;
  text-align: center;
}

.title-box .btn a {
  font-size: 16px;
  display: inline-block;
  background: #42b983;
  text-decoration: none;
  color: #000;
}

.title-box .btn a{
  width: 100px;
  height: 50px;
  text-align: center; /*字体水平居中*/
  font-size: 14px; /*字体大小*/
  font-weight: bold;
  line-height: 50px; /*行高*/
  color: #fff;
  text-decoration: none; /*字体增加装饰：去除下划线*/
  background: linear-gradient(
      90deg,#42d392 25%,#647eff); /*渐变背景*/
  border-radius: 10px; /*边框圆角*/
  background-size: 400%; /*背景大小*/
  z-index: 1; /*层叠定位*/
}

.title-box .btn a:hover{
  animation: animate 8s linear infinite alternate; /*动画: 名称 时间 线性 循环 播放完回退播放*/
}
@keyframes animate{
  0%{
    background-position: 0%; /*修改背景定位，实现渐变色炫光*/
  }
  50%{
    background-position: 100%;
  }
  100%{
    background-position: 0%;
  }
}

.title-box .btn a::before{ /*之前添加*/
  content: ''; /*内容*/
  position: absolute; /*绝对定位*/
  z-index: -1;
  background: linear-gradient(
      90deg,#42d392 25%,#647eff);
  border-radius: 40px;
  background-size: 400%;
  filter: blur(20px); /*过渡：模糊*/
  opacity: 0; /*透明度*/
  transition: 1s; /*过渡时间*/
}

.header .main .nav-links .login-btn a:hover::before{
  filter: blur(20px);
  opacity: 1;
  animation: animate 8s linear infinite; /*注意动画名称统一*/
}
</style>
