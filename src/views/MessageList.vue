<template>
  <div>
    <Header></Header>
    <div class="main">

      <div class="container">
        <div class="form-box-left">
          <div class="top">

            <img :src="avatarUrl" alt="" @click="changeAvatarVissible = true" class="theAvatar">
            <p> {{this.$store.state.userInfo.username}} </p>
          </div>

          <div class="down">
            <router-link to="/userInfo">个人资料</router-link>
          </div>
          <div class="down">
            <router-link to="/accountInfo">修改密码</router-link>
          </div>
          <div class="down1">
            <router-link to="/messageList">团队邀请</router-link>
          </div>

        </div>

        <div class="form-box-right">
          <el-table
              :data="messageList"
              style="width: 100%"
              height=420px
              v-if="dataLoadingCompleted===true"
              >
            <el-table-column
                prop="gname"
                label="团队名称"
               >
            </el-table-column>
            <el-table-column
                prop="inviter_username"
                label="邀请人"
                >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleRefuse(scope.$index, scope.row)">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>

      </div>
    </div>
    <el-dialog
        title="上传头像"
        :visible.sync="changeAvatarVissible"
        width="30%"
        class = "changeAvatar"
    >
      <span>
        <input type="file" ref="pic">
      </span>
      <span slot="footer" class="dialog-footer">
                  <el-button @click="changeAvatarVissible = false">取 消 上 传</el-button>
                  <el-button type="primary" @click="toChangeAvatar">确 定 上 传</el-button>
                </span>
    </el-dialog>
  </div>

</template>

<script>
import qs from "qs";
import axios from "axios";
import Header from "@/components/Header";
export default {
  name: "UserInfo",
  components: {Header},
  data() {
    return {
      avatarUrl:this.$store.state.base+this.$store.state.userInfo.avatar,
      messageList:[],
      changeAvatarVissible:false,
      dataLoadingCompleted:false
    }
  },

  created() {
    console.log(sessionStorage.getItem('uid'));
    this.getInfo(sessionStorage.getItem('uid'));
  },
  mounted() {
    this.toGetMessageList();
  },
  methods: {
    handleAgree(index, row) {
      console.log(row);
      const tempthis = this;
      let param ={
        id:row.id
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

    handleRefuse(index, row) {
      console.log(row);
      const tempthis = this;
      let param ={
        id:row.id
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
  height: 70px;
}

.title p {
  font-size: 30px;
  font-weight: bold;
  position: relative;
  left: 40%;
  top: 25px;
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


.inputText{
  color: black;
}
.changeAvatar{
  z-index:3;
}
.changeAvatar input{
  color: black;
}
.theAvatar{
  cursor: pointer;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
