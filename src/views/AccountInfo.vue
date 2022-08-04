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
        <div class="down1">
          <router-link to="/accountInfo">账号信息</router-link>
        </div>
<!--        <div class="down">-->
<!--          <router-link to="/teamList">团队列表</router-link>-->
<!--        </div>-->

      </div>

      <div class="form-box-right">
        <div class="title">
          <p>账号信息</p>
        </div>

        <div class="form-group">
          <div class="field">
            <p>旧密码</p>
          </div>
          <div class="content">
            <div class="inputPlace">
              <input type="password" id="pw">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="field">
            <p>新密码</p>
          </div>
          <div class="content">
            <div class="inputPlace">
              <input type="password" id="pw1">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="field">
            <p>确认密码</p>
          </div>
          <div class="content">
            <div class="inputPlace">
              <input type="password" id="pw2">
            </div>
          </div>
        </div>

        <button @click="changePassword" id="changPassword">确认更改</button>

      </div>

    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "UserInfo",
  data() {
    return {
      tabPosition: 'left'
    }
  },

  created() {
    console.log(sessionStorage.getItem('uid'));
    this.getInfo(sessionStorage.getItem('uid'));
  },

  methods: {
    changePassword() {
      let params = {
        uid: sessionStorage.getItem('uid'),
        password: document.getElementById('pw').value,
        password_1: document.getElementById('pw1').value,
        password_2: document.getElementById('pw2').value,
      }
      console.log(params);

      if(params.password === '' && params.password_1 === '' && params.password_2 === '') {
        return;
      }
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/space/update_password/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res.data)
        if(res.data.errno === 0) {

          this.$store.state.userInfo.password = params.password;

          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true,
          })
          let pw = document.getElementById('pw');
          let pw1 = document.getElementById('pw1');
          let pw2 = document.getElementById('pw2');
          pw.value = '';
          pw1.value = '';
          pw2.value = '';

        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            showClose: true,
          })
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
  }
}
</script>

<style scoped>
.main {
  /* 100%窗口高度 */
  height: 675px;
  width: 100%;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(200deg,#f3e7e9,#e3eeff);
  top: 50px;
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
  background-color: #f0f5f5;
  width: 650px;
  height: 430px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  left: 370px;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.title {
  height: 40px;
}

.title p {
  font-size: 30px;
  font-weight: bold;
}
.form-group {
  position: relative;
  background-color: #f0f5f5;
  width: 650px;
  height: 80px;
  /*border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);

   */
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
  width: 120px;
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
