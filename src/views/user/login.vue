<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="loginForm.mobile"
        type="text"
        placeholder="请输入手机号码"
        label="手机号"
        required
        clearable
      />
      <van-field
        v-model="loginForm.code"
        type="password"
        placeholder="请输入验证码"
        label="验证码"
        required
        clearable
      >
        <van-button slot="button" type="primary" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button size="small" round block type="info" @click="login()">登录</van-button>
    </div>
  </div>
</template>

<script>
import { apiUserLogin } from '@/api/user.js'
export default {
  name: 'user-login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async login () {
      try {
        await apiUserLogin(this.loginForm)
      } catch (err) {
        return this.$toast.fail('手机号或验证码输入错误' + err)
      }
      this.$toast.success('登录成功')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang='less'>
.login-btn {
  margin: 40px;
}
</style>
