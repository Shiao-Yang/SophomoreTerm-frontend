<template>
<div id="tl">
  <Header></Header>
  <div class="container">
    <el-button id="createbutton" @click="createGroup(theUid)">创建新的团队</el-button>
    <div class="main-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="我创建的团队" name="1">
            <el-table
                :data="createdGroup"
                stripe
                style="width: 100%"
                >
              <template v-for="(col ,index) in cols">
                <el-table-column
                    :prop="col.prop"
                    :label="col.label"
                    width="180">
                </el-table-column>
                <
              </template>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="rowClick1(scope.row, scope.$index)">进入团队</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-collapse-item>
        <el-collapse-item title="我管理的团队" name="2">
          <el-table
              :data="managedGroup"
              stripe
              style="width: 100%;"
              >
            <template v-for="(col ,index) in cols">
              <el-table-column
                  :prop="col.prop"
                  :label="col.label"
                  width="180">
              </el-table-column>
            </template>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="rowClick2(scope.row, scope.$index)">进入团队</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="我加入的团队" name="3">
          <el-table
              :data="participatedGroup"
              stripe
              style="width: 100%"
              >
            <template v-for="(col ,index) in cols">
              <el-table-column
                  :prop="col.prop"
                  :label="col.label"
                  width="180">
              </el-table-column>
            </template>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="rowClick3(scope.row, scope.$index)">进入团队</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</div>
</template>

<script>
import qs from "qs";
import Header from "@/components/Header";

export default {
  name: "TeamList",
  components: {Header},
  data() {
    return {
      theUid:0,
      activeNames: ['1'],
      createdGroup:[],
      managedGroup:[],
      participatedGroup:[],
      cols:[
        {label:"团队名",prop:"name"},
        {label:"团队id",prop:"gid"},
        {label:"团队创建者",prop:"username"},
        {label:"团队成员数目",prop:"unum"}
      ]
    }
  },
  created() {
    console.log(sessionStorage.getItem('uid'));
    this.getCreatedGroup(sessionStorage.getItem('uid'));
    this.getManagedGroup(sessionStorage.getItem('uid'));
    this.getParticipatedGroup(sessionStorage.getItem('uid'));
  },
  methods: {
    handleChange(val) {
      // console.log(val);
    },
    rowClick1(record,index){
      // console.log(record);
      // console.log(index);
      this.$store.state.gid=record.gid;
      this.$store.state.role=2;
      this.$router.push('/adminTeam');
      console.log(this.$store.state.gid);
    },
    rowClick2(record,index){
      // console.log(record);
      // console.log(index);
      this.$store.state.gid=record.gid;
      this.$store.state.role=1;
      this.$router.push('/adminTeam');
      console.log(this.$store.state.gid);
    },
    rowClick3(record,index){
      // console.log(record);
      // console.log(index);
      this.$store.state.gid=record.gid;
      this.$store.state.role=0;
      this.$router.push('/adminTeam');
      console.log(this.$store.state.gid);
    },
    backPage(){
      this.$router.push('/userInfo');
    },
    getCreatedGroup(uid){
        this.theUid = uid;
        let user;
        let params = {
          uid: uid,
        }
        const tempthis =this;
        this.$axios({
          method: 'post',
          url: this.$store.state.base+"group_manage/get_created_group/",
          data: qs.stringify(params)
        }).then(res => {
          console.log(res);
          tempthis.createdGroup=res.data;
        }).catch(err => {
          console.log(err)
        })
    },
    getManagedGroup(uid){
      this.theUid = uid;
      let user;
      let params = {
        uid: uid,
      }
      const tempthis =this;
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"group_manage/get_managed_group/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res);
        tempthis.managedGroup=res.data;
      }).catch(err => {
        console.log(err)
      })
    },
    getParticipatedGroup(uid){
      this.theUid = uid;
      let user;
      let params = {
        uid: uid,
      }
      const tempthis =this;
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"group_manage/get_participated_group/",
        data: qs.stringify(params)
      }).then(res => {
        console.log(res);
        tempthis.participatedGroup=res.data;
      }).catch(err => {
        console.log(err)
      })
    },
    createGroup(uid){
      const tempthis =this;
      tempthis.$prompt('请输入团队名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
        inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
          if(!value) {
            return '输入不能为空';
          }
        },
      }).then(({ value }) => {
          let params = {
            uid: uid,
            name: value
          }
          this.$axios({
            method: 'post',
            url: this.$store.state.base+"group_manage/create_group/",
            data: qs.stringify(params)
          }).then(res => {
            console.log(res);
            tempthis.$message({
              type: 'success',
              message: '你的团队 ' + value + ' 已成功创建！'
            });
            tempthis.getCreatedGroup(uid)
          }).catch(err => {
            console.log(err)
          })
      }).catch(() => {
        tempthis.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height:100%;
  left: 0;
  top: 50px;
  align-items: center;
}

.container .main-container{
  width: 68%;
  min-width: 68%;
  margin: auto;
}
#tl{
  text-align: left;
  background: white;
}
#createbutton{
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 16%;
}

tr{
  cursor: pointer;
}

</style>
