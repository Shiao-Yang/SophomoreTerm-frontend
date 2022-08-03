<template>
  <div>
    <div id="top">
      <div id="search">
        <input type="text" autocomplete="off" name="username" id="input" v-model="input" placeholder="请输入姓名" @keyup.enter="search"></input>
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
          <img src="../assets/add.png" id="add" v-if="exit(item.group)">
          <img v-if="!exit(item.group)" src="../assets/no.png" id="no">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invite",
  created() {
    window.myData = this;
  },
  data() {
    return {
      input: '',
      members: [{
        id: 1,
        username: '哈哈哈',
        name: '王',
        email: '777777777@qq.com',
        role: 2,
        group: [1],
        visible: true,
      }, {
        id: 2,
        username: '嘿嘿嘿',
        name: '小黑',
        email: '888888888@qq.com',
        role: 1,
        group: [1],
        visible: true,
      }, {
        id: 3,
        username: '好好好',
        name: '小蓝',
        email: '666666666@qq.com',
        role: 0,
        group: [1],
        visible: true,
      }, {
        id: 4,
        username: '好好好',
        name: '小hong',
        email: '666666666@qq.com',
        role: 0,
        group: [1],
        visible: true,
      }, {
        id: 5,
        username: '好好好',
        name: '小aa',
        email: '666666666@qq.com',
        role: 0,
        group: [1],
        visible: true,
      }, {
        id: 6,
        username: '好好好',
        name: '小b',
        email: '666666666@qq.com',
        role: 0,
        group: [2],
        visible: true,
      }, {
        id: 7,
        username: '好好好',
        name: '小c',
        email: '666666666@qq.com',
        role: 0,
        group: [1],
        visible: true,
      }, {
        id: 8,
        username: '好好好aaaaaaaaa',
        name: '小d',
        email: '666666666@qq.com',
        role: 0,
        group: [2],
        visible: true,
      }, {
        id: 9,
        username: '好好好',
        name: '小e',
        email: '666666666@qq.com',
        role: 0,
        group: [1],
        visible: true,
      }],
    }
  },
  methods: {
    search() {
      if (this.input!=='') {
        let i,j,len=this.members.length;
        for (i = 0; i < len; i++) {
          if (this.input===this.members[i].name) {
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
      for (i=0;i<len;i++) {
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
  }
  #input {
    display: inline;
    width: 500px;
    height: 40px;
    border-radius: 8px;
    font-size: 18px;
    border: 1px solid rgb(240,240,240);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    outline: none;
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
    height: 45px;
    width: 45px;
    cursor: pointer;
    background-color: white;
    top: 55px;
    left: 1020px;
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
    width: 800px;
    height: 540px;
    background: white;
    top: 50px;
    left: 24%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    overflow-y: auto;
  }
  .result {
    display: flex;
    height: 80px;
    width: 600px;
    background: rgb(240,240,240);
    margin: 40px auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .avatar {
    position: relative;
    height: 80px;
    width: 80px;
    clear: both;
    border-radius: 80px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
  }
  .info {
    display: inline-block;
    width: 50px;
    margin: auto 10px;
  }
  #add {
    position: absolute;
    display: inline-block;
    cursor: pointer;
    height: 40px;
    width: 40px;
    right: 100px;
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