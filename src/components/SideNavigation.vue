<template>
  <div class="sidebar">
    <div class="logo-details" @click="toHome">
        <i class='bx bxs-book-reader'></i>
        <span class="logo-name">墨&nbsp书</span>
    </div>
    <ul class="nav-links" v-if="this.checkRoute() === 1">
      <li :class="{'active': isSelectSide === 1}">
        <router-link to="/projectList">
          <i class='bx bxs-pie-chart-alt-2' :class="{'active': isSelectSide === 1}"></i>
          <span class="link-name" :class="{'active': isSelectSide === 1}">项目列表</span>
        </router-link>
      </li>
      <li :class="{'active': isSelectSide === 2}">
        <router-link to="/docCenter">
          <i class='bx bx-book-open' :class="{'active': isSelectSide === 2}"></i>
          <span class="link-name" :class="{'active': isSelectSide === 2}">文档中心</span>
        </router-link>
      </li>
      <li :class="{'active': isSelectSide === 3}">
        <router-link to="/adminTeam">
          <i class='bx bxs-group':class="{'active': isSelectSide === 3}" ></i>
          <span class="link-name" :class="{'active': isSelectSide === 3}">团队管理</span>
        </router-link>
      </li>
      <li class="return">
        <router-link to="/teamList">
          <i class='bx bx-undo'></i>
          <span class="link-name">返回上级</span>
        </router-link>
      </li>
    </ul>
    <ul class="nav-links" v-if="this.checkRoute() === 2">
      <li :class="{'active': isSelectSide === 1}">
        <router-link to="/designList">
          <i class='bx bx-shape-triangle' :class="{'active': isSelectSide === 1}"></i>
          <span class="link-name" :class="{'active': isSelectSide === 1}">原型设计</span>
        </router-link>
      </li>
      <li :class="{'active': isSelectSide === 2}">
        <router-link to="/docList">
          <i class='bx bxs-edit' :class="{'active': isSelectSide === 2}"></i>
          <span class="link-name" :class="{'active': isSelectSide === 2}">文档编辑</span>
        </router-link>
      </li>
      <li :class="{'active': isSelectSide === 3}">
        <router-link to="/UmlView">
          <i class='bx bxs-collection':class="{'active': isSelectSide === 3}" ></i>
          <span class="link-name" :class="{'active': isSelectSide === 3}">UML绘制</span>
        </router-link>
      </li>
      <li class="return">
        <router-link to="/projectList">
          <i class='bx bx-undo'></i>
          <span class="link-name">返回上级</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "AsideNavigation",
  data() {
    return {
      username:"DEFAULT",
      theAvatarUrl:"http://43.138.26.134/api/",
      isSelectSide: 1,
    }
  },
  methods:{
    toHome(){
      this.$router.push('/')
    },
    toExit:function (){
      this.$store.state.isLogin = false;
      this.$router.push('/');
    },
    getAvatar(uid) {
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
        user = res.data[0];
        this.$store.state.userInfo.username = user.username;
        this.$store.state.userInfo.name = user.name;
        this.$store.state.userInfo.email = user.email;
        this.$store.state.userInfo.profile = user.profile;
        this.theAvatarUrl = this.$store.state.base+user.avatar;
        if(user.avatar!=='111')
        {
          // tempthis.avatarArray=user.avatar.split('/')
          // this.$store.state.userInfo.avatar = tempthis.avatarArray[2];
          tempthis.theAvatarUrl = this.$store.state.base+user.avatar;
        }
        else{
          tempthis.theAvatarUrl = '111'
        }
      }).catch(err => {
        console.log(err)
      })
    },

    checkSelect(index){
      if(index === 1){
        if(this.$route.path === "/projectList") {
          this.isSelectSide = 1;
        }
        else if(this.$route.path === "/docCenter") {
          this.isSelectSide = 2;
        }
        else if(this.$route.path === "/adminTeam") {
          this.isSelectSide = 3;
        }
      }
      else if(index===2){
        if(this.$route.path === '/designList'){
          this.isSelectSide = 1;
        }
        else if(this.$route.path === '/docList'){
          this.isSelectSide = 2;
        }
      }
    },
    checkRoute(){
      if(this.$route.path === '/projectList' || this.$route.path === "/docCenter" || this.$route.path === "/adminTeam"){
        return 1;
      }
      else if(this.$route.path === '/designList' || this.$route.path === '/docList'){
        return 2;
      }
    }
  },
  created() {
    this.getAvatar(this.$store.state.userInfo.uid)
    this.checkSelect(this.checkRoute());
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
}


.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 230px;
  background: #292c2f;
  /*box-shadow: 3px 3px 3px #111;*/
}

.sidebar .logo-details{
  margin-top: 20px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.sidebar .logo-details i{
  font-size: 50px;
  color: #fff;
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
}

.sidebar .logo-details .logo-name{
  margin-left: 10px;
  font-size: 30px;
  color: #fff;
  font-weight: 600;
}

.sidebar .nav-links{
  height: 100%;
  padding-top: 30px;
}

.sidebar .nav-links li{
  opacity: 0.6;
  position: relative;
  list-style: none;
  transition: all 0.4s ease;
}

.sidebar .nav-links li.active{
  opacity: 1;
  background: #666666;
}


.sidebar .nav-links li:hover{
  background: #444444;
}

.sidebar .nav-links li i{
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
}

.sidebar .nav-links li i.active{
  font-size: 24px;

}

.sidebar .nav-links li a{
  display: flex;
  text-decoration: none;
  align-items: center;
}

.sidebar .nav-links li a span{
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.sidebar .nav-links li a span.active{
  font-weight: 800;
}

.sidebar .nav-links li .profile-details{
  opacity: 1;
}

.sidebar .profile-details{
  width: 230px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333333;
}

.sidebar .profile-details .profile-content{
  display: flex;
  align-items: center;
}

.sidebar .profile-details img{
  height: 52px;
  width: 52px;
  object-fit: cover;
  border-radius: 16px;
  margin: 0 14px 0 12px;
  background: #333333;
  padding: 10px;
}

.profile-name {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}

.sidebar .profile-details .exit-btn {
  cursor: pointer;
}

.sidebar .profile-details .exit-btn:hover{
  color: #FF5733;
  font-size: 24px;
  transition: all 0.4s ease;
}
</style>
