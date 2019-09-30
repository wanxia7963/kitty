import Mock from 'mockjs'
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'

fnCreate(login, true)
fnCreate(user, true)
fnCreate(menu, true)

function fnCreate (mod, isOpen = true) {
    if (isOpen) {
      for (var key in mod) {
        ((res) => {
          if (res.isOpen !== false) {
            Mock.mock(new RegExp(res.url), res.type, (opts) => {
              opts['data'] = opts.body ? JSON.parse(opts.body) : null
              delete opts.body
              console.log('\n')
              console.log('%cmock拦截, 请求: ', 'color:blue', opts)
              console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
              return res.data
            })
          }
        })(mod[key]() || {})
      }
    }
  }