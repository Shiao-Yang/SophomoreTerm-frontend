<template>
  <!--
  <div>
    <input name="butt" value="统计" type="button" id="change" @click="change()" />
    <div class="box2">显示另外一个页面的内容
      <iframe id="ifrID" src="http://www.baidu.com" frameBorder="0" width="100%" scrolling="no" height="100%">
      </iframe>
    </div>
  </div>
  -->
  <div>
    <input name="butt" value="统计" type="button" id="change" @click="change()" />
    <div style="width:100%;height:750px;overflow:hidden;border: solid 5px">
      <div style="width:1245px;height:750px;margin:0px 0px 0px 0px; border: solid 5px; overflow: hidden; position: relative; float: right">
        <iFrame style="width: 1600px; height: 800px; margin-top: -55px; margin-right: -600px; margin-left: -100px" src="http://43.138.26.134/prototype?pic_id=193&pic_name=model1" scrolling="no">
        </iFrame>
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "preView",
data() {
  return {
    descImgs: [ 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
    ]
  }
},

methods: {
  change() {
      console.log(1)
      document.getElementById("ifrID").src="http://43.138.26.134/prototype?pic_id=193&pic_name=model1";
      console.log(2)
      },
  fetchPhoto() {

  }
}
}
</script>

<style scoped>
.box2 {
height: 500px;
width: 500px;
}
</style>
