import { defineStore } from "pinia";
import { getProducts, IProduct } from "../api/shop";
export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      all: [] as IProduct[], // 所有商品列表
    };
  },
  getters: {},
  actions: {
    async loadAllProducts() {
      const result = await getProducts();
      this.all = result;
    },
    // 减少库存
    decrementProduct(product: IProduct) {
      const result = this.all.find((item) => item.id === product.id);
      if (result) {
        result.inventory--;
      }
    },
  },
});
