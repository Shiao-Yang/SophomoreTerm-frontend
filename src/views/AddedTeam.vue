<template>
  <div class="main">
    <div class="container">
      <div class="form-box-left">
        <div class="top">
          <img src="../assets/images/register.png" alt="加载失败">
          <p> {{this.$store.state.userInfo.username}} </p>
        </div>
        <div class="down">
          <router-link to="/userInfo">个人资料</router-link>
        </div>
        <div class="down">
          <router-link to="/accountInfo">账号信息</router-link>
        </div>
        <div class="down1">
          <router-link to="/addedTeam">已加入团队</router-link>
        </div>

      </div>

      <div class="form-box-right">
        <div class="title">
          <p>已加入团队</p>
        </div>
        <div v-for="(item,i) in TeamData" class="form-group">
          <div class="field">
            <p>{{ item.name }}</p>
          </div>
        </div>



      </div>

    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "AddedTeam",
  data() {
    return {
      tabPosition: 'left',
      TeamData: [
        '大二下小学期',
        '大三下小学期',
      ],
    }
  },

  created() {
    console.log(sessionStorage.getItem('uid'));
    this.getInfo(sessionStorage.getItem('uid'));
    this.getTeam(sessionStorage.getItem('uid'));
  },

  methods: {
    getTeam(uid) {
      let user;
      let params = {
        uid: uid,
        username: this.$store.state.userInfo.username,
      }
      console.log(params)

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/space/get_group/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res.data);
        if(res.data.error === undefined) {
          this.TeamData = res.data;
        }
        else {
          this.$message ({
            message: res.data.msg,
            type: "error",
            showClose: true,
          });
        }

      }).catch(err => {
        console.log(err)
      })
    },
    getInfo(uid) {
      let user;
      let params = {
        uid: uid,
      }
      this.$axios({
        method: 'post',
        url: "http://localhost:8000/space/get_info/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res.data[0]);
        user = res.data[0];
        this.$store.state.userInfo.username = user.username;
        this.$store.state.userInfo.name = user.name;
        this.$store.state.userInfo.email = user.email;
        this.$store.state.userInfo.profile = user.profile;

        console.log(this.$store.state.userInfo.username);
      }).catch(err => {
        console.log(err)
      })
    },
  },

}
</script>

<style scoped>
.main {
  /* 100%窗口高度 */
  height: 100%;
  width: 100%;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(200deg,#f3e7e9,#e3eeff);
  top: 0px;
  left: 0px;
}

.container{
  /*background-color: #f0f5f5;

   */
  width: 1000px;
  height: 600px;
  border-radius: 5px ;
  display: flex;
  flex-direction: row;
  /* 阴影 */
  /*box-shadow: 5px 5px 5px rgba(0,0,0,0.1);

   */
  /* 相对定位 */
  position: relative;

}

.form-box-left {
  position: absolute;
  /*background-color: #79c5ef;*/
  width: 350px;
  height: 600px;
  border-radius: 5px;
  /*box-shadow: 2px 0 10px rgba(0,0,0,0.1);

   */
  display: flex;
  flex-direction: column;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.top {
  position: relative;
  background-color: #f0f5f5;
  width: 350px;
  height: 100px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.top img {
  width: 70px;
  height: 80px;
  opacity: 0.9;
  position: relative;
  left: 20px;
  top: 10px;
  border-radius:100%;
  overflow:hidden;
}

.top p{
  font-size: 16px;
  letter-spacing: 2px;
  color:  #64676e;
  text-align: center;
  margin-left: 40px;
  margin-top: 35px;
  font-weight: bold;
}

.down {
  position: relative;
  top: 30px;
  background-color: #f0f5f5;
  width: 350px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  z-index: 2;
  margin-top: 3px;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.down1 {
  position: relative;
  top: 30px;
  background-color: #f0f5f5;
  width: 350px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  z-index: 2;
  margin-top: 3px;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.down a{
  font-size: 16px;
  text-decoration: none;
  letter-spacing: 2px;
  color: #64676e;
  text-align: center;
  margin-top: 15px;
  margin-left: 20px;
  font-weight: bold;
}

.down1 a{
  font-size: 16px;
  text-decoration: none;
  letter-spacing: 2px;
  color: #2a2a2c;
  text-align: center;
  margin-top: 15px;
  margin-left: 20px;
  font-weight: bold;
}

.form-box-right {
  position: relative;
  /*
  background-color: #f0f5f5;

   */
  width: 650px;
  height: 100%;
  border-radius: 5px;
  /*
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);

   */
  left: 370px;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.title {
  background-color: #f0f5f5;
  height: 100px;
  position: relative;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  top: -30px
}

.title p {
  position: relative;
  top: 30px;
  font-size: 30px;
  font-weight: bold;
}
.form-group {
  position: relative;
  top: -30px;
  background-color: #f0f5f5;
  width: 650px;
  height: 80px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);

  z-index: 2;
  display: flex;
  flex-direction: row;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}
.field {
  position: relative;
  /*background-color: #f0f5f5;

   */
  width: 100%;
  height: 100px;
  /*border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);

   */
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}
.field p {
  position: relative;
  font-size: 16px;
  letter-spacing: 2px;
  color:  #64676e;
  text-align: center;
  top: 25px;
  margin-left: 10px;
  font-weight: bold;
}

.content {
  position: relative;

  /*background-color: #f0f5f5;

   */
  width: 550px;
  height: 100px;
  /*border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);

   */
  z-index: 2;
  justify-content: center;
  text-align: center;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.content img {
  width: 70px;
  height: 100px;
  opacity: 0.9;
  position: relative;
  left: -200px;
  border-radius:100%;
  overflow:hidden;
}

.inputPlace {
  position: relative;
  left: -20px;
  top: 20px;
}
input{
  width: 350px;
  color: #f0f5f5;
  /* 下边框样式 */
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}
input::placeholder{
  color: #2e2f31;
}
input:focus{
  color: #8e9aaf;
  outline: none;
  transition: 0.5s;
}
input:focus::placeholder{
  opacity: 0;
}

.form-box-right button{
  width: 300px;
  margin-top: 30px;
  background-color: #feffff;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #c1efd4;
  font-size: 20px;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.form-box-right button:hover{
  background-color: #7cf1ac;
  color: #feffff;
  transition: background-color 0.5s ease;
}

</style>
