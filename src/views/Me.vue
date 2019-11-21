<template>
  <div id="me">
    <h1>我的</h1>
    <van-cell-group>
      <van-field v-model="userName" placeholder="请输入手机号码" />
      <van-field
        v-model="passWord"
        center
        clearable
        placeholder="密码"
      ></van-field>
    </van-cell-group>
    <van-button
      class="click"
      @click="clickLogin"
      v-show="isLogin"
      type="primary"
      size="small"
      >点击登录</van-button
    >
    <van-button
      class="click"
      @click="clickLoginOut"
      v-show="!isLogin"
      type="danger"
      size="small"
      >点我退出登录</van-button
    >
  </div>
</template>
<script>
import { getLocalStorage } from '../untils/localStorage';
import { mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      isLogin: true,
      userName: '',
      passWord: '',
    };
  },
  methods: {
    ...mapMutations({}),
    ...mapActions(['ASYNC_LOGIN']),
    clickLogin() {
      if (
        this.userName.trim().length >= 11 &&
        this.passWord.trim().length >= 8
      ) {
        this.$toast({
          message: '登陆成功',
          type: 'success',
        });
        const obj = {
          userName: this.userName,
          passWord: this.passWord,
          id: Date.now(),
          token: Date.now(),
        };
        console.log(obj);
        // this.commit('');
        this.ASYNC_LOGIN(obj); //点击登录的时候异步的提交一个数据，登陆成功
        localStorage.setItem('token', Date.now());
        this.isLogin = false;
      } else {
        this.$toast({
          message: '登陆失败',
          type: 'fail',
        });
      }
    },
    clickLoginOut() {
      localStorage.removeItem('token');
      this.isLogin = true;
    },
  },
  created() {
    let userInfo = getLocalStorage('token');
    // console.log(userInfo);
    if (userInfo) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
};
</script>
<style scoped>
#me {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
}
.click {
  margin: 20px;
}
</style>
