<template>
  <div>
    <Header></Header>
    <div class="container">
      <SideNavigation></SideNavigation>
      <div class="main-container">
        <div class="header">
          <div class="left-btn">
            <button type="button" class="btn-new">
              <i class='bx bx-plus-circle'></i>
              <span class="btn-details" @click="isCreate=true">新建项目</span>
            </button>
          </div>
          <div class="search">
            <input class="search-input" v-model="searchInput" placeholder="请输入关键字" @keyup.enter="searchProject"></input>
            <i class='bx bx-search search-btn' title="点击搜索" @click="searchProject"></i>
          </div>
        </div>
        <div class="content">
          <div class="content-bar">
            <ul class="nav-list">
              <li class="nav-item">
                <div class="nav-details" :class="{'active':(viewType === 1)}" @click="viewType=1">
                  <span>全部项目</span>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-details" :class="{'active':(viewType === 0)}" @click="viewType=0">
                  <span>回收站</span>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-details" :class="{'active':(viewType === 2)}" @click="viewType=2">
                  <span>搜索结果</span>
                </div>
              </li>
              <li class="nav-item nav-more">
                <div class="nav-details">
                  <i class='bx bx-dots-horizontal-rounded'></i>
                </div>
                <ul class="sub-menu">
                  <li>
                    <span class="sub-name">排序方式</span>
                  </li>
                  <li class="sub-op" @click="sortType=1">
                    <span class="sub-item">创建时间</span>
                    <i class='bx bx-check' v-if="sortType === 1"></i>
                  </li>
                  <li class="sub-op" @click="sortType=2">
                    <span class="sub-item">项目名称</span>
                    <i class='bx bx-check' v-if="sortType === 2"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="content-details">
            <div class="projectList">
              <ul class="projects">
                <li class="project-item" v-for="(project, index) in this.projects" v-if="project.available !== viewType && viewType === 1">
<!--                  <img class="project-logo" src="../assets/logo.png" title="进入项目" @click="toTurnToProject(project.id)">-->
                  <span class="project-info" title="进入项目" @click="toTurnToProject(project.id)">
                    <span class="project-name">{{project.name}}</span>
                    <span class="project-details">创建时间 : {{project.starttime}}</span>
                  </span>
                  <i class='bx bxs-log-in first' title="进入项目" @click="toTurnToProject(project.id)"></i>
                  <i class='bx bxs-cog' title="项目管理" @click="changeIsSet(index)"></i>
                  <i class='bx bxs-copy' title="复制项目" @click="copyProject(index)"></i>
                  <i class='bx bx-x delete' title="移动至回收站" @click="toBin(index)"></i>
                </li>
                <li class="project-item" v-for="(project, index) in this.projects" v-if="project.available !== viewType && viewType === 0">
<!--                  <img class="project-logo" src="../assets/logo.png">-->
                  <span class="project-info">
                    <span class="project-name">{{project.name}}</span>
                    <span class="project-details">创建时间 : {{project.starttime}}</span>
                  </span>
                  <i class='bx bxs-log-out-circle first' title="移出回收站" @click="outBin(index)"></i>
                  <i class='bx bx-x delete' title="删除项目" @click="deleteProject(index)"></i>
                </li>
                <li class="project-item" v-for="(project, index) in this.searchProjects" v-if="viewType === 2">
                  <!--                  <img class="project-logo" src="../assets/logo.png">-->
                  <span class="project-info">
                    <span class="project-name">{{project.name}}</span>
                    <span class="project-details">创建时间 : {{project.starttime}}</span>
                  </span>
                  <i class='bx bxs-log-in first' title="进入项目" @click="toTurnToProject(project.id)"></i>
                  <i class='bx bxs-cog' title="项目管理" @click="changeIsSet(index)"></i>
                  <i class='bx bxs-copy' title="复制项目" @click="copyProject(index)"></i>
                  <i class='bx bx-x delete' title="移动至回收站" @click="toBin(index)"></i>
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
          <SetProjectWindow @ok="renameProject" @cancel="close" :p="returnProject(isSet)"></SetProjectWindow>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation";
