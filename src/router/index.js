import Vue from 'vue'
import Router from 'vue-router'
import WebSocket from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ws',
      name: 'WebSocket',
      component: WebSocket
    }
  ]
})
