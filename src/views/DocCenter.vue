<template>
  <div id="bgd">

      <img src="../assets/return.png" id="return" @click="back()">
    <div id="list">
      <!--
      <div @click="toStartCreateDoc" id="create"><p style="position:absolute;left: 22%;top: 15%">创建新的文档</p></div>
      <div id="files">
        <div class="file" v-for="item in docs">
          <p style="font-size: 13px;width: 80%"@click="toEditThisDoc(item)">&nbsp;&nbsp;文件名:&nbsp;&nbsp;&nbsp;{{item.name}}</p>
          <p style="font-size: 10px;position: absolute;right: 5px" @click="dele(item.id,item.name)">删除</p>
        </div>
      </div>
      -->
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item,index) in projects" :title="item.name" :name="index" :key="index">
          <template slot="title" >
            <p @click="pid=item.id" style="width: 75%;margin-left: 5%;">{{item.name}}</p>
            <img src="../assets/plus.png" class="plus" @click.stop.prevent="toStartCreateDoc(item.id,index)">
          </template>
          <div v-for="(item2,index2) in projectDocs[index]" class="doc" :key="index2">
            <p style="width: 65%;display: inline-block;" class="fileName" @click="toEditThisDoc(item2)">文件名:{{item2.name}}</p>
            <span style="position: relative;margin-right: 5px" @click="Rename(item2.id,item2.name,item.id,index,index2)">改名</span>
            <span style="position: relative;" @click="dele(item2.id,item2.name,item.id,index,index2)">删除</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <input type="text" placeholder="为文件命名" id="htmlTitle" v-if="this.$store.state.doc_id===0" @keyup.enter="toSaveDoc" v-model="input">
    <div id="title" v-else>文件名：{{theTitle}}</div>
    <el-button @click="toSaveDoc" id="save" size="small" v-if="this.$store.state.doc_id===0">保存</el-button>
    <el-button @click="toSaveDoc" id="modify" size="small" v-else>修改保存</el-button>

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

    <el-dialog
        title="提示"
        :visible.sync="rename"
        :close-on-click-modal ="false"
        width="30%">
      <input placeholder="请输入修改标题" style="width: 70%;height: 15%;top: 38%;outline: none;position: absolute;left: 15%" v-model="titleInput"></input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="rename = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="rename_document" class="confirm">确 定</el-button>
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
  </div>
</template>

<script>
import Vue from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import axios from "axios";
import qs from "qs";