import CreateProjectWindow from "@/components/CreateProjectWindow";
import SetProjectWindow from "@/components/SetProjectWindow";
import Header from "@/components/Header";

export default {
  name: "ProjectView",
  components: {
    Header,
    SetProjectWindow,
    CreateProjectWindow,
    SideNavigation,
  },
  data(){
    return{
      viewType: 1,
      isCreate: false,
      isSet: -1,
      projects:[],
      founders:[],
      sortType: 1,
      searchInput: "",
      searchProjects: [],
    }
  },
  methods: {
    toTurnToProject(pid){
      this.$store.state.pid=pid;
      console.log(pid)
      this.$router.push("/project")
      console.log(this.$store.state.pid)
    },
    getProjects(gid){
      let self = this;
      self.$axios({
        method: 'GET',
        url: self.$store.state.base+"project_manage/get_project/",
        params: gid,
      })
          .then(res =>{
            self.projects = res.data;
            this.projects.sort(function (a, b) {
              return b.id - a.id;
            });
            this.initIsSet();
          });
    },

    returnProject(index){
      if(this.viewType === 2){
        return this.searchProjects[index];
      }
      else if(this.viewType === 1){
        return this.projects[index];
      }
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
            if(res.data.errno === 0){
              self.$message.success("新建项目成功");
              this.getProjects({gid:this.$store.state.gid});
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
              this.getProjects({gid:this.$store.state.gid})
            }
            else{
              this.$message.error("重命名项目失败，错误代码:"+res.data.errno);
            }
          })

    },

    initIsSet(){
      this.isSet = -1;
    },

    changeIsSet(index){
      this.isSet = index;
    },

    close(){
      this.isCreate = false;
      this.isSet = -1;
    },

    toBin(index){
      let formData = new FormData;
      if(this.viewType === 1){
        formData.append("id", this.projects[index].id);
      }
      else if(this.viewType === 2){
        formData.append("id", this.searchProjects[index].id);
      }
      this.$axios({
        method:"POST",
        url: this.$store.state.base + "project_manage/to_bin/",
        data: formData,
      })
          .then(res=>{
            console.log(res.data);
            if(res.data.errno === 0){
              this.$message.success("移动至回收站成功");
              this.getProjects({gid:this.$store.state.gid });
            }
            else{
              this.$message.error("移动至回收站失败，错误代码:"+res.data.errno);
            }
          })
    },

    deleteProject(index){
      let formData = new FormData;
      formData.append("id", this.projects[index].id);
      this.$axios({
        method:"POST",
        url: this.$store.state.base + "project_manage/delete/",
        data: formData,
      })
          .then(res=>{
            console.log(res.data);
            if(res.data.errno === 0){
              this.$message.success("删除项目成功");
              this.getProjects({gid:this.$store.state.gid });
            }
            else{
              this.$message.error("删除项目失败，错误代码:"+res.data.errno);
            }
          })
    },

    outBin(index){
      let formData = new FormData;
      formData.append("id", this.projects[index].id);
      this.$axios({
        method:"POST",
        url: this.$store.state.base + "project_manage/out_bin/",
        data: formData,
      })
          .then(res=>{
            console.log(res.data);
            if(res.data.errno === 0){
              this.$message.success("移出回收站成功");
              this.getProjects({gid:this.$store.state.gid });
            }
            else{
              this.$message.error("出回收站失败，错误代码:"+res.data.errno);
            }
          })
    },

    copyProject(index){
      let formData = new FormData;
      formData.append("id", this.returnProject(index).id);
      formData.append("uid", this.$store.state.userInfo.uid);
      this.$axios({
        method: "POST",
        // url: this.$store.state.base + "project_manage/copy/",
        url: "http://127.0.0.1:8000/api/project_manage/copy/",
        data: formData,
      })
          .then(res=>{
            console.log(res.data);
            if(res.data.errno === 0) {
              this.$message.success("复制项目成功");
              this.getProjects({gid:this.$store.state.gid});
            }
            else{
              this.$message.error("复制项目失败，错误代码"+res.data.errno);
            }
          })
    },

    searchProject(){
      let formData = new FormData;
      formData.append("gid", this.$store.state.gid);
      formData.append("keyword", this.searchInput);
      this.$axios({
        method:"POST",
        url: this.$store.state.base + "project_manage/search_projects/",
        data: formData,
      })
          .then(res=>{
            this.searchProjects = res.data;
            console.log(this.searchProjects);
            this.viewType = 2;
          })
          .catch(err=>{
            console.log(err);
          })
    },
  },

  created() {
    this.getProjects({gid:this.$store.state.gid});
  },

  watch:{
    sortType: {
      handler(newType){
        if(newType === 1) {
          this.projects.sort(function (a, b) {
            return b.id - a.id;
          });
        }

        else if(newType === 2){
          this.projects.sort(function (a, b){
            if(a.name > b.name){
              return 1;
            }
            else if(a.name < b.name){
              return -1;
            }
            else {
              return 0;
            }
          })
        }
      }
    },

  },

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

