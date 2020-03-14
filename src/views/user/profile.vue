<template>
  <div class="container">
    <van-nav-bar left-arrow title="编辑资料" right-text="保存" @click-left="$router.back()"   @click-right="seaverProfile" />
    <van-cell-group>
      <van-cell title="头像" is-link center @click="showPhoto=true">
        <van-image
          width="50px"
          height="50px"
          slot="default"
          round
          fit="cover"
          :src="userPofile.photo"
        />
      </van-cell>
      <van-cell title="名称" :value="userPofile.name" is-link @click="showName=true" />
      <van-cell title="性别" :value="userPofile.gender===0?'男':'女'" is-link @click="showSex=true" />
      <van-cell title="生日" :value="userPofile.birthday" is-link @click="showBirthday=true" />
    </van-cell-group>
    <!-- 头像Popup 弹出层 -->
    <van-popup v-model="showPhoto" position="bottom">
      <van-cell title="本地相册选择图片" @click="$refs.myPic.click()"></van-cell>
      <van-cell title="拍照"></van-cell>
    </van-popup>
    <!-- 隐藏表单域 -->
    <input type="file" ref="myPic" @change="startUpload()" style="display:none;">
    <!-- 名称Popup 弹出层 -->
    <van-popup v-model="showName" position="bottom" :style="{ height: '15%' }">
      <van-field v-model.trim="userPofile.name" type="text  " />
    </van-popup>
    <!-- 性别 弹出层 -->
    <van-action-sheet v-model="showSex" :actions="SexMenus" cancel-text="取消" @select="onSelect" />
    <!-- 生日 弹出层 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showBirthday=false"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入dayjs
import dayjs from 'dayjs'
// 获取用户个人资料  // 编辑用户照片资料（ 头像、 身份证照片） // 编辑用户个人资料（ 包含实名认证）
import { apiUserProfile, apiUserPhoto, apiUserSeaverProfile } from '@/api/user.js'
export default {
  name: 'user-profile',
  data () {
    return {
      userPofile: {}, // 用户资料表单对象
      showPhoto: false, // 头像 Popup 弹出层
      showName: false, // 名称 Popup 弹出层
      showSex: false, // 性别 弹出层
      SexMenus: [{ name: '男' }, { name: '女' }], // 性别 弹出层 内容
      showBirthday: false, // 生日 弹出层
      // DatetimePicker 时间选择
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2100, 0, 1),
      currentDate: new Date()
    }
  },
  created () {
    // 调用获取用户资料的方法
    this.getuserPofile()
  },
  methods: {
    // 编辑用户个人资料
    async seaverProfile () {
      // 提交给服务器端
      await apiUserSeaverProfile(this.userPofile)
      // 成功提示
      this.$toast.success('更新用户信息成功！')
    },

    // 上传头像
    async startUpload () {
      // 获得上传好的图片对象
      const fd = this.$refs.myPic.files[0]
      // 把图片对象 整合到FormData
      const fs = new FormData()
      // 调用append方法，不断给自己添加信息
      fs.append('photo', fd)
      // 把FormData给到api函数，提交给服务器端
      const result = await apiUserPhoto(fs)
      // 把服务器端上传好并返回的头像信息更新显示到页面上
      this.userPofile.photo = result.photo
      // 关闭弹出
      this.showPhoto = false
      // 成功提示
      this.$toast.success('上传成功！')
    },
    // 时间选择 点击完成按钮时触发的事件
    onConfirm (val) {
      this.userPofile.birthday = dayjs(val).format('YYYY-MM-DD')
      this.showBirthday = false
    },
    // 弹出层 选中选项时触发
    onSelect (val) {
      this.userPofile.gender = val.name === '男' ? 0 : 1
      this.showSex = false
    },
    // 获取用户资料的方法
    async getuserPofile () {
      this.userPofile = await apiUserProfile()
      this.currentDate = new Date(this.userPofile.birthday)
    }
  }
}
</script>

<style lang='less'>
</style>
