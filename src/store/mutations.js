import router from "@/router/index";
import Vue from "vue";
import { Toast, Dialog } from "vant";
import { setLocalStorage, getLocalStorage } from "../untils/localStorage";
import { get } from "../untils/methods";
export default {
  USER_INFO(state, obj) {
    state.userInfo = obj;
    setLocalStorage("userInfo", obj);
  },
  //初始化的时候把数据提取出来
  INIT_USER_INFO(state) {
    const initUserInfo = getLocalStorage("userInfo");
    if (initUserInfo) {
      state.userInfo = initUserInfo;
    }
  },
  ADD_COUNT(state, payload) {
    state.count += payload.step;
  },
  //获取初始化的购物车数据
  INIT_CART(state, payload) {
    const initCart = getLocalStorage("Cart");
    if (initCart) {
      state.Cart = initCart; //初始化的时候获取购物车的数据
    }
  },
  //添加到购物车
  ADD_TO_CART(state, goods) {
    if (state.userInfo.token) {
      //如果有token的话，就弹出提示
      Toast({
        message: "添加购物车成功",
        duration: 800,
      });
      this.commit("ADD_GOODS", goods);
    } else {
      router.push("/me"); //如果不行的话跳转到我的页面
    }
  },
  //添加商品
  ADD_GOODS(state, goods) {
    const { id } = goods;
    let Cart = state.Cart;
    if (Cart[id]) {
      Cart[id]["num"]++; //以商品的id作为对象的属性名，进行保存的
    } else {
      Cart[id] = { ...goods, checked: true, num: 1 }; //如果不存在的话，一个对象进行保存
      state.Cart = { ...Cart };
    }
    setLocalStorage("Cart", state.Cart); //把数据放到localstorage
  },
  //删除选中的商品
  DELETE_SELECT_GOODS(state, payload) {
    let cart = state.Cart;
    Object.values(cart).forEach(goods => {
      if (goods.checked) {
        delete cart[goods.id];
      }
    });
    state.Cart = { ...cart };
    setLocalStorage("Cart", state.Cart);
  },
  //商品数量减少
  REDUCE_GOODS(state, id) {
    let Cart = state.Cart;
    let goods = Cart[id];
    if (goods) {
      if (goods["num"] > 0) {
        goods["num"]--;
      }
      if (goods["num"] === 0) {
        delete Cart[id];
      }
    }
    state.Cart = { ...Cart };
    setLocalStorage("Cart", state.Cart); //本地数据同步
  },
  //单个商品的正选与反选
  SINGLE_SELECT_GOODS(state, id) {
    let Cart = state.Cart;
    let goods = Cart[id];
    if (goods) {
      //如果商品存在
      if (goods.checked) {
        //判断是否选中
        goods.checked = !goods.checked;
      } else {
        Vue.set(goods, "checked", true);
      }
      state.Cart = { ...Cart };
      setLocalStorage("Cart", state.Cart);
    }
  },
  //全选按钮
  ALL_SELECT_GOODS(state, isCheckedAll) {
    let cart = state.Cart;
    Object.values(cart).forEach(goods => {
      if (goods.checked) {
        goods.checked = isCheckedAll;
      } else {
        Vue.set(goods, "checked", isCheckedAll);
      }
    });
    state.Cart = { ...cart };
    setLocalStorage("Cart", state.Cart);
  },
  //选中的数量
};
