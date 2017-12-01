<template>
  <div id="app">
    <cnode-header></cnode-header>
    <div id="wrap">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header.vue';
export default {
  name: 'app',
  components:{
    cnodeHeader: header
  }
}
</script>

<style lang="scss">
#app{
  margin-top: 5rem;
  #wrap{
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