export default Vue.extend({
  components: { Editor, Toolbar },
  created() {
    window.myData = this;
    this.$store.state.doc_id = 0
    this.getProjects({gid: this.$store.state.gid})
    //if (!this.$store.state.isLogin) {
    //   this.$store.state.warning = true
    //  this.$router.push('/')
    //}
  },
  data() {
    return {
      activeNames: [],
      editor: null,
      input: '',
      id: 0,
      pid: 0,
      index: 0,
      index2: 0,
      projectDocs: [],
      Del: false,
      rename: false,
      name: '',
      html: '',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      docs: [],
      projects: [],
      theTitle:"未命名",
      titleInput: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getProjects(gid){
      this.$axios({
        method: 'GET',
        url: this.$store.state.base+"project_manage/get_project/",
        params: gid,
      })
          .then(res =>{
            this.projects = res.data;
            console.log(this.projects)
            this.getFiles()
          });
    },
    getFiles() {
      let i, len = this.projects.length
      for (i = 0; i < len; i++) {
        this.getProjectDoc(this.projects[i].id,i)
      }
    },
    getProjectDoc(pid,index) {
        let params = {
          pid: pid
        }
        this.axios({
          method: "post",
          url: this.$store.state.base+'project_manage/get_documents/',
          data: qs.stringify(params)
        })
            .then(res => {
              this.projectDocs[index]=res.data
              this.$forceUpdate()
            })
    },
    dele(id,name,pid,index,index2) {
      this.Del = true
      this.id = id
      this.name = name
      this.pid = pid
      this.index = index
      this.index2 = index2
    },
    Rename(id,name,pid,index,index2) {
      this.titleInput = ''
      this.rename = true
      this.id = id
      this.name = name
      this.pid = pid
      this.index = index
      this.index2 = index2
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    toStartCreateDoc(id,index){
      this.$store.state.doc_id = 0;
      this.input = ''
      this.html = ''
      this.pid = id
      this.index = index
    },
    rename_document() {
      this.rename = false
      let params = {
        id: this.id,
        name: this.titleInput
      }
      this.axios({
        method: "post",
        url: this.$store.state.base+'project_manage/rename_document/',
        data: qs.stringify(params)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1002:
                this.$message.warning(res.data.msg)
                this.members=[]
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
                this.$message.success('修改成功！')
                this.getProjects({gid: this.$store.state.gid})
                this.$forceUpdate()
                break
            }
          })
    },
    toDeleteTheDoc(id){
      this.Del = false
      let params= {
        id: id,
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+'project_manage/delete_document/',
        data: qs.stringify(params)
      })
          .then(Response =>  {
            console.log(Response)
            //this.projectDocs[this.index].splice(this.index2, 1)
            this.getProjects({gid: this.$store.state.gid})
            this.$message.success('删除成功！')
            if(Response.data.errno===0 && this.$store.state.doc_id===id){
              this.toStartCreateDoc(this.projects[0].id,0)
            }
            else if(Response.data.errno===2)
              this.$message.warning("不存在此文档")
          })
          .catch(error => {
            console.log(error);
          })
    },
    toEditThisDoc(thisDoc){

      this.$store.state.doc_id = thisDoc.id
      const tempthis = this;
      let params= {
        id:thisDoc.id
      }
      axios.post(this.$store.state.base+'project_manage/open_document/',
          qs.stringify(params))
          .then(function (Response) {
            //alert("新文档已保存。")
            tempthis.html=''
            tempthis.html=Response.data.data
            console.log("此文档已打开，现在的html代码是"+tempthis.html);
            //console.log(Response)
            let i;
            //console.log(tempthis.docs.length)
            tempthis.theTitle=thisDoc.name
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    toSaveDoc(){

      if(this.$store.state.doc_id===0){
        let params= {
          pid: this.pid,
          name: document.getElementById("htmlTitle").value,
          data: this.editor.getHtml()
        }
        console.log(params)
        this.axios({
          method: "post",
          url: this.$store.state.base+'project_manage/create_document/',
          data: qs.stringify(params)
        })
            .then(Response => {
              console.log(Response);
              console.log("参数params："+"pid:"+params.pid+" name:"+params.name+" data:"+params.data)
              // this.projectDocs[this.index].push(params)
              this.$message.success("新文档已保存。")
              this.getProjects({gid: this.$store.state.gid})
              this.theTitle=params.name;
              this.$store.state.doc_id=Response.data.id;
            })
            .catch(error => {
              console.log(error)
            })
      }
      else{
        let params2= {
          id:this.$store.state.doc_id,
          data:this.editor.getHtml()
        }
        this.axios({
          method: "post",
          url: this.$store.state.base+'project_manage/store_document/',
          data: qs.stringify(params2)
        })
            .then(Response => {
              console.log(Response);
              this.$message.success("对文档的修改已保存。")
            })
            .catch(error => {
              console.log(error);
            })
      }
    },
  },

  mounted() {
    // this.getAllDoc();
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
.doc {
  width: 90%;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  margin: 8px 10px;
  cursor: pointer;
  transition: 0.3s;
}
.doc:hover {
  transform: scale(1.1);
  background-color: rgb(240,240,240);
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
  padding: 2px;
  right: 1%;
  top: 10%;
  font-size: 16px;
  min-width: 8%;
  max-width: 8%;
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
#modify {
  position: absolute;
  right: 1.5%;
  top: 5%;
  width: 7%;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.plus {
  position: absolute;
  width: 18px;
  height: 18px;
  left: 80%;
  border-radius: 9px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  cursor: pointer;
}
.plus:hover {
  transform: scale(1.1);
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
