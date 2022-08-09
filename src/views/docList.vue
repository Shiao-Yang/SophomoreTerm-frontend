<template>
  <div>
    <Header></Header>
    <div class="container">
      <SideNavigation></SideNavigation>
      <div class="main-container">
        <div class="header">
        </div>
        <div class="content">
          <div class="content-bar">
            <ul class="nav-list">
              <li class="nav-item">
                <div class="nav-details">
                  <span>项目文档列表</span>
                </div>
              </li>
              <li>
                <div class="add-design">
                  <i class='bx bx-plus-circle' @click="create=true;titleInput='';radio='1';radio2='1'" title="新建文档"></i>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-details">
            <div class="projectList">
              <ul class="projects">
                <li class="project-item" v-for="(project, index) in this.projects">
                  <!--                  <img class="project-logo" src="../assets/logo.png">-->
                  <span class="project-info">
                    <span class="project-name">{{project.name}}</span>
                    <!--<span class="project-details">创建时间 : {{project.starttime}}</span>-->
                  </span>
                  <i class='bx bxl-sketch first' title="编辑" @click="open(project.id,project,index)"></i>
                  <i class='bx bxs-edit-alt' title="重命名" @click="Rename(project.id)"></i>
                  <i class='bx bxs-trash delete' title="删除" @click="Delete(project.id,project.name)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
          title="提示"
          :visible.sync="Del"
          :close-on-click-modal ="false"
          width="30%">
        <i class="el-icon-warning-outline" style="color: #ffd952"></i>
        <span>您确定要删除文件{{doc_name}}吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Del = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="toDeleteTheDoc" class="confirm">确 定</el-button>
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

      <el-dialog
          title="提示"
          :visible.sync="create"
          :close-on-click-modal ="false"
          width="30%"
          height="50%">
        <div>
          <input placeholder="请输入标题" style="width: 70%;height: 30px;outline: none;position:relative;left: 4%" v-model="titleInput"></input>
        </div>
        <div style="margin: 20px auto">
          <template>
            <el-radio v-model="radio" label="1" style="margin-left: 4%">自定义</el-radio>
            <el-radio v-model="radio" label="2">选择模板</el-radio>
          </template>
        </div>
        <div style="margin: 20px auto">
          <template v-if="radio==='2'">
            <el-radio v-model="radio2" label="1" style="margin-left: 4%">软件开发计划书模板</el-radio>
            <el-radio v-model="radio2" label="2">需求规格说明书模板</el-radio>
            <el-radio v-model="radio2" label="3" style="margin-left: 4%;margin-top: 10px">会议纪要模板</el-radio>
            <el-radio v-model="radio2" label="4" style="margin-top: 10px">项目计划书模板</el-radio>
          </template>
          <template v-else>
            <el-radio disabled v-model="radio2" label="1" style="margin-left: 4%">软件开发计划书模板</el-radio>
            <el-radio disabled v-model="radio2" label="2">需求规格说明书模板</el-radio>
            <el-radio disabled v-model="radio2" label="3" style="margin-left: 4%;margin-top: 10px">会议纪要模板</el-radio>
            <el-radio disabled v-model="radio2" label="4" style="margin-top: 10px">项目计划书模板</el-radio>
          </template>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="create = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="getHTML" class="confirm">创 建</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation";
import SetDesignWindow from "@/components/SetDesignWindow";
import qs from "qs";
import CreateDesignWindow from "@/components/CreateDesignWindow";
import Header from "@/components/Header";
import axios from "axios";

