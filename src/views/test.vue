<template>
  <div>
    <el-button @click="getFile()">test</el-button>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "test",
  data() {
    return {
      File: '',
      url: 'http://43.138.26.134/api/media/documents/20220809173028890175_36_prototype_model_1.json',
    }
  },
  methods: {
    getFile(url) {
      this.$axios.get(this.$store.state.base + this.url)
          .then( res => {
            console.log(1)
            console.log(res.data);
            this.controls = res.data;
          })
    },

    upLoad() {
      let files = this.$refs.fileId.files[0];
      this.File = files;
      if(this.files === "") {
        this.$message.error('请先添加文件');
        return ;
      }
      let formData = new window.FormData();
      formData.append('file',this.File);
      this.$axios({
        method: 'post',
        url: this.$store.state.base+"login/login/",
        data: formData,
      }).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })

    }
  }
}
</script>

<style scoped>

</style>
