<template>
  <div id="app">
    <cnode-header></cnode-header>
    <router-view name="main"></router-view>
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
    @mixin reset{
      margin: 0;
      padding: 0;
    }
    html{
      @include reset;
      body{
        @include reset;
        #app{
          display: flex;
          justify-content: center;
          margin-top: 4rem;
          @media screen and (min-width: 420px){
            margin-top: 5rem;
          }
        }
      }
    }
</style>