export default {
  name: "ProjectView",
  components: {
    Header,
    SetDesignWindow,
    CreateDesignWindow,
    SideNavigation,
  },
  data(){
    return{
      radio: '1',
      radio2: '1',
      isActive: 1,
      isCreate: false,
      projects:[],
      founders:[],
      isSet: -1,
      rename: false,
      Del: false,
      create: false,
      doc_id: 0,
      doc_name: '',
      titleInput: '',
      html: '',
      model_name: '',
    }
  },
  methods: {
    getHTML() {
      let url
      if (this.titleInput==='') {
        this.$message.warning("请输入标题")
        return
      }
      if (this.radio==='1') {
        this.html = ''
        this.model_name = 'default_document.html'
        this.create_document()
      }
      if (this.radio==='2') {
        if (this.radio2==='1') {
          url = this.$store.state.base+"media/documents/document_model_1.html"
          this.model_name = 'document_model_1.html'
        } else if (this.radio2==='2') {
          url = this.$store.state.base+"media/documents/document_model_2.html"
          this.model_name = 'document_model_2.html'
        } else if (this.radio2==='3') {
          url = this.$store.state.base+"media/documents/document_model_3.html"
          this.model_name = 'document_model_3.html'
        } else if (this.radio2==='4') {
          url = this.$store.state.base+"media/documents/document_model_4.html"
          this.model_name = 'document_model_4.html'
        }
        this.$axios.get(url)
            .then( res => {
              this.html = res.data
              //console.log("res.data:"+res.data)
              this.create_document()
            })
      }
    },
    create_document() {
      this.create = false
      console.log("this.html:"+this.html)
      let params = {
        pid: this.$store.state.pid,
        name: this.titleInput,
        model_name: this.model_name,
      }
      console.log("params.model_name:"+params.model_name)
      this.axios({
        method: "post",
        url: this.$store.state.base+'project_manage/create_document/',
        data: qs.stringify(params)
      })
          .then(res => {
            console.log(res);
            switch (res.data.errno) {
              case 0:
                this.getAllDoc();
                this.$message.success("新文档已保存。")
                break
              default:
                this.$message.warning(res.data.msg)
            }
          })
    },
    Delete(id,name) {
      this.Del = true
      this.doc_id = id
      this.doc_name = name
    },
    toDeleteTheDoc() {
      this.Del = false
      let params= {
        id: this.doc_id
      }
      this.axios({
        method: 'post',
        url: this.$store.state.base+'project_manage/delete_document/',
        data: qs.stringify(params)
      })
          .then(Response =>  {
            console.log(Response)
            //this.projectDocs[this.index].splice(this.index2, 1)
            this.getAllDoc()
            this.$message.success('删除成功！')
          })
          .catch(error => {
            console.log(error);
          })
    },
    rename_document() {
      this.rename = false
      let params = {
        id: this.doc_id,
        name: this.titleInput
      }
      console.log("params:"+params.id+" "+params.name)
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
                  this.getAllDoc()
                this.$forceUpdate()
                break
            }
          })
    },
    initIsSet(){
      this.isSet = -1;
      console.log(this.isSet);
    },

    changeIsSet(index){
      this.isSet = index;
      console.log(this.isSet);
    },

    dlt(pic_id, index) {
      let params = {
        picid: pic_id,
      }
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"design/delete/",
        data: qs.stringify(params)
      }).then(res => {
        //console.log(res.data);
        if(res.data.errno === 0) {

          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true,
          })
          //this.projects.push({picid: params.picid, name: params.name, data: []});
          this.isCreate = false;
          this.projects.splice(index, 1);
          //location.reload();

        } else {
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

    Rename(id) {
      this.doc_id = id
      this.titleInput = ''
      this.rename = true
    },

    open(id,doc,i) {
      this.$store.state.doc_id = id
      this.$store.state.doc = doc
      this.$router.push({path: '/editor',query: {index: i}})
    },
    getFounder(uid){
      let self = this;
      let formData = new FormData;
      formData.append("uid", uid);
      self.$axios({
        method: 'POST',
        url: self.$store.state.base+"space/get_info/",
        data:formData,
      })
          .then(res=>{

          })
    },

    createProject(name, width, height) {
      let params = {
        picid: this.$store.state.pid /*this.$store.state.pid*/,
        name: name,
        width: width,
        height: height,
      }
      console.log('createDesign')
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"design/create/",
        data: qs.stringify(params)
      }).then(res => {
        if(res.data.errno === 0) {

          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true,
          })
          this.projects = res.data
          this.isCreate = false;
          //location.reload();
        } else {
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

    close(){
      this.isCreate = false;
      this.isSet = -1;
    },
    getAllDoc(){
      const tempthis = this;
      let param= {
        pid: this.$store.state.pid,
      }
      axios.post(this.$store.state.base+'project_manage/get_documents/',
          qs.stringify(param))
          .then(function (Response) {
            tempthis.projects=Response.data
            console.log("本项目所有文档信息如下：")
            console.log(tempthis.projects);
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  },

  created() {
    window.myData = this
    this.getAllDoc(this.$store.state.pid);
  },

  mounted() {

    /*
    for(let i=0; i<this.projects.length; i++){
      this.getFounder(i);
    }

     */
  }

}
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
}
.container{
  height: 100%;
  width: 100%;
  background: #ffffff;
}

.add-design {
  position: relative;
  top: 7px;
  font-size: 30px;
  color: #aeafb0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.add-design:hover {
  font-size: 30px;
  color: #1b9aee;
}

.main-container{
  position: relative;
  margin-left: 230px;
  padding: 20px 48px 0 48px;
}

.header{
  display: flex;
}

.header .btn-new{
  display: flex;
  color: #fff;
  background-color: #1b9aee;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  height: 45px;
  line-height: 34px;
  min-width: 68px;
  padding: 0 15px 0 10px;
  align-items: center;
  transition: all 0.3s ease;
}
.return {
  display: flex;
  color: #fff;
  background-color: #1b9aee;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  height: 35px;
  margin: 2px 10px;
  line-height: 34px;
  min-width: 68px;
  align-items: center;
  transition: all 0.3s ease;
}
.return:hover{
  background-color: #006cfa;
  cursor: pointer;
}
.header .btn-new:hover{
  background-color: #006cfa;
  cursor: pointer;
}

.header .btn-new i{
  font-size: 22px;
  min-width: 30px;
  margin: auto;
}

.header .btn-new .btn-details{
  font-size: 16px;
  font-weight: 500;
}

.content{
  margin-top: 40px;
  margin-left: 5px;
}

.content-bar{
  border-bottom: solid #f4f4f4 2px;
}
.content-bar .nav-list{
  display: flex;
  height: 44px;
  list-style: none;
  position: relative;
  text-align: center;
}

.content-bar .nav-list .nav-item{
  height: 100%;
  line-height: 20px;
  background-color: transparent;
  /*color: #8c8c8c;*/
  margin-right: 24px;
  text-align: center;
  font-size: 20px;
  color: #262626;
  font-weight: 600;
  cursor: pointer;
  border-bottom: solid #006cfa 0;
  transition: all 0.3s ease;
}

.content-bar .nav-list .nav-item .nav-details{
  padding: 12px 0;
  font-size: 32px;
}

/*
.content-bar .nav-list .nav-item .active{
  font-size: 20px;
  color: #262626;
  font-weight: 600;
  border-bottom: solid #006cfa 3px;
}

 */


.content-bar .nav-list .nav-item:hover{
  border-bottom: solid #006cfa 3px;
}



.content-details .projectList .projects{
  list-style: none;
  text-decoration: none;
}

.content-details .projectList .projects .project-item{
  color: #11101d;
  width: 100%;
  height: 80px;
  margin-top: 20px;
  display: flex;
  cursor: pointer;
}

.content-details .projectList .projects .project-item:hover{
  color: #1b9aee;
}

.content-details .projectList .projects .project-item a{
  width: 100%;
  text-decoration: none;
  height: 80px;
  display: flex;
}

.content-details .projectList .projects .project-item .project-logo{
  width: 60px;
  height: 60px;
  margin: auto 20px;
  border-radius: 20px;
  background-color: #f4f4f4;
  cursor: pointer;
}

.content-details .projectList .projects .project-item .project-info{
  font-size: 16px;
  margin-top: 10px;
  float: left;
  cursor: pointer;
}

.content-details .projectList .projects .project-item .project-info .project-name{
  display: flex;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
}

.content-details .projectList .projects .project-item .project-info .project-details{
  margin-top: 10px;
  margin-right: 30px;
  font-size: 18px;
  float: left;
}

.content-details .projectList .projects .project-item i{
  color: #11101d;
  cursor: pointer;
  margin:auto 0;
  font-size: 28px;
  height: 30px;
  min-width: 70px;
  float: right;
}

.content-details .projectList .projects .project-item i.first{
  color: #11101d;
  cursor: pointer;
  margin: auto 0 auto auto;
  font-size: 28px;
  height: 30px;
  min-width: 70px;
  float: right;
}

.content-details .projectList .projects .project-item i:hover{
  color: #1b9aee;
}
</style>
