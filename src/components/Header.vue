<template>
  <div>
    <div class="header">
      <div class="logo-box" @click="toVisitHome">
        <i class='bx bxs-book-reader'></i>
        <span class="logo-name">墨书</span>
      </div>
      <div class="main">
        <ul class="nav-links">
          <li class="nav-item login-btn" v-if="this.$store.state.isLogin === false">
            <router-link to="/login&register">
              <span>登录/注册</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{'selected':isSelected}" v-if="this.$store.state.isLogin === true">
            <div class="user-box">
              <div class="user-avatar-box">
                <img class="user-avatar" id="user-avatar" :title="this.$store.state.userInfo.username" :class="{'selected': isSelected}" :src="avatarUrl" @click="toVisitSelf">
                <i class='bx bxs-circle' style="position:absolute;top:2px; right: 3px;font-size:12px;color: #FF5733" v-if="this.messageList.length === 0"></i>
              </div>
            </div>
            <ul class="sub-menu">
              <span class="user-name">{{this.$store.state.userInfo.username}}</span>
              <li class="sub-item" @click="toVisitSelf">
                <i class='bx bx-user'></i>
                <span>个人信息</span>
                <i class='bx bx-chevron-right right'></i>
              </li>
              <li class="sub-item" @click="toVisitAccountSettings">
                <i class='bx bxs-user-account'></i>
                <span>账号设置</span>
                <i class='bx bx-chevron-right right'></i>
              </li>
              <li class="sub-item" @click="toVisitInvitation">
                <i class='bx bx-message-rounded'></i>
                <span>消息中心</span>
                <i class='bx bxs-circle' style="font-size:12px;color: #FF5733; transition: all 0.4s ease;" v-if="this.messageList.length !== 0"></i>
                <i class='bx bx-chevron-right right'></i>
              </li>
              <li class="sub-item" @click="toVisitTeamList">
                <i class='bx bx-group'></i>
                <span>我的团队</span>
                <i class='bx bx-chevron-right right'></i>
              </li>
              <li class="bottom-bor">
              </li>
              <li class="sub-item log-out" @click="toExit">
                <i class='bx bx-log-out-circle'></i>
                <span>退出登录</span>
                <i class='bx bx-chevron-right right'></i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Header",
  data(){
    return {
      isSelected: false,
      avatarUrl:this.$store.state.base+this.$store.state.userInfo.avatar,
      messageList: [],
    }
  },
  created() {
    if(this.$store.state.isLogin === false && this.$route.path !== '/login&register' && this.$route.path !== '/'){
      this.$router.push('/');
      this.$message.error("还没登录哦！")
    }
    this.getInfo(sessionStorage.getItem('uid'));
    this.toGetMessageList();
  },
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
      this.$router.push({
        name:'UserView',
        params:{select: 1},
      });
    },
    toVisitAccountSettings:function (){
      this.$router.push({
        name:'UserView',
        params:{select: 2},
      });
    },
    toVisitInvitation:function (){
      this.$router.push({
        name:'UserView',
        params:{select: 3},
      });
    },
    toVisitTeamList:function (){
      this.$router.push('/teamList');
    },
    toExit:function (){
      this.$store.state.isLogin = false;
      this.$router.push('/');
    },
    getInfo(uid) {
      const tempthis = this;
      let user;
      let params = {
        uid: uid,
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"space/get_info/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res.data[0]);
        user = res.data[0];
        this.$store.state.userInfo.username = user.username;
        this.$store.state.userInfo.name = user.name;
        this.$store.state.userInfo.email = user.email;
        this.$store.state.userInfo.profile = user.profile;
        this.$store.state.userInfo.avatar = user.avatar;
        this.avatarUrl=tempthis.$store.state.base+user.avatar
      }).catch(err => {
        console.log(err)
      })
    },
    toGetMessageList:function (){
      const tempthis =this;
      let params ={
        uid:this.$store.state.userInfo.uid
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/get_invitation/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res)
        tempthis.dataLoadingCompleted=false
        tempthis.messageList=res.data
        console.log(tempthis.messageList)
        tempthis.dataLoadingCompleted=true
      }).catch(err => {
        console.log(err)
      })
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
  background-color:#ffffff;
  color: #c4cbcf;
}

