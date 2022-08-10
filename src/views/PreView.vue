<template>
  <div>
    <div class="main">
      <div class="left-box">
        <div class="name">
          {{this.p_name}}
        </div>
        <div class="number">
          {{this.number}} 个页面
        </div>
        <div class="search">
          <span style="position:relative; left: 15px; top: 7px; font-size: 23px"><i class='bx bx-search' ></i></span>
          <input type="text" placeholder="输入设计图名称查找" @keyup.enter="Sch" id="input">
          <span class="clear" title="清除搜索结果"><i class='bx bx-minus-circle' @click="clear"></i></span>
        </div>
        <div class="list">
          <ul class="designs">
            <li class="design-item" v-for="(design, index) in this.designs" @click="changeNum(index,design.picid)">
              <div class="item-details" :class="{'active' : (num === index)}">
                {{design.name}}
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="right-box">
        <div class="image">
          <img v-if="this.success===1 && this.src !== '' " :src=this.src alt="加载失败"/>
          <p v-if="this.success === 1 && this.src === '' ">未生成预览</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import qs from "qs";


export default {
  name: "preView",

  components: {
    Header,
  },

  data() {
    return {
      p_name: "你好",
      number: 2,
      designs: [],
      num: 0,
      src: "",
      success: 0,
      common:[],
      search:[],
      keyword: "",
    }
  },

  created() {
    console.log(this.$route.query.pid,":",this.$route.query.pname)
    this.getPreView(this.$route.query.pid, this.$route.query.pname);
  },

  mounted() {
    console.log("num",this.num);
  },

  methods: {
    getPreView(pid, pname) {
      let params = {
        pid: pid,
      }

      this.$axios({
        method: 'post',
        url: this.$store.state.base+"design/get_show_status/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res.data);
        if(res.data.errno === 0) {

          if(res.data.showable === 1) {
            this.p_name = pname;
            this.get_Picture(pid);
          }

          else {
            alert("页面无效")
            return ;
          }



          // this.$message({
          //   message: res.data.msg,
          //   type: 'success',
          //   showClose: true,
          // })

        } else {
          //this.preView = 0;

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

    changeNum(num,picid) {
      console.log(num,":",picid);
      if(this.num === num) {
        return;
      }

      else {
        this.success = 0;
        this.num = num;
        this.fetchPhoto(picid)
      }
    },

    LoseBlur(){

    },

    Sch() {
      let keyword = document.getElementById('input');
      let params = {
        pid: this.$route.query.pid,
        keyword: keyword.value,
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base + 'design/search_design/',
        data: qs.stringify(params),
      }).then(res => {
        console.log(res.data);
        this.num = 0;
        this.designs = res.data;
        this.fetchPhoto(this.designs[this.num].picid);
        keyword.value = "";
        keyword.blur();
      })
    },

    fetchPhoto(pic_id) {
      const that = this;

      let params = {
        picid: pic_id,
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.base + "design/get_prototype_img/",
        data: qs.stringify(params)
      }).then(res => {
        console.log("取图片成功")
        console.log(res.data);
        console.log(typeof res.data.errno);

        if(res.data.errno === 0) {
          if(res.data.url === null)
            that.src = '';
          else
            that.src = this.$store.state.base+res.data.url;
          console.log(that.src);
          that.success = 1;
          // this.$message({
          //   message: res.data.msg,
          //   type: "success",
          //   showClose: true,
          // })
        }

        else {
          this.$message({
            message: res.data.msg,
            type: "error",
            showClose: true,
          })
        }
      }).catch(err => {
        console.log(err)
      })

    },

    clear(){
      this.designs = this.common;
      this.num = 0;
      this.fetchPhoto(this.designs[this.num].picid);
    },

    get_Picture(pic_id) {
      let params = {
        pid: pic_id,
      }
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"design/get_design/",
        data: qs.stringify(params)
      }).then(res => {
        //console.log(res.data);
        this.designs = res.data;
        this.common = res.data;
        this.number = res.data.length;
        console.log(this.designs);
        console.log(this.number);
        this.fetchPhoto(this.designs[0].picid);
      }).catch(err => {
        console.log(err)
      })

    },
  }
}
</script>

<style scoped>
li {
  list-style: none;
  margin-bottom: 10px;
}


.main {
  overflow-x: hidden;
  overflow-y: hidden;
  /* 100%窗口高度 */
  height: 100vh;
  width: 100%;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  /*background: linear-gradient(200deg,#f3e7e9,#e3eeff);*/
  top: 50px;
  left: 0;
}

.main .left-box {
  height: 100%;
  width: 20%;
  /*border: 2px solid coral;*/
  background-color: #fff;
}

.main .right-box {
  height: 100%;
  width: 80%;
  /*border: 2px solid coral;*/
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235,237,238);
}

.main .right-box .image {
  height: 80%;
  width: 80%;
}

.main .left-box .name {
  margin-left: 15px;
  font-size: 40px;
  color: #101111;
  transition: 0.5s;
}

.main .left-box .name:hover {
  cursor: pointer;
  color: #ee4646;
}

.main .left-box .number {
  margin-left: 15px;
  font-size: 15px;
  color: rgb(170, 176, 176);
  transition: 0.5s;
}

input {
  background-color: transparent;
  width: 70%;
  color: #ad2727;
  border: none;
  /*下边框样式*/
  border-bottom: 1px solid rgba(154, 151, 151, 0.4);
  font-size: 14px;
  letter-spacing: 2px;
  text-indent: 20px;
  margin: 15px 0 0 0px;
  padding: 10px 0;

}

input::placeholder {
  color: rgba(28, 27, 27, 0.4);
}

input:focus {
  color: #8e9aaf;
  outline: none;
  border-bottom: 2px solid rgba(50, 102, 238, 0.5);
  transition: 0.5s;
}

input:focus::placeholder {
  opacity: 0;
}

.main .left-box .list {
  font-size: 20px;
  margin-top: 20px;
  display: flex;
}

.main .left-box .list .designs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.main .left-box .list .designs .design-item .item-details {
  line-style: none;
  margin: 0 15px 0 15px ;
  padding: 10px 0 10px 0;
  transition: 0.5s;
}

.main .left-box .list .designs .design-item .item-details:hover {
  line-style: none;
  margin-left: 15px;
  padding: 10px;
  cursor: pointer;
  background-color: #eae8e8;
  border-radius: 15px;
}


.main .left-box .list .designs .design-item .active {
  line-style: none;
  margin-left: 15px;
  padding: 10px;
  cursor: pointer;
  background-color: #eae8e8;
  border-radius: 15px;
}

.clear {
  position:relative;
  left: 0px;
  top: 7px;
  font-size: 23px;
  transition: 0.5s;
}

.clear:hover {
  cursor: pointer;
  color: #1b9aee;
}



</style>
