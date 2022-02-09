import { defineStore } from "pinia";
import { IProduct, buyProducts } from "../api/shop";
import { useProductsStore } from "./products";

// 添加quantity类型并且合并IProduct除了inventory，最终数据 {id, title, price, quantity}
type CartProduct = {
  quantity: number;
} & Omit<IProduct, "inventory">;

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartProducts: [] as CartProduct[], // 购物车列表
      checkutStatus: null as null | string, // 结算状态
    };
  },
  getters: {
    // 总价
    totalPrice(state) {
      return state.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  actions: {
    addProductToCart(product: IProduct) {
      console.log("addProductToCart", product);
      // 检查商品是否有库存
      if (product.inventory < 1) {
        return;
      }
      // 检查购物车是否已有该商品
      const cartItem = this.cartProducts.find((item) => item.id === product.id);

      if (cartItem) {
        // 如果有则商品数量 + 1
        cartItem.quantity++;
      } else {
        // 如果没有则添加到购物车列表
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1, // 第一次添加到购物车数量就是 1
        });
      }
      // 更新商品库存 引入另一个store
      //   product.inventory--;
      const productsStore = useProductsStore();
      productsStore.decrementProduct(product);
    },
    async checkout() {
      const result = await buyProducts();
      this.checkutStatus = result ? "成功" : "失败";
	  // 清空购物车
      if (result) {
        this.cartProducts = [];
      }
    },
  },
});