img {
  max-width: 700%;
  max-height: 700%;
}

.header .logo-box{
  margin-left: 100px;
  display: flex;
  align-items: center;
  color: #47484c;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}

.header .logo-box i{
  font-size: 30px;
  min-width: 48px;
  color: black;
  text-align: center;
}

.header .logo-box .logo-name{
  font-size: 28px;
  font-weight: 700;
  font-family: 华文新魏;
}

.header .main{
  margin-right: 50px;
  display: flex;
  height: 50px;
  align-items: center;
  line-height: 50px;
}

.header .main .nav-links{
  list-style: none;
}

.header .main .nav-links .nav-item{
  align-items: center;
}

.header .main .nav-links .login-btn a{
  width: 80px;
  height: 40px;
  text-align: center; /*字体水平居中*/
  font-size: 14px; /*字体大小*/
  font-weight: bold;
  line-height: 40px; /*行高*/
  color: #fff;
  margin-top: 10px;
  text-decoration: none; /*字体增加装饰：去除下划线*/
  background: linear-gradient(
      20deg,#03a9f4,  #f441a5,#03a9f4, #f441a5); /*渐变背景*/
  border-radius: 10px; /*边框圆角*/
  background-size: 400%; /*背景大小*/
  z-index: 1; /*层叠定位*/
}

.header .main .nav-links .login-btn a:hover{
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

.header .main .nav-links .login-btn a::before{ /*之前添加*/
  content: ''; /*内容*/
  position: absolute; /*绝对定位*/
  z-index: -1;
  background: linear-gradient(
      20deg,#03a9f4, #f441a5,#03a9f4, #f441a5);
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

.header .main .nav-links .nav-item{
  display: flex;
  position: relative;
  height: 100%;
  line-height: 50px;
  background-color: transparent;
  margin-right: 20px;
  text-align: center;
}

.header .main .nav-links .nav-item .user-box{
  height: 40px;
  width: 40px;
  border-radius: 10%;
  background-color: #ffffff;
}

.user-avatar-box:hover i{
  opacity: 0;
  margin-top: 20px;
  margin-right: 20px;

  z-index: 1000000;
}

.header .main .nav-links .nav-item .user-box .user-avatar{
  height: 40px;
  width: 40px;
  border: #eeeeee 2px solid;
  border-radius: 10%;
  cursor: pointer;
  transition: all 0.5s ease;
}

.header .main .nav-links .nav-item:hover .user-box .user-avatar{
  position: relative;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: -80px;
  z-index: 100;
  border: #cdd1d3 1px solid;
  background-color: #cdd1d3;
  width: 80px ;
  height: 80px ;
}

.header .main .nav-links .nav-item:hover .sub-menu{
  opacity: 1;
  pointer-events: auto;
}

.header .main .nav-links .nav-item .sub-menu{
  position: absolute;
  left: -120px;
  top:100%;
  width: 200px;
  color: black;
  background-color: #fff;
  border-radius: 10px;
  z-index: 99;
  padding: 40px 10px 10px 10px;
  border: #eeeeee 2px solid;
  box-shadow: #eeeeee 3px 3px 3px;
  transition: all 0.8s ease;
  /*transition-delay: 0.2s;*/
  opacity: 0;
  pointer-events: none;
}

.header .main .nav-links .nav-item .sub-menu .user-name{
  color: #03a9f4;
  font-size: 20px;
  font-weight: 700;
}


.header .main .nav-links .nav-item .sub-menu li{
  display: flex;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  cursor: pointer;
  margin-top: 5px;
}

.header .main .nav-links .nav-item .sub-menu li:hover{
  border-radius: 10px;
  background-color: #e4e4e4;
}

.header .main .nav-links .nav-item .sub-menu .sub-item .right{
  margin-left: auto;
}

.header .main .nav-links .nav-item .sub-menu li i{
  font-size: 20px;
  height: 30px;
  min-width: 30px;
  line-height: 30px;
  text-align: center;
}

.header .main .nav-links .nav-item .sub-menu .bottom-bor{
  height: 0;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0;
  border-bottom: #dddddd 1px solid;
  pointer-events: none;
}

.header .main .nav-links .nav-item .sub-menu .log-out:hover{
  border-radius: 10px;
  background-color: #ed5a65;
  color: #fff;
}

</style>
