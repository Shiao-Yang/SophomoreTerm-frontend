<template>
  <div>
    <Header></Header>
    <div class="container">
      <SideNavigation></SideNavigation>
      <div class="main-container">
        <div class="header">
          <router-link to="/project">
            <img src="../assets/return.png" class="return">
          </router-link>
        </div>
        <div class="content">
          <div class="content-bar">
            <ul class="nav-list">
              <li class="nav-item">
                <div class="nav-details">
                  <span>设计图列表</span>
                </div>
              </li>
              <li>
                <div class="add-design">
                  <i class='bx bx-plus-circle' @click="isCreate=true" title="新建原型设计图"></i>
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
                  <i class='bx bxl-sketch first' title="设计" @click="toDesign(project.picid,project.name)"></i>
                  <i class='bx bxs-edit-alt' title="重命名" @click="changeIsSet(index)"></i>
                  <i class='bx bxs-trash delete' title="删除" @click="dlt(project.picid, index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="main-container" v-if="isCreate">
        <template>
          <CreateDesignWindow @ok="createDesign" @cancel="close"></CreateDesignWindow>
        </template>
      </div>
      <div class="main-container" v-if="isSet !== -1">
        <template>
          <SetDesignWindow @ok="rename" @cancel="close" :p="projects[isSet]"></SetDesignWindow>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation";
import SetDesignWindow from "@/components/SetDesignWindow";
import qs from "qs";
import CreateDesignWindow from "@/components/CreateDesignWindow";
import Header from "@/components/Header";

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
      isActive: 1,
      isCreate: false,
      projects:[],
      founders:[],
      isSet: -1,
    }
  },
  methods: {
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

    rename(project) {
      let params = {
        picid: project.picid,
        name: project.name,
      }
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"design/rename/",
        data: qs.stringify(params)
      }).then(res => {
        //console.log(res.data);
        this.close();
        if(res.data.errno === 0) {

          this.$message({
            message: '重命名成功',
            type: 'success',
            showClose: true,
          })
          //this.projects.push({picid: params.picid, name: params.name, data: []});

          //this.projects[index].name = ;
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

    toDesign(pic_id,pic_name) {
      this.$store.state.pic_id = pic_id;
      this.$store.state.pic_name = pic_name;
      console.log(this.$store.state.pic_id);
      console.log(this.$store.state.pic_name);
      this.$router.push('/prototype');
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
        this.projects = res.data;
        console.log(this.projects);
      }).catch(err => {
        console.log(err)
      })

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

    createDesign(uid, name, width, height, model_name) {
      let params = {
        pid: this.$store.state.pid /*this.$store.state.pid*/,
        uid: uid,
        name: name,
        width: width,
        height: height,
        model_name: model_name,
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
          this.projects.push({picid: res.data.picid, name: params.name, data: res.data.data});
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
    }
  },

  created() {
    this.get_Picture(this.$store.state.pid);
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
