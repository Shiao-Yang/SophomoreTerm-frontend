<template>

</template>

<script>


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

<style scoped>

</style>
