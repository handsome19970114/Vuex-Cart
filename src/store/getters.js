export default {
  //选中的商品的总价
  SELECTED_GOODS_PRICE(state) {
    let cart = state.Cart;
    let totalPrice = 0;
    Object.values(cart).forEach(goods => {
      if (goods.checked) {
        totalPrice += goods.price * goods.num * 100;
      }
    });
    return totalPrice;
  },
  SELECT_GOODS_COUNT(state, payload) {
    let cart = state.Cart;
    let count = 0;
    Object.values(cart).forEach(goods => {
      if (goods.checked) {
        count += goods.num;
      }
    });
    return count;
  },
};
