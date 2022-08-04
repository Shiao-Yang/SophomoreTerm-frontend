<template>

</template>

<script>
import DDR from 'yoyoo-ddr'
import 'yoyoo-ddr/dist/yoyoo-ddr.css'

// vue 3
// import DDR from 'yoyoo-ddr-vue3'
// import 'yoyoo-ddr-vue3/dist/yoyoo-ddr-vue3.css'

export default {
  data() {
    return {
      transform: { x: 100, y: 100, width: 100, height: 100, rotation: 0 },
    }
  },
  render() {
    // vue 3 使用 v-model:value={this.transform}
    return (
        <DDR v-model={this.transform}>
          <div style="background:red;width:100%;height:100%">x={this.transform.x}</div>
        </DDR>
    )
  },
}
</script>

<style lang="less" scoped>

</style>
