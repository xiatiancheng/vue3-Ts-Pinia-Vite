import { defineStore } from "pinia";
import { otherState } from "@/store/otherState";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      name: "夏天",
      count: 1,
    };
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
        {
          storage: localStorage, // 只持久存储name和age到localStorage
          paths: ['name']
        }
      ]
  },
  // 类似组件的 computed, 用来封装计算属性，有缓存的功能
  getters: {
    // 函数接受一个可选参数 state 状态对象
    countPlus10(state) {
      console.log("countPlus调用了");
      return state.count + 10;
    },
    // 如果getters 中使用了this不接受state参数，则必须手动指定返回值的类型，否则无法推导出来
    countPlus20(): number {
      return this.count + 10;
    },

    // 获取其它 Getter， 直接通过 this
    countOtherPlus() {
      return this.countPlus20;
    },

    // 使用其它 Store
    otherStoreCount(state) {
      // 这里是其他的 Store，调用获取 Store，就和在 setup 中一样
      const otherStore = otherState();
      console.log(otherStore.count)
      return otherStore.count;
    },
  },
  actions: {
    // 在Vuex实现需要两步  1.定义mutations 2.提交mutations
    updateName(name: string) {
      this.name = name;
    },
  },
});
