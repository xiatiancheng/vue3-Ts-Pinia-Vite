import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
const home = () => import("@/views/shop/shop.vue")
const vue3 = () => import("@/views/shop/vueT.vue")



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      name: 'index',
      meta:{
        title: "首页"
      },
      children: [
        {
          path: "/",
          meta:{
            title: "home"
          },
          name:'home',
          component: home,
        },
      ]
    },
    {
      path: "/vue3",
      name:'about',
      meta:{
        title: "个人中心"
      },
      component: Layout,
      children: [
        {
          name:'vue3',
          meta:{
            title: "vue3"
          },
          path: "/vue3",
          component: vue3,
        },
      ]
    },
  ],
});
export default router;
