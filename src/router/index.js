import Vue from 'vue'
import Router from 'vue-router'
import helloWebSocket from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ws',
      name: 'helloWebSocket',
      component: helloWebSocket
    }
  ]
})
