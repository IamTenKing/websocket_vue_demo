<template>
  <div>
    <input type="text" v-model="text">
    <button @click="send()">发送消息</button>
    <br>
    <button @click="closeWebSocket()">关闭websocket连接</button>
    <br>
    <div>{{data}}</div>
  </div>
</template>
<script>
window.WEB_SOCKET_SWF_LOCATION = '../../static/web-socket-js-master/WebSocketMain.swf'
window.WEB_SOCKET_DEBUG = true
export default {
  name: 'helloWebSocket',
  components: {
  },
  data () {
    return {
      text: '',
      data: '',
      websocket: null
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.onbeforeunload()
  },
  methods: {
    init () {
      if ('WebSocket' in window) {
        this.isIE9Brower()
        this.websocket = new WebSocket('ws://localhost:8081/ws')
        this.initWebSocket()
      } else {
        this.websocket = new WebSocket('ws://localhost:8081/ws')
        this.initWebSocket()
      }
    },
    initWebSocket () {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage
      // 连接成功
      this.websocket.onopen = this.setOnopenMessage
      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage
      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage () {
      this.data = 'WebSocket连接发生错误' + '   状态码：' + this.websocket.readyState
    },
    setOnopenMessage () {
      this.data = 'WebSocket连接成功' + '状态码：' + this.websocket.readyState
    },
    setOnmessageMessage (event) {
      this.data = '服务端返回:' + event.data
    },
    setOncloseMessage () {
      this.data = 'WebSocket连接关闭' + '   状态码：' + this.websocket.readyState
    },
    onbeforeunload () {
      this.closeWebSocket()
    },
    // websocket发送消息
    send () {
      this.websocket.send(this.text)
      this.text = ''
    },
    closeWebSocket () {
      this.websocket.close()
    },
    isIE9Brower () {
      // alert('111')
      if (navigator.userAgent.indexOf('MSIE') > 0) {
        if (navigator.userAgent.indexOf('MSIE 9.0') > 0 ||
            navigator.userAgent.indexOf('MSIE 8.0') > 0 ||
            navigator.userAgent.indexOf('MSIE 7.0') > 0 ||
            navigator.userAgent.indexOf('MSIE 6.0') > 0) {
          try {
            // debugger
            // WebSocket.WEB_SOCKET_SWF_LOCATION = swfurl
            WebSocket.WEB_SOCKET_SWF_LOCATION = 'WebSocketMain.swf'
            // WebSocket.loadFlashPolicyFile('xmlsocket://192.168.2.62:843')
            WebSocket.loadFlashPolicyFile('xmlsocket://localhost:8843')
          } catch (e) {
          // 对于支持WebSocket的浏览器是会出现异常，属于正常的情况
            alert(e)
          }
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
