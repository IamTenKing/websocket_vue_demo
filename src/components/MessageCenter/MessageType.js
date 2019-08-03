export default {
    // push: 'msg_type_push',
    // todo: 'TODO_MESSAGE',
    // bodyType: {
    //   todo: 'TO_DO',
    //   done: 'HAVE_TO_TO',
    //   read: 'READ',
    //   unread: 'UNREAD'
    // }
    push: {
      eventName: 'msg_type_push',
      type: {
        // 待办
        todo: {
          name: 'TODO_MESSAGE',
          bodyType: {
            todo: 'TO_DO',
            done: 'HAVE_TO_TO',
            read: 'READ',
            unread: 'UNREAD'
          }
        },
        // 协作
        task: {
          name: 'group'
        },
        // 公告
        notice: {
          name: 'NOTICE_MESSAGE',
          bodyType: {
            notice: 'NOTIC_MSG_BROADCAST'
          }
        },
        // 门户相关配置
        dashboard: {
          name: 'DASHBOARD_MESSAGE'
        }
      }
  
    }
  
  }
  