<template>
  <div>
    <div id="top">
      <div id="search">
        <input type="text" autocomplete="off" name="username" id="input" v-model="input" placeholder="请输入要邀请成员的姓名" @keyup.enter="search"></input>
        <img src="../assets/search.png" id="searchBtn" @click="search">
      </div>
      <router-link to="/adminTeam">
        <img src="../assets/return.png" id="return">
      </router-link>
    </div>
    <div id="contentBgd">
      <div id="contentBox">
        <div class="result" v-for="(item,index) in members" v-if="item.visible">
          <img src="../assets/logo.png" class="avatar">
          <span class="info">ID：{{item.id}}</span>
          <span class="info">昵称：{{item.username}}</span>
          <span class="info">姓名：{{item.name}}</span>
          <span class="info">邮箱：{{item.email}}</span>
          <img src="../assets/add.png" id="add" @click="invite(item.id,index)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: "Invite",
  created() {
    window.myData = this;
    this.get_user();
    //if (!this.$store.state.isLogin) {
    //  this.$store.state.warning = true
    //  this.$router.push('/')
    //}
  },
  data() {
    return {
      input: '',
      members: [],
    }
  },
  methods: {
    get_user() {
      this.axios({
        method: 'get',
        url: this.$store.state.base+"team_manage/get_user/",
      })
          .then(res => {
            console.log(res)
            for (let i = 0; i < res.data.length; i++) {
              let tmp = {
                id: res.data[i].id,
                username: res.data[i].username,
                name: res.data[i].name,
                email: res.data[i].email,
                group: res.data[i].team,
                avatar: res.data[i].avatar,
                visible: true,
              }
              if (!this.exit(tmp.group)) {
                this.members.push(tmp)
              }
            }
          })
    },
    invite(uid,index) {
      let params = {
        uid: uid,
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
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              case 1005:
                this.$message.warning(res.data.msg)
                break
              case 0:
                this.$message.success(res.data.msg)
                  this.members.splice(index,1)
                break
            }
          })
    },
    search() {
      if (this.input!=='') {
        let i,j,len=this.members.length;
        for (i = 0; i < len; i++) {
          if (this.input===this.members[i].username) {
            this.members[i].visible = true;
          } else {
            this.members[i].visible = false;
          }
        }
      } else {
        let i,len=this.members.length;
        for (i = 0; i < len; i++) {
          this.members[i].visible = true;
        }
      }
    },
    exit(group) {
      let len = group.length,i;
      for (i = 0; i < len; i++) {
        if (this.$store.state.gid===group[i]){
          return true
        }
      }
      return false
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
    background-image: url("../assets/contentBgd.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
    width: 75%;
    background: rgb(240,240,240);
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
    width: 10%;
    margin: auto 10px;
  }
  #add {
    position: absolute;
    display: inline-block;
    cursor: pointer;
    height: 40px;
    width: 40px;
    right: 13%;
    clear: both;
    border-radius: 40px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s linear;
  }
  #add:hover {
    transform: scale(1.1);
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
</style>