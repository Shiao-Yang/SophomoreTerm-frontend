<template>
  <div>
    <div class="header">
      <div class="box">
        <h1 class="moshuLogo">
  <!--          <img src="../assets/logo.png">-->
<!--          <button @click="toVisitHome">Mobook</button>-->
            <span @click="toVisitHome">Mobook</span>
        </h1>
<!--        <nav>-->
<!--          <router-link active-class="active" to="/home">首页</router-link>-->
<!--          <router-link active-class="active" to="/ask">问答</router-link>-->
<!--          <router-link active-class="active" to="/community">社区</router-link>-->
<!--        </nav>-->
      </div>
      <div class="box">
<!--        <el-avatar src="../assets/images/login.png"  v-if="$store.state.isLogin==='1'&&$store.state.userInfo.avatar===111">-->
<!--          </el-avatar>-->
<!--        <el-avatar :src=" require('../../../moshu-backend/static/avatars/'+$store.state.userInfo.avatar)"  v-else-if="$store.state.isLogin==='1'&&$store.state.userInfo.avatar!==111">-->
<!--        </el-avatar>-->
<!--        <el-avatar icon="el-icon-user-solid" v-else></el-avatar>-->

        <nav>
          <a v-if="$store.state.isLogin===true" @click="toVisitSelf">个人信息</a>
          <a v-else @click="toLogin">登录</a>
          <a v-if="$store.state.isLogin===true" @click="toVisitTeamList">团队列表</a>
          <a v-else @click="toRegister">注册</a>
          <a v-if="$store.state.isLogin===true" @click="toExit">退出登录</a>
          <router-link to="/prototype">试用</router-link>
        </nav>
      </div>
    </div>
<!--    <div class="contents">-->
<!--      <div class="content">-->
<!--        &lt;!&ndash;指定组件的位置&ndash;&gt;-->
<!--        <router-view></router-view>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    toVisitHome:function (){
      this.$router.push('/');
    },
    toLogin:function (){
      this.$router.push('/login&register');
    },
    toRegister:function (){
      this.$router.push('/login&register');
    },
    toVisitSelf:function (){
      this.$router.push('/userInfo');
    },
    toVisitTeamList:function (){
      this.$router.push('/teamList');
    },
    toExit:function (){
      this.$store.state.isLogin = false;
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color:#292c2f;
  color: #ffffff;

  /*吸顶效果*/
  /* position: sticky;
   position: -webkit-sticky;    !*兼容 -webkit 内核的浏览器*!
   top: 0px;                    !*必须设一个值，否则不生效*!*/

}
.box{
  display: flex;
  align-items: center;
}
h1{
  display: flex;
  align-items: center;
  font: normal 28px Cookie, Arial, Helvetica, sans-serif;
  padding: 0px 20px;
}
img{
  width: 40px;
  height: 40px;
}

nav {
  display: flex;
  align-items: center;
  margin: 0px 40px;
  font:16px Arial, Helvetica, sans-serif;
}
nav a{
  padding: 0 15px;
  width: 32px;
  text-decoration:none;
  color: #ffffff;
  font-size: 16px;
  font-weight: normal;
  opacity: 0.9;
}

nav a:hover {
  opacity: 1;
}

.moshuLogo:hover{
  cursor:pointer
}
a:hover{
  cursor:pointer
}
</style>
