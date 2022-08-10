<template>
  <!--Hey! This is the original version
  of Simple CSS Waves-->
<div>
  <div class="header">
  <Header></Header>
    <!--Content before waves-->
    <div class="inner-header flex">
      <div class="blog-slider">
        <div class="blog-slider_wrp swiper-wrapper">
          <div class="blog-slider_item swiper-slide">
            <div class="blog-slider_img">
              <div class="side-avatar">
                <img :src="this.$store.state.base+this.$store.state.userInfo.avatar" @click="changeAvatarVissible =true">
              </div>
              <div class="side-namebox">
                <span class="side-name">{{this.$store.state.userInfo.username}}</span>
              </div>
            </div>
            <div class="blog-slider_content">
              <div class="blog-slider_title" v-if="select===1">Personal Information</div>
              <div class="blog-slider_title" v-if="select===2">Account Settings</div>
              <div class="blog-slider_title" v-if="select===3">Invitations</div>
              <ul class="info-list" v-if="select===1">
                <li class="info-item">
                  <i class='bx bxs-user-rectangle info-icon'></i>
                  <span class="info-label">姓名</span>
                  <input class="info-input" v-model="userInfo.name"></input>
                </li>
                <li class="info-item">
                  <i class='bx bxs-envelope info-icon'></i>
                  <span class="info-label">邮箱</span>
                  <input class="info-input" v-model="userInfo.email"></input>
                </li>
                <li class="info-item">
                  <i class='bx bxs-paper-plane info-icon'></i>
                  <span class="info-label">简介</span>
                  <input class="info-input" v-model="userInfo.profile"></input>
                </li>
                <li class="info-item center">
                  <span class="info-btn" @click="changeInfo">保存修改</span>
                </li>
              </ul>
              <ul class="info-list" v-if="select===2">
                <li class="info-item">
                  <i class='bx bxs-lock-open-alt info-icon'></i>
                  <span class="info-label">原有密码</span>
                  <input class="info-input" type="password" v-model="pw"></input>
                </li>
                <li class="info-item">
                  <i class='bx bxs-lock-alt info-icon'></i>
                  <span class="info-label" style="min-width: 96px">新密码</span>
                  <input class="info-input" type="password" v-model="pw1"></input>
                </li>
                <li class="info-item">
                  <i class='bx bxs-lock-alt info-icon'></i>
                  <span class="info-label">确认密码</span>
                  <input class="info-input" type="password" v-model="pw2"></input>
                </li>
                <li class="info-item center">
                  <span class="info-btn" @click="changePassword">提交修改</span>
                </li>
              </ul>
              <ul class="inv-list" v-if="select===3" v-for="(invitation, index) in messageList">
                <li class="inv-item">
                  <div class="inv-avatar">
                    <img :src="$store.state.base+invitation.inviter_avatar">
                  </div>
                  <span class="inv-fromName" :title="invitation.inviter_username">{{ invitation.inviter_username }}</span>
                  <span class="inv-description">邀请您加入</span>
                  <span class="inv-gname" :title="invitation.gname">{{ invitation.gname }}</span>
                  <div class="inv-op">
                    <i class='bx bx-check accept' title="接受" @click="handleAgree(invitation.id)"></i>
                    <i class='bx bx-x refuse' title="拒绝" @click="handleRefuse(invitation.id)"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="blog-slider_pagination">
          <span class="swiper-pagination-bullet" :class="{'active':select===1}" @click="select=1"></span>
          <span class="swiper-pagination-bullet" :class="{'active':select===2}" @click="select=2"></span>
          <span class="swiper-pagination-bullet" :class="{'active':select===3}" @click="select=3"></span>
        </div>
      </div>
    </div>

    <!--Waves Container-->
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
    <!--Waves end-->
  </div>
  <el-dialog
      title="上传头像"
      :visible.sync="changeAvatarVissible"
      width="30%"
      class = "changeAvatar">
      <span>
        <input type="file" ref="pic">
      </span>
    <span slot="footer" class="dialog-footer">
                  <el-button @click="changeAvatarVissible = false">取 消 上 传</el-button>
                  <el-button type="primary" @click="toChangeAvatar">确 定 上 传</el-button>
                </span>
  </el-dialog>
  <remote-link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"></remote-link>
  <remote-link href='https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.15/swiper-bundle.min.css'></remote-link>
  <remote-js src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></remote-js>
  <remote-js src='https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.15/swiper-bundle.min.js'></remote-js>