.header .search{
  margin-left: auto;
  height: 45px;
  align-items: center;
  position: relative;
}

.header .search .search-input{
  margin-top: 5px;
  font-size: 18px;
  padding: 8px 35px 8px 8px;
  border-radius: 5px;
  border: #e3eeff 2px solid;
  width: 250px;
}

.header .search .search-input:focus{
  outline: none;
  border-color: #1b9aee;
}

.header .search .search-btn{
  font-size: 25px;
  min-width: 30px;
  position: absolute;
  right: 5px;
  top: 13px;
  cursor: pointer;
  transition: all 0.4s ease;
}

.header .search .search-btn:hover{
  font-size: 30px;
  top: 10px;
  color: #1b9aee;
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
  position: relative;
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

.content-bar .nav-list .nav-item .sub-menu{
  position: absolute;
  left: 100%;
  top: 0;
  list-style: none;
  width: 150px;
  padding:0 10px 6px 10px;
  background-color: #fff;
  float: left;
  color: #000;
  border-radius: 10px;
  box-shadow: #666666 1px 2px 3px;
  cursor: auto;
  display: none;
  opacity: 0;
  transition: 0s;
}

.content-bar .nav-list .nav-item:hover .sub-menu{
  opacity: 1;
  top: 5px;
  transition: 0.4s all ease;
}

.content-bar .nav-list .nav-more{
  min-width: 50px;
}

.content-bar .nav-list .nav-more i{
  font-size: 22px;
}

.content-bar .nav-list .nav-item .sub-menu li{
  display: flex;
  height: 30px;
  align-items: center;
  padding: 5px;
}

.content-bar .nav-list .nav-item .sub-menu li i{
  color: #006cfa;
  font-size: 20px;
  min-width: 40px;
}

.content-bar .nav-list .nav-item .sub-menu .sub-name{
  font-size: 18px;
  font-weight: 600;
}

.content-bar .nav-list .nav-item .sub-menu .sub-op{
  border-radius: 10%;
  cursor: pointer;
}

.content-bar .nav-list .nav-item .sub-menu .sub-op:hover{
  background-color: #f4f4f4;
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

.content-details .projectList .projects .project-item i{
  transition: all 0.3s ease;
}

.content-details .projectList .projects .project-item i:hover{
  font-size:32px;
}

.content-details .projectList .projects .project-item .delete:hover{
  color: #FF5733;
}


.content-details .projectList .projects .project-item i.first{
  color: #11101d;
  cursor: pointer;
  margin: auto 0 auto auto;
  height: 30px;
  min-width: 70px;
  float: right;
}

.content-details .projectList .projects .project-item i:hover{
  color: #1b9aee;
}
</style>
