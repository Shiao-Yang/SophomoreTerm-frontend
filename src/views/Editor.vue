<template>
  <div id="bgd">

    <router-link to="/project">
      <img src="../assets/return.png" id="return">
    </router-link>

    <div id="list">
      <el-button @click="toStartCreateDoc" class="btn">创建新的文档</el-button><br>
      <input type="text" placeholder="输入文档id来删除它" id="toDel">
      <el-button @click="toDelectTheDoc" class="btn">确认删除文档</el-button>
      <div class="file" v-for="item in docs">
        <p @click="toEditThisDoc(item)">&nbsp;&nbsp;{{item.id}}:&nbsp;&nbsp;&nbsp;{{item.name}}</p>
      </div>
    </div>

    <div id="box">
      <Toolbar
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
          id="toolbar"
      />
      <Editor
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
          id="editor"
      />
      <input type="text" placeholder="保存前起一个标题吧" id="htmlTitle">
      <el-button @click="toSaveDoc" class="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";
import qs from "qs";

export default Vue.extend({
  components: { Editor, Toolbar },
  created() {
    window.myData = this;
    this.getAllDoc();
    //if (!this.$store.state.isLogin) {
    //   this.$store.state.warning = true
    //  this.$router.push('/')
    //}
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      docs: [],
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    toStartCreateDoc(){
      this.$store.state.doc_id=0;
      this.html='';
    },
    toDelectTheDoc(){
      const tempthis = this;
      let params= {
        id:document.getElementById("toDel").value,
      }
      axios.post('http://127.0.0.1:8000/api/project_manage/delete_document/',
          qs.stringify(params))
          .then(function (Response) {
            console.log(Response)
            tempthis.getAllDoc();
            if(Response.data.errno===0)
              alert("已删除")
            else if(Response.data.errno===2)
              alert("不存在此文档")
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    toEditThisDoc(thisDoc){
      this.$store.state.doc_id=thisDoc.id
      const tempthis = this;
      let params= {
       id:thisDoc.id
      }
      axios.post('http://127.0.0.1:8000/api/project_manage/open_document/',
          qs.stringify(params))
          .then(function (Response) {
            //alert("新文档已保存。")
            tempthis.html=Response.data.data
            console.log("此文档已打开，现在的html代码是"+tempthis.html);
            console.log(Response)
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    toSaveDoc(){
      const tempthis = this;
      let params= {
        pid:this.$store.state.pid,
        name:document.getElementById("htmlTitle").value,
        data:tempthis.editor.getHtml()
      }
      let params2= {
        id:this.$store.state.doc_id,
        data:tempthis.editor.getHtml()
      }
      console.log(params)
      if(this.$store.state.doc_id===0){
        axios.post('http://127.0.0.1:8000/api/project_manage/create_document/',
            qs.stringify(params))
            .then(function (Response) {
              console.log(Response);
              tempthis.getAllDoc();
              alert("新文档已保存。")
            })
            .catch(function (error) {
              console.log(error);
            })
      }
      else{
        axios.post('http://127.0.0.1:8000/api/project_manage/store_document/',
            qs.stringify(params2))
            .then(function (Response) {
              console.log(Response);
              alert("对文档的修改已保存。")
            })
            .catch(function (error) {
              console.log(error);
            })
      }
    },
    getAllDoc(){
      const tempthis = this;
      let param= {
        pid:this.$store.state.pid,
      }
      axios.post('http://127.0.0.1:8000/api/project_manage/get_documents/',
          qs.stringify(param))
          .then(function (Response) {
            tempthis.docs=Response.data
            console.log("本项目所有文档信息如下：")
            console.log(tempthis.docs);
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  },

  mounted() {
    this.getAllDoc();
    // 模拟 ajax 请求，异步渲染编辑器
    //setTimeout(() => {
    //  this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    //}, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
  #bgd {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../assets/editorBgd.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  #return {
    position: absolute;
    height: 40px;
    width: 60px;
    left: 10px;
    top: 10px;
    cursor: pointer;
    transition: 0.1s linear;
  }
  #return:hover{
    transform: scale(1.2);
  }
  #list {
    position: absolute;
    top: 10%;
    left: 3%;
    width: 15%;
    height: 70%;
    background-color: white;
    opacity: 0.90;
    overflow-y: auto;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  }
  #box {
    position: absolute;
    top: 5%;
    left: 20%;
    width: 70%;
    height: 85%;
    opacity: 0.97;
  }
  #toolbar {
    border-radius: 5px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  }
  #editor {
    height: 90%;
    overflow-y: hidden;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  }
  .file {
    display: flex;
    height: 5%;
    width: 80%;
    background: rgb(255,255,255);
    margin: 10px auto;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.3s;
  }
  .file:hover {
    transform: scale(1.1);
    background-color: rgb(240,240,240);
  }
  #htmlTitle {
    position: absolute;
    left: 75%;
    top: 7%;
  }
  .save {
    position: absolute;
    left: 92%;
    top: 5%
  }
  .save:hover,.btn:hover,.save:active,.btn:active {
    color: black;
    background-color: rgb(240,240,240);
  }
</style>
