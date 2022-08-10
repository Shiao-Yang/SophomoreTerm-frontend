<template>
  <div class="windows">
    <div class="mark">
      <div class="alert">
        <!-- 内容 -->
        <div class="cont">
          <div class="mt">新建原型设计</div>
          <div class="mc">
            <ul>
              <li>
                <span>图名</span>
                <el-input v-model="input" placeholder="请输入图名"></el-input>
              </li>
              <li style="position: relative; left: -15px">
                <span>画布类型</span>
                <el-radio style="margin-top: 5px" @change="changeType1" v-model="radio" label="1">从模板创建</el-radio>
                <el-radio style="margin-top: 5px" @change="changeType1" v-model="radio" label="2">新建空白画布</el-radio>
              </li>
              <!--
              <li>
                <button @click="output">test</button>
              </li>
              -->
            </ul>
          </div>
          <!------- 模板选择 ------->
          <!--- 空白模板 --->
          <div class="non-model" v-if="radio==='2'">
            <div class="desktop" :class="{'active' : (this.type === 1)}" @click="changeType1">
              <div class="image">
                <i class='bx bx-desktop'></i>
              </div>
              <div class="text">
                desktop
              </div>
              <div class="text">
                1000×600
              </div>
            </div>
            <div class="desktop" :class="{'active' : (this.type === 2)}" @click="changeType2">
              <div class="image">
                <i class='bx bx-mobile-alt'></i>
              </div>
              <div class="text">
                phone
              </div>
              <div class="text">
                400×600
              </div>
            </div>
            <div class="desktop" :class="{'active' : (this.type === 3)}" @click="changeType3">
              <div class="image">
                <i class='bx bx-plus'></i>
              </div>
              <div class="text">
                <span>自定义</span>
              </div>
              <div class="text" style="margin-left: 15px">
                <input placeholder="宽度" :disabled="this.radio === 2 && this.type ===3" id="w2" @change="modify"></input>
                <span>×</span>
                <input placeholder="高度" :disabled="this.radio === 2 && this.type ===3" id="h2" @change="modify"></input>
              </div>
            </div>
          </div>
          <div class="non-model" v-if="radio==='1'">
            <div class="desktop" :class="{'active' : (this.type === 1)}" @click="changeType1">
              <div class="image">
                <i class='bx bx-desktop'></i>
              </div>
              <div class="text">
                desktop1
              </div>
              <div class="text">
                1000×800
              </div>
            </div>
            <div class="desktop" :class="{'active' : (this.type === 2)}" @click="changeType2">
              <div class="image">
                <i class='bx bx-mobile-alt'></i>
              </div>
              <div class="text">
                phone2
              </div>
              <div class="text">
                400×600
              </div>
            </div>
            <div class="desktop" :class="{'active' : (this.type === 3)}" @click="changeType3">
              <div class="image">
                <i class='bx bx-desktop'></i>
              </div>
              <div class="text">
                desktop3
              </div>
              <div class="text">
                1000×800
              </div>
            </div>
            <div class="desktop" :class="{'active' : (this.type === 4)}" @click="changeType4">
              <div class="image">
                <i class='bx bx-desktop'></i>
              </div>
              <div class="text">
                desktop4
              </div>
              <div class="text">
                1000×800
              </div>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="btns">
          <el-button @click="sure" type="success">确认创建</el-button>
          <el-button @click="cancel" type="danger">退出</el-button>
        </div>
        <button @click="output">test</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateDesignWindow",
  data() {
    return {
      input: '',
      width: 1000,
      height: 600,
      radio: '1',
      type: 1,
      model: 1,
    }
  },

  props:{

  },

  methods : {
    modify() {
      if(this.radio === '2') {
        let w2 = document.getElementById('w2');
        let h2 = document.getElementById('h2');
        this.width = w2.value;
        this.height = h2.value;
        console.log('modify',this.width, this.height);
      }
    },

    reset() {
      console.log(this.width, this.height);
      let w2 = document.getElementById('w2');
      let h2 = document.getElementById('h2');
      w2.value = "";
      h2.value = "";
      console.log(document.getElementById('w2').value,document.getElementById('h2').value)
    },

    changeType1() {
      if(this.type === 1) return;
      this.type = 1;
      this.width = 1000;
      this.height = 600;
      if(this.radio === '2') {
        this.width = 1000;
        this.height = 600;
        this.reset();
      }
    },
    changeType2() {
      if(this.type === 2) return;
      this.type = 2;
      if(this.radio === '1') {
        this.width = 400;
        this.height = 600;
      }
      else if(this.radio === "2") {
        this.width = 400;
        this.height = 600;
        this.reset();
      }
    },
    changeType3() {
      if(this.type === 3) return;
      this.type = 3;
      if(this.radio === '1') {
        this.width = 1000;
        this.height = 600;
      }
      else if(this.radio === "2")
        this.reset();
    },
    changeType4() {
      if(this.type === 4 || this.radio === '2') return;
      this.type = 4;
      if(this.radio === '1') {
        this.width = 400;
        this.height = 600;
      }
      else if(this.radio === "2")
        this.reset();
    },
    output() {
      console.log(this.radio,this.type,this.width,this.height);
      if(this.radio === '2') {
        let w2 = document.getElementById('w2').value;
        let h2 = document.getElementById('h2').value;
        console.log(w2,h2);
      }
    },
    sure() {
      if(this.input === '') {
        this.$message ({
          message: '请填写设计图名称',
          type: "warning",
          showClose: true,
        })
        return;
      }
      //console.log(this.radio, this.width, this.height);
      //console.log(typeof this.radio)
      /*
      if(this.radio === '1') {
        //console.log(1)
        this.width = 1000;
        this.height = 600;
      }
       */
      //console.log(4);
      if(this.radio === '2') {
        //console.log(2)
        if(this.type === 3) {
          this.width = document.getElementById('w2').value;
          this.height = document.getElementById('h2').value;
          if(this.width > 1100) {
            this.width = 1100;
          }
          else if(this.width < 200) {
            this.width = 200;
          }
          if(this.height > 660) {
            this.height = 660;
          }
          if(this.height < 300) {
            this.height = 300
          }
        }
      }

      if(this.radio === '1') {
        this.model = 'prototype_model_' + this.type + '.json';
      }

      if(this.radio === '2') {
        this.model = 'default_prototype.json';
      }

      console.log(this.radio, this.width, this.height, this.model);
      this.$emit('ok', this.$store.state.userInfo.uid, this.input, this.width, this.height, this.model);
    },
    cancel() {
      this.$emit('cancel');
    }
  },
}
</script>

