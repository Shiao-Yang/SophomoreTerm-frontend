<template>
<div id="tl">
  <el-button id="backbutton" @click="backPage">返回上一级</el-button>
  <el-button id="createbutton" @click="createTeam">创建新的团队</el-button>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="我创建的团队" name="1">
      <el-table
          :data="tableData1"
          stripe
          style="width: 100%"
          @row-click="rowClick">
        <el-table-column
            prop="teamName"
            label="团队名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teamCreator"
            label="团队创建人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teamId"
            label="团队id">
        </el-table-column>
        <el-table-column
            prop="teamNum"
            label="团队人数">
        </el-table-column>
        <el-table-column
            prop="teamTime"
            label="团队创建时间">
        </el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item title="我管理的团队" name="2">
      <el-table
          :data="tableData1"
          stripe
          style="width: 100%"
          @row-click="rowClick">
        <el-table-column
            prop="teamName"
            label="团队名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teamCreator"
            label="团队创建人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teamId"
            label="团队id">
        </el-table-column>
        <el-table-column
            prop="teamNum"
            label="团队人数">
        </el-table-column>
        <el-table-column
            prop="teamTime"
            label="团队创建时间">
        </el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item title="我参与的团队" name="3">
      <el-table
          :data="tableData1"
          stripe
          style="width: 100%"
          @row-click="rowClick">
        <el-table-column
            prop="teamName"
            label="团队名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teamCreator"
            label="团队创建人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teamId"
            label="团队id">
        </el-table-column>
        <el-table-column
            prop="teamNum"
            label="团队人数">
        </el-table-column>
        <el-table-column
            prop="teamTime"
            label="团队创建时间">
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
export default {
  name: "TeamList",
  data() {
    return {
      activeNames: ['1'],
      tableData1: [{
        teamName: '团队1',
        teamCreator: '王小虎',
        teamId:'1',
        teamNum: '11',
        teamTime:'2022-05-07'
      }, {
        teamName: '团队4',
        teamCreator: '王小虎',
        teamId:'12',
        teamNum: '12',
        teamTime:'2022-05-07'
      }, {
        teamName: '团队3',
        teamCreator: '王大虎',
        teamId:'14',
        teamNum: '14',
        teamTime:'2022-05-27'
      }, {
        teamName: '团队2',
        teamCreator: '王小虎',
        teamId:'33',
        teamNum: '11',
        teamTime:'2022-05-07'
      }]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    rowClick(record,index){
      console.log(record);
      this.$router.push('/team/'+record.teamId);
      console.log(index)
    },
    backPage(){

    },
    createTeam(){
      this.$prompt('请输入团队名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的团队 ' + value + ' 已成功创建！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style scoped>
#tl{
  text-align: left;
  background: white;
}
#backbutton{
  margin-top: 2vh;
  margin-bottom: 2vh;
}
#createbutton{
  margin-top: 2vh;
  margin-bottom: 2vh;
}

</style>