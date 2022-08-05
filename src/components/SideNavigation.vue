<template>
  <div class="sidebar">
    <div class="logo-details" @click="toHome">
        <i class='bx bxs-book-reader'></i>
        <span class="logo-name">墨&nbsp书</span>
    </div>
    <ul class="nav-links">
      <li>
        <router-link to="/projectList">
          <i class='bx bxs-pie-chart-alt-2'></i>
          <span class="link-name">项目</span>
        </router-link>
      </li>
      <li>
        <div class="profile-details">
          <div class="profile-content">
            <img src="../assets/images/register.png" alt="加载失败" v-if="theAvatarUrl==='111'">
            <img :src=" require('../../static/avatars/'+theAvatarUrl)" alt="加载失败" v-else>
          </div>
          <div class="profile-name">
            {{this.$store.state.userInfo.username}}
          </div>
          <i class='bx bx-log-out-circle' style="cursor: pointer" @click="toExit"></i>
        </div>
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
      theAvatarUrl:'111'
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
        console.log(res.data[0]);
        user = res.data[0];
        // this.$store.state.userInfo.username = user.username;
        // this.$store.state.userInfo.name = user.name;
        // this.$store.state.userInfo.email = user.email;
        // this.$store.state.userInfo.profile = user.profile;
        if(user.avatar!=='111')
        {
          tempthis.avatarArray=user.avatar.split('/')
          this.$store.state.userInfo.avatar = tempthis.avatarArray[2];
          tempthis.theAvatarUrl = this.$store.state.userInfo.avatar;
        }
        else{
          tempthis.theAvatarUrl = '111'
        }
        console.log(user);
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created() {
    this.getAvatar(this.$store.state.userInfo.uid)
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
  box-shadow: 3px 3px 3px #111;
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
  position: relative;
  list-style: none;
  transition: all 0.4s ease;
}

.sidebar .nav-links li:hover{
  background: #333333;
}

.sidebar .nav-links li i{
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
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


</style>
