<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider   width="200" style="background: #fff">
        <a-menu
          @click="clickMenuItem"
          mode="inline"
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="item in menus" :key="item.name">
            <template #title>
              <span>
                <user-outlined />
                {{ item.meta?.title }}
              </span>
            </template>
            <a-menu-item
              v-for="children in item.children"
              :key="children.name"
              >{{ children.meta?.title }}</a-menu-item
            >
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <div class="main-container">
        <a-layout style="padding: 15px">
          <content />
        </a-layout>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import content from "./components/content.vue";
import route from "@/router"
import {UserOutlined} from "@ant-design/icons-vue";
import { type RouteRecordName, useRoute, useRouter } from 'vue-router';
  const currentRoute = useRoute();
  const router = useRouter();
  const selectedKeys2 = ref([currentRoute.name])
  const openKeys = ref([] as (RouteRecordName | undefined)[]) 
  let collapsed = ref<boolean>(false)
  const menus = route.options.routes

    // 点击菜单
  const clickMenuItem = ({ key }: {key: string}) => {
    if (key === currentRoute.name) return;
    if (/http(s)?:/.test(key)) {
      window.open(key);
    } else {
      router.push({ name: key });
    }
  };

  // 获取当前打开的子菜单
  const  getOpenKeys = () => {
    console.log(currentRoute?.matched[0]?.name??[])
    return [currentRoute?.matched[0]?.name]
    // return currentRoute.matched.slice(1).map((n) => n.name)
  }
  // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      (newVal, oldVal) => {
        selectedKeys2.value = [ currentRoute.name ];
        openKeys.value = getOpenKeys()
      },
      {
        immediate: true, // 立即执行
      }
    );
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
.main-container {
  height: calc(100vh - 64px);
  overflow: scroll;
  flex: 1;
}
</style>