<template>
  <div>{{name}}</div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from "@/store/user";
  const userStore = useUserStore();
  const { name } = storeToRefs(userStore)
  userStore.otherStoreCount
  userStore.countPlus10
  userStore.$patch((state:any) => {
      state.name = "朝闻道"
  })
</script>
