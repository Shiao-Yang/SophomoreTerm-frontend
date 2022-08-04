<template>
  <div>
    <div class="container">
      <SideNavigation></SideNavigation>
      <div class="main-container">
        <div class="header">
          <button type="button" class="btn-new">
            <i class='bx bx-plus-circle'></i>
            <span class="btn-details" @click="isCreate=true">新建项目</span>
          </button>
        </div>
        <div class="content">
          <div class="content-bar">
            <ul class="nav-list">
              <li class="nav-item">
                <div class="nav-details" :class="{'active':(isActive === 1)}" @click="isActive=1">
                  <span>企业项目</span>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-details" :class="{'active':(isActive === 0)}" @click="isActive=0">
                  <span>回收站</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-details">
            <div class="projectList">
              <ul class="projects">
                <li class="project-item" v-for="(project, index) in this.projects" v-if="project.available !== isActive">
                  <img class="project-logo" src="../assets/logo.png">
                  <span class="project-info">
                    <span class="project-name">{{project.name}}</span>
                    <span class="project-details">创建时间 : {{project.starttime}}</span>
                  </span>
                  <i class='bx bxs-log-in first' title="进入项目"></i>
                  <i class='bx bxs-cog' title="项目管理" @click="changeIsSet(index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="main-container" v-if="isCreate">
        <template>
          <CreateProjectWindow @ok="createProject" @cancel="close"></CreateProjectWindow>
        </template>
      </div>
      <div class="main-container" v-if="isSet !== -1">
        <template>
          <SetProjectWindow @ok="renameProject" @cancel="close" :project="projects[isSet]"></SetProjectWindow>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation";
import CreateProjectWindow from "@/components/CreateProjectWindow";
import SetProjectWindow from "@/components/SetProjectWindow";

export default {
  name: "ProjectView",
  components: {
    SetProjectWindow,
    CreateProjectWindow,
    SideNavigation,
  },
  data(){
    return{
      isActive: 1,
      isCreate: false,
      isSet: -1,
      projects:[],
      founders:[],
    }
  },
  methods: {
    getProjects(gid){
      let self = this;
      self.$axios({
        method: 'GET',
        url: self.$store.state.base+"project_manage/get_project/",
        params: gid,
      })
          .then(res =>{
            self.projects = res.data;
            this.initIsSet();
          });
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

    createProject(name){
      let self = this;
      let formData = new FormData;
      formData.append('name', name);
      formData.append('uid', this.$store.state.userInfo.uid);
      formData.append('gid', this.$store.state.gid);
      self.$axios({
        method: 'POST',
        url: self.$store.state.base+"project_manage/create/",
        data:formData,
      })
          .then(res=>{
            console.log(res.data);
            self.close();
            if(res.data.errno === '0'){
              self.$message.success("新建项目成功");
            }
            else{
              self.$message.error("新建项目失败,错误代码:"+res.data.errno);
            }
          })
          .catch(err=>{
            console.log(err);
          })
    },

    renameProject(project){
      let formData = new FormData;
      formData.append("id", project.id);
      formData.append("name", project.name);
      this.$axios({
        method: "POST",
        url: this.$store.state.base+"project_manage/rename/",
        data: formData,
      })
          .then(res =>{
            console.log(res.data);
            this.close();
            if(res.data.errno === 0){
              this.$message.success("重命名项目成功");
            }
            else{
              this.$message.error("重命名项目失败，错误代码:"+res.data.errno);
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

    close(){
      this.isCreate = false;
      this.isSet = -1;
    }
  },

  created() {
    this.getProjects({gid:this.$store.state.gid});
  },

  mounted() {

    for(let i=0; i<this.projects.length; i++){
      this.getFounder(i);
    }
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

.main-container{
  position: relative;
  margin-left: 230px;
  padding: 10px 48px 0 48px;
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
  color: #8c8c8c;
  margin-right: 24px;
  text-align: center;
  border-bottom: solid #006cfa 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.content-bar .nav-list .nav-item .nav-details{
  padding: 12px 0;
  font-size: 18px;
}

.content-bar .nav-list .nav-item .active{
  font-size: 20px;
  color: #262626;
  font-weight: 600;
  border-bottom: solid #006cfa 3px;
}

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
