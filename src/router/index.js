import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import User from '@/components/User'
import Article from '@/components/Article'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    components:{
        main:Main
    }
  },{
      path:'/user/:name',
      name: 'UserRoute',
      components:{
        main: User
      }
    },{
      path:'/topic/:id',
      name:'ArticleRoute',
      components:{
        main:Article
      }
    }]
})
