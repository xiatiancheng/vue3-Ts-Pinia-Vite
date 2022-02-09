<!-- src/App.vue -->
<template>
  <div class="item">
    <h1>Pinia - 购物车示例</h1>
    <hr />
    <h2>商品列表</h2>
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>

<script setup lang="ts">
  import ProductList from "./components/ProductList.vue";
  import ShoppingCart from "./components/ShoppingCart.vue";
</script>

<style lang="scss" scoped>
  .item{
    padding: 20px;
  }
</style>