</div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";
import qs from "qs";
import {Swiper} from "swiper";
export default {
  name: "UserView",
  components: {
    Header,
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: {
        src: { type: String, required: true },
      },
    },
    'remote-link':{
      render(createElement) {
        return createElement('link', {attrs: {rel:"stylesheet", property:"stylesheet", href: this.href}});
      },
      props: {
        href: {type: String, required: true},
      }
    }
  },
  data(){
    return {
      select: 1,
      changeAvatarVissible: false,
      userInfo: {
        uid: this.$store.state.userInfo.uid,
        username: this.$store.state.userInfo.username,
        email: this.$store.state.userInfo.email,
        name: this.$store.state.userInfo.name,
        profile: this.$store.state.userInfo.profile,
      },
      pw: '',
      pw1: '',
      pw2: '',
      messageList: [],
    }
  },

  methods:{
    toChangeAvatar(){
      this.changeAvatarVissible = false;
      const tempthis = this;
      let fileToUpload = this.$refs.pic.files[0];
      let param = new FormData();  //创建表单对象
      param.append("avatar",fileToUpload);
      param.append("uid",tempthis.$store.state.userInfo.uid);
      axios.post(this.$store.state.base+'space/set_avatar/',
          param,
          {headers:{'Content-Type':'multipart/form-data'}})
          .then(function (Response) {
            console.log(Response);
            if(Response.data.errno===0)
            {
              tempthis.$message.success("头像上传成功。")
            }
            tempthis.getInfo(tempthis.$store.state.userInfo.uid);
          })
          .catch(function (error) {
            console.log(error);
          })
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
        console.log(this.$store.state.userInfo.avatar);
        console.log(this.avatarUrl)
      }).catch(err => {
        console.log(err)
      })
    },
    changeInfo() {
      let params = {
        uid: this.userInfo.uid,
        username: this.userInfo.username,
        name: this.userInfo.name,
        email: this.userInfo.email,
        profile: this.userInfo.profile,
      }
      if(params.username === '' && params.name === '' && params.email === '' && params.profile === '') {
        return ;
      }
      if(params.username === '') {
        params.username = this.$store.state.userInfo.username;
      }
      if(params.name === '') {
        params.name = this.$store.state.userInfo.name;
      }
      if(params.email === '') {
        params.email = this.$store.state.userInfo.email;
      }
      if(params.profile === '') {
        params.profile = this.$store.state.userInfo.profile;
      }
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"space/update_info/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res.data)
        if(res.data.errno === 0) {

          this.$store.state.userInfo.username = params.username;
          this.$store.state.userInfo.name = params.name;
          this.$store.state.userInfo.email = params.email;
          this.$store.state.userInfo.profile = params.profile;

          this.$message({
            message: '修改成功',
            type: 'success',
            showClose: true,
          })
          //location.reload();

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
    changePassword() {
      let params = {
        uid: this.$store.state.userInfo.uid,
        password: this.pw,
        password_1: this.pw1,
        password_2: this.pw2,
      }

      if(params.password === '' && params.password_1 === '' && params.password_2 === '') {
        return;
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"space/update_password/",
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
          location.reload();
        } else {
          if(res.data.msg == '密码格式错误') {
            this.$message({
              message: res.data.msg + ":必须包含字母和数字，且长度在8和18之间",
              type: 'error',
              showClose: true,
            })
          }
          else {
            this.$message({
              message: res.data.msg,
              type: 'error',
              showClose: true,
            })
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleAgree(id) {
      const tempthis = this;
      let param ={
        id:id
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/accept_invitation/",
        data: qs.stringify(param)
      }).then(res => {
        console.log(res)
        if(res.data.errno===0){
          this.$axios({
            method: 'post',
            url: this.$store.state.base+"team_manage/delete_invitation/",
            data: qs.stringify(param)
          }).then(res2 => {
            console.log(res2)
            tempthis.$message.success("加入团队成功")
            tempthis.toGetMessageList();
          }).catch(err2 => {
            console.log(err2)
          })
        }
        else if(res.data.errno===1003){
          this.$axios({
            method: 'post',
            url: this.$store.state.base+"team_manage/delete_invitation/",
            data: qs.stringify(param)
          }).then(res3 => {
            console.log(res3)
            tempthis.$message.warning("该团队不存在或已被解散")
            tempthis.toGetMessageList();
          }).catch(err3 => {
            console.log(err3)
          })
        }
        else if(res.data.errno===1004){
          this.$axios({
            method: 'post',
            url: this.$store.state.base+"team_manage/delete_invitation/",
            data: qs.stringify(param)
          }).then(res4 => {
            console.log(res4)
            tempthis.$message.info("您已在该团队中")
            tempthis.toGetMessageList();
          }).catch(err4 => {
            console.log(err4)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },

    handleRefuse(id) {
      const tempthis = this;
      let param ={
        id:id
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/delete_invitation/",
        data: qs.stringify(param)
      }).then(res => {
        console.log(res)
        if(res.data.errno===0){
          tempthis.$message.info("您已拒绝邀请")
          tempthis.toGetMessageList();
        }
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

    getSelect(){
      this.select = this.$route.params.select;
    }
  },
  created(){
    this.toGetMessageList();
    this.getSelect();
  },
  mounted() {

  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");
body {
  margin:0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
}
p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size:14px;
  color: #333333;
}

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(90deg,#42d392 25%,#647eff);
  color:white;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  height:65vh;
  width:100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
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

* {
  box-sizing: border-box;
}

.blog-slider {
  width: 95%;
  position: relative;
  max-width: 1000px;
  margin: 100px auto auto auto;
  background: #fff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  border-radius: 25px;
  height: 550px;
  transition: all 0.3s;
}

@media screen and (max-width: 992px) {
  .blog-slider {
    max-width: 680px;
    height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .blog-slider {
    min-height: 500px;
    height: auto;
    margin: 180px auto;
  }
}

@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider {
    height: 350px;
  }
}

.blog-slider_item {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .blog-slider_item {
    flex-direction: column;
  }
}

.blog-slider_img {
  align-items: center;
  width: 300px;
  flex-shrink: 0;
  height: 300px;
  line-height: 150px;
  background-image: linear-gradient(147deg, #7e71f3 0%, #8bb5f3 74%);
  box-shadow: 4px 13px 30px 1px rgba(11, 39, 100, 0.2);
  border-radius: 20px;
  transform: translateX(-80px);
  overflow: hidden;
}

.blog-slider_img .side-avatar{
  margin-top: 40px;
  width: 100%;
  height: 170px;
}

.blog-slider_img img {
  width: 160px;
  height: 150px;
  object-fit: cover;
  display: block;
  border-radius: 20px;
  transition: all 0.3s;
  background-color: white;
  margin: 10px auto;
}

.blog-slider_img img:hover {
  width: 200px;
  height: 200px;
  border-radius: 50px;
  cursor: pointer;
}

.blog-slider_img .side-namebox{
  line-height: 50px;
  font-size: 30px;
  font-weight: 700;
}

.blog-slider_content {
  padding-right: 25px;
}

.blog-slider_content{
  position: relative;
  width: 80%;
  height: 100%;
}

.blog-slider_content .info-list {
  color: #11101d;
  list-style: none;
  font-size: 24px;
}

.blog-slider_content .info-list .info-item{
  display: flex;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  align-items: center;
  margin-top: 50px;
}

.blog-slider_content .info-list .info-item.center{
  margin-left: 220px;
}

.blog-slider_content .info-list .info-item .info-icon{
  line-height: 50px;
  text-align: center;
  height: 50px;
  font-size: 30px;
  min-width: 50px;
}

.blog-slider_content .info-list .info-item .info-label{
  margin-right: 20px;
  min-width: 60px;
  text-align: center;
}

.blog-slider_content .info-list .info-item .info-input{
  padding: 8px 10px;
  border: #e3eeff 2px solid;
  border-radius: 8px;
  width: 350px;
}

.blog-slider_content .info-list .info-item .info-input:focus{
  outline: none;
  border-color: #1b9aee;
}

.blog-slider_content .info-list .info-item .info-btn{
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #42d392;
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-weight: 550;
  line-height: 30px;
}

.blog-slider_content .info-list .info-item .info-btn:hover{
  padding: 8px 12px;
  border-radius: 15px;
  line-height: 35px;
  transition: all 0.4s ease;
  background-color: #52e392;
}

.blog-slider_content > * {
  transform: translateY(25px);
  transition: all 0.4s;
}

.blog-slider_code {
  color: #7b7992;
  margin-bottom: 15px;
  display: block;
  font-weight: 500;
}

.blog-slider_title {
  line-height: 40px;
  float: left;
  font-size: 30px;
  font-weight: 700;
  color: #0d0925;
  width: 100%;
}

.blog-slider_text {
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
}

.blog-slider_button {
  display: inline-flex;
  background-image: linear-gradient(147deg, #7e71f3 0%, #8bb5f3 74%);
  padding: 15px 35px;
  border-radius: 50px;
  color: #fff;
  box-shadow: 0px 14px 80px rgba(11, 39, 100, 0.2);
  text-decoration: none;
  font-weight: 500;
  justify-content: center;
  text-align: center;
  letter-spacing: 1px;
}

@media screen and (max-width: 576px) {
  .blog-slider_button {
    width: 100%;
  }
}

.blog-slider .swiper-container-horizontal > .swiper-pagination-bullets, .blog-slider .swiper-pagination-custom, .blog-slider .swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}

.blog-slider_pagination {
  position: absolute;
  z-index: 21;
  right: 20px;
  width: 11px !important;
  text-align: center;
  left: auto !important;
  top: 50%;
  bottom: auto !important;
  transform: translateY(-50%);
}

@media screen and (max-width: 768px) {
  .blog-slider_pagination {
    transform: translateX(-50%);
    left: 50% !important;
    top: 205px;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.blog-slider_pagination.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 8px 0;
}

@media screen and (max-width: 768px) {
  .blog-slider_pagination.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 5px;
  }
}

.blog-slider_pagination .swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 10px;
  background: #062744;
  transition: all 0.3s;
  margin-top: 10px;
  cursor: pointer;
}

.blog-slider_pagination .swiper-pagination-bullet:hover,
.blog-slider_pagination .swiper-pagination-bullet.active
{
  opacity: 1;
  background: #7e71f3;
  height: 30px;
  box-shadow: 0 0 20px rgba(11, 39, 100, 0.2);;
}


@media screen and (max-width: 768px) {
  .blog-slider_pagination .swiper-pagination-bullet-active {
    height: 11px;
    width: 30px;
  }
}

.blog-slider_content .inv-list{
  list-style: none;
  color: #000;
  font-size: 18px;
  overflow: scroll;
  position: absolute;
  height: 80%;
  min-height: 230px;
  top: 50px;
  left: 0;
}

.blog-slider_content .inv-list .inv-item{
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  height: 70px;
  line-height: 70px;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  border-radius: 20px;
}

.blog-slider_content .inv-list .inv-item:hover{
  background-color: #f4f4f4;
}

.blog-slider_content .inv-list .inv-item .inv-avatar{
  width: 60px;
  height: 60px;
  background-color: #42b983;
  border-radius: 30px;
}

.blog-slider_content .inv-list .inv-item .inv-fromName{
  color: #03a9f4;
  font-size: 24px;
  min-width: 80px;
  width: 80px;
  margin: auto 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.blog-slider_content .inv-list .inv-item .inv-description{
  font-size: 20px;
  font-weight: 500;
}

.blog-slider_content .inv-list .inv-item .inv-gname{
  font-size: 24px;
  width: 200px;
  color: #647eff;
  margin: auto 10px;
  min-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.blog-slider_content .inv-list .inv-item .inv-op{
  margin-left: auto;
  font-size: 30px;
  color: #062744;
}

.blog-slider_content .inv-list .inv-item .inv-op i{
  min-width: 50px;
}

.blog-slider_content .inv-list .inv-item .inv-op i:hover{
  cursor: pointer;
  transition: all 0.4s ease;
  font-size: 40px;
  line-height: 70px;
}

.blog-slider_content .inv-list .inv-item .inv-op i.accept:hover{
  color: #42b983;
}

.blog-slider_content .inv-list .inv-item .inv-op i.refuse:hover{
  color: #FF5733;
}
</style>
