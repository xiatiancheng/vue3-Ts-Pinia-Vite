import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
createApp(App).use(createPinia().use(piniaPluginPersist)).use(Antd).use(router).mount('#app')