<template>
  <a-sub-menu v-if="props.menuInfo?.children?.length" :key="props.menuInfo.name">
    <template #title>
      <span>
        <user-outlined />
        {{ props.menuInfo.meta?.title }}
      </span>
    </template>
    <a-menu-item v-for="children in menuChildren" :key="children.name">{{
      children.meta?.title
    }}</a-menu-item>
    <template v-for="item in menuChildren" :key="item.name">
      <MyMenuItem :menuInfo="item" />
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name='MyMenuItem'>
  import { type PropType } from 'vue';
  import {UserOutlined} from "@ant-design/icons-vue";
  import type { RouteRecordRaw } from 'vue-router';
  const props = defineProps({
    menuInfo: {
      type: Object as PropType<RouteRecordRaw>,
    },
  });
  const menuChildren = computed(() =>
    [...(props.menuInfo?.children || [])]
  );
</script>

<style scoped>
</style>