<style scoped>
.non-model {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.non-model .desktop {
  height: 100%;
  background-color: #eff1f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 175px;
  margin-right: 30px;
  margin-left: 30px;
  border: 1px solid #83807f;
  border-radius: 10px;
  cursor: pointer;
}

.non-model .active {
  height: 100%;
  background-color: #eff1f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 175px;
  margin-right: 30px;
  margin-left: 30px;
  border: 3px solid #98adec;
  border-radius: 10px;
  cursor: pointer;
}

.non-model .desktop .image {
  align-items: center;
  font-size: 100px;
  line-height: 100px;
  margin-bottom: 10px;
}

.non-model .desktop .image i {
  position: relative;
  top: 20px;
}

.non-model .phone {
  flex: 1;
  font-size: 120px;
  border-width: 5px;
  border-color: #555555;
}

.non-model .pad {
  flex: 1;
  font-size: 100px;
  border-width: 5px;
  border-color: #555555;
}

.text {
  margin-top: 5px;
}
input{
  background-color: transparent;
  width: 40%;
  color: #858080;
  /* 下边框样式 */
  border: none;
  border-bottom: 2px solid rgba(72, 92, 129, 0.4);
  text-indent: 10px;
  margin-right: 5px;
  font-size: 14px;
  letter-spacing: 2px;
}
input::placeholder{
  color: #858080;
}
input:focus{
  color: #8e9aaf;
  outline: none;
  border-bottom: 2px solid rgba(50, 102, 238, 0.5);
  transition: 0.5s;
}
input:focus::placeholder{
  opacity: 0;
}

input:disabled {
  cursor: not-allowed;
}

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
  height: 350px;
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

.type-select {
  position: relative;
  left: 20px;
}

.aside {
  float: left;
  margin:auto 10px;
}

.paylogo {
  display: flex;
  margin-left: 60px;
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

li span{
  width: 80px;
  font-size: 16px;
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
  height: 30px;
  margin: 30px auto;
  text-align: center;
}

</style>
