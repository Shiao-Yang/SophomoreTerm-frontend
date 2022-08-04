<template>
  <div class="main">
    <div class="container">
      <div class="form-box">
        <div class="register-box hidden">
          <h1>register</h1>
          <input type="text" placeholder="用户名" id="un1">
          <input type="email" placeholder="邮箱" id="email">
          <input type="password" placeholder="密码" id="pw1">
          <input type="password" placeholder="确认密码" id="pw2">
          <button @click="toRegister()">确认注册</button>
        </div>
        <div class="login-box">
          <h1>login</h1>
          <input type="text" placeholder="用户名" id="un">
          <input type="password" placeholder="密码" id="pw">
          <button @click="toLogin()">登录</button>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎您<span>注册</span></h2>
        <img src="../assets/images/register.png" alt="加载失败">
        <p>已有账号</p>
        <button id="login">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎您<span>登陆</span></h2>
        <img src="../assets/images/login.png" alt="加载失败">
        <p>没有账号？</p>
        <button id="register">去注册</button>
      </div>
    </div>
  </div>

</template>


<script>
import axios from "axios";
import qs from "qs";
axios.defaults.withCredentials = true;

export default {
  name: 'LoginAndRegister',
  data() {
    return {}
  },
  components: {

  },
  mounted() {
    this.initPage()
  },
  methods: {

    toLogin: function () {
      let params;
      let tempthis = this;
      params = {
        username: document.getElementById('un').value,
        password: document.getElementById('pw').value
      };
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"login/login/",
        data: qs.stringify(params)
      })
      .then(res => {
        console.log(res.data)
        if(res.data.errno === 0) {

          this.$store.state.userInfo.uid = res.data.uid;
          //this.$store.state.userInfo.username = user.username;
          this.$store.state.isLogin = true;
          console.log(this.$store.state.userInfo.uid);
          this.$message({
            message: '登陆成功',
            type: 'success',
            showClose: true,
          })
          tempthis.isLogin = true;
          this.$router.push('/');

          sessionStorage.setItem('controls', []);
          sessionStorage.setItem('uid',res.data.uid);

        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            showClose: true,
          })
        }

      })
      .catch(err => {
        console.log(err)
      })
    },
    toRegister: function (){
      let params;
      params = {
        username: document.getElementById('un1').value,
        email: document.getElementById('email').value,
        password_1: document.getElementById('pw1').value,
        password_2: document.getElementById('pw2').value
      };
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"login/register/",
        data: qs.stringify(params)
      })
      .then(res => {
        console.log(res.data)
        if(res.data.errno === 0) {

          //this.$store.state.uid = res.data.uid;
          //this.$store.state.userInfo.username = user.username;
          //this.$store.state.isLogin = true;
          this.$message({
            message: '注册成功',
            type: 'success',
            showClose: true,
          })
          location.reload();

        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            showClose: true,
          })
        }

      })
      .catch(err => {
        console.log(err)
      })
    },
    initPage() {
      let login=document.getElementById('login');
      let register=document.getElementById('register');
      let form_box=document.getElementsByClassName('form-box')[0];
      let register_box=document.getElementsByClassName('register-box')[0];
      let login_box=document.getElementsByClassName('login-box')[0];
      register.addEventListener('click',()=>{
        form_box.style.transform='translateX(100%)';
        login_box.classList.add('hidden');
        register_box.classList.remove('hidden');
      })
      login.addEventListener('click',()=>{
        form_box.style.transform='translateX(0%)';
        register_box.classList.add('hidden');
        login_box.classList.remove('hidden');
      })
    }
  }
}
</script>
<style scoped>

.main{
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
  background-color: #fff;
  width: 750px;
  height: 515px;
  border-radius: 5px;
  /* 阴影 */
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
  /* 相对定位 */
  position: relative;

}
.form-box{
  /* 绝对定位 */
  position: absolute;
  background-color: #79c5ef;
  width: 375px;
  height: 515px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}
.register-box,.login-box{
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.hidden{
  display: none;
  transition: 0.5s;
}
h1{
  text-align: center;
  margin-bottom: 25px;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  /* 字间距 */
  letter-spacing: 5px;
}
input{
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  /* 下边框样式 */
  border-bottom: 1px solid rgba(255,255,255,0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}
input::placeholder{
  color: #fff;
}
input:focus{
  color: #8e9aaf;
  outline: none;
  border-bottom: 1px solid rgba(50, 102, 238, 0.5);
  transition: 0.5s;
}
input:focus::placeholder{
  opacity: 0;
}
.form-box button{
  width: 70%;
  margin-top: 35px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #79c5ef;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.form-box button:hover{
  background-color: #4989c8;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}
.con-box{
  width: 50%;
  /* 弹性布局 垂直排列 居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 绝对定位 居中 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.con-box.left{
  left: -2%;
}
.con-box.right{
  right: -2%;
}
.con-box h2{
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}
.con-box p{
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}
.con-box span{
  color: #4989c8;
}
.con-box img{
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}
.con-box button{
  margin-top: 3%;
  background-color: #fff;
  color: #4989c8;
  border: 1px solid #4989c8;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}
.con-box button:hover{
  background-color: #4989c8;
  color: #fff;
}
</style>
