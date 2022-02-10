import { createRouter, createWebHistory } from "vue-router";

const home = () => import("@/views/shop/shop.vue")
const vue3 = () => import("@/views/shop/vueT.vue")

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: home,
    },
    {
      path: "/vue3",
      component: vue3,
    },
  ],
});
export default router;
