import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import App from "./App.vue";
import EBComponent from "./packages";
import router from "@/router/index";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";


const app = createApp(App);
  app.use(EBComponent,{
      components:["ebButton"]//这里传入的是组件的name值
  })
  app.use(createPinia().use(piniaPluginPersist))
  .use(Antd)
  .use(router)
  .mount("#app");
