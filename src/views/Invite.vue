<template>
  <div>
    <div>
      <div id="top">
        <div id="search">
          <input type="text" autocomplete="off" name="username" id="input" v-model="input" placeholder="请输入昵称、姓名或邮箱" @keyup.enter="search"></input>
          <img src="../assets/search.png" id="searchBtn" @click="search">
        </div>
        <router-link to="/adminTeam">
          <img src="../assets/return.png" id="return" title="返回上一级">
        </router-link>
      </div>
      <div id="contentBgd">
        <div id="contentBox">
          <div class="result" v-for="(item,index) in members">
            <img :src=$store.state.base+item.avatar class="avatar">
            <span class="info">ID：{{item.id}}</span>
            <span class="info">昵称：{{item.username}}</span>
            <span class="info">姓名：{{item.name}}</span>
            <span class="info">邮箱：{{item.email}}</span>
            <i class='bx bx-paper-plane' id="add" title="发送邀请" @click="invite(item.id)"></i>
<!--            <img src="../assets/add.png" id="add" title="发送邀请" @click="invite(item.id)">-->
          </div>
        </div>
      </div>
    </div>
    <div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: "Invite",
  created() {
    window.myData = this;
    if (!this.$store.state.isLogin) {
      this.$router.push('/')
    }
    //if (!this.$store.state.isLogin) {
    //  this.$store.state.warning = true
    //
    //}
  },
  data() {
    return {
      input: '',
      flag: true,
      members: [],
    }
  },
  methods: {
    search() {
      let params = {
        gid: this.$store.state.gid,
        keyword: this.input
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+'group_manage/search_users/',
        data: qs.stringify(params)
      })
          .then(res => {
            console.log(res.data)
            switch (res.data.errno) {
              case 4:
                this.$message.warning(res.data.msg)
                break
              case 5:
                this.$message.warning(res.data.msg)
                  this.members=[]
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              default:
                this.members = res.data
            }
          })
    },
    invite(uid) {
      let params = {
        invitee: uid,
        inviter: this.$store.state.userInfo.uid,
        gid: this.$store.state.gid
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/invite/",
        data: qs.stringify(params)
      })
          .then(res => {
            switch (res.data.errno) {
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              case 1004:
                this.$message.warning(res.data.msg)
                break
              case 1005:
                this.$message.warning(res.data.msg)
                break
              case 0:
                this.$message.success(res.data.msg)
                break
            }
          })
    }
  }
}
</script>

<style scoped>
  #top {
    display: flex;
    position: fixed;
    width: 100%;
    height: 20%;
    background-image: url("../assets/header.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  }
  #search {
    width: 1000px;
    height: 40px;
  }
  #input {
    display: inline;
    position: absolute;
    width: 35%;
    height: 25%;
    border-radius: 8px;
    font-size: 18px;
    border: 1px solid rgb(240,240,240);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    outline: none;
    padding: 20px 20px;
    left: 32%;
    top: 37%;
  }
  #input:focus{
    transition:border linear .2s,box-shadow linear .5s;
    -moz-transition:border linear .2s,-moz-box-shadow linear .5s;
    -webkit-transition:border linear .2s,-webkit-box-shadow linear .5s;
    outline:none;border-color:rgba(93,149,242,.75);
    box-shadow:0 0 8px rgba(93,149,242,.105);
    -moz-box-shadow:0 0 8px rgba(93,149,242,.5);
    -webkit-box-shadow:0 0 8px rgba(93,149,242,3);
  }
  #searchBtn {
    position: absolute;
    height: 27%;
    width: 3%;
    cursor: pointer;
    background-color: white;
    top: 35%;
    left: 70%;
    border: 1px solid rgb(240,240,240);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 45px;
    transition: 0.2s linear;
  }
  #searchBtn:hover {
    transform: scale(1.3);
  }
  #return {
    position: absolute;
    height: 40px;
    width: 60px;
    left: 10px;
    top: 10px;
    cursor: pointer;
    transition: 0.1s linear;
  }
  #return:hover{
    transform: scale(1.2);
  }
  #contentBgd {
    width: 100%;
    /*background-image: url("../assets/contentBgd.jpg");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
    background: linear-gradient(90deg,#42d392 25%,#647eff);;
    position: absolute;
    top: 20%;
    height: 80%;
  }
  #contentBox {
    position: absolute;
    width: 55%;
    height: 85%;
    background: white;
    top: 5%;
    left: 24%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    overflow-y: auto;
  }
  .result {
    display: flex;
    height: 15%;
    width: 85%;
    position: relative;
    background: linear-gradient(90deg,transparent,rgba(68,138,255,.05));
    margin: 40px auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .avatar {
    position: relative;
    height: 100%;
    width: 13%;
    clear: both;
    border-radius: 80px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
  }
  .info {
    display: inline-block;
    width: 15%;
    margin: auto 10px;
  }
  #add {
    position: absolute;
    display: inline-block;
    font-size: 30px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    top: 35%;
    right: 5%;
    clear: both;
    line-height: 30px;
    border-radius: 40px;
    transition: 0.2s linear;
    color: #42b983;
    align-items: center;
  }
  #add:hover {
    transform: scale(1.1);
    color: #52e392;
  }
  #no {
    position: absolute;
    display: inline-block;
    cursor: not-allowed;
    height: 40px;
    width: 40px;
    right: 100px;
    clear: both;
    border-radius: 40px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s linear;
  }

  .waves {
    position:absolute;
    bottom: 10px;
    width: 100%;
    height:15vh;
    margin-bottom:-7px; /*Fix for safari gap*/
    min-height:100px;
    max-height:150px;
  }

  .content {
    position:relative;
    height:20vh;
    text-align:center;
    background-color: white;
  }

  /* Animation */

  .parallax > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px,0,0);
    }
    100% {
      transform: translate3d(85px,0,0);
    }
  }
  /*Shrinking for mobile*/
  @media (max-width: 768px) {
    .waves {
      height:40px;
      min-height:40px;
    }
    .content {
      height:30vh;
    }
    h1 {
      font-size:24px;
    }
  }
</style>
