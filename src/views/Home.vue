<template>
  <div class="home">
    <h1>这是首页</h1>
    <div class="product" v-for="item in product" :key="item.id">
      <img :src="item.imgUrl" alt />
      <p>{{ item.title }}</p>
      <span class="price">{{ item.price }}</span>
      <van-button type="primary" size="small" @click="addToCart(item)"
        >加入购物车</van-button
      >
    </div>
  </div>
</template>
<script>
import { getAllProducts } from '../untils/server';
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(['userInfo', 'Cart']),
  },
  name: 'home',
  components: {},
  data() {
    return {
      product: [],
    };
  },
  methods: {
    ...mapMutations({
      addToCart: 'ADD_TO_CART',
      initUserInfo: 'INIT_USER_INFO',
    }),
  },
  async created() {
    const result = await getAllProducts();
    this.product = result.data;
    this.initUserInfo(); //初始化数据
  },
  mounted() {},
};
</script>
<style scoped>
.home {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
}
.clickBtn {
  margin: 100px auto;
}
.price {
  color: orangered;
}
</style>
