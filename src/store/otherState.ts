import { defineStore } from "pinia";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const otherState = defineStore({
  id: "otherState",
  state: () => {
    return {
      name: "夏天",
      count: 11,
    };
  },
});
