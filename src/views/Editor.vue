<template>
  <div id="bgd">

    <router-link to="/project">
      <img src="../assets/return.png" id="return">
    </router-link>
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
      <el-button @click="toSaveDoc">保存</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";

export default Vue.extend({
  components: { Editor, Toolbar },
  created() {
    window.myData = this;
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
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    toSaveDoc(){
      const tempthis = this;
      let params= new FormData();
      params.append("pid",2)
      params.append("name",document.getElementById("htmlTitle").value)
      params.append("file",tempthis.editor.getHtml())
      axios.post('http://127.0.0.1:8000/api/project_manage/save_document/',
          params,
          {headers:{'Content-Type':'multipart/form-data'}})
          .then(function (Response) {
            console.log(Response);
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  },
  mounted() {
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
  #box {
    position: absolute;
    top: 5%;
    left: 10%;
    width: 80%;
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

</style>
