<template>
  <div class="windows">
    <div class="mark">
      <div class="alert">
        <!-- 内容 -->
        <div class="cont">
          <div class="mt">原型图设置</div>
          <div class="mc">
            <ul>
              <li>
                <span class="label">图名</span>
                <el-input v-model="projectName" placeholder="请输入原型图名称"></el-input>
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
  name: "SetDesignWindow",
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
        this.$message.error("原型图名称不能为空！")
        return;
      }
      this.project.name = this.projectName;
      this.$emit('ok', this.project);
    },
    cancel() {
      this.$emit('cancel');
    },
    getProject(){
      this.project = this.p;
      this.projectName = this.project.name;
    }
  },
  created() {
    this.getProject();
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
