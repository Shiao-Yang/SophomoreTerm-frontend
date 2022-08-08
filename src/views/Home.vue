<template>
  <div>
    <Header/>
  <h1>墨书，让小组合作更简单</h1>
  <div class="container">
    <div class="panel active" style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
      <h3>功能介绍1</h3>
    </div>
    <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
      <h3>功能介绍2</h3>
    </div>
    <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80')">
      <h3>功能介绍3</h3>
    </div>
    <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')">
      <h3>功能介绍4</h3>
    </div>
    <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
      <h3>功能介绍5</h3>
    </div>
  </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Home",
  components: {Header},
  data(){
    return{
      panels:null
    }
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
* {
  box-sizing: border-box;


}
h1 {
  text-align: center;
}
body {
  /*font-family: 'Muli', sans-serif;*/
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  display: flex;
  width: 98vw;
  margin-top: 3vh;
}

.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  -webkit-transition: all 700ms ease-in;
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
  background: transparent;
}

.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}

@media (max-width: 480px) {
  .container {
    width: 100vw;
  }

  .panel:nth-of-type(4),
  .panel:nth-of-type(5) {
    display: none;
  }
}
</style>
