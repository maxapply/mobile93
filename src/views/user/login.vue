<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <ValidationObserver ref="loginFormRef">
      <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
        <van-field
          v-model="loginForm.mobile"
          type="text"
          placeholder="请输入手机号码"
          label="手机号"
          required
          clearable
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
        <van-field
          v-model="loginForm.code"
          type="password"
          placeholder="请输入验证码"
          label="验证码"
          required
          clearable
          :error-message="errors[0]"
        >
          <van-button slot="button" type="primary" size="small">发送验证码</van-button>
        </van-field>
      </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="login-btn">
      <van-button size="small" :loading="isloading" loading-text="加载中..." round block type="info" @click="login()">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入 vee-validate 验证相关模块 和 ValidationObserver 全局效验模块
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { apiUserLogin } from '@/api/user.js'
export default {
  name: 'user-login',
  components: { ValidationProvider, ValidationObserver },
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 加载状态
      isloading: false
    }
  },
  methods: {
    // 登录系统
    async login () {
      // 对表单项目全部效验，没有问题在向下执行
      const valid = await this.$refs.loginFormRef.validate()
      if (!valid) {
        // 效验失败下面代码停止执行
        return false
      }
      // 验证成功后开启加载状态
      this.isloading = true
      // 调用api，效验账号信息有效
      try {
        // 通过vuex维护服务器端 返回token信息
        const result = await apiUserLogin(this.loginForm)
        // 设置token 信息
        this.$store.commit('updataUser', result)
        // 提示登录成功
        this.$toast.success('登录成功')
        // 跳转页面
        this.$router.push('/home')
      } catch (err) {
        // 错误后关闭加载状态
        this.isloading = false
        // 提示登录错误信息
        return this.$toast.fail('手机号或验证码输入错误' + err)
      }
      // 登录成功后关闭 加载状态
      this.isloading = false
    }
  }
}
</script>

<style lang='less'>
.login-btn {
  margin: 40px;
}
</style>
