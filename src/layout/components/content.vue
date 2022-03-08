<template>
  <transition name="fade-transform" mode="out-in">
    <a-layout-content
      :style="{
        background: '#fff',
        padding: '24px',
        margin: 0,
        minHeight: '280px',
      }"
      class="content"
    >
      <router-view />
    </a-layout-content>
  </transition>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .content{
    border-radius: 4px;
  }
</style>