<template>
  <div id="app">
    <router-view/>
    <!--在这里将自己定义的组件当作一个标签来使用-->
  </div>
</template>

<script>
export default {
  name: "App",
  components:{
  }
};
</script>

<style>
#app {
  font-size: 14px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
