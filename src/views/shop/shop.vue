
<template>
  <div class="item">
    <ebButton @click="clickButton">取消</ebButton>
    <h1>Pinia</h1>
    <hr />
    <h2>商品列表</h2>
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>

<script setup lang="ts">
  import ProductList from "@/views/shop/ProductList.vue";
  import ShoppingCart from "@/views/shop/ShoppingCart.vue";
  const clickButton = () => {
    alert("11111111111");
  };
</script>

<style lang="scss" scoped>
.item {
  padding: 20px;
}
</style>
