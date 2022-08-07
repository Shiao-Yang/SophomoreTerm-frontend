<template>
  <div id="bgd">

    <router-link to="/project">
      <img src="../assets/return.png" id="return">
    </router-link>

    <div id="list">
      <div @click="toStartCreateDoc" id="create"><p style="position:absolute;left: 22%;top: 15%">创建新的文档</p></div>
      <div id="files">
        <div class="file" v-for="item in docs">
          <p style="font-size: 13px;width: 80%"@click="toEditThisDoc(item)">&nbsp;&nbsp;文件名:&nbsp;&nbsp;&nbsp;{{item.name}}</p>
          <p style="font-size: 10px;position: absolute;right: 5px" @click="dele(item.id,item.name)">删除</p>
        </div>
      </div>
    </div>

    <el-dialog
        title="提示"
        :visible.sync="Del"
        :close-on-click-modal ="false"
        width="30%">
      <i class="el-icon-warning-outline" style="color: #ffd952"></i>
      <span>您确定要删除文件{{name}}吗？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="Del = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="toDeleteTheDoc(id)" class="confirm">确 定</el-button>
        </span>
    </el-dialog>

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
    </div>
    <input type="text" placeholder="为文件命名" id="htmlTitle" v-if="this.$store.state.doc_id===0">
    <div id="title" v-else>{{theTitle}}</div>
    <el-button @click="toSaveDoc" id="save" size="small">保存</el-button>
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
      id: 0,
      Del: false,
      name: '',
      html: '',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      docs: [],
      theTitle:"未命名"
    }
  },
  methods: {
    dele(id,name) {
      this.Del = true
      this.id = id
      this.name = name
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    toStartCreateDoc(){
      this.$store.state.doc_id=0;
      this.html='';
    },
    toDeleteTheDoc(id){
      const tempthis = this;
      this.Del = false
      let params= {
        id: id,
      }
      axios.post(this.$store.state.base+'project_manage/delete_document/',
          qs.stringify(params))
          .then(function (Response) {
            console.log(Response)
            tempthis.getAllDoc();
            if(Response.data.errno===0){
              tempthis.toStartCreateDoc()
            }
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
      axios.post(this.$store.state.base+'project_manage/open_document/',
          qs.stringify(params))
          .then(function (Response) {
            //alert("新文档已保存。")
            tempthis.html=Response.data.data
            console.log("此文档已打开，现在的html代码是"+tempthis.html);
            //console.log(Response)
            let i;
            //console.log(tempthis.docs.length)
            for(i=0;i<tempthis.docs.length;i++){
              if(tempthis.docs[i].id===thisDoc.id){
                tempthis.theTitle=tempthis.docs[i].name;
                //alert(i+tempthis.docs[i].id)
                break;
              }
            }
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
        axios.post(this.$store.state.base+'project_manage/create_document/',
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
        axios.post(this.$store.state.base+'project_manage/store_document/',
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
      axios.post(this.$store.state.base+'project_manage/get_documents/',
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
    width: 100%;
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
  #files {
    position: absolute;
    width: 80%;
    left: 10%;
    top: 10%;
  }
  #htmlTitle {
    position: absolute;
    padding: 5px;
    right: 1%;
    top: 5%;
    font-size: 16px;
    max-width: 7%;
    border-radius: 5px;
    border: 1px solid rgb(240,240,240);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    outline: none;
  }
  #title {
    position: absolute;
    padding: 5px;
    right: 1%;
    top: 5%;
    font-size: 16px;
    width: 7%;
    border-radius: 5px;
    background-color: white;
    text-align: center;
    border: 1px solid rgb(240,240,240);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    outline: none;
  }
  #save {
    position: absolute;
    right: 1.5%;
    top: 10%;
    width: 7%;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);

  }
  #create {
    position: relative;
    text-align: center;
    top: 1%;
    left: 10%;
    width: 80%;
    height: 30px;
    background: rgb(255,255,255);
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  #create:hover {
    background: rgb(240,240,240);
  }
  #toDel {
    position: relative;
    top: 3%;
    left: 9%;
    width: 80%;
    height: 18px;
    border-radius: 5px;
    border: 1px solid rgb(240,240,240);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    outline: none;
  }
  #toDel:focus,#htmlTitle:focus {
    transition:border linear .2s,box-shadow linear .5s;
    -moz-transition:border linear .2s,-moz-box-shadow linear .5s;
    -webkit-transition:border linear .2s,-webkit-box-shadow linear .5s;
    outline:none;border-color:rgba(93,149,242,.75);
    box-shadow:0 0 8px rgba(93,149,242,.105);
    -moz-box-shadow:0 0 8px rgba(93,149,242,.5);
    -webkit-box-shadow:0 0 8px rgba(93,149,242,3);
  }
  #Delete {
    position: relative;
    text-align: center;
    left: 10%;
    top: 5%;
    width: 80%;
    height: 30px;
    background: rgb(255,255,255);
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  #Delete:hover {
    background: rgb(240,240,240);
  }
</style>
