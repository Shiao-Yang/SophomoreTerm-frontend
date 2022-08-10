<template>
  <div class="windows">
    <div class="mark">
      <div class="alert">
        <!-- 内容 -->
        <div class="cont">
          <div class="mt">项目设置</div>
          <div class="mc">
            <ul>
              <li>
                <span class="label">项目名称</span>
                <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
              </li>
              <li>
                <span class="label">创建人 :</span>
                <span class="details">{{founder.name}}</span>
              </li>
              <li>
                <span class="label">创建时间 :</span>
                <span class="details">{{project.starttime}}</span>
              </li>
              <li>
                <span class="label">当前状态 :</span>
                <span class="details" v-if="project.status === 0">
                  <i class='bx bxs-circle' style="color: #42b983"></i>
                  正在开发
                  <el-button type="info" style="margin-left: 10px" @click="changeState" size="small">结束</el-button>
                </span>
                <span class="details" v-else>
                  <i class='bx bxs-circle' style="color: #666666"></i>
                  已结束
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="btns">
          <el-button @click="sure" type="success">确认修改</el-button>
          <el-button @click="cancel" type="danger">退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SetProjectWindow",
  data() {
    return {
      founder:{},
      project: {},
      projectName: "",
    }
  },

  props:{
    p: Object,
  },
  methods : {
    sure() {
      if(this.projectName === ""){
        this.$message.error("项目名称不能为空！")
        return;
      }
      this.project.name = this.projectName;
      this.$emit('ok', this.project);
    },
    cancel() {
      this.$emit('cancel');
    },
    getFounder(uid) {
      let formData = new FormData;
      formData.append("uid", uid);
      this.$axios({
        method: "POST",
        url: this.$store.state.base+"space/get_info/",
        data: formData,
      })
          .then(res => {
            this.founder = res.data[0];
            console.log(this.founder);
          })
          .catch(err =>{
            console.log(err);
          })
    },

    changeState(){
      let formData = new FormData;
      formData.append("id", this.project.id);
      this.$axios({
        method: "POST",
        url: this.$store.state.base+"project_manage/close/",
        data: formData,
      })
          .then(res =>{
            console.log(res.data);
            this.cancel();
            if(res.data.errno === 0){
              this.$message.success("修改状态成功");
            }
            else{
              this.$message.error("修改状态失败，错误代码:"+res.data.errno);
            }
          })
    },
    getProject(){
      this.project = this.p;
      this.projectName = this.project.name;
      // this.project.id = this.p.id;
      // this.project.name = this.p.name;
      // this.project.uid = this.p.uid;
      // this.project.starttime = this.p.starttime;
      // this.project.staus = this.p.staus;
      // this.name = this.p.name;
      // console.log(this.project);
    }
  },
  created() {
    this.getProject();
    this.getFounder(this.project.uid);
  }
}
</script>

<style scoped>
.mark {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert{
  background: #fff;
  width: 800px;
  border-radius: 40px;
  padding-bottom: 20px;
}

.cont {
  border-bottom: 2px solid #f0f3ef;
}

.cont .mt {
  margin: 10px auto;
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.cont .mc {
  width: 500px;
  margin: auto;
}

.mc ul {
  width: 100%;
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
}

ul {
  margin: 0 auto;
}

li {
  display: flex;
  border-right: none;
  margin-bottom: 20px;
  text-align: center;
}

li .label{
  width: 80px;
  font-size: 16px;
  text-align: center;
  margin:auto 10px auto 0;
  font-weight: 500;
}

li .details{
  font-size: 18px;
  text-align: center;
  margin:auto 10px auto 0;
  font-weight: 600;
}

button {
  margin-right: 20px;
}

.mc img {
  width: 240px;
  height: 100px;
  margin-right: 40px;
}

.btns {
  margin: 30px auto;
  text-align: center;
}

</style>
