<template>
  <div id="app">
    <editor/>
  </div>
</template>

<script>
import editor from './demos/editor';

export default {
  name: 'app',
  components: {
    editor
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#app{
  width: 100%;
  height: 100%;
}
</style>
