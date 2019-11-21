<template>
  <div id="cart">
    <!-- 在购物车是空的时候显示一张图片 -->
    <div class="cartImg" v-show="!isShowEmptyCart">
      <img
        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2933620766,4262220351&fm=26&gp=0.jpg"
        alt
      />
      <p>购物车是空的，赶紧去</p>
      <van-button type="danger" @click="$router.push('/')"
        >去逛逛吧！！</van-button
      >
    </div>
    <div class="productList" v-show="isShowEmptyCart">
      <div class="product-top">
        购物车<van-button type="danger" @click="clickRemove" size="small"
          >点击删除</van-button
        >
      </div>
      <div class="product-middle">
        <div class="product-show" v-for="(item, index) in Cart" :key="index">
          <input
            type="checkbox"
            :checked="item.checked"
            @click="clickSingle(item.id)"
          />
          <img :src="item.imgUrl" class="product-showImg" alt="" />
          <div class="show-right">
            <p>{{ item.title }}</p>
            <span>{{ item.price }}</span>
            <div class="stepper">
              <span @click="minishBtn(item.num, item.id)">-</span>
              <input type="text" disabled v-model="item.num" />
              <span @click="increaseBtn(item)">+</span>
            </div>
          </div>
        </div>
      </div>
      <van-submit-bar
        :price="sel_total_price"
        button-text="提交订单"
        @submit="onSubmit"
        :disabled="sel_goods_count == 0"
      >
        <van-checkbox v-model="isCheckedAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { removeLocalStorage } from "../untils/localStorage";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      // showBlank: false,
      checked: true,
      num: 1,
    };
  },
  methods: {
    //把vuex中的数据映射过来
    ...mapMutations([
      "INIT_USER_INFO",
      "INIT_CART",
      "DELETE_SELECT_GOODS",
      "REDUCE_GOODS", //数量减少,
      "ADD_GOODS", //数量增加
      "SINGLE_SELECT_GOODS", //单选
      "ALL_SELECT_GOODS",
    ]),
    clickRemove() {
      Dialog.confirm({
        title: "温馨提示",
        message: "确认要删除选中的商品吗？",
      })
        .then(res => {
          this.DELETE_SELECT_GOODS();
        })
        .catch(err => {});
    },
    onSubmit() {
      console.log("object");
    },
    //数量减小
    minishBtn(goodsNum, goodsId) {
      if (goodsNum > 1) {
        this.REDUCE_GOODS(goodsId);
      } else if (goodsNum == 1) {
        Dialog.confirm({
          title: "温馨提示",
          message: "确定删除此商品吗？",
        })
          .then(() => {
            this.REDUCE_GOODS(goodsId);
          })
          .catch(() => {
            console.log("老板好帅");
          });
      }
    },
    //数量增加
    increaseBtn(goods) {
      // console.log(goodsNum, goodsId);
      // console.log(goods);
      this.ADD_GOODS(goods);
    },
    //单选与反选
    clickSingle(goods) {
      this.SINGLE_SELECT_GOODS(goods);
    },
  },
  created() {
    this.INIT_USER_INFO(); //组件创建完成时，初始化用户数据
    this.INIT_CART(); //组件创建完成时，初始化购物车数据
  },
  computed: {
    ...mapState(["Cart", "userInfo"]),
    ...mapGetters({
      sel_total_price: "SELECTED_GOODS_PRICE",
      sel_goods_count: "SELECT_GOODS_COUNT",
    }),
    totalCount() {
      return Object.keys(this.Cart).length;
    },
    isShowEmptyCart() {
      if (this.totalCount > 0) {
        return true;
      }
      return false;
    },
    isCheckedAll: {
      get() {
        //获取值
        let toggle = this.totalCount > 0;
        let cart = this.Cart;
        Object.values(cart).forEach(goods => {
          if (!goods.checked) {
            return (toggle = false);
          }
        });
        return toggle;
      },
      //设置值
      set(value) {
        this.ALL_SELECT_GOODS(value);
      },
    },
  },
};
</script>
<style scoped>
#cart {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  /* flex-direction: column; */
}

.cartImg img {
  display: block;
  width: 200px;
  margin: 0 auto;
}
.van-submit-bar {
  position: static;
  border-top: 1px solid #cecece;
}
.productList {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  justify-content: space-around;
  align-items: center;
}
.product-top {
  width: 100%;
  height: 50px;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ceceec;
}
.product-middle {
  flex: 1;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.product-showImg {
  width: 100px;
}
.product-show {
  display: flex;
  align-items: center;
}
.stepper {
  display: flex;
  align-items: center;
}
.stepper input {
  width: 50px;
  text-align: center;
}
.show-right {
  flex: 1;
}
.stepper span {
  width: 20px;
  height: 20px;
  background: #cecece;
  line-height: 20px;
}
.cartImg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
