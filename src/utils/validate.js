// 按需导入 extend函数 localize 语言包
import { extend, localize } from 'vee-validate'
// 导入全部规则
import * as rules from 'vee-validate/dist/rules'
// 导入语言包
import chZN from 'vee-validate/dist/locale/zh_CN.json'
// 注册 语言
localize({
  chZN
})
// 激活语言包
localize('chZN')
// rules是个大对象，内部有各个成员
// Object.keys(rules) 返回对象全部名称
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
// 为效验手机号，自定义规则
extend('phone', {
  validate: value => {
    const rst = /^1[35789]\d{9}$/ // 正则验证手机号
    return rst.test(value) // 正则匹配 返回boolean
  },
  message: '{_field_}格式不正确'
})
