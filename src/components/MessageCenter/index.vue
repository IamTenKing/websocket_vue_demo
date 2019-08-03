<template>
  <div/>
</template>
<script>
import MsgBus from 'components/MessageCenter/msgBus'
import MsgType from 'components/MessageCenter/MessageType'
import { getPushConfig } from 'api/admin/admin'
import { mapGetters } from 'vuex'
// import '../../../static/web-socket-js-master/swfobject.js'
// import '../../../static/web-socket-js-master/web_socket.js'
import swfurl from '../../../static/web-socket-js-master/WebSocketMain.swf'
window.WEB_SOCKET_SWF_LOCATION = swfurl
let websocket
const pushConfig = {
  host: '',
  port: '',
  systemName: 'pwp',
  action: { login: 'LOGIN' },
  token: '9d6403f7de6f6f7f67c8b8b9dbbe3fee9f4411b9',
  isIE9: false
}
export default {
  name: 'MessageCenter',
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    this.init()
  },

  methods: {
    // 建立websocket链接
    init() {
      // alert('000')
      getPushConfig().then(config => {
        pushConfig.host = config.host
        pushConfig.port = config.port
        pushConfig.systemName = config.systemName
        pushConfig.token = config.token
        this.isIE9Brower()
        websocket = new WebSocket('ws://' + pushConfig.host + ':' + pushConfig.port + '/api/cluster-push-ws/push-websocket')
        // websocket = new WebSocket('ws://192.168.100.41:8093/push-websocket')

        websocket.onopen = this.onopen
        websocket.onmessage = this.onmessage
      })
    },
    onopen() {
      const userInfo = this.userInfo
      const socketBean = {}
      socketBean.userInfo = {
        userName: userInfo.username,
        nickname: userInfo.name,
        avatar: userInfo.image,
        officePhone: userInfo.officePhone,
        deptId: userInfo.deptId,
        deptName: userInfo.deptName,
        deptParentId: userInfo.deptParentId
      }

      socketBean.systemName = pushConfig.systemName
      socketBean.action = pushConfig.action.login
      socketBean.userName = userInfo.username
      socketBean.token = pushConfig.token

      const convertFileJson = JSON.stringify(socketBean)
      websocket.send(convertFileJson)
    },
    onmessage(event) {
      const data = event.data
      const msgData = JSON.parse(data)
      // console.log(msgData)
      MsgBus.$emit(MsgType.push.eventName, msgData)
    },
    isIE9Brower() {
      // alert('111')
      if (navigator.userAgent.indexOf('MSIE') > 0) {
        if (navigator.userAgent.indexOf('MSIE 9.0') > 0 ||
            navigator.userAgent.indexOf('MSIE 8.0') > 0 ||
            navigator.userAgent.indexOf('MSIE 7.0') > 0 ||
            navigator.userAgent.indexOf('MSIE 6.0') > 0) {
          this.isIE9 = true
        }
      }
      if (this.isIE9) {
        try {
          // alert('ie9')
          WebSocket.WEB_SOCKET_SWF_LOCATION = swfurl
          // WebSocket.loadFlashPolicyFile('xmlsocket://192.168.2.62:843')
          WebSocket.loadFlashPolicyFile('xmlsocket://' + pushConfig.host + ':8843')
        } catch (e) {
        // 对于支持WebSocket的浏览器是会出现异常，属于正常的情况
          // alert(e)
        }
      }
    }
  }
}
</script>
