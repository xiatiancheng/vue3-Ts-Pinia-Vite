<template>
  <div class="container_cardItem">
    <cardItem :list = "productsStore.all"/>
  </div>
  
  <!-- <ul>
    <li v-for="item in productsStore.all" :key="item.id">
      {{ item.title }} - {{ item.price }}￥ - 库存{{ item.inventory }}<br />
      <button @click="cartStore.addProductToCart(item)" :disabled="!item.inventory">添加到购物车</button>
    </li>
  </ul> -->
</template>

<script setup lang="ts">
import cardItem from './card.vue'
import { useProductsStore } from "../store/products";
const productsStore = useProductsStore();
// 加载所有数据
productsStore.loadAllProducts();
</script>

<style lang="scss" scoped>
 .container_cardItem{
     padding: 20px;
 }
</style>