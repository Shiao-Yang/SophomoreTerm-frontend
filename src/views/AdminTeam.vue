<template>
  <div>
    <side-navigation></side-navigation>
    <div id="bgd">
      <div id="membersDiv">
        <span id="title" v-if="$store.state.role!==0">管理您的团队</span>
        <span id="title" v-else-if="$store.state.role===0">查看您的团队</span>
        <router-link to="/invite">
          <img title="邀请" v-if="$store.state.role!==0" src="../assets/invite.png" class="img" id="invite">
        </router-link>
        <img title="解散" v-if="$store.state.role==2" src="../assets/Dismiss.png" class="img" id="dismiss" @click="Dismiss=true">

        <el-table
            :data="members"
            id="members"
            max-height="500px"
            :row-style="{height: '58px'}">
          <el-table-column
              prop="username"
              label="昵称"
              width="150px"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="150px">
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱"
              width="180px">
          </el-table-column>
          <el-table-column
              prop="role"
              label="身份"
              width="160px">
            <template slot-scope="scope">
            <span v-if="scope.row.role===0">
              成员
            </span>
              <span v-if="scope.row.role===1">
              管理员
            </span>
              <span v-if="scope.row.role===2">
              创建者
            </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="role"
              label="操作"
          >
            <template slot-scope="scope">
              <img class="img" id="addAdmin" title="任命管理员" @click="clickAdd(scope.row.key)" slot="reference" v-if="scope.row.role===0&& ($store.state.role===1||$store.state.role===2)" src="../assets/addAdmin.png"> <!-- 任命管理员 -->
              <img class="img" id="delete" title="删除" @click="clickDelete(scope.row.key)" slot="reference" v-if="scope.row.role===0&& ($store.state.role===1||$store.state.role===2)" src="../assets/delete.png"> <!-- 移除普通成员 -->
              <img class="img" id="cancel" title="撤销" @click="clickCancel(scope.row.key)" slot="reference" v-if="scope.row.role===1&& ($store.state.role===2)" src="../assets/cancel.png"> <!-- 撤销管理员 -->
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="提示"
          :visible.sync="Dismiss"
          :close-on-click-modal ="false"
          width="30%">
        <i class="el-icon-warning-outline" style="color: #ffd952"></i>
        <span>您确定要解散团队吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Dismiss = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="dismiss" class="confirm">确 定</el-button>
        </span>
      </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="addAdmin"
            :close-on-click-modal ="false"
            width="30%">
          <i class="el-icon-warning-outline" style="color: #ffd952"></i>
          <span>您确定要任命{{name}}为管理员吗？</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="addAdmin = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="confirmAppoint" class="confirm">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="Delete"
            :close-on-click-modal ="false"
            width="30%">
          <i class="el-icon-warning-outline" style="color: #FF5733"></i>
          <span>您确定要删除成员{{name}}吗？</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="Delete = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="confirmDelete" class="confirm">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="cancel"
            :close-on-click-modal ="false"
            width="30%">
          <i class="el-icon-warning-outline" style="color: #FF5733"></i>
          <span>您确定要撤销管理员{{name}}吗？</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="cancel = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="confirmRevoke" class="confirm">确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>

import qs from "qs";
import sideNavigation from "@/components/SideNavigation";

export default {
  name: "TeamAdmin",
  components: {
    sideNavigation,
  },
  created() {
    window.myData = this;
    this.get_member();
    console.log(this.$store.state.isLogin)
    if (!this.$store.state.isLogin) {
      this.$store.state.warning = true
      this.$router.push('/')
    }
  },
  data() {
    return {
      Dismiss: false,
      addAdmin: false,
      Delete: false,
      cancel: false,
      index: '',
      name: '',
      members: [],
    }
  },
  methods: {
    get_member() {
      let params = {
        gid: this.$store.state.gid
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/get_member/",
        data: qs.stringify(params)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              default:
                for (let i = 0; i < res.data.length; i++) {
                  let tmp = {
                    id: res.data[i].id,
                    username: res.data[i].username,
                    name: res.data[i].name,
                    email: res.data[i].email,
                    role: res.data[i].role,
                    key: i
                  }
                  this.members.push(tmp)
                }
            }

          })
    },
    dismiss() {
      let params = {
        uid: this.$store.state.userInfo.uid,
        gid: this.$store.state.gid
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+"group_manage/dismiss/",
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
              case 1004:
                this.$message.warning(res.data.msg)
                break
              case 1005:
                this.$message.warning(res.data.msg)
                break
              case 0:
                this.$message.success(res.data.msg)
                  this.Dismiss=false
                  this.$router.push("/teamList")
                break
            }
          })
    },
    appoint() {
      let params = {
        uid: this.members[this.index].id,
        gid: this.$store.state.gid
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/appoint/",
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
    },
    delete() {
      let params = {
        uid: this.members[this.index].id,
        gid: this.$store.state.gid
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/delete/",
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
    },
    Revoke() {
      let params = {
        uid: this.members[this.index].id,
        gid: this.$store.state.gid
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+"team_manage/revoke/",
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
    },
    confirmAppoint() {
      this.addAdmin = false
      this.appoint()
      this.members[this.index].role=1
    },
    confirmDelete() {
      this.Delete = false
      this.delete()
      this.members.splice(this.index, 1)
    },
    confirmRevoke() {
      this.cancel = false
      this.Revoke()
      this.members[this.index].role=0
    },
    clickAdd(index) {
      this.addAdmin=true
      this.index=index
      this.name=this.members[index].name
      console.log(this.index)
    },
    clickDelete(index) {
      this.Delete=true
      this.index=index
      this.name=this.members[index].name
      console.log(this.index)
    },
    clickCancel(index) {
      this.cancel=true
      this.index=index
      this.name=this.members[index].name
      console.log(this.index)
    },
  }
}
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;

  }
  #bgd {
    background-image: url("../assets/adminBgd.jpg");
    position: absolute;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 80%;
    height: 90%;
    left: 20%;
    top: 10%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  }
  #membersDiv {
    top: 8%;
    left: 15%;
    background-color: #fafafa;
    width: 70%;
    height: 85%;
    overflow-y: auto;
    display: block;
    position: absolute;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  #title {
    position: relative;
    top: 10px;
    font-size: 25px;
  }
  #members {
    margin: 0px;
    width: 95%;
    left: 20px;
    top: 35px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .img {
    width: 26px;
    height: 26px;
    margin: 0px 3px;
    cursor: pointer;
    transition: 0.2s linear;
    vertical-align: middle;
    position: absolute;
  }
  .img:hover {
    transform: scale(1.3);
  }
  #addAdmin {
    left: 10px;
    top: 16px
  }
  #delete {
    left: 40px;
    top: 16px;
  }
  #cancel {
    left: 10px;
    top: 16px;
  }
  #invite {
    width: 36px;
    height: 36px;
    top: 10px;
    left: 660px;
  }
  #dismiss {
    width: 36px;
    height: 36px;
    top: 10px;
    left: 710px;
  }

</style>

<style>
.dialog-footer .confirm,.el-message-box__btns .confirm {
  background-color: #ffd952 !important;
  border: none !important;
}
.dialog-footer .confirm:hover, .el-message-box__btns .confirm:hover {
  background-color: #fcd23e !important;
}
.dialog-footer .cancel:hover, .el-message-box__btns .cancel:hover  {
  background-color: #fdfddd !important;
  color: #ffd952 !important;
  border-color: #fdfddd !important;
}
</style>