<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/about">搜索</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :info="goodsNum" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/me">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      active: 0,
      len: 0,
    };
  },
  created() {
    this.INIT_CART();
  },
  computed: {
    ...mapState(["Cart"]), //数据映射
    totalCount() {
      return Object.keys(this.Cart).length;
    },
    goodsNum() {
      let num = 0;
      let cart = this.Cart;
      Object.values(cart).forEach((goods, index) => {
        num += goods.num;
      });
      if (num > 0) {
        return num; //数据返回
      }
    },
  },
  methods: {
    ...mapMutations(["INIT_CART"]),
  },
};
</script>
<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
p,
span {
  margin: 0 auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
  display: flex;
  flex-direction: column;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.van-tabbar--fixed {
  position: static !important;
}
</style>
